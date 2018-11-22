<template>
	<!-- 设置界面 -->
	<div class="setDiv">
		<div class="header">
			<div class="fanhui" @click="goOut()">
				<img src="static/common/fanhui.png"/>
			</div>
			设置
		</div>
		
		<div class="genghuan">
			<div class="changepwd" @click="gochangepwd()">修改密码</div>
			<div class="changetel" @click="gochangetel()">更换手机</div>
		</div>
		
		<div class="zjpwd" @click="gocapital()" style="border-bottom: 0.01rem solid #30333f">资金密码</div>
		<div class="zjpwd" @click="callme()">联系我们</div>
		
		<div class="tuichu" @click="tuichu()">退出登录</div>
		
		
		
		<!-- 退出弹窗 -->
		<div class="closeDiv" v-show="quits">
			<div class="quit">
				<div class="quitTop">
					<b>退出登录</b>
					<span>您是否确定退出</span>
				</div>
				<div class="quitBot">
					<button class="cancels" @click="cancels()">取消</button>
					<button class="sureBtn" @click="sures()">确定</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name:'setup',
		data(){
			return{
				quits:false,  //退出弹窗
			}
		},
		methods:{
			tuichu(){
				this.quits =true;
			},
			cancels(){ //点取消
				this.quits =false;
			},
			sures(){ //确定退出
				this.quits =false;
				localStorage.clear();
				this.$router.push({
					path:'/home/user'
				})
				sessionStorage.clear('uid');
				this.islogin=false;
				this.username='';
				this.pwd=''
			},
			callme(){
				alert('联系电话：XXXXXXXXXX')
			},
			goOut(){
				this.$router.push({
					path:'/home/user'
				})
			},
			gochangetel(){
				this.$router.push({
					path:'/changetel'
				})
			},
			gocapital(){
				this.$router.push({
					path:'/captial'
				})
			},
			gochangepwd(){
				this.$router.push({
					path:'/changepwd'
				})
			}
		}
	}
</script>

<style scoped="scoped">
	.setDiv{
			position: absolute;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
			background-color: #1a1c24;
		}
		.header{
			background-color: #1f222d;
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
		.genghuan{
			margin: 0.25rem 0;
			
		}
		.tuichu{
			background-color: #1f222d;
			height: 0.9rem;
			line-height: 0.9rem;
			font-size: 0.26rem;
			color: #FFFFFF;
			margin-top:1rem;
			text-align: center;
		}
		.changepwd{
			height: 0.9rem;
			background-color: #1f222d;
			border-bottom: 0.01rem solid #30333f;
			line-height: 0.9rem;
			font-size: 0.26rem;
			color: #FFFFFF;
			padding-left: 0.3rem;
		}
		.changetel{
			height: 0.9rem;
			background-color: #1f222d;
			line-height: 0.9rem;
			font-size: 0.26rem;
			color: #FFFFFF;
			padding-left: 0.3rem;
		}
		.zjpwd{
			background-color: #1f222d;
			height: 0.9rem;
			line-height: 0.9rem;
			padding-left: 0.3rem;
			font-size: 0.26rem;
			color: #FFFFFF;
		}
		/* 退出登录框 */
		.closeDiv {
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background-color: rgba(0,0,0,0.6);
			display: flex;
			justify-content: center;
			align-items: center;
		}
		
		.quit{
			width: 5.67rem;
			height: 3rem;
			background-color: #FFFFFF;
			border-radius: 0.2rem;
		}
		
		.quitTop{
			height: 1.95rem;
			border-bottom: 0.01rem solid #CCCCCC;
			display: flex;
			flex-direction: column;
			color: #000;
			justify-content: center;
			align-items: center;
			letter-spacing: 0.01rem;
			box-sizing: border-box;
		}
		.quitTop > b{
			font-size: 0.36rem;
			padding-bottom: 0.15rem;
			font-weight: 600;
		}
		
		.quitTop > span{
			font-size: 0.25rem;
			color: #b4b4b4;
		}
		
		.quitBot{
			height: 1.05rem;
			display: flex;
		}
		.quitBot > button{
			width: 50%;
			border: none;
			background-color: transparent;
			font-size: 0.28rem;
			outline: none;
		}
		.cancels{
			border-right: 0.01rem solid #CCCCCC!important;
			box-sizing: border-box;
			color: #777777;
		}
		
		.sureBtn{
			color: #ebba7b;
		}
		
		
		
		
		
</style>
