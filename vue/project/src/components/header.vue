<template>
	<div class="pct100 pr10 pl10 bcf bx header mainHeader">
		<p class="tc c0 vm">
			<img src="../assets/img/left_arrow.png" alt="" class="fl mt5 w10">
			<span v-text='title'></span>
			<router-link v-if='toLinkText' v-text='toLinkText' :to='toLink' class="tdn f16 mt5 abs linkText"></router-link>
		</p>
		
	</div>
</template>
<script>
	export default {
		props: [ "title", "toLink", "toLinkText" ]
	}
</script>
<style>
	.header {
	    height: 50px;
	    display: table;
	    /* position: fixed;
	    top: 0;
	    left: 0; */
	    z-index: 101;
	    border-bottom: 1px solid #E9E9E9;
	}
	.header p {
	    font-size: 1.285rem;
	    display: table-cell;
	}
	.linkText{
		color: #66A8ff;
		right: 10px;
	}
</style>