import Vue from 'vue'
import Router from 'vue-router'
//import HelloWorld from '@/components/HelloWorld'
import Home from "@/view/home"
import Index from "@/view/sy"
import Result from "@/view/result"
import User from "@/view/user"
import OpenPrize from "@/view/openprize" //开奖页面
import MyOlders from '@/view/user/myolder'//我的订单页面
import CrowdFound from '@/view/user/myolder/crowdfound'//我得订单页面众筹页面
import WaitPrize from '@/view/user/myolder/waitprize' // 我的订单页面等待开奖页面
import NoWinner from '@/view/user/myolder/nowinner' //我的订单页面未中奖页面
import Winner from '@/view/user/myolder/winner' //我的订单页面中奖界面
import MyAssets from '@/view/user/myassets'  //我的资产界面
import Recharge from '@/view/user/myassets/recharge' //充值界面
// import Login from '@/view/login'     //登录页面
import Request from '@/view/request' //注册界面
import ForgetPwd from '@/view/forgetpwd' //忘记密码界面
import NewPwd from '@/view/forgetpwd/newpwd' //找回密码页面
import SetUp from '@/view/user/setup'   //设置界面
import ChangePwd from '@/view/user/setup/changepwd'  //设置界面进入的修改密码界面
import ChangeTel from '@/view/user/setup/changetel'  //设置界面进入的更换手机号界面
import Captial from '@/view/user/setup/capital'   //设置界面进入的资金密码
import ChangeCoin from '@/view/user/myassets/changecoin' //充值界面
import MyBill from '@/view/user/mybill'    //我的账单界面 
import PutCoin from '@/view/user/myassets/putcoin' //提现
import Detail from '@/view/user/myassets/detail'   //充提记录明细
import SYone from '@/view/sy/shouye1'   //首页1
// import SYtwo from '@/view/sy/shouye2'

Vue.use(Router)

export default new Router({
	// mode:'history',
  routes: [
    {
      path: '/',
      redirect:'/home'
     },
		 {
			 path:'/home',
			 name:'home',
			 component:Home,
			 children:[
				 {
					 path:'',
					 redirect:'index'
				 },{
					 path:'index',
					 name:'首页',
					 component:Index
				 },{
					 path:'result',
					 name:'最新揭晓',
					 component:Result
				 },{
					 path:'user',
					 name:'我的',
					 component:User
				 }
				 
			 ]
		 },{
			 path:'/openprize:id',
			 name:'openprize',
			 component:OpenPrize
		 },
		 {
			 path:'/myolders',
			 name:'myolders',
			 component:MyOlders,
			 children:[
				 {
					 path:'',
					 redirect:'crowdfound'
				 },
				 {
					 path:'crowdfound',
					 name:'众筹中',
					 component:CrowdFound
				 },
				 {
					 path:'waitprize',
					 name:'等待开奖',
					 component:WaitPrize
				 },
				 {
					 path:'nowinner',
					 name:'未中奖',
					 component:NoWinner
				 },
				 {
					 path:'winner',
					 name:'中奖',
					 component:Winner
				 }
			 ]
		 },
		 {
			 path:'/myassets', //我的资产界面
			 name:'myassets',
			 component:MyAssets
		 },
		 {
			 path:'/recharge',
			 name:'recharge',
			 component:Recharge
		 },
// 		 {
// 			 path:"/login", //登录界面
// 			 name:'login',
// 			 component:Login
// 		 },
		 {
			 path:'/request',
			 name:'request',
			 component:Request
		 },
		 {
			 path:'/forgetpwd',//忘记密码界面
			 name:'forgetpwd',
			 component:ForgetPwd
		 },
		 {
			 path:'/newpwd', //设置新密码界面
			 name:'newpwd',
			 component:NewPwd
		 },
		 {
			 path:'/setup', //设置界面
			 name:'setup',
			 component:SetUp
		 },
		 {
			 path:'/changepwd',//修改密码界面
			 name:'changepwd',
			 component:ChangePwd
		 },
		 {
			 path:'/changetel', //更换手机号界面
			 name:'changetel',
			 component:ChangeTel
		 },
		 {
			 path:'/captial',//设置资金密码
			 name:'captial',
			 component:Captial
		 },
		 {
			 path:'/changecoin', //充值界面
			 name:'changecoin',
			 component:ChangeCoin
		 },
		 {
		 	path:'/detail', //充提明细
		 	name:'detail',
		 	component:Detail
		 },
		 {
			 path:'/putcoin',   //提现界面
			 name:'putcoin',
			 component:PutCoin
		 },
		 {
			 path:'/mybill', //我的订单
			 name:'mybill',
			 component:MyBill,
		 },
		 {
			 path:'/banner1',
			 name:'banner1',
			 component:SYone
		 },
// 		 {
// 			 path:'/banner2',
// 			 name:'banner2',
// 			 component:SYtwo
// 		 }
  ]
})



