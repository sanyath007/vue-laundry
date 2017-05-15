import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import About from '@/components/About'
import Contact from '@/components/Contact'
import Signup from '@/components/Signup'
import Signin from '@/components/Signin'
import DrapeList from '@/components/Drapes/drape-list'
import DrapeDetail from '@/components/Drapes/drape-detail'
import DrapeForm from '@/components/Drapes/drape-form'
import SetList from '@/components/Sets/set-list'
import SetDetail from '@/components/Sets/set-detail'
import SetForm from '@/components/Sets/set-form'
import BringList from '@/components/Brings/bring-list'
import BringForm from '@/components/Brings/bring-form'
import StaffList from '@/components/Staffs/staff-list'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/brings',
      name: 'BringList',
      component: BringList
    },
    {
      path: '/newbring',
      name: 'BringForm',
      component: BringForm
    },
    {
      path: '/drapes',
      name: 'DrapeList',
      component: DrapeList
    },
    {
      path: '/drape/:id',
      name: 'DrapeDetail',
      component: DrapeDetail
    },
    {
      path: '/drape/:id/edit',
      name: 'EditDrape',
      component: DrapeForm
    },
    {
      path: '/newdrape',
      name: 'NewDrape',
      component: DrapeForm
    },
    {
      path: '/sets',
      name: 'SetList',
      component: SetList
    },
    {
      path: '/set/:id',
      name: 'SetDetail',
      component: SetDetail
    },
    {
      path: '/set/:id/edit',
      name: 'EditSet',
      component: SetForm
    },
    {
      path: '/newset',
      name: 'NewSet',
      component: SetForm
    },
    {
      path: '/staffs',
      name: 'StaffList',
      component: StaffList
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/contact',
      name: 'Contact',
      component: Contact
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    }
  ]
})
