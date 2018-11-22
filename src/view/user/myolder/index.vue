<!-- 我的订单页面 -->
<template>
	<div class="myOlder">
		<div class="headFix">
			<div class="header">
				<div class="fanhui" @click="gomyolder()">
					<img src="/static/common/fanhui.png"/>
				</div>
				我的订单
			</div>
			
			<div class="olderxz">
				<div  :class="isselect===item.tit?'selects':''" v-for="item in olders" :id="item.id" @click="oldersxz(item.tit)">{{item.tit}}</div>
			</div>
		</div>
		<keep-alive>
			<router-view/>
		</keep-alive>
	</div>
</template>

<script>
	export default{
		name:'myolder',
		data(){
			return{
				isselect:'众筹中',
				olders:[
					{tit:'众筹中',id:'0'},
					{tit:'等待开奖',id:'1'},
					{tit:'未中奖',id:'2'},
					{tit:'中奖',id:'3'}
				]
			}
		},
		mounted(){
				this.isselect = this.$route.name
		},
		methods:{
			oldersxz(Title){
				this.isselect = Title;
				switch(Title){
					case '众筹中':
					this.$router.push('crowdfound')
					break;
					case '等待开奖':
					this.$router.push('waitprize')
					break;
					case '未中奖':
					this.$router.push('nowinner')
					break;
					case '中奖':
					this.$router.push('winner')
					break;
				}
				localStorage.setItem('isselect',this.isselect)
			},
			gomyolder(){
				this.$router.push({path:'/home/user'})
			}
		}
	}
</script>

<style scoped="scoped">
	.headFix{
		position: fixed;
		top: 0;
		width: 100%;
		left: 0;
		z-index: 99;
	}
	.header{
		background-color: rgb(31,34,45);
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
	
	.olderxz{
		height: 0.94rem;
		width: 100%;
		background-color: rgb(31,34,45);
		font-size: 0.3rem;
		color: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: space-around;
	}
	.olderxz >div{
		height: 100%;
		line-height: 0.94rem;
		box-sizing: border-box;
	}
	.selects{
		color: rgb(234,185,127);
		border-bottom-color:rgb(234,185,127) ;
		border-bottom-width: 0.04rem;
		border-bottom-style: solid;
	}
	.myOlder{
		display: flex;
		flex-direction: column;
		height: 100vh;
		background-color:rgb(26,28,37);
	}
	
	
	
</style>
