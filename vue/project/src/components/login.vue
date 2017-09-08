<template>
	<div class="rel h100 ovh loginPanel">
		<div class="subLoginPanel pct30 tc pb20 bcf8 br5 bx pt30 pb30">
			<h1 class="mb30">慧益一生</h1>
			<div class="userIcon rel">
				<input type="text" placeholder="请输入店铺编号" class="loginInput h45 pct70 f16 c9 pl40 mb20 bx br5 bn rel">
			</div>
			<div class="passwordIcon rel">
				<input type="password" placeholder="请输入密码" class="loginInput h45 pct70 f16 c9 pl40 mb20 bx br5 bn rel">
			</div>
			<button class="loginBtn pct70 f16 db h45 auto mb20 cf bn br5">登录</button>
			<div class="tr pct70 auto">
				<span class="f16">忘记密码</span>
			</div>
		</div>
	</div>
</template>
<script>
	
</script>
<style>
	@media screen and (max-width: 1000px) {
		.subLoginPanel{
			width: 80% !important;
			margin: 30% auto 0 !important;
		}
	}
	h1, span{
		color: #54ADF3;
	}
	.loginPanel{
	    background: url(../assets/img/login-bg.png) no-repeat;
	    background-size: 100% 100%;
	}
	.subLoginPanel{
	    margin: 10% auto 0;
        box-shadow: 0 0 20px rgba(0,0,0,.3);
	}
	.loginInput{
	    background-color: #54ADF3;
	    box-shadow: inset 0px 1px 2px rgba(0,0,0,.5);
	}
	.loginInput::-webkit-input-placeholder { /* WebKit browsers */ 
		color: #FFF; 
	} 
	.loginInput:-moz-placeholder { /* Mozilla Firefox 4 to 18 */ 
		color: #FFF; 
	} 
	.loginInput::-moz-placeholder { /* Mozilla Firefox 19+ */ 
		color: #FFF; 
	} 
	.loginInput:-ms-input-placeholder { /* Internet Explorer 10+ */ 
		color: #FFF; 
	}
	.userIcon:before{
		content: " ";
	    height: 15px;
	    width: 14px;
	    display: inline-block;
	    background: url(../assets/img/user.png) no-repeat;
	    background-size: 100% 100%;
	    position: absolute;
	    top: 20%;
	    left: 19%;
	    z-index: 99;
	}
	.passwordIcon:before{
		content: " ";
	    height: 15px;
	    width: 12px;
	    display: inline-block;
	    background: url(../assets/img/password.png) no-repeat;
	    background-size: 100% 100%;
	    position: absolute;
	    top: 20%;
	    left: 19%;
	    z-index: 99;
	}
	.loginBtn{
		background: #54ADF3;
	}
</style>