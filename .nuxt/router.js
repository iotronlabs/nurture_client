import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'

const _1ece0175 = () => interopDefault(import('..\\pages\\addStaff.vue' /* webpackChunkName: "pages_addStaff" */))
const _b3a9e318 = () => interopDefault(import('..\\pages\\calendar.vue' /* webpackChunkName: "pages_calendar" */))
const _06b1888e = () => interopDefault(import('..\\pages\\chat.vue' /* webpackChunkName: "pages_chat" */))
const _f9b21164 = () => interopDefault(import('..\\pages\\dashboard.vue' /* webpackChunkName: "pages_dashboard" */))
const _1cf6990d = () => interopDefault(import('..\\pages\\exam\\index.vue' /* webpackChunkName: "pages_exam_index" */))
const _6a40f22d = () => interopDefault(import('..\\pages\\exam2.vue' /* webpackChunkName: "pages_exam2" */))
const _286a274a = () => interopDefault(import('..\\pages\\forum.vue' /* webpackChunkName: "pages_forum" */))
const _c27a2bda = () => interopDefault(import('..\\pages\\config\\course.vue' /* webpackChunkName: "pages_config_course" */))
const _2bbb55c3 = () => interopDefault(import('..\\pages\\config\\user.vue' /* webpackChunkName: "pages_config_user" */))
const _43ce368a = () => interopDefault(import('..\\pages\\exam\\addexam.vue' /* webpackChunkName: "pages_exam_addexam" */))
const _1cdb337e = () => interopDefault(import('..\\pages\\exam\\addQuestions.vue' /* webpackChunkName: "pages_exam_addQuestions" */))
const _47bddbae = () => interopDefault(import('..\\pages\\exam\\exam1_student.vue' /* webpackChunkName: "pages_exam_exam1_student" */))
const _9a8d9f60 = () => interopDefault(import('..\\pages\\exam\\exam1_teacher.vue' /* webpackChunkName: "pages_exam_exam1_teacher" */))
const _35de81f2 = () => interopDefault(import('..\\pages\\exam\\result.vue' /* webpackChunkName: "pages_exam_result" */))
const _5d1bc29c = () => interopDefault(import('..\\pages\\exam\\rules.vue' /* webpackChunkName: "pages_exam_rules" */))
const _0f1b9d49 = () => interopDefault(import('..\\pages\\exam\\studentexamtable.vue' /* webpackChunkName: "pages_exam_studentexamtable" */))
const _141509fc = () => interopDefault(import('..\\pages\\exam\\teacherexamtable.vue' /* webpackChunkName: "pages_exam_teacherexamtable" */))
const _634bf5de = () => interopDefault(import('..\\pages\\user\\admin.vue' /* webpackChunkName: "pages_user_admin" */))
const _6d7c686a = () => interopDefault(import('..\\pages\\user\\audit.vue' /* webpackChunkName: "pages_user_audit" */))
const _6456f622 = () => interopDefault(import('..\\pages\\user\\staff.vue' /* webpackChunkName: "pages_user_staff" */))
const _7f093b31 = () => interopDefault(import('..\\pages\\user\\teacher.vue' /* webpackChunkName: "pages_user_teacher" */))
const _416d478c = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */))

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
      component: _1ece0175,
      name: "addStaff"
    }, {
      path: "/calendar",
      component: _b3a9e318,
      name: "calendar"
    }, {
      path: "/chat",
      component: _06b1888e,
      name: "chat"
    }, {
      path: "/dashboard",
      component: _f9b21164,
      name: "dashboard"
    }, {
      path: "/exam",
      component: _1cf6990d,
      name: "exam"
    }, {
      path: "/exam2",
      component: _6a40f22d,
      name: "exam2"
    }, {
      path: "/forum",
      component: _286a274a,
      name: "forum"
    }, {
      path: "/config/course",
      component: _c27a2bda,
      name: "config-course"
    }, {
      path: "/config/user",
      component: _2bbb55c3,
      name: "config-user"
    }, {
      path: "/exam/addexam",
      component: _43ce368a,
      name: "exam-addexam"
    }, {
      path: "/exam/addQuestions",
      component: _1cdb337e,
      name: "exam-addQuestions"
    }, {
      path: "/exam/exam1_student",
      component: _47bddbae,
      name: "exam-exam1_student"
    }, {
      path: "/exam/exam1_teacher",
      component: _9a8d9f60,
      name: "exam-exam1_teacher"
    }, {
      path: "/exam/result",
      component: _35de81f2,
      name: "exam-result"
    }, {
      path: "/exam/rules",
      component: _5d1bc29c,
      name: "exam-rules"
    }, {
      path: "/exam/studentexamtable",
      component: _0f1b9d49,
      name: "exam-studentexamtable"
    }, {
      path: "/exam/teacherexamtable",
      component: _141509fc,
      name: "exam-teacherexamtable"
    }, {
      path: "/user/admin",
      component: _634bf5de,
      name: "user-admin"
    }, {
      path: "/user/audit",
      component: _6d7c686a,
      name: "user-audit"
    }, {
      path: "/user/staff",
      component: _6456f622,
      name: "user-staff"
    }, {
      path: "/user/teacher",
      component: _7f093b31,
      name: "user-teacher"
    }, {
      path: "/",
      component: _416d478c,
      name: "index"
    }],

    fallback: false
  })
}
