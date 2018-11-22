<template>
	<div class="wellLogin">
		<div class="header">
			<div class="fanhui" @click="goBack()">
				<img src="static/common/fanhui.png"/>
			</div> 
			<span>登录</span>
			<span class="request" @click="toRequest()">注册</span>
		</div>
		
		<div class="loginS">欢迎登录</div>
		
		<div class="loginTel">
			<input type="tel" v-model="username" placeholder="请输入用户名"/>
		</div>
		<div class="loginYzm">
			<input maxlength="20" v-model="pwd" type="password" placeholder="请输入密码"/>
			<button class="fsyzm" @click="forget()">{{btntext}}</button>
		</div>
		<div class="land" @click="userLogin()">登录</div>
	</div>
</template>

<script>
	import {userLogin} from '@/api/user/userAPI'
	export default{
		name:'login',
		data(){
			return{
				islogin:false,//未登录
				username:"",
				btntext:"忘记密码?",
				pwd:'',//密码
			}
		},
		methods:{
			userLogin(){
				let regp =/^(?=.*[a-zA-Z]+)(?=.*[0-9]+)[a-zA-Z0-9]+$/;
				if(this.username==''){
					alert('您的用户名为空');
					return false;
				}
				if(!regp.test(this.pwd) || this.pwd.length<6 ||this.pwd.length>20){
					alert("密码必须为6-20位的数字和字母的组合");
					return false;
				}else{
					userLogin(this.username,this.pwd).then(res=>{
						console.log(res.data)
						alert(res.data	.msg)
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
	.wellLogin{
		height: 100vh;
		background-color: #1f232d;
		color: #FFFFFF;
	}
	.header{
		background-color: #1f232d;
		position: relative;
		text-align: center;
		display: flex;
		justify-content: space-between;
		padding: 0 0.2rem;
	}
	
	.fanhui img{
		width: 0.2rem;
	}
	.loginS{
		font-size: 0.6rem;
		margin-top: 0.9rem;
		padding-left: 0.5rem;
		margin-bottom:1.3rem;
	}
	.land{
		width: 5.5rem;
		height: 0.88rem;
		margin: 0.5rem auto;
		background-color: rgb(209,162,107);
		text-align: center;
		line-height: 0.88rem;
		font-size: 0.3rem;
		border-radius: 0.5rem;
	}
	.request{
		font-size: 0.2rem;
	}
	.loginTel,.loginYzm{
		width: 6.34rem;
		height: 0.9rem;
		margin: 0 auto;
		border-bottom: 0.01rem solid rgb(62,68,76);
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	
	.loginTel>input,.loginYzm>input{
		border: none;
		height: 0.6rem;
		color: #FFFFFF;
		background-color: transparent;
		outline: none;
	}
	
	.fsyzm{
		color: rgb(209,162,107);
		background-color: transparent;
		border: none;
		outline: none;
	}
	
	.telmassage{
		width: 6.34rem;
	    margin: 0.15rem auto;
	    color: red;
	}
	
	
</style>
