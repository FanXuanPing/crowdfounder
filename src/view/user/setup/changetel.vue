<template>
	<div class="pwdDiv">
			<div class="header">
				<div class="fanhui" @click="goOut()">
					<img src="static/common/fanhui.png"/>
				</div>
				更改手机
			</div>
			<div class="forgetfrom">
				<div>
					<input v-model="myTel" type="tel" maxlength="11" placeholder="输入新手机号"/>
				</div>
				<div>
					<input v-model="yzm" type="tel" maxlength="6" placeholder="短信验证"/>
					<button :disabled="isdisabled" @click="fsyzm()">{{btntext}}</button>
				</div>
				<button :disabled="isdisable" @click="changetel()">确认更换</button>
			</div>
			
			<new-slots style='top: 3rem;' ref='al' >
				<p slot='main'>{{AlertMain}}</p>
			</new-slots>
			
			
	</div>
</template>

<script>
	import {updatemobile,getYzm} from '@/api/user/userAPI'
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
				isdisable:false
			}
		},
		methods:{
			
			goOut(){
				this.$router.back(-1)
			},
			fsyzm(){
				let reg=/^((13|14|15|17|18)[0-9]{1}\d{8})$/;
				if(this.myTel==''){
					this.AlertMain = '请输入手机号码';
					this.$refs.al.isShows();
					return false;
				}else if(!reg.test(this.myTel)){
					this.AlertMain = '请输入正确的手机号';
					this.$refs.al.isShows();
					return false;
				}else{
					this.time = 60;
					this.timer();
					getYzm(this.myTel).then(resp=>{
						
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
			changetel(){
				
				// 点击确认更换
				let reg=/^((13|14|15|17|18)[0-9]{1}\d{8})$/;
				if(this.myTel==''||!reg.test(this.myTel)){
					this.AlertMain = '请输入正确的手机号码';
					this.$refs.al.isShows();
					return false;
				}else if(this.yzm.length!=6){
					this.AlertMain = '请输入正确的验证码位数';
					this.$refs.al.isShows();
					return false;
				}else{
					//确认更换
					this.isdisable = true
					setTimeout(() => {
						this.isdisable = false
					}, 3000)
					updatemobile(this.myTel,this.yzm).then(res=>{
						if(res.data.code == '0'){
							this.AlertMain = res.data.data;
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
			},
			
		}
	}
</script>

<style scoped="scoped">
	@import "../../../style/forgetpwd.css"
</style>
