<template>
	<div class="bcf8 h100">
		<pub-header title="银行卡"></pub-header>
		<div class="bcf mt10">
			<div class="p10 btc bbc h30 lh30">
				<span class="mr10 f16">开户名</span>
				<input type="text" class="h25 bn" v-model="cardData.uw_bank_accountName">
			</div>
			<div class="p10 bbc h30 lh30">
				<span class="mr10 f16">卡号</span>
				<input type="text" class="h25 bn" v-model="cardData.uw_bank_account">
			</div>
			<div class="p10 bbc h30 lh30">
				<span class="mr10 f16">开户银行</span>
				<input type="text" class="h25 bn" v-model="cardData.uw_bank_name">
			</div>
			<div class="p10 bbc h30 lh30">
				<span class="mr10 f16">开户支行</span>
				<input type="text" class="h25 bn" v-model="cardData.uw_bank_branch">
			</div>

			<div class="p10 bbc addressPanel">
				<span class="mr10 f16 db">支行地址</span>
				<div class="pct30 bx dib tl">
					<span class="db f16">省份</span>
					<select name="uw_person_type" class="pct100 bdc h30 bx" v-model="cardData.uw_bank_province" @change="getCity()">
						<option v-for="province in provinceList" :value="province.region_id">{{province.region_name}}</option>
					</select>
				</div>
				
				<div class="pct30 bx dib tl">
					<span class="db f16">城市</span>
					<select name="uw_person_type" class="pct100 bdc h30 bx" v-model="cardData.uw_bank_city" @change="getDistrict()">
						<option v-for="city in cityList" :value="city.region_id">{{city.region_name}}</option>
					</select>
				</div>

				<div class="pct30 bx dib tl">
					<span class="db f16">区域</span>
					<select name="uw_person_type" class="pct100 bdc h30 bx" v-model="cardData.uw_bank_district">
						<option v-for="district in districtList" :value="district.region_id">{{district.region_name}}</option>
					</select>
				</div>
				<input type="text" class="h25 bn pct100 mt10" v-model="cardData.uw_bank_address">
			</div>
			<button class="forgetBtn pct40 f16 db h45 auto mb20 cf bn br5 mt30" @click="editCard()">保存</button>
		</div>
	</div>
</template>
<script>
	import pubHeader from "./header.vue"
	import Store from "../assets/js/store"

	export default {
		components : {
			pubHeader
		},
		data () {
			return {
				cardData : {},
				provinceList : "",
				cityList : "",
				districtList : ""
			}
		},
		activated(){
			this.getProvinceId();
		},
		created(){
			//正式环境
			this.cardData.uw_person_id = Store.fetch().id;
			this.cardData.uw_id = Store.fetch().id;
			this.cardData.uw_person_code = Store.fetch().personCode;

			//测试数据
			/*this.cardData.uw_person_id = 622;
			this.cardData.uw_id = 622;
			this.cardData.uw_person_code = "HSHP00000047";*/
			this.cardData.uw_country_id = 1;
		},
		methods : {
			getProvinceId () {
				this.$http.get("/huiyimember/syn/cityLevel?level=1").then( (result) => {
					console.log(result);
					if(result.body.data && result.body.data.length > 0){
						this.provinceList = result.body.data;
					} else {
						this.showErrorMsgTip = true;
						this.errorMsg = "获取省出错了";
						let that = this;
	                    setTimeout(function () {
	                        that.showErrorMsgTip = false;
	                    },2000);
					}
				}, (result) => {
					console.log(result);
					this.showErrorMsgTip = true;
					this.errorMsg = "出错了";
					let that = this;
                    setTimeout(function () {
                        that.showErrorMsgTip = false;
                    },2000);
				})
			},
			getCity () {
				this.$http.get("/huiyimember/syn/cityParent?ParentId="+this.cardData.uw_bank_province).then( (result) => {
					console.log(result);
					if(result.body.data && result.body.data.length > 0){
						this.cityList = result.body.data;
					} else {
						this.showErrorMsgTip = true;
						this.errorMsg = "获取城市出错了";
						let that = this;
	                    setTimeout(function () {
	                        that.showErrorMsgTip = false;
	                    },2000);
					}
				}, (result) => {
					console.log(result);
					this.showErrorMsgTip = true;
					this.errorMsg = "出错了";
					let that = this;
                    setTimeout(function () {
                        that.showErrorMsgTip = false;
                    },2000);
				})
			},
			getDistrict () {
				this.$http.get("/huiyimember/syn/cityParent?ParentId="+this.cardData.uw_bank_city).then( (result) => {
					console.log(result);
					if(result.body.data && result.body.data.length > 0){
						this.districtList = result.body.data;
					} else {
						this.showErrorMsgTip = true;
						this.errorMsg = "获取区出错了";
						let that = this;
	                    setTimeout(function () {
	                        that.showErrorMsgTip = false;
	                    },2000);
					}
				}, (result) => {
					console.log(result);
					this.showErrorMsgTip = true;
					this.errorMsg = "出错了";
					let that = this;
                    setTimeout(function () {
                        that.showErrorMsgTip = false;
                    },2000);
				})
			},

			editCard () {
				console.log(this.cardData);

				this.$http.post("/huiyimember/web/integral/updateBank",this.cardData).then( (result) => {
					console.log(result);
					if(result.body.content && result.body.content.data.code == 200){
						this.showErrorMsgTip = true;
						this.errorMsg = "成功了";
						let that = this;
	                    setTimeout(function () {
	                        that.showErrorMsgTip = false;
	                        that.$router.push({path:"bankCard"});
	                    },2000);
					} else {
						this.showErrorMsgTip = true;
						this.errorMsg = result.body.data.msg;
						let that = this;
	                    setTimeout(function () {
	                        that.showErrorMsgTip = false;
	                    },2000);
					}
				}, (result) => {
					console.log(result);
					this.showErrorMsgTip = true;
					this.errorMsg = "出错了";
					let that = this;
                    setTimeout(function () {
                        that.showErrorMsgTip = false;
                    },2000);
				})
			}
		}
	}
</script>
<style scoped>
	.addressPanel{
		height: auto;
	}
	.forgetBtn{
		background: #54ADF3;
		color: #FFF;
	}
	.errorTip{
        background-color: rgba(102, 102, 102, 0.9);
        line-height: 30px;
        top:50%;
        left: 50%;
        margin: 0 0 0 -25%;
    }
    .showError-enter-active,.showError-leave-active{
        transition: 0.5s all ease;
        opacity: 1;
    }
    .showError-enter,.showError-leave-active{
        opacity: 0;
    }
</style>