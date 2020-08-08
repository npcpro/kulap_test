import Vue    from 'vue'
import Router from 'vue-router'
import lnc    from './views/js/include'
Vue.use(Router)

const beforeEnter = async (to,from, next) => {
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

// const afterEach = async (to, from, next) => {
//   console.log('this afterEach enter');
//   next()

// }

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: () => import('./views/welcome'),
    },
	  {
      path: '/dashboard',
      name: 'Dash Board',
      component: () => import('./views/dashboard'),
			beforeEnter
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('./views/users/login'),
    },
    {
      path: '/forgotpassword',
      name: 'Forgot Password',
      component: () => import('./views/users/forgotpassword'),
      // beforeEnter
    },
	  {
      path: '/updatenewpassword',
      name: 'Update New Password',
      component: () => import('./views/users/updatenewpassword'),
      // beforeEnter
    },
		
    {
      path: '/register',
      name: 'Register',
      component: () => import('./views/users/register'),
      // beforeEnter
    },
	  {
      path: '/waitactivate',
      name: 'Wait Activate',
      component: () => import('./views/users/waitactivate'),
      // beforeEnter
    },
		/////////////////// start user /////////////////////////////
	  {
      path: '/user/account',
      name: 'User Account',
      component: () => import('./views/users/account'),
      beforeEnter
    },
		{
      path: '/user/profile',
      name: 'User Profile',
      component: () => import('./views/users/profile'),
      beforeEnter
    },
	  {
      path: '/user/logs',
      name: 'User Logs',
      component: () => import('./views/users/logs'),
      beforeEnter
    },
		/////////////////// end user ////////////////////////
		////////////////// start ordersold //////////////////
		{
      path: '/ordersold/history/:owner(\\w{20,30})',
      name: 'Sold History',
      component: () => import('./views/ordersold/History'),
      beforeEnter
    },
		{
      path: '/ordersold/error/:owner(\\w{20,30})',
      name: 'Sold Error',
      component: () => import('./views/ordersold/Error'),
      beforeEnter
    },
		////////////////// end ordersold ////////////////////
		/////////////////// start store /////////////////////
	  {
      path: '/stores/settings/autotrack',
      name: 'Store Setting Auto track',
      component: () => import('./views/settings/Autotrack'),
      beforeEnter
    },
		{
      path: '/stores/settings/ebayadditem',
      name: 'Store Setting Additem',
      component: () => import('./views/settings/Ebayadditem'),
      beforeEnter
    },
	  {
      path: '/stores/settings/ebaytemplate',
      name: 'Store Setting eBay Template',
      component: () => import('./views/settings/Ebaytemplate'),
      beforeEnter
    },
	  {
      path: '/stores/settings/ebayaccount',
      name: 'Store Setting eBay Token',
      component: () => import('./views/settings/Ebayaccount'),
      beforeEnter
    },
	  {
      path: '/stores/settings/ebayleavefeedback',
      name: 'Store Setting Leave feedback message',
      component: () => import('./views/settings/Ebayleavefeedback'),
      beforeEnter
    },
		{
      path: '/stores/settings/ebaymessage',
      name: 'Store Setting Order confirmation message',
      component: () => import('./views/settings/Ebaymessage'),
      beforeEnter
    },
				{
      path: '/stores/settings/ebaycr',
      name: 'Store Setting Order cancel message',
      component: () => import('./views/settings/Ebaycr'),
      beforeEnter
    },
				{
      path: '/stores/settings/ebaycr3',
      name: 'Store Setting Shipping restricted message',
      component: () => import('./views/settings/Ebaycr3'),
      beforeEnter
    },
		{
      path: '/stores/settings/price',
      name: 'Store Setting Item Price',
      component: () => import('./views/settings/Price'),
      beforeEnter
    },
		{
      path: '/stores/settings/ebayaddress',
      name: 'Store Setting Billing address',
      component: () => import('./views/settings/Ebayaddress'),
      beforeEnter
    },
		///////////////// end store ///////////////////////

			  {
      path: '/stores/manage/',
      name: 'Manage Store',
      component: () => import('./views/managestore'),
      beforeEnter
    },
		 {
      path: '/user/balance/',
      name: 'Balance',
      component: () => import('./views/balance'),
      beforeEnter
    },
		//  {
    //   path: '/user/profile',
    //   name: 'User Profile',
    //   component: () => import('./views/users/profile'),
    //   beforeEnter
    // },

		/////////////////// end store ///////////////////////////////
    {
      path: '*',
      name: 'Not found',
      component: () => import('./views/404'),
    },
  ]
})



export default router
