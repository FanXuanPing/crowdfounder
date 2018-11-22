<template>
	<div class="changepwd">
		<div class="header">
			<div class="fanhui" @click="goOut()">
				<img src="static/common/fanhui.png"/>
			</div>
			修改密码
		</div>
		
		<div class="newfrom">
			<div>
				<input maxlength="20" type="password" v-model="oldpwd" placeholder="输入旧密码"/>
			</div>
			<div>
				<input  maxlength="20" type="password" v-model="newpossword" placeholder="输入新密码" />
			</div>
			<div>
				<input  maxlength="20" type="password" v-model="aginpwd" placeholder="再次输入新密码" />
			</div>
			<button @click="sure()">确定</button>
		</div>
		<new-slots style='top: 3rem;' ref='al' >
			<p slot='main'>{{AlertMain}}</p>
		</new-slots>
	</div>
</template>

<script>
	import {updatepwd} from '@/api/user/userAPI'
	import newSlots from '@/components/solts'
	export default{
		name:'changepwd',
		components:{
			newSlots
		},
		data(){
			return{
				AlertMain:'',  //弹窗内容
				oldpwd:'',//输入旧密码
				newpossword:'', //设置的新密码
				aginpwd:'' //再次输入的新密码
			}
		},
		methods:{
			goOut(){
				this.$router.back(-1)
			},
			//设置新密码中的确认密码
			sure(){
				let regp =/^(?=.*[a-zA-Z]+)(?=.*[0-9]+)[a-zA-Z0-9]+$/;
				if(this.oldpwd==''||this.oldpwd.length<6||this.oldpwd.length>20){
					this.AlertMain = '请输入旧密码的正确位数';
					this.$refs.al.isShows()
					return false;
				}else if(!regp.test(this.newpossword) || this.newpossword.length<6 ||this.newpossword.length>20){
					this.AlertMain = '新密码必须为6-20位的数字和字母的组合';
					this.$refs.al.isShows()
					return false;
				}else if(this.aginpwd==''){
					this.AlertMain = '请再次输入新密码';
					this.$refs.al.isShows()
					return false;
				}else if(this.aginpwd!=this.newpossword){
					this.AlertMain = '您两次输入的密码不一致';
					this.$refs.al.isShows()
					return false
				}else{
					//确认密码之后做该做的事情
					var uid =JSON.parse(localStorage.getItem('uid')).uid;
					this.isdisable = true
					setTimeout(() => {
					this.isdisable = false
					}, 3000)
					updatepwd(uid,this.oldpwd,this.newpossword).then(res=>{
						if(res.data.code == '0'){
							this.AlertMain = '修改成功';
							this.$refs.al.isShows()
							localStorage.clear()
							this.$router.push({
								path:'home/user'
							})
						}else if(res.data.code== '-1'){
							this.AlertMain = res.data.msg;
							this.$refs.al.isShows()
						}
					})
				}
			}
		}
	}
</script>

<style scoped="scoped">
	.changepwd{
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
