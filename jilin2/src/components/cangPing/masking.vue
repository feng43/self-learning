<template>
    <div class="masking-wrapper">
        <!--<p class="masking-all" @click="toggleCity()"><span>吉林省全省</span><i></i></p>-->
        <p class="masking-new" @click="toggleCity()"><span>吉林省全省</span><img src="../../static/images/zhanxunGo.png" alt="" /></p>
        <section class="city-wrapper">
            <div id="scrollwrapper">
                <ul v-if="cityMuseumList">
                    <li :class="{active:maskItem.name==cityName}" v-for="(maskItem,index) in cityMuseumList" @click="showCity(maskItem,index)">{{maskItem.name}}</li>
                </ul>
            </div>
            <city-list :cityMuseumList="cityMuseumList" :mySwiperTwo="mySwiperTwo" :oddHotPic="oddHotPic" :getlistDate="getDate" :cityToggle="cityToggle" :cityName="cityName" @send="getMuseumItem"></city-list>
        </section>
        <transition name="fade">
            <span class="black" @click="black" v-show="showMasking"></span>
        </transition>
    </div>
         
    
</template>

<script>
    import cityList from "./cityList.vue";
    import $ from "../../static/js/jquery-1.11.3.js";
    export default {
       data(){
           return{
               cityToggle:{},
               cityName : '吉林市'
           }
       },
       props:["showMasking","cityMuseumList","getDate","oddHotPic","mySwiperTwo"],
       methods:{
           showCity(city){
               this.cityToggle = city;
               this.cityName = city.name;
           },
           black(){
           	this.$emit('black');
           },
           getMuseumItem(data){
            //    console.info(data)
               this.$emit('send',data);
           },
           toggleCity(){
               this.$emit("toggleCity");
           },
           intpubuliu(){
           		this.$emit("initSeting");
           }
       },
       components:{
           "city-list":cityList
       },
       mounted(){
        // new iScroll('#menuWrapper');
        	console.log(this.mySwiperTwo);
       }
    }

</script>

<style scoped>
    .fade-enter-active,.fade-leave-active{
        transition: all .5s;
    }
    .fade-leave-active,.fade-enter{
        transform: translateY(100%);
        opacity: 0;
    }
    .masking-wrapper{
        position:fixed;
        left:0;
        top:0.8rem;
        bottom:0;
        right:0;
        /*background-color: rgba(0,0,0,.5); */
        z-index:100;
    }
     .masking-all{
         /*margin-top:0.87rem;*/
         background-color: rgb(255, 255, 255);
         height: 0.76rem;
         font-size: 0.26rem;
         font-family: "Microsoft YaHei";
         color: rgb(51, 51, 51);
         line-height:0.76rem;
         border-top:0.01rem solid #ececec;
         display:flex;
         justify-content: space-between;
         padding:0 0.26rem 0 0.68rem;
         
         border-bottom:0.1rem solid #ececec;
     }
     .masking-new{
     	 background-color: rgb(255, 255, 255);
         height: 0.76rem;
         font-size: 0.26rem;
         font-family: "Microsoft YaHei";
         color: rgb(51, 51, 51);
         line-height:0.68rem;
         border-top:0.01rem solid #ececec;
         padding:0 0.26rem 0 0.68rem;
         border-bottom:0.1rem solid #ececec;
     }
     .masking-new img{
     	float: right;
     	width:0.19rem;
     	height: 0.36rem;
     	margin-top: 0.15rem;
     }
     .black{
        position:fixed;
        left:0;
        top:0.87rem;
        bottom:0;
        right:0;
        background-color: rgba(0,0,0,.5); 
        z-index:-999;
     }
     .masking-all>span{
        flex:1
     }
     .masking-all>i{
         min-width: 0.19rem;
         height:0.35rem;
         transform: rotate(180deg);
         line-height: 0.35rem;
         background:url("../../static/images/bowuguan_backBtn.png") left center  no-repeat;
         background-size:0.19rem 0.35rem;
         align-self: center;
     }
     /*.city-wrapper{
        
     }*/
     .city-wrapper{
         /*display:flex;*/
         /*flex-direction: column;*/
         /*width:2.11rem;*/
        /*overflow: hidden;*/
         overflow-y:auto;
 		-webkit-overflow-scrolling : touch; 
         background-color:#f0f0f0;
     }
     #scrollwrapper{
     	float: left;
         overflow: auto;
         height: 8.1rem;
         background-color: #f0f0f0;
     }
     .city-wrapper .menu-detail{
         padding-left:0.20rem;
     }
     #scrollwrapper li{
        /*display: flex;*/
        /*justify-content: center;
        align-items: center;
        padding:12px;*/
        min-width: 2.11rem;
        width:2.11rem;
        min-height: 0.30rem;
        /*box-shadow: 0 1px 0 #ccc;*/
     }
     .city-wrapper li{
         width:2.11rem;
         height:0.85rem;
         line-height: 0.85rem;
         padding-left:0.68rem;
         background-color:#fff;
     }
     .city-wrapper li.active{
         background-color:#f0f0f0;
     }
</style>