<template>
	<div class="mywinner">
		<div class="resultDiv">
			<div v-for="item in resultList" class="resultList">
				<div class="resultTop">
					<div class="coinImg">
						<img :src="item.imageLogo"/>
						<p>{{item.prizeName}}</p>
					</div>
					<div class="coinInfo">
						<p>幸运号码:<span>{{item.lucky}}</span></p>
						<p>参与人数:{{item.joiners}}</p>
						<p>获奖者:{{item.winner}}</p>
						<div class="coincord">
							<img src="/static/common/user/winnerimg.png"/>
						</div>
					</div>
				</div>
				<div class="resultBot">
					<div>第<span>{{item.termNumber}}</span>期<a>({{item.openingTime|formatDate}}) </a></div>
					<div @click="mynumShow(item.drawCode,item.lucky)" class="myNum">我的号码</div>
				</div>
				
				<div v-if="mynumshow" class="mynumber">
					<div class="mynumDiv">
						<ul>
							<li style="font-size: 0.2rem;" v-for="iet in JSON.parse(drawCode) " :class="lucks==iet?'chenked':''">{{iet}}</li>
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
		name:'winner',
		data(){
			return{
				resultList:[
				],
				mynumshow:false,
				drawCode:'',
				lucks:''
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
		activated:function(){
			this.getOrderDetail()
		},
		methods:{
			mynumShow(num,num1){
				this.mynumshow =true;
				this.drawCode=num;
				this.lucks = num1
			},
			iknow(){
				this.mynumshow =false
			},
			getOrderDetail(){
				let uid =JSON.parse(localStorage.getItem('uid')).uid;
				getOrderDetail(3,uid).then(res=>{
					console.log(res.data)
					this.resultList = res.data.data
				})
			}
		}
	}
</script>

<style scoped="scoped">
	.mywinner{
		flex: 1;
		background-color: rgb(26,28,37);
		margin-top: 1.83rem;
	}
	.resultDiv{
		border: 1px solid transparent;
		box-sizing: border-box;
		padding-top: 0.2rem;
		padding-bottom: 0.95rem;
	}
	.resultList{
			width:7.14rem;
			height: 3.08rem;
			margin:  auto;
			margin-bottom: 0.3rem;
			background: url(/static/common/sy/nowinner.png) no-repeat;
			background-size: 100% 100%;
		border-radius: 0.15rem;
	}
	
	.resultTop{
		height: 1.8rem;
		border-bottom:0.01rem solid rgb(69,75,82);
		display: flex;
		justify-content: center;
		align-items: center;
		width: 6.9rem;
		margin: auto;
	}
	
	.coinImg{
		width: 1.14rem;
		height: 1.14rem;
		border: 0.01rem solid rgb(72,79,86);
		margin: 0 0.3rem;
		display: flex;
		justify-content: space-around;
		flex-direction: column;
		font-size: 0.24rem;
		color: #FFFFFF;
		align-items: center;
	}
	.coinImg img{
		width: 0.54rem;
		height: 0.54rem;
	}
	.coinInfo{
		flex: 1;
		height: 1.21rem;
		font-size: 0.26rem;
		color: #FFFFFF;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		letter-spacing: 0.01rem;
		position: relative;
	}
	.coinInfo span{
		color: rgb(234,185,127);
	}
	.resultBot{
		height: 1rem;
		display: flex;
		justify-content: space-between;
		font-size: 0.24rem;
		align-items: center;
		color: #FFFFFF;
		padding-left: 0.15rem;
	}
	
	.resultBot span{
		color: rgb(234,185,127);
		padding: 0 0.1rem;
	}
	.coincord{
		width: 0.9rem;
		height: 0.9rem;
		position: absolute;
		right: 0.3rem;
		top: 0.2rem;
		border-radius: 100% 100%;
	}
	.myNum{
		width: 1.3rem;
		height: 0.6rem;
		background-color: #eab97f;
		color: #FFFFFF;
		text-align: center;
		line-height: 0.6rem;
		border-radius: 0.1rem;
		margin-right: 0.2rem;
	}
	.coincord img{
		width: 100%;
		height: 100%;
		float: left;
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
	.chenked{
		color: red;
	}
</style>
