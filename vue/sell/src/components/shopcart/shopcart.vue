<template>
	<div class="shopcart">
		<div class="content">
			<div class="content-left">
				<div class="logo-wrapper">
					<div class="logo" :class="totalCount > 0 ? 'highlight' : ''">
						<i class="icon-shopping_cart"></i>
					</div>
					<div class="num" v-show="totalCount">{{totalCount}}</div>
				</div>
				<div class="price" :class="totalPrice > 0 ? 'highlight' : ''">￥{{totalPrice}}元</div>
				<div class="desc">{{payDesc}}</div>
			</div>
			<div class="content-right">
				<div class="pay" :class="payClass">
					￥{{minPrice}}元起送
				</div>
			</div>
		</div>
		<div class="ball-container">
			<transition name="drop" v-for="ball in balls" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
				<div v-show="ball.show" class="ball">
					<div class="inner inner-hook"></div>
				</div>
			</transition>
		</div>
	</div>
</template>

<script>
    export default {
    	props: {
    		selectFoods: {
    			type: Array,
    			// type为Array或Object时 default为一个函数
    			default() {
    				return [];
    			}
    		},
    		deliveryPrice: {
                type: Number,
                default: 0
            },
    		minPrice: {
    			type: Number,
    			default: 0
    		}
    	},
    	data() {
    		return {
    			balls: [
	    			{
	    				show: false
	    			},{
	    				show: false
	    			},{
	    				show: false
	    			},{
	    				show: false
	    			},{
	    				show: false
	    			}
    			],
    			dropBalls: []

    		};
    	},
    	computed: {
    		totalPrice() {
    			let total = 0;
    			this.selectFoods.forEach((food) => {
    				total += food.price * food.count;
    			});
    			return total;
    		},
    		totalCount() {
    			let count = 0;
    			this.selectFoods.forEach((food) =>{
    				count += food.count;
    			});
    			return count;
    		},
    		payDesc() {
    			if(this.totalPrice === 0) {
    				return `￥${this.minPrice}元起送`;	
    			} else if(this.totalPrice < this.minPrice){
    				let diff = this.minPrice - this.totalPrice;
    				return `还差￥${diff}元起送`;
    			} else {
    				return '去结算';
    			}
    		},
    		payClass() {
    			if(this.totalPrice < this.minPrice){
    				return "not-enough";
    			} else {
    				return "enough";
    			}
    		}
    	},
    	methods: {
    		drop(target) {
    			for(let i = 0; i < this.balls.length; i++){
    				let ball = this.balls[i];
    				if(!ball.show) {
    					ball.show = true;
    					ball.el = target;
    					this.dropBalls.push(ball);
    					return;
    				}
    			}
    		},
    		beforeEnter(el) {
    			let count = this.balls.length;
    			for(let i = 0; i < count; i++){
    				let ball = this.balls[i];
    				if(ball.show) {
    					// 计算差值
    					let rect = ball.el.getBoundingClientRect();
    					let x = rect.left - 32;
    					let y = -(window.innerHeight - rect.top - 22);
						el.style.display = 'inline-block';
						el.style.webkitTransform = `translate3d(0px,${y}px,0px)`;
						el.style.transform = `translate3d(0px,${y}px,0px)`;
						let inner = el.getElementsByClassName('inner-hook')[0];
						inner.style.webkitTransform = `translate3d(${x}px,0px,0px)`;
						inner.style.transform = `translate3d(${x}px,0px,0px)`;
    				}
    			}
    		},
    		enter(el) {
    			// 重绘
    			let rf = el.offsetHeight;
    			this.$nextTick(() => {
    				el.style.display = '';
					el.style.webkitTransform = 'translate3d(0px,0px,0px)';
					el.style.transform = 'translate3d(0px,0px,0px)';
					let inner = el.getElementsByClassName('inner-hook')[0];
					inner.style.webkitTransform = 'translate3d(0px,0px,0px)';
					inner.style.transform = 'translate3d(0px,0px,0px)';
    			});
    		},
    		afterEnter(el) {
    			let ball = this.dropBalls.shift();
    			if(ball){
    				ball.show = false;
    				el.style.display = 'none';
    			}
    		}
    	}
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
	.shopcart
		position: fixed
		left: 0
		bottom: 0
		z-index: 50
		width: 100%
		height: 48px
		.content
			display: flex
			background: #141D27
			font-size: 0
			color: rgba(255, 255, 255, .4)
			.content-left
				flex: 1
				.logo-wrapper
					display: inline-block
					position: relative
					top: -10px
					margin: 0 12px
					padding: 6px
					width: 56px
					height: 56px
					box-sizing: border-box
					vertical-align: top
					border-radius: 50%
					background: #141D27
					.logo
						width: 100%
						height: 100%
						border-radius: 50%
						text-align: center
						background: #2B343C
						&.highlight
							background: rgb(0, 160, 220)
							.icon-shopping_cart
								color: #FFFFFF
						.icon-shopping_cart
							line-height: 44px
							font-size: 24px
							color: #80858A	
					.num
						position: absolute
						top: 0
						right: 0
						width: 24px
						height: 16px
						line-height: 16px
						text-align: center
						border-radius: 16px
						font-size: 9px
						font-weight: 700
						color: #FFFFFF
						background: rgb(240, 20, 20)
						box-shadow: 0 4px 8px 0 rgba(0, 0, 0, .4)
				.price
					display: inline-block
					vertical-align: top
					margin-top: 12px
					line-height: 24px
					padding-right: 12px
					box-sizing: border-box
					border-right: 1px solid rgba(255, 255, 255, .1)
					font-size: 16px
					font-weight: 700
					&.highlight
						color: #FFFFFF
				.desc
					display: inline-block
					vertical-align: top
					margin: 12px 0 0 12px
					line-height: 24px
					font-size: 10px
			.content-right
				flex: 0 0 105px
				width: 105px
				.pay
					height: 48px
					line-height: 48px
					text-align: center
					font-size: 12px
					font-weight: 700
					background: #2B333B
					&.not-enough
						background: #2B333B
					&.enough
						background: #00B43C
						color: #FFFFFF
		.ball-container
			.ball
				position: fixed
				left: 32px
				bottom: 22px
				z-index: 600
				transition: all .4s cubic-bezier(.49, -.29, .75, .41)
				.inner
					width: 16px
					height: 16px
					border-radius: 50%
					background: rgb(0, 160, 220)
					transition: all .4s linear
</style>
