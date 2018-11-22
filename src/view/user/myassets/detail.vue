<template>
	<!-- 充提记录的明细 -->
	<div class="detail">
		<div class="header">
			<div class="fanhui" @click="goback()">
				<img src="/static/common/fanhui.png"/>
			</div>
			明细
		</div>
		
		<div style="padding-left: 0.35rem;margin-top: 0.9rem;">
			<div class="detailList">
				<p>数量</p>
				<b>{{detailArr.number}}</b>
			</div>
			<div v-show="states" class="detailList">
				<p>手续费</p>
				<b>{{detailArr.serviceCharge}}</b>
			</div>
			<div class="detailList">
				<p>状态</p>
				<b>{{detailArr.state}}</b>
			</div>
			<div class="detailList">
				<p>时间</p>
				<b>{{detailArr.updateDate|formatDate}}</b>
			</div>
			<div v-show="states" class="detailList" style="height: auto;">
				<p>提现地址</p>
				<b style="word-break: break-all;word-wrap: break-word;padding-bottom: 0.2rem;padding-right: 0.2rem;">{{detailArr.address}}</b>
			</div>
			<div v-show="txidShow" class="detailList" style="height: auto;">
				<p>TXID</p>
				<p style="word-break: break-all;word-wrap: break-word;padding-bottom: 0.2rem;padding-right: 0.2rem;">{{detailArr.txid}}</p>
			</div>
		</div>
		
		
		
		
		
	</div>
</template>

<script>
	import {repaiddetail} from '@/api/user/userAPI'
	export default{
		name:'detail',
		data(){
			return{
				txidShow:true,
				states:true,
				rid:'',
				detailArr:[]
			}
		},
		filters: {
		formatDate: function (value) {
		let date = new Date(value);
		let y = date.getFullYear();
		let MM = date.getMonth() + 1;
		MM = MM < 10 ? ('0' + MM) : MM;
		let d = date.getDate();
		d = d < 10 ? ('0' + d) : d;
		let h = date.getHours();
		h = h < 10 ? ('0' + h) : h;
		let m = date.getMinutes();
		m = m < 10 ? ('0' + m) : m;
		let s = date.getSeconds();
		s = s < 10 ? ('0' + s) : s;
		return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
		}
		},
		created:function(){
			this.getRid()
		},
		methods:{
			goback(){
				this.$router.push({
					path:'/recharge'
				})
			},
			getRid(){
				this.rid = this.$route.query.rid;
				repaiddetail(this.rid).then(res=>{
					console.log(res.data)
					if(res.data.code == 0){
							this.detailArr = res.data.data;
							if(this.detailArr.txid==null||this.detailArr.txid==''){
								this.txidShow = false
							}
							if(res.data.data.state==0){
								this.detailArr.state = '提现中';
								
							}else if(res.data.data.state==1){
								this.detailArr.state = '完成';
								
							}
							if(res.data.data.type==0){
								this.states = false
							}else if(res.data.data.type==1){
								this.states = true
							}
					}
				})
			}
		}
	}
</script>

<style scoped="scoped">
	.detail{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #1f222d;
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
	.detailList{
		height: 1.7rem;
		border-bottom: 0.01rem solid #3e444c;
		color: #FFFFFF;
		font-size: 0.22rem;
	}
	.detailList >p{
		padding-top: 0.5rem;
	}
	.detailList > b{
		font-size: 0.3rem;
		padding-top: 0.3rem;
		display: block;
	}
</style>
