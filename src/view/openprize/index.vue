<template>
	<div class="openPrize">
		<div>
			<div class="header">
				<div class="fanhui" @click="goOut()">
					<img src="static/common/fanhui.png"/>
				</div>
				{{headers}}
				<span @click="gameResult()">游戏规则</span>
			</div>
			
			<div class="coinShows">
				<div class="coinBi">
					<img :src="personInfo.imageLogo"/>
				</div>
				<span class="reward">{{allnum}}{{personInfo.currency}}</span>
				<div class="xiaoxi">期数:{{personInfo.termNumber}}</div>
				
				<div class="range">
					<el-progress :text-inside="true" :stroke-width="8" :show-text='false' :percentage="personInfo.number/personInfo.total*100"></el-progress>
					<div class="rangeShow">
						<div>
							<span>{{personInfo.number}}/{{personInfo.total}}</span>
							<p>参与份数</p>
						</div>
						<div>
							<span>{{personInfo.joiners}}</span>
							<p>参与人数</p>
						</div>
						<div>
							<span>{{advance}}%</span>
							<p>游戏进度</p>
						</div>
					</div>
				</div>
			</div>
			
			<div class="coinShop">
				<div class="coinTit">
					<div style="padding-left: 0.3rem;">我的{{personInfo.currency}}:<span>{{(available)}}</span></div>
					<div>消耗{{personInfo.currency}}:<span>{{exPendTime}}</span></div>
				</div>
				<div class="touzhu">
					<span>投</span>
					<div class="bettingFrame">
						<div @click="sub()">—</div>
						<div><input maxlength="5" type="tel" v-model="times" /></div>
						<div @click="addList(1)">+</div>
					</div>
					<span>份</span>
					<button v-if="zcz" :disabled="isdisable" class="bettingBtn 111" @click="bets()">{{bettingBtn}}</button>
					<button v-if="!zcz" style="background-color: #CCCCCC;" :disabled="btndisable" class="bettingBtn">{{bettingBtn}}</button>
				</div>
				<div class="xzBetting">
					<div @click="addList(2)">+2</div>
					<div @click="addList(5)">+5</div>
					<div @click="addList(10)">+10</div>
					<div @click="tail()" style="border-right: none;">包尾</div>
				</div>
				
			</div>
			<h3 class="personInfoTit">
				<span>下单玩家</span>
				<span>下单份数</span> 
				<span>下单时间</span>
			</h3>
		</div>
		<div class="personInfo">
			
			<ul class="personInfoDiv">
				<li v-for="itm in joinerinfo">
					<span>{{itm.userName}}</span>
					<span>{{itm.number}}</span>
					<span>{{itm.createDate|formatDate}}</span>
				</li>
			</ul>
		</div>

		
		<new-slots style='margin-top:4rem;'  ref='al' >
			<p slot='main'>{{AlertMain}}</p>
		</new-slots>
		<!-- 资金密码弹窗 -->
		<div v-show="pwdwinShow" class="pwdwin">
				<div class="windiv">
					<h2>
						<img src="/static/common/cloas.png" @click="closeWIn()"/>
						请输入资产密码</h2>
					<div class="captials">{{exPendTime}}</div>
					<span class="cointypes">{{personInfo.currency}}</span>
					<div class="cappwd">
						<div class="capsBtn">
								<input style="color: #000000;" type="password" maxlength="1" disabled="disabled"  v-for=" item in zichanpwd" :value="item" />
						</div>
					</div>
				</div>
				
				<!-- 数字键盘 -->
					<div class="keyboard">
						<ul>
							<li v-for="keyB in keyboard" :id='keyB' @click="inputWord(keyB)">{{keyB}}</li>
							<li @click="delarr()">del</li>
						</ul>
					</div>
		</div>
		
		<!-- 游戏规则 -->
		<div class="gameresult"  v-if="gameResults">
			<div class="gresult">
				<div>
					<div style="font-size: 0.24rem;text-align: center;margin-bottom: 0.2rem;font-weight: 600;letter-spacing: 0.01rem;color: red;">火币网ETH/USDT币币交易最新成交</div>
						<ul>
							<li>
								<span>开奖公式:</span>
								<p>(数值A+数值B)%数值C的余数+10000001</p>
							</li>
							<li>
								<span>数值A:</span>
								<p>212.23(交易价格)</p>
							</li>
							<li>
								<span>数值B:</span>
								<p>1.2345(交易数量)</p>
							</li>
							<li>
								<span>数值C:</span>
								<p>100(参与次数)</p>
							</li>
							<li>
								<span>计算方法:</span>
								<p>(21223+12345)/100余68
								+10000001=10000069</p>
							</li>
							<li>
								<span>计算须知:</span>
								<p>数值取消小数点
               例如0.12按照12计算</p>
							</li>
							<li>
								<span>本次抽成:</span>
								<p>{{percentages}}{{personInfo.currency}}</p>
							</li>
						</ul>
						<button @click="iknow()">我知道了</button>
				</div>
			</div>
		</div>
		
		
	</div>
