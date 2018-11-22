<template>
	<div v-show="alertShow" class="popup">
		<div class="popdiv">
			<slot name='main'>{{AlertMain}}</slot>
		</div>
	</div>
</template>

<script>
	export default{
		name:'popup',
		data(){
			return{
				AlertMain:'',
				alertShow:false
			}
		},
		created:function(){
			// this.isShows()
		},
		methods:{
			isShows(){
				setTimeout(this.alertS,1000);
				this.alertShow =true;
			},
			alertS(){
				this.alertShow =false;
			}
		}
	}
</script>

<style scoped="scoped">
	.popup{
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 9999;
		display: flex;
		justify-content: center;
		
		/* align-items: center; */
	}
	.popdiv{
		background-color: #5e6066;
		text-align: center;
		line-height: 0.5rem;
		border-radius: 0.3rem;
		padding:  0.1rem 0.25rem;
		height: 0.5rem;
		min-width: 3.5rem;
		font-size: 0.34rem;
		color: #FFFFFF;
	}
</style>
