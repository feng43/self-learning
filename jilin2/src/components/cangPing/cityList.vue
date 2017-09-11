<template>
    <div id="menuWrapper">
        <ul class="menu-detail">
            
            <!--<li v-if="cityName=='吉林市'" v-for="museumItem in cityMuseumList[1].museum" @click="getCityInfo()">{{museumItem.name}}</li>
            <li v-else v-for="museumItem in cityToggle.museum" @click="getCityInfo()">{{museumItem.name}}</li>-->
            <li v-if="cityToggle.museum" v-for="museumItem in cityToggle.museum" @click="geiBowuguanData(museumItem)">{{museumItem.name.slice(0,8)}}</li>
            

        </ul>
    </div>
</template>

<script>
    import {mapMutations} from "vuex";
    export default {
       data(){
           return{
               categoryId:null,
               localStr:"",
           }
       },
       props:[
           "cityMuseumList",
           "cityToggle",
           "cityName",
           "getlistDate",
           "oddHotPic",
           "mySwiperTwo",
       ],
       methods:{
       	  geiBowuguanData(museumItem){
       	  	this.$emit('intpubuliu');
       	  	this.getCityInfo(museumItem);
       	  	console.log(this.mySwiperTwo)
       	  },
          getCityInfo(museumItem){
            //   console.info("这是博物馆")
            //   console.info(museumItem)
//          this.oddHotPic = [];
            console.log(this.getlistDate);
              this.$http.get(`${this.$store.state.mutations.getUrl}/mip/mobile/collection//getConditions.do?museumId=${museumItem.id}`)
                    .then( (res) => { //拿到的是二级分类的名字
                        console.info(res.data.data);
                        let secCategory = res.data.data;
//                      alert(this.oddHotPic);
                        
                        this.$http.get(`${this.$store.state.mutations.getUrl}/mip/mobile/collection/getList.do?museumId=${museumItem.id}&currentPage=1&size=20`)
                                .then( (response) => { //拿到的是博物馆对应的图片
                                    // console.info(response);
                                    this.getlistDate.totalPage =response.data.page.currentPage;
                                    this.getlistDate.totalPageGundong =response.data.page.totalPage;
                                    this.getlistDate.museumId =museumItem.id;
                                    this.getlistDate.dataList=response.data.data;
									this.localStr = JSON.stringify(this.getlistDate);
									sessionStorage.localStr = this.localStr;
                                    
                                    
                                    $("#topNav .active").removeClass('active');
                   					$("#topNav .cur").addClass('active');
                   					this.$store.dispatch('hideYearTime');//热门隐藏年代
                   					$(".cp-pic").animate({top:"0"});
									$("#pubuliu .cpjs-msg").animate({top:"0"});
                                    let museumAllPic = response.data.data;
                                    let meseumCpAll = response.data.page.allRow;//拿到共有多件藏品数量
                                    let museumId = museumItem.id;
                                    //二级分类滑动
                                    var swiperWidth = this.mySwiperTwo.container[0].clientWidth,
				                    nowTlanslate; //
					                var maxTranslate = -($("#topNav .cur").parent()[0].scrollWidth-swiperWidth);
					                var maxWidth = -maxTranslate + swiperWidth / 2;
				                
				                    var slide = $("#topNav .cur").parent()[0];
				                    var slideLeft = slide.offsetLeft;
				                    var slideWidth = slide.clientWidth;
				                    
				                    var slideCenter = slideLeft + slideWidth / 2;
				                    this.mySwiperTwo.setWrapperTransition(300);
									console.log(slideWidth);
				                    if (slideCenter <= swiperWidth / 2) {
				                        this.mySwiperTwo.setWrapperTranslate(0);
				                    } else if (slideCenter > maxWidth) {
				                        this.mySwiperTwo.setWrapperTranslate(maxTranslate);
				                    } else {
				                        nowTlanslate = slideCenter - swiperWidth / 2;
				                        this.mySwiperTwo.setWrapperTranslate(-nowTlanslate);
				                    }
		                                    
                                    this.$emit('send',{museumItem,secCategory,museumAllPic,meseumCpAll,museumId});
                                })
                                .catch( (error) => {
                                    console.info(error)
                                })
                    })
                    .catch( (error) => {
                        console.info(error)
                    })
          }
       },
       mounted(){
        	
       }
    }

</script>


<style scoped>
    #menuWrapper{
         overflow: auto;
         height: 8.1rem;
    }
     .menu-detail{
         /*display:flex;
         flex-direction: column;*/
         width:100%;
         overflow: auto;
         padding-bottom: 0.5rem;
     }
     .menu-detail>li{
         height:0.85rem;
         line-height: 0.85rem;
         padding-left:0.68rem;
         /*flex:1;*/
     }
</style>