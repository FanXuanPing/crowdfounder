<template>
	<div style="padding-bottom: 1.3rem;background-color: rgb(31,34,45);">
		<div class="header" style="height: 0.5rem;">
		</div>
		<div class="banner">
			<mt-swipe :show-indicators="false">
				<mt-swipe-item v-for='item in sybanner' >
					<router-link :to='item.content'>
						<img :content='item.content' :type='item.type' :src="item.imageurl" :id="item.id" :alt='item.alt' :title="item.title"/>
					</router-link>
				</mt-swipe-item>
			</mt-swipe>
		</div>
		<h3 class="syTit">—    夺币大冒险    —</h3>
		<div v-for="iem in sortList" :id="iem.id" :state='iem.state' class="bz" @click="goToprize(iem.id,iem.state)" >
			<img :src="iem.imageUrl"/>
			<div>
				<h4>{{iem.name}}</h4>
			</div>
			<div v-if="iem.state==1" class="dq waits" style="color: #9b9ea2;">
				等待开奖
			</div>
			<div v-if="iem.state==0" class="dq">
				众筹中
			</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios';
	import {getsybanner} from '@/api/user/userAPI' //获取首页banner
	import {getjplist}  from '@/api/user/userAPI'  //获取首页奖品列表
	export default{
		name:'sy',
		data(){
			return{
				state:'',
				clearInterval:'',
				sybanner:[
					//首页banner
				],
				sylist:[
					
				]
			}
		},
		activated:function(){
			this.getBanner(),
			this.getjplist(),
			this.clearStorage()
		},
		deactivated:function(){
			
		},
		created:function(){
// 			
			var code = getvl("cCode");
			localStorage.setItem('cCode',code)
				
		},
		computed:{
			sortList:function(){
			   return sortByKey(this.sylist,'state')
			 }
		},
		methods:{
			//localstrage失效时间
			clearStorage(){
				let uid =JSON.parse(localStorage.getItem('uid')).uid;
				let time =JSON.parse(localStorage.getItem('uid')).time;
				if(new Date().getTime()-time>1000*60*60*24){ 
					//信息过期
					localStorage.clear()
				}else {
					//信息没过期
				}
			},
			goToprize(ID,state){
					this.$router.push({
						path:'/openprize',
						name:'openprize',
						params:{
							id:ID
						}
					})
			},
			//获取首页banner
			getBanner(){
				getsybanner().then(res=>{
					this.sybanner = res.data.data;
					// this.sybanner[0].href = '/banner1'
				}).catch(err=>{
					alert(err)
				})
				getjplist().then(res=>{
					this.sylist = res.data.data.rows;
				}).catch(err=>{
					alert(err)
				})
			},
			getjplist(){
				this.clearInterval=setInterval(()=>{
					getjplist().then(res=>{
						this.sylist = res.data.data.rows;
					}).catch(err=>{
						alert(err)
					})
				},10000)
			}
			
			
		},
		beforeRouteLeave (to, from, next) {
			if(this.clearInterval){
				clearInterval(this.clearInterval);
			}
			next()
		},
		
	}
	 //数组对象排序
function sortByKey(array,key){
  return array.sort(function(a,b){
    var x = a[key];
    var y = b[key];
    return((x<y)?-1:((x>y)?1:0));
  })
}

function getvl(name) {
        var reg = new RegExp("(^|\\?|&)"+ name +"=([^&]*)(\\s|&|$)", "i");
        if (reg.test(location.href)) return unescape(RegExp.$2.replace(/\+/g, " "));
        return "";
    };
    
</script>

<style scoped="scoped">
	@import "../../style/sy.css"
</style>
