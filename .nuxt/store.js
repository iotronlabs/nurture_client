import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const log = console // on server-side, consola will catch all console.log
const VUEX_PROPERTIES = ['state', 'getters', 'actions', 'mutations']
let store = {}

void (function updateModules() {
  store = normalizeRoot(require('..\\store\\index.js'), 'store/index.js')

  // If store is an exported method = classic mode (deprecated)

  if (typeof store === 'function') {
    return log.warn('Classic mode for store/ is deprecated and will be removed in Nuxt 3.')
  }

  // Enforce store modules
  store.modules = store.modules || {}

  resolveStoreModules(require('..\\store\\modules\\dashboard\\index.js'), 'modules/dashboard/index.js')
  resolveStoreModules(require('..\\store\\modules\\forum\\index.js'), 'modules/forum/index.js')
  resolveStoreModules(require('..\\store\\modules\\config\\index.js'), 'modules/config/index.js')
  resolveStoreModules(require('..\\store\\modules\\theme\\index.js'), 'modules/theme/index.js')
  resolveStoreModules(require('..\\store\\modules\\user\\index.js'), 'modules/user/index.js')
  resolveStoreModules(require('..\\store\\modules\\dashboard\\state.js'), 'modules/dashboard/state.js')
  resolveStoreModules(require('..\\store\\modules\\forum\\actions.js'), 'modules/forum/actions.js')
  resolveStoreModules(require('..\\store\\modules\\config\\state.js'), 'modules/config/state.js')
  resolveStoreModules(require('..\\store\\modules\\dashboard\\actions.js'), 'modules/dashboard/actions.js')
  resolveStoreModules(require('..\\store\\modules\\forum\\state.js'), 'modules/forum/state.js')
  resolveStoreModules(require('..\\store\\modules\\theme\\actions.js'), 'modules/theme/actions.js')
  resolveStoreModules(require('..\\store\\modules\\user\\state.js'), 'modules/user/state.js')
  resolveStoreModules(require('..\\store\\modules\\theme\\mutations.js'), 'modules/theme/mutations.js')
  resolveStoreModules(require('..\\store\\modules\\theme\\state.js'), 'modules/theme/state.js')
  resolveStoreModules(require('..\\store\\modules\\user\\actions.js'), 'modules/user/actions.js')
  resolveStoreModules(require('..\\store\\modules\\dashboard\\mutations.js'), 'modules/dashboard/mutations.js')
  resolveStoreModules(require('..\\store\\modules\\user\\mutations.js'), 'modules/user/mutations.js')
  resolveStoreModules(require('..\\store\\modules\\forum\\mutations.js'), 'modules/forum/mutations.js')

  // If the environment supports hot reloading...

  if (process.client && module.hot) {
    // Whenever any Vuex module is updated...
    module.hot.accept([
      '..\\store\\index.js',
      '..\\store\\modules\\dashboard\\index.js',
      '..\\store\\modules\\forum\\index.js',
      '..\\store\\modules\\config\\index.js',
      '..\\store\\modules\\theme\\index.js',
      '..\\store\\modules\\user\\index.js',
      '..\\store\\modules\\dashboard\\state.js',
      '..\\store\\modules\\forum\\actions.js',
      '..\\store\\modules\\config\\state.js',
      '..\\store\\modules\\dashboard\\actions.js',
      '..\\store\\modules\\forum\\state.js',
      '..\\store\\modules\\theme\\actions.js',
      '..\\store\\modules\\user\\state.js',
      '..\\store\\modules\\theme\\mutations.js',
      '..\\store\\modules\\theme\\state.js',
      '..\\store\\modules\\user\\actions.js',
      '..\\store\\modules\\dashboard\\mutations.js',
      '..\\store\\modules\\user\\mutations.js',
      '..\\store\\modules\\forum\\mutations.js',
    ], () => {
      // Update `root.modules` with the latest definitions.
      updateModules()
      // Trigger a hot update in the store.
      window.$nuxt.$store.hotUpdate(store)
    })
  }
})()

// createStore
export const createStore = store instanceof Function ? store : () => {
  return new Vuex.Store(Object.assign({
    strict: (process.env.NODE_ENV !== 'production')
  }, store))
}

function resolveStoreModules(moduleData, filename) {
  moduleData = moduleData.default || moduleData
  // Remove store src + extension (./foo/index.js -> foo/index)
  const namespace = filename.replace(/\.(js|mjs|ts)$/, '')
  const namespaces = namespace.split('/')
  let moduleName = namespaces[namespaces.length - 1]
  const filePath = `store/${filename}`

  moduleData = moduleName === 'state'
    ? normalizeState(moduleData, filePath)
    : normalizeModule(moduleData, filePath)

  // If src is a known Vuex property
  if (VUEX_PROPERTIES.includes(moduleName)) {
    const property = moduleName
    const storeModule = getStoreModule(store, namespaces, { isProperty: true })

    // Replace state since it's a function
    mergeProperty(storeModule, moduleData, property)
    return
  }

  // If file is foo/index.js, it should be saved as foo
  const isIndexModule = (moduleName === 'index')
  if (isIndexModule) {
    namespaces.pop()
    moduleName = namespaces[namespaces.length - 1]
  }

  const storeModule = getStoreModule(store, namespaces)

  for (const property of VUEX_PROPERTIES) {
    mergeProperty(storeModule, moduleData[property], property)
  }

  if (moduleData.namespaced === false) {
    delete storeModule.namespaced
  }
}

function normalizeRoot(moduleData, filePath) {
  moduleData = moduleData.default || moduleData

  if (moduleData.commit) {
    throw new Error(`[nuxt] ${filePath} should export a method that returns a Vuex instance.`)
  }

  if (typeof moduleData !== 'function') {
    // Avoid TypeError: setting a property that has only a getter when overwriting top level keys
    moduleData = Object.assign({}, moduleData)
  }
  return normalizeModule(moduleData, filePath)
}

function normalizeState(moduleData, filePath) {
  if (typeof moduleData !== 'function') {
    log.warn(`${filePath} should export a method that returns an object`)
    const state = Object.assign({}, moduleData)
    return () => state
  }
  return normalizeModule(moduleData, filePath)
}

function normalizeModule(moduleData, filePath) {
  if (moduleData.state && typeof moduleData.state !== 'function') {
    log.warn(`'state' should be a method that returns an object in ${filePath}`)
    const state = Object.assign({}, moduleData.state)
    // Avoid TypeError: setting a property that has only a getter when overwriting top level keys
    moduleData = Object.assign({}, moduleData, { state: () => state })
  }
  return moduleData
}

function getStoreModule(storeModule, namespaces, { isProperty = false } = {}) {
  // If ./mutations.js
  if (!namespaces.length || (isProperty && namespaces.length === 1)) {
    return storeModule
  }

  const namespace = namespaces.shift()

  storeModule.modules[namespace] = storeModule.modules[namespace] || {}
  storeModule.modules[namespace].namespaced = true
  storeModule.modules[namespace].modules = storeModule.modules[namespace].modules || {}

  return getStoreModule(storeModule.modules[namespace], namespaces, { isProperty })
}

function mergeProperty(storeModule, moduleData, property) {
  if (!moduleData) return

  if (property === 'state') {
    storeModule.state = moduleData || storeModule.state
  } else {
    storeModule[property] = Object.assign({}, storeModule[property], moduleData)
  }
}
