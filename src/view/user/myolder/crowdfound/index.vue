<template>
	<div class="crowdDiv">
		<div class="zcDiv">
			<div class="zcList" v-for="item in zclist">
				<div class="zcTop">
					<div class="topl">
						<div class="topImg">
							<img :src="item.imageLogo"/>
						</div>
						<span>{{item.prizeName}}</span>
					</div>
					<div class="topr">
						<p>订单号：{{item.orderNum}}</p>
							<el-progress :text-inside="true" :stroke-width="8" :percentage="item.number/item.total*100"></el-progress>
							<div class="rangeShow">
								<div style="text-align: left;">
									<span>{{item.number}}/{{item.total}}</span>
									<p>参与次数</p>
								</div>
								<div style="text-align: center;">
									<span>{{item.joiners}}</span>
									<p>参与人数</p>
								</div>
								<div style="text-align: right;">
									<span>{{(item.number/item.total*100).toFixed(2)}}%</span>
									<p>游戏进度</p>
								</div>
							</div>
					</div>
				</div>
				<div class="zcBot"> 
					<div>第<span>{{item.termNumber}}</span>期</div>
					<div @click="mynumShow(item.drawCode)" class="myNum">我的号码</div>
				</div>
				<!-- 我的号码 -->
				<div v-if="mynumshow" class="mynumber">
					<div class="mynumDiv">
						<ul>
							<li v-for="itm in JSON.parse(drawCode)">{{itm}}</li>
						</ul>
						<button @click="iknow()" class="iknow">我知道了</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {getOrderDetail} from '@/api/user/userAPI'
	export default{
		name:'crowdfound',
		data(){
			return{
				mynumshow:false,
				zclist:[
					
				],
				rangeValue:'' ,//游戏进度
				drawCode:'',
			}
		},
		activated:function(){
			this.getOrderDetail()
		},
		methods:{
			mynumShow(num){
				this.mynumshow =true;
				this.drawCode=num;
			},
			iknow(){
				this.mynumshow =false
			},
			getOrderDetail(){
				let uid =JSON.parse(localStorage.getItem('uid')).uid;
				getOrderDetail(0,uid).then(res=>{
					console.log(res.data)
					this.zclist = res.data.data;
				})
			}
		}
	}
</script>

<style scoped="scoped">
	.crowdDiv{
		flex: 1;
		background-color: rgb(26,28,37);
		margin-top: 1.83rem;
	}
	.zcDiv{
		margin-top: 0.2rem;
	}
	.zcList{
		width: 7.14rem;
		height: 3.3rem;
		margin: auto;
		margin-bottom: 0.3rem;
		background: url(/static/common/sy/waitwinner.png) no-repeat;
		background-size: 100% 100%;
		/* padding: 0 0.2rem; */
		border-radius: 0.15rem;
	}
	.zcTop{
		height: 2rem;
		width: 6.9rem;
		border-bottom:0.01rem solid rgb(69,75,82);
		box-sizing: border-box;
		padding-top: 0.2rem;
		display: flex;
		justify-content: space-around;
		align-items: center;
		margin: auto;
	}
	.zcBot{
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 0.26rem;
		height: 1rem;
		color: #FFFFFF;
		padding: 0 0.2rem;
		padding-left: 0.3rem;
	}
	.zcBot span{
		color: #eab97f;
		padding: 0 0.1rem;
	}
	.myNum{
		width: 1.3rem;
		height: 0.6rem;
		background-color: #eab97f;
		color: #FFFFFF;
		text-align: center;
		line-height: 0.6rem;
		border-radius: 0.1rem;
	}
	.topl{
		width: 1.15rem;
		height: 1.15rem;
		border: 0.01rem solid #484f56;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
		font-size: 0.22rem;
		color: #FFFFFF;
	}
	.topr{
		width: 5.2rem;
		height: 1.5rem;
		font-size: 0.26rem;
		color: #FFFFFF;
	}
	.topImg{
		width: 0.57rem;
		height: 0.57rem;
		border-radius: 100%;
		border: 0.01rem solid transparent;
	}
	.topImg >img{
		width: 100%;
		height: 100%;
		border-radius: 100%;
		border: none;
		outline: none;
	}
	.rangeShow{
		display: flex;
		justify-content: space-between;
		font-size: 0.18rem;
	}
	.rangeShow > div >p{
		font-size: 0.18rem;
	}
	.mynumber{
		position: fixed;
		top:0;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: rgba(0,0,0,0.6);
		z-index: 99;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.mynumDiv{
		width: 5.4rem;
		height: 6.3rem;
		background: url(/static/common/user/mynumberbg.png) no-repeat;
		background-size: 100% 100%;
		position: relative;
	}
	.mynumDiv ul{
		list-style: none;
		font-size: 0.2rem;
		width: 4.6rem;
		margin: auto;
		margin-top: 1rem;
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;
	}
	.mynumDiv ul li{
		width: 33%;
		height: 0.5rem;
		line-height: 0.5rem;
		font-size: 0.26rem;
	}
	.iknow{
		font-size: 0.3rem;
		width: 3.2rem;
		height: 0.8rem;
		background-color: #ebba7b;
		color: #FFFFFF;
		display: block;
		text-align: center;
		line-height: 0.8rem;
		border: none;
		outline: none;
		border-radius: 0.5rem;
		position: absolute;
		bottom: 0.4rem;
		left: 50%;
		margin-left: -1.6rem;
	}
	.topr >p{
		margin-bottom: 0.2rem;
	}
</style>
<style>
	.el-progress{
		top: 0;
		height: 0.2rem;
		margin-bottom: 0.1rem;
	}
	.el-progress--text-inside .el-progress-bar{
		float: left;
	}
	.el-progress-bar__inner{
		background: -webkit-linear-gradient(left,#cc750a,#d79b52,#d67703);
		border-radius: 0.4rem;
		height: 0.12rem;
		margin-top: 0.01rem; 
		/* left: 0.03rem!important;
		right: 0.03rem!important; */
	}
	.el-progress-bar__outer{
		height: 0.12rem!important;
		border-radius: 0.4rem;
		background: url(/static/common/xiao.png) no-repeat;
		background-size: 100% 100%;
		border: 0;
		right: 0;
		background-color: #1f232d!important;
	}
	.el-progress-bar__innerText{
		display: none;
	}
	.el-progress-bar__innerText{
		display: none!important;
	}
</style>