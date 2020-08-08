import Vue    from 'vue'
import Router from 'vue-router'
import lnc    from './include/include'
Vue.use(Router)

const beforeEnter = async (to,_, next) => {
		const rs_chklogin = lnc.chklogin()
		const loginUrl = (to.path === '/login')
    if(rs_chklogin && loginUrl){
      next('/dashboard')
		}else if(rs_chklogin || (!rs_chklogin && loginUrl) ){
       next()
    }else {
      next('/login')
    }
}

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('./views/users/login'),
    },
		
    {
      path: '/register',
      name: 'Register',
      component: () => import('./views/users/register'),
    },
	  {
      path: '/waitactivate',
      name: 'waitactivate',
      component: () => import('./views/users/waitactivate'),
    },
	  {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('./views/dashboard'),
      beforeEnter
    },
    {
      path: '*',
      name: 'Not found',
      component: () => import('./views/404'),
    },
  ]
})



export default router
