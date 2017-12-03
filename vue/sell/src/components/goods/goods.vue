<template>
    <div class="goods">
        <div class="menu-wrapper" ref="menuWrapper">
            <ul class="">
                <li v-for="(item, index) in goods" class="menu-item" :class="currentIndex === index ? 'current' : ''" @click="selectMenu(index, $event)">
                    <span class="text border-1px">
                        <span v-show="item.type > 0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
                    </span>
                </li>
            </ul>
        </div>
        <div class="foods-wrapper" ref="foodWrapper">
            <ul>
                <li v-for="item in goods" class="food-list food-list-hook">
                    <h1 class="title">{{item.name}}</h1>
                    <ul>
                        <li v-for="food in item.foods" class="food-item border-1px">
                            <div class="icon">
                                <img width="57" height="57" :src="food.icon" alt="">
                            </div>
                            <div class="content">
                                <h2 class="name">{{food.name}}</h2>
                                <p class="desc">{{food.description}}</p>
                                <div class="extra">
                                    <span class="count">月售{{food.sellCount}}</span>
                                    <span>好评率{{food.rating}}%</span>
                                </div>
                                <div class="price">
                                    <span class="now">￥{{food.price}}</span>
                                    <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                                </div>
                                <div class="cartcontrol-wrapper">
                                    <cartcontrol :food="food" @addCartAni="_drop"></cartcontrol>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <shopcart ref="shopcart" :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
    </div>
</template>

<script>
    import BScroll from "better-scroll";
    import shopcart from "components/shopcart/shopcart";
    import cartcontrol from "components/cartcontrol/cartcontrol";

    const ERR_OK = 0;
    export default {
        props: {
            seller: {
                type: Object
            }
        },
        data() {
            return {
                goods : [],
                listHeight: [],
                scrollY: 0
            };
        },
        computed: {
            currentIndex() {
                for(let i = 0; i < this.listHeight.length; i++){
                    let height1 = this.listHeight[i];
                    let height2 = this.listHeight[i + 1];
                    if(!height2 || (this.scrollY >= height1 && this.scrollY < height2)){
                        return i;
                    }
                }
                return 0;
            },
            selectFoods() {
                let foods = [];
                this.goods.forEach((good) => {
                    good.foods.forEach((food) => {
                        if(food.count){
                            foods.push(food);
                        };
                    });
                });
                return foods;
            }
        },
        created() {
            this.$http.get('/api/goods').then((response) => {
                response = response.body;
                if(response.errno === ERR_OK){
                    this.goods = response.data;
                    this.$nextTick(() => {
                        this._initScroll();

                        // 计算高亮
                        this._calculateHeight();
                    });
                }
            });
            this.classMap = ['decrease','discount','special','invoice','guarantee'];
        },
        methods: {
            selectMenu(index, event) {
                // return 浏览器原生点击事件
                if(!event._constructed){
                    return;
                };
                let foodList = this.$refs.foodWrapper.getElementsByClassName("food-list-hook");
                let el = foodList[index];
                this.foodsScroll.scrollToElement(el, 300);
            },
            _initScroll() {
                // 两个参数 第一个为DOM
                this.menuScroll = new BScroll(this.$refs.menuWrapper, {
                    click: true
                });

                this.foodsScroll = new BScroll(this.$refs.foodWrapper, {
                    // 监听实时滚动的位置
                    probeType: 3,
                    click: true
                });
                // 获取实时滚动位置的Y坐标
                this.foodsScroll.on("scroll", (pos) => {
                    this.scrollY = Math.abs(Math.round(pos.y));
                })
            },
            _calculateHeight() {
                let foodList = this.$refs.foodWrapper.getElementsByClassName("food-list-hook");
                let height = 0;
                this.listHeight.push(height);
                for(let i = 0; i < foodList.length; i++){
                    let item = foodList[i];
                    height += item.clientHeight;
                    this.listHeight.push(height);
                }
            },

            // 小球下落方法
            _drop(target) {
                this.$refs.shopcart.drop(target);
            }
        },
        components: {
            "shopcart" : shopcart,
            "cartcontrol" : cartcontrol
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import '../../common/stylus/mixin.styl'
    
    .goods
        display: flex
        position: absolute
        top: 174px
        bottom: 46px
        width: 100%
        overflow: hidden
        .menu-wrapper
            // flex属性：等分 内容格式缩放情况 站位空间
            flex: 0 0 80px
            width: 80px
            background: #F3F5F7
            .menu-item
                display: table
                height: 54px
                width: 56px
                line-height: 14px
                padding: 0 12px
                &.current
                    position: relative
                    z-index: 10
                    margin-top: -1px
                    background: #FFFFFF
                    font-weight: 700
                    .text
                        border-none()
                .icon
                    display: inline-block
                    vertical-align: top
                    width: 12px
                    height: 12px
                    margin-right: 2px
                    background-size: 12px 12px
                    background-repeat: no-repeat
                    &.decrease
                        bg-image('decrease_3')
                    &.discount
                        bg-image('discount_3')
                    &.guarantee
                        bg-image('guarantee_3')
                    &.invoice
                        bg-image('invoice_3')
                    &.special
                        bg-image('special_3')
                .text
                    display: table-cell
                    width: 56px
                    vertical-align: middle
                    font-size: 12px
                    border-1px(rgba(7, 17, 27, .1))
        .foods-wrapper
            flex: 1
            .title
                padding-left: 14px
                height: 26px
                line-height: 26px
                border-left: 2px solid #D9DDE1
                font-size: 12px
                color: rgb(147, 153, 159)
                background: #F3F5F7
            .food-item
                display: flex
                margin: 18px
                padding-bottom: 18px
                border-1px(rgba(7, 17, 27, .1))
                &:last-child
                    border-none()
                    margin-bottom: 0
                .icon
                    flex: 0 0 57px
                    margin-right: 10px
                .content
                    flex: 1
                    .name
                        margin: 2px 0 8px 0
                        height: 14px
                        line-height: 14px
                        font-size: 14px
                        color: rgb(7, 17, 27)
                    .desc, .extra
                        line-height: 10px
                        font-size: 10px
                        color: rgb(147, 153, 159)
                    .desc
                        margin-bottom: 8px
                        line-height: 12px
                    .extra
                        .count
                            margin-right: 12px
                    .price
                        font-weight: 700
                        line-height: 24px
                        .now
                            margin-right: 8px
                            font-size: 14px
                            color: rgb(240, 20, 20)
                        .old
                            text-decoration: line-through
                            font-size: 10px
                            color: rgb(147, 153, 159)
                    .cartcontrol-wrapper
                        position: absolute
                        right: 0
                        bottom: 12px
</style>
