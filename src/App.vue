<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
	body,html{
		font-size: 100px;
		margin: 0;
		padding: 0;
	}
*{
	margin: 0;
	padding: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
	margin: 0;
	padding: 0;
	/* color: #FFFFFF; */
}
.header{
		text-align: center;
		color: #FFFFFF;
		height: 0.9rem;
		line-height: 0.9rem;
		font-size: 0.32rem;
	}
</style>
