<template>
	<div class="mybilldiv">
		<div>
			<div class="header">
				<div class="fanhui" @click="goBack()">
					<img src="/static/common/fanhui.png"/>
				</div>
				我的账单
			</div>
			<div class="checks">
				<div :id="coinId" :class="bgimg?'tops':'bots'" class="allCoin"  @click="goallcoin()">{{allcoin}}</div>
				<div :id="coinTypeId" :class="!bgimg?'tops':'bots'" @click="goalltype()">{{alltype}}</div>
			</div>
			
			<div v-if="checksShow" class="mychecks">
				<ul v-if="coinShow" class="coinUl">
					<li @click="coins('全部币种',null)">全部币种</li>
					<li :id="item.id" v-for="item in myallcoin" @click="coins(item.symbol,item.id)">{{item.symbol}}</li>
				</ul>
				<ul v-if="!coinShow" class="coinUl">
					<li @click="cointypes('全部类型',null)">全部类型</li>
					<li id='1' @click="cointypes('交易','1')">交易</li>
					<!-- <li id='2' @click="cointypes('划转','2')">划转</li> -->
					<li id='3' @click="cointypes('提币','3')">提币</li>
					<li id='4' @click="cointypes('充值','4')">充值</li>
					<!-- <li id='5' @click="cointypes('补尾款','5')">补尾款</li> -->
					<!-- <li id='6' @click="cointypes('抽成','6')">抽成</li> -->
					<li id='7' @click="cointypes('手续费','7')">手续费</li>
					<!-- <li id='8' @click="cointypes('冻结','8')">冻结</li> -->
					<li id='9' @click="cointypes('中奖','9')">中奖</li>
				</ul>
			</div>
			
		</div>
		
		<div v-if="glide" class="billList">
			<div class="billItem" v-for="iem in coinList">
				<div class="itemtit">{{iem.symbol}}</div>
				<div class="itembot">
					<div>
						<span>数量</span>
						<p><span>{{iem.add}}</span>{{iem.amount}}</p>
					</div>
					<div>
						<span>类型</span>
						<p>{{iem.state}}</p>
					</div>
					<div>
						<span>时间</span>
						<p>{{iem.time|formatDate}}</p>
					</div>
				</div>
			</div>
		</div>
		
		
		<div class="kongbai" @click="aclick()" v-if="checksShow"></div>
	</div>
</template>

<script>
	import {getcurrencyinfo,myrecord} from '@/api/user/userAPI'
	export default{
		name:'mybill',
		data(){
			return{
				state:'', //类型
				allcoin:'全部币种',
				alltype:'全部类型',
				coinShow:true,
				myallcoin:[],
				checksShow:false,
				glide:false, //流水账单
				bgimg:false,
				coinList:[], //查询账单的列表
				coinId:'',
				coinTypeId:'',
				add:'', //控制数量是+还是——
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
		mounted:function(){
			this.getcurrencyinfo();
			this.coins();
			this.cointypes()
		},
		methods:{
			goBack(){
				this.$router.push({
					path:'/home/user'
				})
			},
			goalltype(){
				this.coinShow = false;
				this.checksShow =true;
				this.glide =false;
				this.bgimg =true
			},
			goallcoin(){
				this.coinShow = true;
				this.checksShow =true;
				this.glide =false;
				this.bgimg =false
			},
			coins(coinName,itemId){ //获取币
				this.allcoin = coinName||'全部币种';
				this.checksShow =false;
				this.glide =true;
				this.coinId = itemId
				let uid =JSON.parse(localStorage.getItem('uid')).uid;
				myrecord(uid,itemId,this.coinTypeId).then(res=>{ //获取币的查询
// 					console.log(this.coinTypeId,111);
					console.log(res.data)
					this.coinList =[];
					for (var i = 0; i < res.data.data.length; i++) {
						if(res.data.data[i].state=='9'){
							this.coinList.push(res.data.data[i])
						}else if(res.data.data[i].state=='1'){
							this.coinList.push(res.data.data[i])
						}else if(res.data.data[i].state=='3'){
							this.coinList.push(res.data.data[i])
						}else if(res.data.data[i].state=='4'){
							this.coinList.push(res.data.data[i])
						}else if(res.data.data[i].state=='7'){
							this.coinList.push(res.data.data[i])
						}
					}
					
					for (let a = 0; a < this.coinList.length;a++) {
						if(this.coinList[a].state=='9'){
							this.coinList[a].state = '中奖'
							this.coinList[a].add = '+'
						}else if(this.coinList[a].state=='1'){
							this.coinList[a].state = '交易'
							this.coinList[a].add = '-'
						}else if(this.coinList[a].state=='3'){
							this.coinList[a].state = '提币'
							this.coinList[a].add = '-'
						}else if(this.coinList[a].state=='4'){
							this.coinList[a].state = '充值'
							this.coinList[a].add = '+'
						}else if(this.coinList[a].state=='9'){
							this.coinList[a].state = '中奖'
							this.coinList[a].add = '+'
						}else if(this.coinList[a].state=='7'){
							this.coinList[a].state = '手续费'
							this.coinList[a].add = '-'
						}
					}
				})
			},
			cointypes(cointypes,id){
				this.alltype = cointypes||'全部类型';
				this.checksShow =false;
				this.glide =true;
				this.coinTypeId = id
				let uid =JSON.parse(localStorage.getItem('uid')).uid;
				myrecord(uid,this.coinId,id).then(res=>{ //获取币的查询
					this.coinList = [];
					for (var i = 0; i < res.data.data.length; i++) {
						 if(res.data.data[i].state=='9'){
							this.coinList.push(res.data.data[i])
						}else if(res.data.data[i].state=='1'){
							this.coinList.push(res.data.data[i])
						}else if(res.data.data[i].state=='3'){
							this.coinList.push(res.data.data[i])
						}else if(res.data.data[i].state=='4'){
							this.coinList.push(res.data.data[i])
						}else if(res.data.data[i].state=='7'){
							this.coinList.push(res.data.data[i])
						}
						
						
					}
					
					for (let a = 0; a < this.coinList.length;a++) {
						if(this.coinList[a].state=='9'){
							this.coinList[a].state = '中奖'
							this.coinList[a].add = '+'
						}else if(this.coinList[a].state=='1'){
							this.coinList[a].state = '交易'
							this.coinList[a].add = '-'
						}else if(this.coinList[a].state=='3'){
							this.coinList[a].state = '提币'
							this.coinList[a].add = '-'
						}else if(this.coinList[a].state=='4'){
							this.coinList[a].state = '充值'
							this.coinList[a].add = '+'
						}else if(this.coinList[a].state=='9'){
							this.coinList[a].state = '中奖'
							this.coinList[a].add = '+'
						}else if(this.coinList[a].state=='7'){
							this.coinList[a].state = '手续费'
							this.coinList[a].add = '-'
						}
					}
				})
			},
			getcurrencyinfo(){
				getcurrencyinfo().then(res=>{
					this.myallcoin = res.data.data;
				})
			},
			aclick(){
				this.checksShow = false;
				this.getcurrencyinfo();
				this.coins();
				this.cointypes()
			}
		}
	}
</script>

<style scoped="scoped">
	@import '../../../style/mybill.css'
</style>
