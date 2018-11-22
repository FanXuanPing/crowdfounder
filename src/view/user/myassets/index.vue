 <template>
	<div class="myassets">
		<div class="header">
			<div  class="fanhui" @click="goback()">
				<img src="static/common/fanhui.png"/>
			</div>
			我的资产
		</div>
		<div class="myassDiv">
			<div :id="item.currencyId" v-for="item in myassets" class="myassetsList" @click="gocharge(item.currencyId)">
				<div class="myassLeft">
					<img src="static/common/user/zichanqian.png"/>
					<span>{{item.currencyName}}</span>
				</div>
				<div class="myassRight">
					<div>总资产：<span>{{(item.balance).toFixed(8)}}</span></div>
					<div>可用：{{(item.available).toFixed(8)}}</div>
					<div>冻结：{{(item.hold).toFixed(8)}}</div>
				</div>
			</div>
			
		</div>
		
		<new-slots style='top: 3rem;' ref='al' >
			<p slot='main'>{{AlertMain}}</p>
		</new-slots>
	</div>
</template>

<script>
	import {getMyassets} from '@/api/user/userAPI'
	import newSlots from '@/components/solts'
	export default{
		name:'myassets',
		components:{
			newSlots
		},
		data(){
			return{
				AlertMain:'',  //弹窗内容
				myassets:[
 				]
			}
		},
		mounted:function(){
			this.getMyassets()
		},
		methods: {
			goback() {
				this.$router.push({
					path:'/home/user'
				})
			},
			gocharge(Id){
				sessionStorage.setItem('mycid',Id);
				this.$router.push({
					path:'/recharge'
				})
			},
			getMyassets(){
				let uid =JSON.parse(localStorage.getItem('uid')).uid;
				getMyassets(uid).then(res=>{
					this.myassets =res.data.data;
				})
			}
		},
	}
</script>

<style scoped="scoped">
.header{
		background-color: rgb(31,34,45);
		position: fixed;
		width: 100%;
		top: 0;
		left: 0;
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
	.myassDiv{
		background-color: rgb(31,34,45);
	}
	.fanhui img{
		width: 0.2rem;
	}
	.myassets{
		height: 100vh;
		background-color: #1f222d;
		display: flex;
		flex-direction: column;
	}
	.myassDiv{
		flex: 1;
		margin-top: 0.9rem;
	}
	.myassetsList{
		width: 6.9rem;
		height: 1.9rem;
		margin: auto;
		margin-top:0.2rem;
		display: flex;
		align-items: center;
		background: url(/static/common/user/zichanyuan.png)no-repeat;
		background-size: 100% 100%;
	}
	.myassLeft{
		width: 1.15rem;
		height: 1.15rem;
		border-radius: 0.1rem;
		border: 0.01rem solid #484f56;
		margin-left: 0.25rem;
		color: #FFFFFF;
		font-size: 0.23rem;
		display: flex;
		flex-direction: column;
		justify-content:space-around;
		align-items: center;
	}
	.myassLeft img{
		width: 0.55rem;
		height: 0.55rem;
		border-radius: 100%;
	}
	.myassRight{
		height: 1.3rem;
		width: 4rem;
		margin-left: 0.25rem;
		font-size: 0.26rem;
		color: #FFFFFF;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.myassRight span{
		color: #eab97f;
	}
	.myassDiv> div:nth-last-child(1){
		margin-bottom: 1rem;
	}
</style>
