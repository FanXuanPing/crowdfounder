<template>
	<div class="bannerdiv">
		<div class="banner1">
			<div class="fanhui" @click="goOut()"></div>
			<div class="bannerMain">
				
				<div class="gameresult">
					游戏规则
				</div>
				
				<p>1：参与中者购买次数不限，购买次数越多中奖概率越大中奖概率等于1除以本次游戏可参与次数</p>
				<p>2：开奖数值可到火币网【币币交易】eht/usdt币对查询，网址为
 http://www.huobi.pro/</p>
				<p>3：幸运号获得公式：<br />
					(数值A+数值B)%数值C于值+10000001 <br />
					数值A:212.23(交易价格)<br />
					数值B:1.2345(交易数量)<br />
					数值C:100(参与次数)<br />
					计算方法:<br />(21223+12345)%100余68+10000001=10000069<br />
					计算须知：交易价格和交易数量数值取消小数点，例如 212.12按照21223计算
					</p>
				
				<div class="gameplay">
					游戏玩法
				</div>
				<p style="margin-top: 0.3rem;">1．在首页点击自己想夺取的奖品，点击进入众筹页面，选择份数下单，下单时候需要输入资金密码</p>
				<p style="margin-top: 0.3rem;">2．众筹100%后，1分钟之内系统会去火币【币币交易】拿eth/usdt最新的一笔交易作为开奖依据</p>
				<p style="margin-top: 0.3rem;">3：开奖结果可在我的订单和最新揭晓中查询,如果中奖会收到中奖短信。</p>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name:'首页1',
		methods:{
			goOut(){
				//返回上一级首页。
				this.$router.push({path:"/home"})
			},
		}
	}
</script>

<style scoped="scoped">
	.banner1{
		width: 100%;
		height: 16rem;
		background: url(/static/common/sy/banner1bg.png);
		background-size: 100% 100%;
		border: 1px solid transparent;
		box-sizing: border-box;
	}
	.bannerMain{
		margin-top: 3.6rem;
		border: 1px solid transparent;
		box-sizing: border-box;
		padding: 0 0.7rem;
		padding-bottom: 0.3rem;
	}
	.gameresult,.gameplay{
		width: 3.55rem;
		height: 0.6rem;
		margin: auto;
		margin-top: 0.55rem;
		font-size: 0.35rem;
		text-align: center;
		line-height: 0.6rem;
		color: #FFFFFF;
		background: url(/static/common/sy/btnbg.png) no-repeat;
		background-size: 100% 100%;
		letter-spacing: 0.02rem;
	}
	.bannerMain > p{
		font-size: 0.25rem;
		color: #FFFFFF;
		line-height: 0.4rem;
		margin-top: 0.45rem;
		/* letter-spacing: 0.02rem; */
	}
	.fanhui{
		width: 0.2rem;
		height: 0.33rem;
		background: url(/static/common/fanhui.png) no-repeat;
		background-size: 100% 100%;
		position: absolute;
		left: 0.2rem;
		top: 0.3rem;
	}
	.bannerdiv{
	}
</style>
