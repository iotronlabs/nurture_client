import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'

const _7a3c5304 = () => interopDefault(import('..\\pages\\addStaff.vue' /* webpackChunkName: "pages_addStaff" */))
const _7e6cf99d = () => interopDefault(import('..\\pages\\chat.vue' /* webpackChunkName: "pages_chat" */))
const _d4fa50c2 = () => interopDefault(import('..\\pages\\dashboard.vue' /* webpackChunkName: "pages_dashboard" */))
const _07dba91e = () => interopDefault(import('..\\pages\\exam\\index.vue' /* webpackChunkName: "pages_exam_index" */))
const _2c18ba04 = () => interopDefault(import('..\\pages\\exam2.vue' /* webpackChunkName: "pages_exam2" */))
const _6b7d9d2c = () => interopDefault(import('..\\pages\\forum.vue' /* webpackChunkName: "pages_forum" */))
const _d5e8d73c = () => interopDefault(import('..\\pages\\config\\course.vue' /* webpackChunkName: "pages_config_course" */))
const _c50f705c = () => interopDefault(import('..\\pages\\config\\user.vue' /* webpackChunkName: "pages_config_user" */))
const _b80b96e8 = () => interopDefault(import('..\\pages\\exam\\addexam.vue' /* webpackChunkName: "pages_exam_addexam" */))
const _38615de0 = () => interopDefault(import('..\\pages\\exam\\addQuestions.vue' /* webpackChunkName: "pages_exam_addQuestions" */))
const _3181813a = () => interopDefault(import('..\\pages\\exam\\exam1_student.vue' /* webpackChunkName: "pages_exam_exam1_student" */))
const _08199f61 = () => interopDefault(import('..\\pages\\exam\\exam1_teacher.vue' /* webpackChunkName: "pages_exam_exam1_teacher" */))
const _b0c917fe = () => interopDefault(import('..\\pages\\exam\\result.vue' /* webpackChunkName: "pages_exam_result" */))
const _8751a27a = () => interopDefault(import('..\\pages\\exam\\rules.vue' /* webpackChunkName: "pages_exam_rules" */))
const _70388898 = () => interopDefault(import('..\\pages\\exam\\studentexamtable.vue' /* webpackChunkName: "pages_exam_studentexamtable" */))
const _57126651 = () => interopDefault(import('..\\pages\\exam\\teacherexamtable.vue' /* webpackChunkName: "pages_exam_teacherexamtable" */))
const _4e3105ef = () => interopDefault(import('..\\pages\\user\\admin.vue' /* webpackChunkName: "pages_user_admin" */))
const _5861787b = () => interopDefault(import('..\\pages\\user\\audit.vue' /* webpackChunkName: "pages_user_audit" */))
const _8e8cd600 = () => interopDefault(import('..\\pages\\user\\staff.vue' /* webpackChunkName: "pages_user_staff" */))
const _44ea8b02 = () => interopDefault(import('..\\pages\\user\\teacher.vue' /* webpackChunkName: "pages_user_teacher" */))
const _7dc00f46 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */))

Vue.use(Router)

if (process.client) {
  if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual'

    // reset scrollRestoration to auto when leaving page, allowing page reload
    // and back-navigation from other pages to use the browser to restore the
    // scrolling position.
    window.addEventListener('beforeunload', () => {
      window.history.scrollRestoration = 'auto'
    })

    // Setting scrollRestoration to manual again when returning to this page.
    window.addEventListener('load', () => {
      window.history.scrollRestoration = 'manual'
    })
  }
}
const scrollBehavior = function (to, from, savedPosition) {
  // if the returned position is falsy or an empty object,
  // will retain current scroll position.
  let position = false

  // if no children detected and scrollToTop is not explicitly disabled
  if (
    to.matched.length < 2 &&
    to.matched.every(r => r.components.default.options.scrollToTop !== false)
  ) {
    // scroll to the top of the page
    position = { x: 0, y: 0 }
  } else if (to.matched.some(r => r.components.default.options.scrollToTop)) {
    // if one of the children has scrollToTop option set to true
    position = { x: 0, y: 0 }
  }

  // savedPosition is only available for popstate navigations (back button)
  if (savedPosition) {
    position = savedPosition
  }

  return new Promise((resolve) => {
    // wait for the out transition to complete (if necessary)
    window.$nuxt.$once('triggerScroll', () => {
      // coords will be used if no selector is provided,
      // or if the selector didn't match any element.
      if (to.hash) {
        let hash = to.hash
        // CSS.escape() is not supported with IE and Edge.
        if (typeof window.CSS !== 'undefined' && typeof window.CSS.escape !== 'undefined') {
          hash = '#' + window.CSS.escape(hash.substr(1))
        }
        try {
          if (document.querySelector(hash)) {
            // scroll to anchor by returning the selector
            position = { selector: hash }
          }
        } catch (e) {
          console.warn('Failed to save scroll position. Please add CSS.escape() polyfill (https://github.com/mathiasbynens/CSS.escape).')
        }
      }
      resolve(position)
    })
  })
}

export function createRouter() {
  return new Router({
    mode: 'history',
    base: decodeURI('/'),
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,

    routes: [{
      path: "/addStaff",
      component: _7a3c5304,
      name: "addStaff"
    }, {
      path: "/chat",
      component: _7e6cf99d,
      name: "chat"
    }, {
      path: "/dashboard",
      component: _d4fa50c2,
      name: "dashboard"
    }, {
      path: "/exam",
      component: _07dba91e,
      name: "exam"
    }, {
      path: "/exam2",
      component: _2c18ba04,
      name: "exam2"
    }, {
      path: "/forum",
      component: _6b7d9d2c,
      name: "forum"
    }, {
      path: "/config/course",
      component: _d5e8d73c,
      name: "config-course"
    }, {
      path: "/config/user",
      component: _c50f705c,
      name: "config-user"
    }, {
      path: "/exam/addexam",
      component: _b80b96e8,
      name: "exam-addexam"
    }, {
      path: "/exam/addQuestions",
      component: _38615de0,
      name: "exam-addQuestions"
    }, {
      path: "/exam/exam1_student",
      component: _3181813a,
      name: "exam-exam1_student"
    }, {
      path: "/exam/exam1_teacher",
      component: _08199f61,
      name: "exam-exam1_teacher"
    }, {
      path: "/exam/result",
      component: _b0c917fe,
      name: "exam-result"
    }, {
      path: "/exam/rules",
      component: _8751a27a,
      name: "exam-rules"
    }, {
      path: "/exam/studentexamtable",
      component: _70388898,
      name: "exam-studentexamtable"
    }, {
      path: "/exam/teacherexamtable",
      component: _57126651,
      name: "exam-teacherexamtable"
    }, {
      path: "/user/admin",
      component: _4e3105ef,
      name: "user-admin"
    }, {
      path: "/user/audit",
      component: _5861787b,
      name: "user-audit"
    }, {
      path: "/user/staff",
      component: _8e8cd600,
      name: "user-staff"
    }, {
      path: "/user/teacher",
      component: _44ea8b02,
      name: "user-teacher"
    }, {
      path: "/",
      component: _7dc00f46,
      name: "index"
    }],

    fallback: false
  })
}
