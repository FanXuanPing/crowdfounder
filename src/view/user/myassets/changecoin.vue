<template>
	<div class="changectbDiv">
		<div class="header">
			<div class="fanhui" @click="goback()">
				<img src="static/common/fanhui.png"/>
			</div>
			充值{{coinclass}}
		</div>
		<div style="height: 0.25rem;background-color: #1a1c25;"></div>
		<div class="changes">
			<div  id="qrcode" ref="qrcode">
				<img src="" />
			</div>
			
			<textarea id="foo" v-model="addressd" class="changeText" >
				</textarea>
			<button class="copys" data-clipboard-target="#foo"  type="button" 
     v-clipboard:copy="addressd"
     v-clipboard:success="onCopy"
     v-clipboard:error="onError">复制</button>
			
			
			<div class="notice">
				<h4>充值须知</h4>
				<p>
					禁止向{{coinclass}}地址充值除{{coinclass}}之外的资产，否则将无法找回{{coinclass}}充值需要{{wangluo}}个网络确认才能到账{{coinclass}}最小充值金额为：{{minDepositAmount}}，少于此金额本平台将不会确认到账，请周知
				</p>
			</div>
		</div>
		<new-slots style='top: 3rem;' ref='al' >
			<p slot='main'>{{AlertMain}}</p>
		</new-slots>
	</div>
</template>

<script>
	// import Clipboard from 'clipboard'
	import newSlots from '@/components/solts'
	import {recharge,getcurrencyinfo} from '@/api/user/userAPI' //充值
	import QRCode from 'qrcodejs2'   //二维码生成
	export default{
		name:'changecoin',
		components:{
			newSlots,
			QRCode
		},
		data(){
			return{
				AlertMain:'',  //弹窗内容
				addressd:'',
				coinclass:'',
				wangluo:'',
				minDepositAmount:''
			}
		},
		mounted(){
			this.recharge();
			this.getcurrencyinfo()
		},
		methods:{
			 onCopy: function (e) {
				 this.AlertMain = '复制成功';
				 this.$refs.al.isShows();
				},
				onError: function (e) {
					this.AlertMain = '复制失败';
					this.$refs.al.isShows();
			},
			goback(){
				this.$router.push({
					path:'/recharge'
				})
			},
			getcurrencyinfo(){
				getcurrencyinfo().then(res=>{
					console.log(res.data)
					for (var i = 0; i < res.data.data.length; i++) {
						if(this.coinclass == res.data.data[i].symbol){
							this.wangluo = res.data.data[i].confirmNum;
							this.minDepositAmount = res.data.data[i].minDepositAmount
						}
					}
				})
				},  
			recharge(){
				let uid =JSON.parse(localStorage.getItem('uid')).uid;
				let cid =sessionStorage.getItem('mycid');
				this.coinclass = sessionStorage.getItem('currencyName')
				if(uid==''||uid ==null){
					this.$router.push({
						path:'home/user'
					})
				}else if(cid==null||cid==''){
					this.$router.push({
						path:'/myassets'
					})
				}else{
					recharge(uid,cid).then(res=>{
						console.log(res.data)
						this.addressd =res.data.data
						this.qrcode();
					})
				}
			},
			qrcode () {
			let qrcode = new QRCode('qrcode', {  
				width: 100,  // 设置宽度 
				height: 100, // 设置高度
				// text: '2MzZVFjA1NWveK7fnGnqzombGZoBEjGBAwf'
				text:this.addressd
			})  
			},
			
		}
	}
</script>

<style scoped="scoped">
	.changectbDiv{
		position: absolute;
		height: 100%;
		top:0;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: #1f222d;
	}
	.header{
		background-color: #1f222c;
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
	.changes{
		background-color: #1f222d;
		border: 0.01rem solid transparent;
		box-sizing: border-box;
	}
	.ewm{
		width: 2.42rem;
		height: 2.42rem;
		border: 0.01rem solid #CCCCCC;
		margin: 0.73rem auto 0.4rem auto;
		
	}
	.changeText{
		display: block;
		width: 80%;
		margin-top: 0.25rem;
		color: #FFFFFF;
		line-height: 0.4rem;
		font-size: 0.25rem;
		text-align: center;
		letter-spacing: 0.01rem;
		padding:  0 0.5rem;
		word-break:break-all;
		background-color: transparent;
		border: none;
		outline: none;
	}
	.copys{
		display: block;
		width: 1.2rem;
		height: 0.6rem;
		line-height: 0.6rem;
		text-align: center;
		color: #FFFFFF;
		border: none;
		outline: none;
		background-color: #474b5e;
		margin: auto;
		margin-top: 0.4rem;
	}
	.notice{
		padding: 0 0.4rem;
		color: #FFFFFF;
		font-size: 0.3rem;
		margin: 0.8rem 0;
	}
	.notice >h4{
		font-size: 0.22rem;
		margin-bottom: 0.35rem;
	}
	.notice > p{
		font-size: 0.2rem;
		line-height: 0.4rem;
	}
	
</style>
<style>
	#qrcode{
		height: 2.4rem;
		margin-top: 1rem;
		position: relative;
	}
	#qrcode > img{
		margin: auto;
		position: absolute;
		left: 50%;
		width: 2.4rem;
		height: 2.5rem;
		margin-left: -1.2rem;
	}
</style>
