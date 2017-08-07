<template>
	<div id="app">
		<transition name="bounce">
			<router-view></router-view>
		</transition>
	</div>
</template>

<script type="text/babel">
export default {
  name: 'app',
  components: {
  }
}

</script>

<style scoped>
	.bounce-enter-active {
		animation: bounce-in 0s;
	}
	.bounce-leave-active {
		animation: bounce-out 0s;
	}
	#app {
		height: 100%;
	}
</style>