<template>
	<div class="requestDiv">
		<div class="header">
			<div class="fanhui" @click="goOut()">
				<img src="static/common/fanhui.png"/>
			</div>
			注册
		</div> 
		
		<div class="requestfrom">
			<div>
				<input v-model="userName" type="text" placeholder="请输入用户名"/>
			</div>
			<div>
				<input maxlength="20" minlength="" v-model="pwd" type="password" placeholder="请输入6-20位数字和英文密码" />
			</div>
			<div>
				<input maxlength="11" v-model="myTel" type="tel" placeholder="请输入手机号" />
			</div>
			<div>
				<input style="width: 70%;"  v-model="yzm" type="tel" maxlength="6" placeholder="短信验证" />
				<button :disabled="fsdisable" class="hqyzm" @click="fsyzm()">{{btntext}}</button>
			</div>
			<button class="requests" :disabled="isdisable" @click="request()">注册</button>
		</div>
		<new-slots style='top:2.5rem'  ref='al' >
			<p slot='main'>{{AlertMain}}</p>
		</new-slots>
	</div>
</template>

<script>
	import {getYzm,userregister} from '@/api/user/userAPI'
	import newSlots from '@/components/solts'
	export default{
		name:'request',
		components:{
			newSlots
		},
		data(){
			return{
				AlertMain:'',  //弹窗内容
				myTel:'',//我的手机号
				btntext:'获取验证码',
				time:'',
				userName:'', //用户名,
				pwd:'',//密码,,
				yzm:'', //验证码
				isdisable:false,
				fsdisable:false,
				cCode:''
			}
		},
		created:function(){
			var cCord = localStorage.getItem('cCode')
			console.log(cCord)
			this.cCode = cCord
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
					})
					return;
				}
			},
			timer(){
				if(this.time>0){
					this.time--;
					this.btntext = this.time+"s后重新获取"
					this.fsdisable=true;
					setTimeout(this.timer, 1000);
				}else{
					this.time = 0;
					this.btntext='发送验证码';
					this.fsdisable=false;
				}
			},
			request(){
				console.log(this.cCode)
				var reg=/^((13|14|15|17|18)[0-9]{1}\d{8})$/;
				let regp =/^(?=.*[a-zA-Z]+)(?=.*[0-9]+)[a-zA-Z0-9]+$/;
				if(this.userName==''){
					this.AlertMain = '请输入用户名';
					this.$refs.al.isShows()
					return;
				}
//else if(this.userName.length<3){
// 					this.AlertMain = '用户名不能少于3位';
// 					this.$refs.al.isShows()
// 					return;
// 				}
else if(!regp.test(this.pwd) || this.pwd.length<6 ||this.pwd.length>20){
					this.AlertMain = '密码必须为6-20位的数字和字母的组合';
					this.$refs.al.isShows()
					return;
				}else if(this.myTel==''||!reg.test(this.myTel)){
						this.AlertMain = '请输入正确的手机号';
						this.$refs.al.isShows()
					return ;
				}else if(this.yzm==''||this.yzm.length!=6){
					this.AlertMain = '请输入正确的验证码';
					this.$refs.al.isShows()
					return ;
				}else{
					this.isdisable = true
					setTimeout(() => {
					 this.isdisable = false
					}, 3000)
					var cCode = localStorage.getItem('cCode')
					userregister(this.userName,this.pwd,this.myTel,this.yzm,cCode).then(res=>{
						if(res.data.code=='0'){
							var curtime = new Date().getTime()
							localStorage.setItem('username',JSON.stringify({username:res.data.data.userName,time:curtime}));
							localStorage.setItem('uid',JSON.stringify({uid:res.data.data.uid,time:curtime}));
							
							this.$router.push({
								name:'我的',
								query:{
									'username':res.data.data.userName
								}
							})
						}else if(res.data.code=='-1'){
							this.AlertMain = res.data.msg;
							this.$refs.al.isShows();
							return ;
						}
						
					})
				}
			}
		}
	}
</script>

<style scoped="scoped">
	.requestDiv{
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
	.requestfrom{
		width: 6.4rem;
		height: auto;
		margin: 0.5rem auto;
	}
	.requestfrom >div{
		height: 0.88rem;
		border-bottom: 0.01rem solid #3e444c;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.requestfrom >div >input{
		height: 95%;
		float: left;
		border: none;
		outline: none;
		background-color: #1f232d;
		color: #FFFFFF;
		width: 100%;
	}
	.requests{
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
		background-color: transparent;
		border: none;
		outline: none;
	}
</style>
