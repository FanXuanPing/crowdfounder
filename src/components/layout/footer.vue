<template>
	<div class="footer">
		<!-- <div class="footnav" @click="sy()"><i class="iconfont ">&#xe639;</i>首页</div>
		<div class="footnav" @click="ToResult()"><i class="iconfont ">&#xe644;</i>开奖结果</div>
		<div class="footnav" @click="ToUser()"><i class="iconfont ">&#xe612;</i>账户</div> -->
		
		<div class="footnav" v-for="item in nav" @click="selectedNav(item.title)">
			<img :src="isSelected===item.title?item.oneUrl:item.url"/>
			<span :class="isSelected===item.title?'selected':''">{{item.title}}</span>
		</div>
		
	
	</div>
</template>

<script>
	export default{
		name:'footer',
		data(){
			return{
				isSelected:"首页",
				nav:[
					{title:'首页',url:'static/common/zc_sy@2x.png',oneUrl:'static/common/xz_sy@2x.png'},
					{title:'最新揭晓',url:'static/common/zc_kj@2x.png',oneUrl:'static/common/xz_kj@2x.png'},
					{title:'我的',url:'static/common/zc_zh@2x.png',oneUrl:'static/common/xz_zh@2x.png'},
				]
			}
		},
		mounted(){
			this.isSelected = this.$route.name;
			
		},
		methods:{
			selectedNav(title){
				this.isSelected = title;
				switch(title){
					case '首页':
					this.$router.push("index")
					break;
					case '最新揭晓':
					this.$router.push("result")
					break;
					case '我的':
					this.$router.push("user")
					break;
				}
				sessionStorage.setItem("isSelected",this.isSelected)
			}
			
		},
	}
</script>

<style scoped="scoped">
	.footer{
		height:0.95rem;
		width: 100%;
		background-color:rgb(50,52,62) ;
		position: fixed;
		bottom: 0;
		font-size: 0.2rem;
		color: #FFFFFF;
		display: flex;
		justify-content:space-around;
	}
	.footnav{
		width: 33%;
		display: flex;
		justify-content: space-around; 
		align-items: center;
		flex-direction: column;
		color: #82848a;
	} 
	.footnav img{
		width: 0.4rem;
	}
	.selected{
		color: #FFFFFF!important;
	}
</style>
