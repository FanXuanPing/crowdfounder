<template>
	<div class="userDiv">
		<div v-if="islogin">
			<div class="userHead">
				<img src="/static/common/user/wode@2x.png" style="width: 0.32rem;height: 0.36rem;"/>
				<span class="userTel">{{username}}</span>
				<!-- <div class="tuichu" @click="tuichu">
				</div> -->
			</div>
			<div class="userblock" @click="gomyassets()">
				<img src="/static/common/user/zichan@2x.png"/>
				我的资产
				<img class="userR" src="/static/common/user/gengduo.png"/>
			</div>
			<div class="userblock" @click="gomyolders()">
				<img src="/static/common/user/dingdan@2x.png"/>
				我的订单
				<img class="userR"  src="/static/common/user/gengduo.png"/>
			</div>
			<div class="userblock" @click="gocheckbill()">
				<img src="/static/common/user/qiana.png"/>
				我的账单
				<img class="userR"  src="/static/common/user/gengduo.png"/>
			</div>
			<div class="userblock" @click="gosetup()">
				<img src="/static/common/user/shezhi@2x.png"/>
				设置
				<img class="userR"  src="/static/common/user/gengduo.png"/>
			</div>
		</div>
		<div class="wellLogin" v-if="!islogin">
			<div class="header">
				<div class="fanhui" @click="goBack()">
					<img src="/static/common/fanhui.png"/>
				</div>
				<!-- <span class="denglu">登录</span> -->
				<!-- <span class="request" @click="toRequest()">注册</span> -->
			</div>
			
			<div class="loginS">欢迎登录</div>
			 
			<div class="loginTel">
				<input type="text" v-model="username" placeholder="请输入用户名"/>
			</div>
			<div class="loginYzm">
				<input maxlength="20" v-model="pwd" type="password" placeholder="请输入密码"/>
				<button class="fsyzm" @click="forget()">{{btntext}}</button>
			</div>
			<button :disabled="isdisable" class="land" @click="userLogin()">登录</button>
			<button class="request" @click="toRequest()">注册</button>
		</div>
		<new-slots style='top: 3rem;' ref='al' >
			<p slot='main'>{{AlertMain}}</p>
		</new-slots>
		

		
	</div>
</template>

<script>
	import {getYzm,userLogin} from "@/api/user/userAPI";
	import newSlots from '@/components/solts'
	export default{
		name:'user',
		components:{
			newSlots
		},
		data(){
			return{
				// isAlert:false, // 是否显示弹窗
				AlertMain:'',  //弹窗内容
				myTel:"",
				disabled:false,
				time:0,
				massageS:false,//手机号错误提示
				btntext:"发送验证码",
				islogin:false,//未登录
				username:"",
				btntext:"忘记密码?",
				pwd:'',//密码
				isdisable:false,
				quits:false,  //退出弹窗
			}
		},
		mounted:function(){
			this.getUserName();
		},
		methods:{
			getUserName(){ //自动登录
				var UserName =JSON.parse(localStorage.getItem('username')).username;
				console.log(UserName)
				if(UserName){
					this.islogin =true;
					this.username = UserName;
				}else{
					this.islogin =false;
				}
				
			},
			gocheckbill(){ //我的账单
				this.$router.push({
					path:'/mybill'
				})
			},
			gomyassets(){
				this.$router.push({
					path:'/myassets' //我的资产
				})
			},
			gomyolders(){
				this.$router.push({
					path:'/myolders' //我的订单页面
				})
			},
			gosetup(){
				this.$router.push({
					path:'/setup' //设置界面
				})
			},
			goBack(){
				this.$router.back(-1)
			},
			userLogin(){
				let regp =/^(?=.*[a-zA-Z]+)(?=.*[0-9]+)[a-zA-Z0-9]+$/;
				if(this.username==''){
					this.AlertMain = '请输入正确的用户名';
					this.$refs.al.isShows()
					return false
				}else if(!regp.test(this.pwd) || this.pwd.length<6 ||this.pwd.length>20){
					this.AlertMain = '密码必须为6-20位的数字和字母的组合';
					this.$refs.al.isShows()
					return false
				}else{
					this.isdisable = true
					setTimeout(() => {
					this.isdisable = false
					}, 3000)
					userLogin(this.username,this.pwd).then(res=>{
						console.log(res.data)
						if(res.data.code=='0'){
							console.log(res.data)
							let curtime = new Date().getTime()
							localStorage.setItem('username',JSON.stringify({username:res.data.data.userName,time:curtime}));;
							localStorage.setItem('uid',JSON.stringify({uid:res.data.data.uid,time:curtime}));
							this.islogin =true;
							this.username = userName;
							console.log(res.data)
						}else if(res.data.code==-1){
							this.AlertMain = res.data.msg;
							this.$refs.al.isShows()
						}
					}).catch(err=>{
					})
				}
				
			},
			goBack(){
				this.$router.back(-1)
			},
			forget(){
				this.$router.push({
					path:'/forgetpwd'
				})
			},
			toRequest(){
				this.$router.push({
					path:'/request'
				})
			}
		}
	}
</script>

<style scoped="scoped">
	@import '../../style/user.css'
</style>

