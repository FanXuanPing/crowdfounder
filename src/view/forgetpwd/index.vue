<template>
	<div class="pwdDiv">
			<div class="header">
				<div class="fanhui" @click="goOut()">
					<img src="static/common/fanhui.png"/>
				</div>
				找回密码
			</div> 
			<div class="forgetfrom">
				<div>
					<input v-model="myTel" type="tel" maxlength="11" placeholder="请输入手机号"/>
				</div>
				<div>
					<input v-model="yzm" type="tel" maxlength="6" placeholder="短信验证"/>
					<button :disabled="isdisabled" @click="fsyzm()">{{btntext}}</button>
				</div>
				<button @click="nextstep()">下一步</button>
			</div>
			
			<new-slots style='top: 3rem;' ref='al' >
				<p slot='main'>{{AlertMain}}</p>
			</new-slots>
			
			
	</div>
</template>

<script>
	import {getYzm} from '@/api/user/userAPI'
	import newSlots from '@/components/solts'
	export default{
		name:'forgetpwd',
		components:{
			newSlots
		},
		data(){
			return{
				AlertMain:'',  //弹窗内容
				btntext:'获取验证码',
				time:'',//时间
				myTel:'',
				isdisabled:false,
				yzm:'',
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
					this.$refs.al.isShows()
				}else if(!reg.test(this.myTel)){
					this.AlertMain = '请填写正确的手机号';
					this.$refs.al.isShows()
				}else{
					this.time = 60;
					this.timer();
					getYzm(this.myTel).then(res=>{
						console.log(res.data)
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
			nextstep(){
				// 点击下一步
				let reg=/^((13|14|15|17|18)[0-9]{1}\d{8})$/;
				if(this.myTel==''||!reg.test(this.myTel)){
					this.AlertMain = '请填写正确的手机号';
					this.$refs.al.isShows()
				}else if(this.yzm.length!=6){
					this.AlertMain = '请输入正确的验证码位数';
					this.$refs.al.isShows()
				}else{
					//进行下一步请求
					sessionStorage.setItem('tel',this.myTel);
					sessionStorage.setItem('yzm',this.yzm)
					this.$router.push({
						path:'/newpwd'
					})
				}
			},
			
		}
	}
</script>

<style scoped="scoped">
	@import '../../style/forgetpwd.css'
</style>
