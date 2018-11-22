<template>
	<div class="newpwd">
		<div class="header">
			<div class="fanhui" @click="goOut()">
				<img src="static/common/fanhui.png"/>
			</div>
			设置新密码
		</div>
		
		<div class="newfrom">
			<div>
				<input maxlength="20" type="password" v-model="newpwd" placeholder="请输入6-20位数字和字母新密码"/>
			</div>
			<div>
				<input  maxlength="20" type="password" v-model="newspwd" placeholder="请再次输入6-20位数字和字母新密码" />
			</div>
			<button @click="queren()">确认</button>
		</div>
	</div>
</template>

<script>
	import {getbackpwd} from '@/api/user/userAPI'
	export default{
		name:'newpwd',
		data(){
			return{
				newpwd:'',//设置新密码中的新密码
				newspwd:'' //设置新密码中的再次确认密码
			}
		},
		methods:{
			goOut(){
				this.$router.back(-1)
			},
			//设置新密码中的确认密码
			queren(){
				let regp =/^(?=.*[a-zA-Z]+)(?=.*[0-9]+)[a-zA-Z0-9]+$/;
				if(!regp.test(this.newpwd) || this.newpwd.length<6 ||this.newpwd.length>20){
					alert("密码必须为6-20位的数字和字母的组合");
					return false;
				}else if(this.newspwd==''){
					alert('请再次输入密码')
				}else if(this.newpwd!=this.newspwd){
					alert('您输入的两次密码不一致')
				}else{
					//确认密码之后做该做的事情
					let myTel = sessionStorage.getItem('tel');
					let myYzm = sessionStorage.getItem('yzm')
					getbackpwd(myTel,this.newpwd,myYzm,0).then(res=>{
						if(res.data.code=='0'){
							localStorage.clear()
							this.$router.push({
								path:'/home/user'
							})
						}else{
							alert(res.data.msg)
						}
					})
				}
			}
		}
	}
</script>

<style scoped="scoped">
	.newpwd{
			position: absolute;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
			background-color: #1f222d;
		}
		.header{
			background-color: #1f232d;
			position: relative;
		}
		
		.fanhui{
			float: left;
			height: 100%;
			display: flex;
			justify-content: center;
			flex-direction: column;
			position: absolute;
			left: 0.3rem;
		}
		
		.fanhui img{
			width: 0.2rem;
		}
		
		.forgetfrom,.newfrom{
			width: 6.45rem;
			margin: 0.8rem auto;
			font-size: 0.26rem;
			color: #FFFFFF;
		}
		.forgetfrom >div,.newfrom >div{
			height: 0.9rem;
			border-bottom: 0.01rem solid #3e444c;
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
		.forgetfrom >div>input,.newfrom >div>input{
			display: block;
			width: 70%;
			height: 95%;
			border: none;
			outline: none;
			background-color: #1f222d;
			color: #FFFFFF;
		}
		
		.forgetfrom >div>button,.newfrom >div>button{
			color: #d1a26b;
			border: none;
			outline: none;
			background-color: transparent;
		}
		
		.forgetfrom > button,.newfrom > button{
			display: block;
			background-color: #d1a26b;
			width: 5.5rem;
			height: 0.85rem;
			text-align: center;
			margin: 0.45rem auto;
			line-height: 0.85rem;
			color: #FFFFFF;
			font-size: 0.3rem;
			border: none;
			outline: none;
			border-radius: 0.5rem;
		}
</style>
