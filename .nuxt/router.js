import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'

const _7a3c5304 = () => interopDefault(import('..\\pages\\addStaff.vue' /* webpackChunkName: "pages_addStaff" */))
const _01996003 = () => interopDefault(import('..\\pages\\calendar.vue' /* webpackChunkName: "pages_calendar" */))
const _7e6cf99d = () => interopDefault(import('..\\pages\\chat.vue' /* webpackChunkName: "pages_chat" */))
const _d4fa50c2 = () => interopDefault(import('..\\pages\\dashboard.vue' /* webpackChunkName: "pages_dashboard" */))
const _07dba91e = () => interopDefault(import('..\\pages\\exam\\index.vue' /* webpackChunkName: "pages_exam_index" */))
const _2c18ba04 = () => interopDefault(import('..\\pages\\exam2.vue' /* webpackChunkName: "pages_exam2" */))
const _6b7d9d2c = () => interopDefault(import('..\\pages\\forum.vue' /* webpackChunkName: "pages_forum" */))
const _013f91fe = () => interopDefault(import('..\\pages\\config\\class.vue' /* webpackChunkName: "pages_config_class" */))
const _d5e8d73c = () => interopDefault(import('..\\pages\\config\\course.vue' /* webpackChunkName: "pages_config_course" */))
const _c50f705c = () => interopDefault(import('..\\pages\\config\\user.vue' /* webpackChunkName: "pages_config_user" */))
const _b0c917fe = () => interopDefault(import('..\\pages\\exam\\result.vue' /* webpackChunkName: "pages_exam_result" */))
const _8751a27a = () => interopDefault(import('..\\pages\\exam\\rules.vue' /* webpackChunkName: "pages_exam_rules" */))
const _64ec4556 = () => interopDefault(import('..\\pages\\exam\\student-exam.vue' /* webpackChunkName: "pages_exam_student-exam" */))
const _0d92ba54 = () => interopDefault(import('..\\pages\\exam\\student-exam-table.vue' /* webpackChunkName: "pages_exam_student-exam-table" */))
const _4e3105ef = () => interopDefault(import('..\\pages\\user\\admin.vue' /* webpackChunkName: "pages_user_admin" */))
const _5861787b = () => interopDefault(import('..\\pages\\user\\audit.vue' /* webpackChunkName: "pages_user_audit" */))
const _99956ef8 = () => interopDefault(import('..\\pages\\user\\faculty.vue' /* webpackChunkName: "pages_user_faculty" */))
const _31e35139 = () => interopDefault(import('..\\pages\\user\\faculty-head.vue' /* webpackChunkName: "pages_user_faculty-head" */))
const _949e97c6 = () => interopDefault(import('..\\pages\\user\\super-admin.vue' /* webpackChunkName: "pages_user_super-admin" */))
const _4d08affa = () => interopDefault(import('..\\pages\\exam\\admin\\table.vue' /* webpackChunkName: "pages_exam_admin_table" */))
const _23b65a97 = () => interopDefault(import('..\\pages\\exam\\student\\table.vue' /* webpackChunkName: "pages_exam_student_table" */))
const _3d4edec6 = () => interopDefault(import('..\\pages\\exam\\student\\result\\_id.vue' /* webpackChunkName: "pages_exam_student_result__id" */))
const _6121ec2a = () => interopDefault(import('..\\pages\\exam\\student\\rules\\_id.vue' /* webpackChunkName: "pages_exam_student_rules__id" */))
const _5df16db9 = () => interopDefault(import('..\\pages\\exam\\student\\take-assessment\\_id.vue' /* webpackChunkName: "pages_exam_student_take-assessment__id" */))
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
      path: "/calendar",
      component: _01996003,
      name: "calendar"
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
      path: "/config/class",
      component: _013f91fe,
      name: "config-class"
    }, {
      path: "/config/course",
      component: _d5e8d73c,
      name: "config-course"
    }, {
      path: "/config/user",
      component: _c50f705c,
      name: "config-user"
    }, {
      path: "/exam/result",
      component: _b0c917fe,
      name: "exam-result"
    }, {
      path: "/exam/rules",
      component: _8751a27a,
      name: "exam-rules"
    }, {
      path: "/exam/student-exam",
      component: _64ec4556,
      name: "exam-student-exam"
    }, {
      path: "/exam/student-exam-table",
      component: _0d92ba54,
      name: "exam-student-exam-table"
    }, {
      path: "/user/admin",
      component: _4e3105ef,
      name: "user-admin"
    }, {
      path: "/user/audit",
      component: _5861787b,
      name: "user-audit"
    }, {
      path: "/user/faculty",
      component: _99956ef8,
      name: "user-faculty"
    }, {
      path: "/user/faculty-head",
      component: _31e35139,
      name: "user-faculty-head"
    }, {
      path: "/user/super-admin",
      component: _949e97c6,
      name: "user-super-admin"
    }, {
      path: "/exam/admin/table",
      component: _4d08affa,
      name: "exam-admin-table"
    }, {
      path: "/exam/student/table",
      component: _23b65a97,
      name: "exam-student-table"
    }, {
      path: "/exam/student/result/:id?",
      component: _3d4edec6,
      name: "exam-student-result-id"
    }, {
      path: "/exam/student/rules/:id?",
      component: _6121ec2a,
      name: "exam-student-rules-id"
    }, {
      path: "/exam/student/take-assessment/:id?",
      component: _5df16db9,
      name: "exam-student-take-assessment-id"
    }, {
      path: "/",
      component: _7dc00f46,
      name: "index"
    }],

    fallback: false
  })
}
