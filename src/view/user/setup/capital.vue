<template>
	<div class="captialDiv">
		<div class="header">
			<div class="fanhui" @click="goOut()">
				<img src="static/common/fanhui.png"/>
			</div>
			设置资金密码
		</div>
		
		<div class="captitalfrom">
			<div>
				<input  v-model="myTel" type="tel" maxlength="11" placeholder="请输入手机号"/>
			</div>
			<div>
				<input  v-model="yzm" type="tel" maxlength="6" placeholder="短信验证" style="width: 70%;"/>
				<button class="hqyzm" :disabled="isdisabled" @click="fsyzm()">{{btntext}}</button>
			</div>
			<div>
				<input maxlength="6" v-model="pwd" type="password" placeholder="请输入6位数字密码" />
			</div>
			<div>
				<input  v-model="qrpwd" type="password" placeholder="确认密码" />
			</div>
			<button :disabled="isdisable" class="surebtn" @click="surebtn()">确定</button>
		</div>
		<new-slots style='top: 3rem;' ref='al' >
			<p slot='main'>{{AlertMain}}</p>
		</new-slots>
	</div>
</template>

<script>
	import {getbackpwd,getYzm} from '@/api/user/userAPI' 
	import newSlots from '@/components/solts'
	export default{
		name:'capital',
		components:{
			newSlots
		},
		data(){
			return{
				AlertMain:'',  //弹窗内容
				btntext:'获取验证码',
				time:'',
				myTel:'', //手机号,
				pwd:'',//密码,,
				yzm:'', //验证码
				qrpwd:'', //确认密码
				isdisabled:false,
				isdisable:false,
			}
		},
		methods:{
			goOut(){
				this.$router.back(-1)
			},
			fsyzm(){
				let reg=/^((13|14|15|17|18)[0-9]{1}\d{8})$/;
				
				if(this.myTel==''){
					this.AlertMain = '请填写手机号';
					this.$refs.al.isShows();
				}else if(!reg.test(this.myTel)){
					this.AlertMain = '请输入正确的手机号';
					this.$refs.al.isShows();
				} else{
					this.time = 60;
					this.timer();
					getYzm(this.myTel).then(res=>{
					})
					return;
				}
			},
			timer(){
				if(this.time>0){
					this.time--;
					this.btntext = this.time+"s后重新获取"
					this.isdisabled=true;
					setTimeout(this.timer, 1000);
				}else{
					this.time = 0;
					this.btntext='发送验证码';
					this.isdisabled=false;
				}
			},
			surebtn(){
				var reg=/^((13|14|15|17|18)[0-9]{1}\d{8})$/;
				let rag =/^\d{6}\b/;
				if(this.myTel==''||!reg.test(this.myTel)){
					this.AlertMain = '请输入正确的手机号';
					this.$refs.al.isShows();
					return;
				}else if(this.yzm==''||this.yzm.length!=6){
					this.AlertMain = '请输入验证码的正确位数';
					this.$refs.al.isShows();
					return ;
				}else if(!rag.test(this.pwd)){
					this.AlertMain = '请输入6位数字密码';
					this.$refs.al.isShows();
					return;
				}else if(this.qrpwd!=this.pwd){
					this.AlertMain = '您输入的两次密码不一致';
					this.$refs.al.isShows();
					return ;
				}else{
					this.isdisable = true
					setTimeout(() => {
						this.isdisable = false
					}, 3000)
					getbackpwd(this.myTel,this.pwd,this.yzm,1).then(res=>{
						if(res.data.code == '0'){
							this.AlertMain = '设置成功';
							this.$refs.al.isShows();
							this.$router.push({
								path:'home/user'
							})
						}else{
							this.AlertMain = res.data.msg;
							this.$refs.al.isShows();
						}
					})
				}
			}
		}
	}
</script>

<style scoped="scoped">
	.captialDiv{
		position: absolute;
		height: 100%;
		top:0;
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
	.captitalfrom{
		width: 6.4rem;
		height: auto;
		margin: 0.5rem auto;
	}
	.captitalfrom >div{
		height: 0.88rem;
		border-bottom: 0.01rem solid #3e444c;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.captitalfrom >div >input{
		height: 95%;
		width: 100%;
		float: left;
		border: none;
		outline: none;
		background-color: #1f232d;
		color: #FFFFFF;
	}
	.surebtn{
		width: 5.5rem;
		height: 0.88rem;
		border-radius: 0.4rem;
		margin:0.5rem auto;
		display: block;
		outline: none;
		border: none;
		background-color: #d1a26b;
		color: #FFFFFF;
		text-align: center;
		line-height: 0.88rem;
		font-size: 0.34rem;
	}
	.hqyzm{
		color: #d1a26b;
		font-size: 0.24rem;
		border: none;
		outline: none;
		background-color: transparent;
	}
</style>
