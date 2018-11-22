<template>
	<div class="main">
		<keep-alive>
			<router-view/>
		</keep-alive>
		<foo-ter></foo-ter>
	</div>
</template>

<script>
	import FooTer from "@/components/layout/footer"
	export default{
		name:'home',
		components:{
			FooTer,
		}
	}
</script>

<style scoped="scoped">
		.main{
			height: 100vh;
			background-color: rgb(31,34,45);
		}
</style>
