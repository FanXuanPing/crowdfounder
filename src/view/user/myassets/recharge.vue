<template>
	<div class="mycharge">
		<div>
			<div class="header">
				<div class="fanhui" @click="goback()">
					<img src="/static/common/fanhui.png"/>
				</div>
				充提记录
			</div>
			<div class="chargeDiv">
				<div class="chargeTop">
					<h3>{{currencyName}}</h3>
					<div class="zichan">
						<div style="text-align: left;">
							<span>可用</span>
							<p>{{available}}</p>
						</div>
						<div style="text-align: right;">
							<span>冻结</span>
							<p>{{hold}}</p>
						</div>
					</div>
				</div>
				<div style="height: 0.2rem;background-color: #1c1e28;"></div>
			</div>
		</div>
		
		<div class="myrecharge">
			
			<div class="jilu">
				<div v-for="item in mycharge" :id="item.id" class="forwordList" @click="godetail(item.id)">
					<p>{{item.type}}</p>
					<div class="smallList">
						<div>
							<span>数量</span>
							<p><span>{{item.add}}</span>{{item.number}}</p>
						</div>
						<div>
							<span>状态</span>
							<p>{{item.state}}</p>
						</div>
						<div style="text-align: right;">
							<span>时间</span>
							<p>{{item.createDate|formatDate}}</p>
						</div>
					</div>
				</div>
			</div>
			<div class="btns">
				<div class="cz" @click="changecoin()">充值</div>
				<div class="tx" @click="putcoin()">提现</div>
			</div>
		</div>
		
		<new-slots style='top:3rem' ref='al' >
			<p slot='main'>{{AlertMain}}</p>
		</new-slots>
	</div>
</template>

<script>
	import {getuserassetsbyid,repaidrecord,recharge,getcurrencyinfo} from '@/api/user/userAPI'
	import newSlots from '@/components/solts'
	export default{
		name:'recharge',
		components:{
			newSlots
		},
		data(){
			return{
				adds:false,
				shows:false,
				AlertMain:'',  //弹窗内容
				currencyName:'',
				available:'',
				hold:'',
				mycharge:[
				]
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
			this.getuserassetsbyid()
			this.repaidrecord()
		},
		methods:{
			godetail(itemid){
				this.$router.push({
					name:'detail',
					query:{
						rid:itemid
					}
				})
			},
			getuserassetsbyid(){ //获取用户资产
				let uid =JSON.parse(localStorage.getItem('uid')).uid;
				let mycid =sessionStorage.getItem('mycid');
				if(uid==null){
					this.$router.push({
						path:'home/user'
					})
				}else if(mycid==null){
					this.$router.push({
						path:'/myassets'
					})
				}else{
					getuserassetsbyid(uid,mycid).then(res=>{
						this.myasset = res.data.data;
						this.currencyName = res.data.data.currencyName;
						this.available =(res.data.data.available).toFixed(8);
						this.hold =(res.data.data.hold).toFixed(8);
					})
				}
				
			},
			repaidrecord(){ //充提记录
				let uid =JSON.parse(localStorage.getItem('uid')).uid;
				let mycid =sessionStorage.getItem('mycid')
				repaidrecord(uid,mycid).then(res=>{
					this.mycharge = res.data.data.rows;
					for (var i = 0; i < res.data.data.rows.length; i++) {
						if(this.mycharge[i].type ==0){
							this.mycharge[i].type = '充值'
							this.mycharge[i].add = '+'
						}else if(this.mycharge[i].type ==1){
							this.mycharge[i].type = '提现'
							this.mycharge[i].add = '-'
						}
						if(this.mycharge[i].state ==-1){
							this.mycharge[i].state = '删除'
						}else if(this.mycharge[i].state ==0){
							this.mycharge[i].state = '提现中'
						}else if(this.mycharge[i].state ==1){
							this.mycharge[i].state = '完成'
						}else if(this.mycharge[i].state ==2){
							this.mycharge[i].state = '已发送'
						}else if(this.mycharge[i].state ==2){
							this.mycharge[i].state = '已确定'
						}
					}
				})
			},
			goback(){
				this.$router.push({
					path:'/myassets'
				})
			},
			putcoin(){
				let uid =JSON.parse(localStorage.getItem('uid')).uid;
				let cid =sessionStorage.getItem('mycid');
						sessionStorage.setItem('currencyName',this.currencyName)
				getcurrencyinfo().then(res=>{
					for (var i = 0; i < res.data.data.length; i++) {
						if(this.currencyName == res.data.data[i].symbol){
							if(res.data.data[i].rechargeAble==0){
								this.AlertMain ='该币当前暂不支持提现';
								this.$refs.al.isShows();
							}else  if(res.data.data[i].rechargeAble==1){
								this.$router.push({
									path:'/putcoin'  //充值
								})
								sessionStorage.setItem('currencyName',this.currencyName)
							}
						}
						
					}
				})
				
				
				
			},
			changecoin(){
				let uid =JSON.parse(localStorage.getItem('uid')).uid;
				let cid =sessionStorage.getItem('mycid');
				recharge(uid,cid).then(res=>{
					if(res.data.code==0){
						this.$router.push({
							path:'/changecoin'  //充值
						})
						sessionStorage.setItem('currencyName',this.currencyName)
					}else if(res.data.code==-1){
						this.AlertMain = res.data.msg;
						this.$refs.al.isShows();
					}
				})
				
				
				
				
			}
		}
	}
</script>

<style scoped="scoped">
	@import '../../../style/recharge.css'
</style>