</template>

<script>
	import {vaildatePwd,getPerson,getGoodInfo,getcurrencyinfo,getuserassetsbyid,createOrder} from '@/api/user/userAPI';
	import newSlots from '@/components/solts'
	export default{
		name:'openprize',
		components:{
			newSlots
		},
		data(){
			return{
				allnum:'',//期数上面的数字
				zcz:true,
				keyboard:['1','2','3','4','5','6','7','8','9','','0'],//数字键盘
				zichanpwd:[],   //资产密码
				pwdwinShow:false,
				AlertMain:'',  //弹窗内容
				bettingBtn:'确认下注',
				headers:'众筹中',
				advance:'',
				available:'',//我的资产
				times:1,
				exPend:'',
				personInfo:[],
				joinerinfo:[],
				currency:'',  //全部资产的币种
				currencyId:'', //全部资产币种的id
				clearInterval:null, //定时器
				clearIntervale:null,
				cid:'',        //用户对应资产的Id
				exPendTime:'',  //需要消耗的
				isdisable:false,
				bitCoinId:'',  //奖品ID
				states:'' ,   //0:众筹中 1:等待开奖 2:已开奖
				gameResults:false, //游戏规则
				percentages:'', //抽成
				time:'',
				btndisable:false
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
		watch:{
			times:function(newValue, oldValue) {
					var  patt = /^[1-9][0-9]{0,1}$/;
					if(patt.test(newValue)){
						this.exPendTime=(this.times*this.personInfo.price).toFixed(8);
					}else{
						this.exPendTime=this.exPend;
					}
			},
			zichanpwd:function(newValue, oldValue){
				if(oldValue.length==6){
						this.pwdwinShow = false;
						this.vaildatePwd()
				}
			}
		},
		mounted:function(){
			this.getJoinerInfo();
			this.getGoodInfo();
			this.getcurrencyinfo();
			this.getParams();
		},
		created:function(){
		},
		methods:{
			gameResult(){ //点击游戏规则
				this.gameResults=true;
			},
			iknow(){ //点击我知道了
				this.gameResults =false;
			},
			closeWIn(){ //关闭资金密码弹窗
				this.pwdwinShow =false
			},
			delarr(){ //删除输入的密码
				this.zichanpwd.pop()
			},
			inputWord(num){
						if(num!=''){
							this.zichanpwd.push(num)
						}
			},
			vaildatePwd(){
				let uid =JSON.parse(localStorage.getItem('uid')).uid;
				if(uid==null){
					this.pwdwinShow =false;
					alert('请先登录');
				}else{
					let vaildate = this.zichanpwd
					let arr = vaildate.slice(',');
					let aaa =''
					for (var i = 0; i < arr.length; i++) {
						aaa+= arr[i]
					}
					vaildatePwd(uid,aaa).then(res=>{
						if(res.data.code == 0){
										if(this.states == 1){
											this.AlertMain = '请等待开奖';
											this.$refs.al.isShows();
											return false
										}else if(this.states == 2){
											this.AlertMain = '已开奖';
											this.$refs.al.isShows();
											return false
										}else if(this.exPendTime>this.available){
												this.AlertMain = '您的'+this.personInfo.currency+'已不足！';
												this.$refs.al.isShows();
												return false
											}else if(this.times>(this.personInfo.total-this.personInfo.number)){
												this.AlertMain = '超过最大下单数';
												this.$refs.al.isShows();
												return false
											}else{
													//下注
													let uid =JSON.parse(localStorage.getItem('uid')).uid;
													this.isdisable =true;
													setTimeout(()=>{
														this.isdisable =false;
													},3000)
													createOrder(uid,this.bitCoinId,this.cid,this.exPendTime,this.times).then(res=>{
														if(res.data.code == '0'){
																this.AlertMain = '下注成功';
																this.$refs.al.isShows();
																return
														}else if(res.data.code == '-1'){
															alert(res.data.msg)
														}
													})
											}
						}else if(res.data.code == -1){
							this.AlertMain = res.data.msg;
							this.$refs.al.isShows();
						}
					}).catch(err=>{
						alert('错误')
					})
				}
				
			},
			bets(){ //确认下注
			// var uid =JSON.parse(localStorage.getItem('uid')).uid;
			var uid = localStorage.getItem('uid')
			if(!uid){
				this.AlertMain = '请先登录';
				this.$refs.al.isShows();
				return false;
			}
			if(this.exPendTime>this.available){ 
					this.AlertMain = '您的'+this.personInfo.currency+'已不足！';
					this.$refs.al.isShows();
					return false
				}
			if(this.advance == 100){
				this.zcz=false;
				this.AlertMain = '参与次数已满，请等待开奖';
				this.$refs.al.isShows();
				this.isdisable = true;
				return false
			}
			if(this.times>(this.personInfo.total-this.personInfo.number)){
				this.AlertMain = '参与次数限制';
				this.$refs.al.isShows();
				return false
			}
			
			var  patt = /^[1-9]{1,}[\d]*$/;
			if(patt.test(this.times)){
				this.pwdwinShow = true;
				this.zichanpwd.length=0;
			}else {
				this.AlertMain = '下注错误';
				this.$refs.al.isShows();
				return false
			}
			
				
			},
			getParams(){
				var bitCoinId = this.$route.params.id;
				this.bitCoinId = bitCoinId;
				
			},
			goOut(){
				//返回上一级首页。
				this.$router.push({path:"/home"})
			},
			tail(){ //包尾
				if(this.personInfo.total<=this.personInfo.number){
					this.AlertMain = '参与人数已满';
					this.$refs.al.isShows();
				}else{
					this.times =Number(this.personInfo.total-this.personInfo.number)
				}
			},
			sub(){
				//减法
				this.times--;
				if(this.times<=1){
					this.times=1;
					return;
				}
			},
			addList(time){
				//加法
				this.times+=Number(time);
			},
			getJoinerInfo(){//获取用户参与详情
				this.clearIntervale=setInterval(()=>{
					getPerson(this.bitCoinId).then(res=>{
						for (var i = 0; i < res.data.data.length; i++) {
							if(res.data.data[i].count != 0){
									this.joinerinfo = res.data.data;
								}
						}
						this.exPendTime = (this.times*this.personInfo.price).toFixed(8);
						this.advance = (this.personInfo.number/this.personInfo.total*100).toFixed(2);
						this.allnum = (this.personInfo.price*this.personInfo.total)
					});
				},1000)
			},
			getGoodInfo(){ //获取奖品信息
					this.clearInterval =setInterval(()=>{
						getGoodInfo(this.bitCoinId).then(res=>{
							this.percentages = res.data.data.percentage; //奖品抽成
							this.personInfo = res.data.data;
							this.states = res.data.data.state
							if(res.data.data.state == 0){
								this.headers = '众筹中';
								this.bettingBtn = '确认下注';
								this.zcz = true;
								this.isdisable = false;
							}else if(res.data.data.state == 1){
								this.zcz=false;
								this.headers = '等待开奖中';
								this.bettingBtn = '等待开奖中';
							}else if(res.data.data.state == 2){
								this.zcz=false
								this.headers = '已开奖';
								this.bettingBtn = '已开奖';
							}
							
							getcurrencyinfo().then(res=>{
								for (var i = 0; i < res.data.data.length; i++) {
									if(this.personInfo.currency==res.data.data[i].symbol){
											this.cid = res.data.data[i].id;
											var uid =JSON.parse(localStorage.getItem('uid')).uid;
											if(uid){
												getuserassetsbyid(uid,this.cid).then(response=>{ //获取用户资产
													// alert(this.cid)
													this.available = (response.data.data.available).toFixed(8);
												})
											}else{
											}
									}else{
										
									}
								}
							})
							
							
						})
					},1000)
			},
			getcurrencyinfo(){
			}
		},
		beforeDestroy(){  //实例销毁之前清除掉定时器
			if(this.clearInterval){
				clearInterval(this.clearInterval);
			}
			if(this.clearIntervale){
				clearInterval(this.clearIntervale)
			}
		}
	}
</script>

<style scoped="scoped">
	@import "../../style/openprize.css"
</style>
<style>
	.el-progress{
		top: 0;
		height: 0.2rem;
		margin-bottom: 0.2rem;
	}
	.el-progress--text-inside .el-progress-bar{
		float: left;
	}
	.el-progress-bar__inner{
		background: -webkit-linear-gradient(left,#cc750a,#eab97f,#d67703);
		border-radius: 0.4rem;
		height: 0.16rem;
		margin-top: 0.01rem;
		left: 0.03rem!important;
		right: 0.03rem!important;
	}
	.el-progress-bar__outer{
		height: 0.2rem!important;
		border-radius: 0.4rem;
		background: url(/static/common/da.png) no-repeat;
		background-size: 100% 100%;
		border: 0;
		right: 0;
		background-color: #1f232d!important;
	}
	.el-progress-bar__innerText{
		display: none!important;
	}
</style>
