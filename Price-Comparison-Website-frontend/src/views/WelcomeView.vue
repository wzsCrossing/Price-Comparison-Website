<script setup>

</script>

<template>
	<div style="width: 100vw; height: 100vh; overflow: hidden; display: flex">
		<div style="flex: 1">
			<el-image style="width: 100%; height: 100%"
						src="https://img.52desk.com/tp/185700iE26b.jpg"/>
		</div>
		<div style="width: 30%; background-color:aliceblue; text-align: center">
			<router-view/>
		</div>	
  </div> 
</template>

<style scoped>

</style>
