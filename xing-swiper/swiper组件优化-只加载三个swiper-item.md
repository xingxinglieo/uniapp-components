# swiper组件优化-只加载三个swiper-item

很多人想用swiper和nav做成导航栏效果 , 但是swiper中放入过多的组件,在webview性能还不好的情况下,会有明显的卡顿.

官方也提到了这个问题,也提出解决办法,用三个`swiper-item`来加载数据.我之前写了完整的swiper组件 . 但是层级嵌套过深 ,  布局较为麻烦 , 且swiper-item不支持插槽 , 所以并不是很好用 . 我考虑之后 , 写一个混入会更合适一些 . 但是没有全部封装 , 所以要注意一些东西 . 

**说明与示例**

```Javascript
//一个用到优化swiper的组件内
//...为其他内容
<template>
	...
	<swiper :indicator-dots="false" @change="change" :vertical="false" circular>
	//indicator-dots必须为false
	//因为item只有3项,如果你需要指示点可以自己写一个 当前组件索引为 this.swiperList[this.swiperCurrent]
	//circular必须为true
	//change事件的函数必须有,后面需要处理数据
		<swiper-item v-for="(item, index) in 3" :key="index">
			<view class="swiper-item">
                //组件列表...
                <component-one v-if="swiperList[index] == 0"/>
                <component-two v-if="swiperList[index] == 1"/>
                <component-three v-if="swiperList[index] == 2"/>
                ...
                <component-ten v-if="swiperList[index] == 9"/>
             </view>
		</swiper-item>
	</swiper>
	...
<template/>
<script>
import xingSwiperComponent from '@/components/xing-swiper.js';
...
import componentOne from '...'
import componentTwo from '...'
...
//xingSwiperComponent 是一个返回混入对象函数,参数如同输入prop
const xingSwiper = xingSwiperComponent({
    length:10//填入列表的长度,要求
    index:0 //首次的展示列表的第index个component,默认0
})
export default {
    components{
		componentOne,
		componentTwo,
		...
	},
	...
	mixins:[xingSwiper],//混入
	//暴露的混入属性
	//1.this.swiperCurrent 当前的swiper中item的索引即对应 0,1,2 中的一个 , change时用到
	//2.this.swiperList component的索引列表 
	//关注 this.swiperList[this.swiperCurrent] 当前组件的索引
	//暴露的混入方法
	//this.refreshIndex(index) 直接跳至index对应的组件
	...
	methods(){
		...
		//在swiper上绑定的change事件函数内
		change(e){
			...
			this.swiperCurrent = e.detail.current;//赋值后,watch就自动完成前后组件的更新了
			...
		},
		...
	},
	
}
<script/>

```

