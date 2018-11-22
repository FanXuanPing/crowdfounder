<template>
	<div>
		<div class="header">
			开奖结果
		</div>
		<div class="search">
			<div class="inputDiv">
				<form action='#' onsubmit='return false'>
					<input type="number" v-model="searchMain" placeholder="请输入期号" @keyup="findtermnum($event)"/>
				</form>
				
			</div>
		</div>
		<div class="resultDiv" infinite-scroll-immediate-check='true' v-infinite-scroll="loadMore" infinite-scroll-disabled="loading"  infinite-scroll-distance="10">
			<!-- 搜索 -->
			
			<div v-for="item in resultList" class="resultList">
				<div class="resultTop">
					<div class="coinImg">
						<img :src="item.imageLogo"/>
						<p>{{item.currency}}</p>
					</div>
					<div class="coinInfo">
						<p>幸运号码:<span>{{item.lucky}}</span></p>
						<p>参与人数:{{item.joiners}}</p>
						<p>获奖者:{{item.winner}}</p>
					</div>
				</div>
				<div class="resultBot">
					<div>第<span>{{item.termNumber}}</span>期 <a>({{item.openingTime|formatDate}}) </a></div>
					<div class="ckz" @click="ckz(item.referencePlatform,item.referenceCount,item.referenceDate,item.referencePrice,item.referenceType,item.referenceCount,item.referencePrice,item.total,item.lucky)">参考值</div>
				</div>
				
				<!-- 参考值 -->
				<div class="referDiv" v-if="shows">
					<div class="refer">
						<ul>
							<li>数据参考来源于:{{referencePlatform}}</li>
							<li>价格:{{referencePrice}}</li>
							<li>数量:{{(referenceCount)}}</li>
							<li>类型:{{referenceType}}</li>
							<li>当前币对:ETH/USDT</li>
							<li>时间:{{referenceDate}}</li>
							<li>开奖公式:
							({{(Number(ccc)}}+{{Number(bbb))}})%{{total}}+10000001={{lucky}}</li>
						</ul>
						<button class="iknow" @click="iknow()">
							我知道了
						</button>
					</div>
				</div>
				
				
			</div>
		
		
		
		</div>
		
	
		
	</div>
</template>

<script>
	import {getOpenResult,gettrmnum} from '@/api/user/userAPI'
	export default{
		name:'result',
		data(){
			return{
				searchMain:'',//搜索期号
				referencePlatform:'',
				total:'',
				referenceCount:'',
				referenceDate:'',
				referencePrice:'',
				referenceType:'',
				bbb:'',
				ccc:'',
				resultList:[],
				shows:false,
				page:0,
				pageSize: 50,
				lucky:''
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
			this.loadMore()
		},
		 computed: {
			},
		methods:{
			loadMore() {
				this.page++;
				//getOpenResult(this.page,this.pageSize).then(res=>{
					//setTimeout(() => {
						//this.resultList.concat(res.data.data.rows);
					//let last = this.resultList[this.resultList.length - 1];
					//for (let i = 1; i <= 3; i++) {
						//this.resultList.push(last + i);
					//}
					//}, 2500);
				//})
				if(this.page==1){
					getOpenResult(this.page,this.pageSize).then(res=>{
							this.resultList=(res.data.data.rows);
							for (var i = 0; i <res.data.data.rows.length; i++) {
								this.resultList[i].referenceCount =res.data.data.rows[i].referenceCount 
								if(this.resultList[i].referenceType=='buy'){
									this.resultList[i].referenceType = '买'
								}else if(this.resultList[i].referenceType=='sell'){
									this.resultList[i].referenceType = '卖'
								}
							}
					})
				}else if(this.page>1){
					getOpenResult(this.page,this.pageSize).then(res=>{
						setTimeout(() => {
							for (var i = 0; i <res.data.data.rows.length; i++) {
								this.resultList[i].referenceCount =res.data.data.rows[i].referenceCount 
								if(this.resultList[i].referenceType=='buy'){
									this.resultList[i].referenceType = '买'
								}else if(this.resultList[i].referenceType=='sell'){
									this.resultList[i].referenceType = '卖'
								}
							}
							this.resultList.concat(res.data.data.rows);
						}, 2500);
					})
				}
				
				
			 
			},
			findtermnum(event){
				//搜索的回车事件
				if(event.keyCode==13){
					gettrmnum(this.searchMain).then(res=>{
						this.resultList = res.data.data.rows;
					})
				}
				if(this.searchMain==''){
					this.getOpenResult()
				}
			},
			getOpenResult(){
				getOpenResult().then(res=>{
					this.resultList = res.data.data.rows;
					for (var i = 0; i <res.data.data.rows.length; i++) {
						this.resultList[i].referenceCount =res.data.data.rows[i].referenceCount 
						if(this.resultList[i].referenceType=='buy'){
							this.resultList[i].referenceType = '买'
						}else if(this.resultList[i].referenceType=='sell'){
							this.resultList[i].referenceType = '卖'
						}
					}
				})
			},
			ckz(a,b,c,d,e,bb,cc,total,deshu){
				this.shows =true;
				this.referencePlatform = a;
				this.referenceCount = b;
				this.referenceDate = c;
				this.referencePrice =d;
				this.referenceType =e;
				this.total = total;
				this.lucky = deshu 
				let aaa= bb.toString()
				let bbb =aaa.replace(/\./g,"");
				let aa =cc.toString();
				let ccc =aa.replace(/\./g,"")
				this.bbb = bbb;
				this.ccc = ccc
			},
			iknow(){
				this.shows =false
			}
		}
	}
</script>

<style scoped="scoped">
	@import "../../style/result.css"
</style>

