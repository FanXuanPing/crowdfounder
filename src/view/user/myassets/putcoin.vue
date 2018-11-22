
<!-- 提现 -->
<template>
	<div class="putcoin">
		<div class="putDiv">
			<div>
				<div class="header">
					<div class="fanhui" @click="goback()">
						<img src="/static/common/fanhui.png"/>
					</div>
					提币
				</div>
				<div class="putTop">
					<div class="coinTit">{{currencyName}}</div>
					<p>可用</p>
					<span>{{available}}</span>
				</div>
				<div style="height: 0.25rem;background-color: #1c1e28;"></div>
			</div>
			
			
			<div class="putinfo">
				<div class="putlist">
					<b>提币地址</b>
					<div>
						<input v-model="address" type="text" placeholder="输入或长按黏贴地址"/>
					</div>
				</div>
				<div class="putlist">
					<b>提币数量</b>
					<div style="position: relative;">
						<input v-model="amount" type="number" id="amount"/>
						<button class="coinall" @click="coinall()">全部</button>
					</div>
				</div>
				<div class="putlist">
					<b>手续费</b>
					<div style="position: relative;">
						<input v-model="fee" type="number" disabled="disabled"/>
					</div>
				</div>
				<div class="putlist">
					<b>资金密码</b>
					<div>
						<input v-model="pwd" type="password" placeholder="请输入资金密码"/>
					</div>
				</div>
				<p style="font-size: 0.24rem;text-align: center;color: #eab97f;margin-top: 0.3rem;">友情提示：请检查提币地址，如若错误概不负责</p>
				<button class="putbut" @click="putbtn()">提币</button>
			</div>
			
			
			
			<new-slots style='top: 3rem;' ref='al' >
				<p slot='main'>{{AlertMain}}</p>
			</new-slots>
		</div>
	</div>
</template>

<script>
	import {getuserassetsbyid,withdraw,getcurrencyinfo,validaddress} from '@/api/user/userAPI'
	import newSlots from '@/components/solts'
	export default{
		name:'putcoin',
		components:{
			newSlots
		},
		data(){
			return{
				AlertMain:'',  //弹窗内容
				currencyName:'', //币种名称
				available:'', //可用
				address:'',
				amount:'',
				fee:'',
				pwd:'',
				minWithdrawAmount:'' //最小提现数量
			}
		},
		mounted:function(){
			this.putC();
			
		},
		methods:{
			goback(){
				this.$router.push({
					path:'/recharge'
				})
			},
			getcurrencyinfo(){
				getcurrencyinfo().then(res=>{
					for (var i = 0; i < res.data.data.length; i++) {
						if(this.currencyName == res.data.data[i].symbol){
							this.fee= (res.data.data[i].withdrawFee).toFixed(8);
							this.minWithdrawAmount =(res.data.data[i].minWithdrawAmount);
							document.getElementById('amount').setAttribute('placeholder','最小提现数量为'+this.minWithdrawAmount)
						}
					}
				})
			},
			putC(){
				let uid =JSON.parse(localStorage.getItem('uid')).uid;
				let mycid = sessionStorage.getItem('mycid');
				if(uid == null){
					this.AlertMain = '您未登录';
					this.$refs.al.isShows();
					this.$router.push({
						path:'/home/user'
					})
				}else if(mycid==null){
					this.$router.push({
						path:'/myassets'
					})
				}else{
					getuserassetsbyid(uid,mycid).then(res=>{
						this.currencyName = res.data.data.currencyName;
						this.available =(res.data.data.available).toFixed(8);
						this.getcurrencyinfo()
					})
				}
			},
			coinall(){ //点击全部
				
				if((this.available - this.fee)<0){
					this.amount = 0.00000000;
				}else{
					this.amount =(this.available - this.fee).toFixed(8);
				}
			},
			//点击提币
			putbtn(){
				if(this.address==''){
					this.AlertMain = '请输入提币地址';
					this.$refs.al.isShows();
				}else if(this.amount==''){
					this.AlertMain = '请输入提币数量';
					this.$refs.al.isShows();
				}else if(this.amount>=(this.available - this.fee)){
					this.AlertMain = '您已超出最大限额';
					this.$refs.al.isShows();
				}else if(this.amount<this.minWithdrawAmount){
					this.AlertMain = '最小提现数量为'+this.minWithdrawAmount;
					this.$refs.al.isShows();
				}else if(this.fee==''){
					this.AlertMain = '请输入手续费';
					this.$refs.al.isShows();
				}else if(this.pwd==''||this.pwd.length<6||this.pwd.length>20){
					this.AlertMain = '请输入密码的正确位数';
					this.$refs.al.isShows();
				}else{
					let uid =JSON.parse(localStorage.getItem('uid')).uid;
					let cid = sessionStorage.getItem('mycid')
					validaddress(cid,this.address).then(res=>{
						if(res.data.data=='true'){
							let address = this.address;
							let amount = this.amount;
							let fee = this.fee;
							let pwd =this.pwd;
							withdraw(uid,cid,address,amount,fee,pwd).then(res=>{
								console.log(res.data);
								if(res.data.code == 0){
									this.$router.push({
										path:'/recharge'
									})
								}else if(res.data.code == -1){
									this.AlertMain = res.data.msg;
									this.$refs.al.isShows();
								}
								
							})
						}else if(res.data.data=='false'){
							this.AlertMain = '提现地址错误';
							this.$refs.al.isShows();
						}
					})
// 					
				}
				
			}
			
		}
	}
</script>

<style scoped="scoped">
	.putcoin{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgb(31,34,45) ;
		display: flex;
		flex-direction: column;
	}
	.putDiv{
		background-color: rgb(31,34,45) ;
		height: auto;
		overflow-y: auto;
	}
	.header{
		background-color: rgb(31,34,45);
		position: fixed;
		width: 100%;
		top: 0;
		left: 0;
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
	.putTop{
		height: 2.5rem;
		margin-top: 0.9rem;
		padding-left: 0.35rem;
		color: #FFFFFF;
		font-size: 0.4rem;
	}
	.putTop >p{
		color: #999999;
		font-size: 0.24rem;
	}
	.putTop >span{
		font-size: 0.26rem;
	}
	.coinTit{
		color: #ebba7b;
		font-size: 0.4rem;
		height: 1.2rem;
		line-height: 1.2rem;
	}
	.putinfo{
		flex: 1;
		padding-left: 0.35rem;
	}
	.putlist{
		height: 1.6rem;
		border-bottom: 0.01rem solid #3e444c;
		color: #FFFFFF;
		font-size: 0.4rem;
	}
	.putlist > b{
		font-size: 0.26rem;
		letter-spacing: 0.01rem;
		display: block;
		height: 1rem;
		line-height: 1rem;
	}
	.putlist > div{
		width: 100%;
		height: 0.6rem;
	}
	.putlist > div >input{
		width: 100%;
		display: block;
		height: 0.55rem;
		outline: none;
		border: none;
		color: #FFFFFF;
		background-color: transparent;
	}
	.putbut{
		display: block;
		width: 6.9rem;
		height: 0.9rem;
		background-color: #3e4857;
		text-align: center;
		line-height: 0.9rem;
		font-size: 0.32rem;
		outline: none;
		border: none;
		color: #FFFFFF;
		margin-top: 0.3rem;
	}
	.coinall{
		position: absolute;
		right: 0.3rem;
		top: 0.15rem;
		font-size: 0.26rem;
		color: #FFFFFF;
		border: none;
		outline: none;
		background-color: transparent;
	}
</style>
