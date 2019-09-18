## 完全自定义的带有下拉刷新的scroll-view组件

​	看到很多人都需要下拉刷新的scroll-view组件 , 也有很多是从自己项目中抽离出来的组件 . 前端不是设计师 , 而且也难以定制样式 , 授人🐟不如授之以渔 , 所以我这边写了一个基于scroll-view的带下拉刷新的组件 . 我这边只封装了逻辑和进行优化组件的性能 . 

​	大致说明下效果 下拉时遵循一个 ease-in-out曲线(慢快慢,即手滑动距离与下拉距离非线性)  , 下拉距离至超过设置值时 可以有回弹后暂停继续回弹的效果,可以参照手机QQ的下拉刷新效果 ; 过程中有钩子事件 , 你可以改变下拉框的内容和发送请求或别的事情 . 可以看gif 可能有些卡 但是实际上不是卡的(电脑端) 手机端不知道怎么样



#### 自定义属性

```Javascript
upRefresh: {
	//是否开启下拉刷新功能 , 不要动态改变这个属性
​      type: Boolean,
    
​      default: true

​    },
	//控制显示底部的提示框(可配合scrolltolower事件用于底部加载 )
​    downLoading: {

​      type: Boolean,

​      default: false

​    },

​    scrollHeight: {

​      //scroll显示区的高度(rpx)

​      type: Number,

​      default: 800

​    },

​    moveMax: {

​      //可下拉的最大距离 指手指滑动的距离(px)  超出后会被截断 此时下拉框已经完全显示 即已经到达
//下面属性topHeight的高度

​      type: Number,

​      default: 300

​    },

​    topHeight: {
    
​      //下拉整个框的最大的高度

​      type: Number,

​      default: 100

​    },

​    animationTime: {

​      //回弹的缓动时间 当upFresh完全显示时 需要花费300ms回弹

​      //upFresh不完全显示时 时间减少 距离曲线按照ease-in-out函数 慢->快->慢

​      type: Number,

​      default: 300

​    },

​    interruptPosition: {
​      //回弹中断时的高度(px),同时判断是否下拉成功钩子的临界点 建议设置成传入提示框的高度以保持回弹暂停时文字的居中
​      type: Number,

​      default: 40

​    }
```

#### 自定义事件和下拉时的钩子

@start,@move,@end 对应touchstart,touchmove,touchend事件参数为event

**注意这些事件判断标准都是下拉的高度 , 而不是手指移动的距离**

**重要!**

##### @pushToInterrupt 下拉达到interruptPosition就会触发这个钩子 下拉过程中只会执行一次

##### @interrupt 回弹暂停的钩子,此时高度为interruptPosition,参数为解除回弹暂停的函数

##### @finished 最后回弹结束高度为0时的钩子

#### **插槽**

```
<template slot="top"></template>
<template slot="content"></template>
<template slot="bottom"></template>
```

top对应传入提示文字内容 整个下拉框要因为要设置height的变化 所以无法移除 设置了 position:relative , 你可以 slot可以设置position:absolute来控制居中之类的 如果有有要求可以回到源码中改 比如

```html
<template slot="top">
<view :style="'position: absolute;bottom: 0px;height: ' + 40 + 'px;line-height:' + 40 + 'px;width: 100%;text-align: center;'">{{tip}}</view>
</template>
//设置 position: absolute;bottom: 0px; 可以使提示文字一直在下拉框底部
//上面提到interruptPosition建议为slot的view的高度40 以保证暂停时文字的居中
```

```html
源码
 <view
      class="transform will"
      v-if="upRefresh"
      :style="'position:relative;height:' + height + 'px;'"
    >
      <slot name="top"></slot>
    </view>
//其他样式也可自行修改 , "'height:'+height+'px'"为控制下拉框变化部分 , 不可修改
```

其他两个content即为view-scroll的内容 bottom为底部加载的内容(默认关闭)

#### 示例

```Javascript
<view class="content">
		<refresh @interrupt="interrupt" @pushToInterrupt="pushToInterrupt" @finished="finished" @scrolltolower="g">
			<template slot="top">
					<view :style="'position: absolute;bottom: 0px;height: ' + 40 + 'px;line-height:' + 40 + 'px;width: 100%;text-align: center;'">
					{{tip}}	
					</view>
			</template>
			<template slot="content">
				<view v-for="index in 5" :key="index" class="" style="height: 500px;background:#B2B2B2;border: #2C405A 1px solid;">在美国总统眼里，一切都是生意，只要是生意他不在乎用什么手段。他更喜欢用敲诈勒索，刮地三尺来榨取别国的血汗钱来实现美国的伟大。就在这段日子里，美国总统喊话日韩，要求韩国上交50亿美元保护费，要求日本支付比现在多5倍的保护费，如果不给，就等着美国的怒火吧。美国总统这种做法给了日韩很大的压力，他们在给与不给的选择上左右为难，然而有一个国家却不管美国总统的臭毛病。要求韩国上交50亿美元保护费，要求日本支付比现在多5倍的保护费，如果不给，就等着美国的怒火吧。美国总统这种做法给了日韩很大的压力，他们在给与不给的选择上左右为难，然而有一个国家却不管美国总统的臭毛病。
				</view>
			</template>
			<template slot="bottom">
				<view>
				11111111111111111111111111111111111111111111111
				</view>
			</template>
		</refresh>
	</view>
	<script>
import refresh from '@/components/refresh.vue';
export default {
	components: {
		refresh
	},
	data() {
		return {
			tip: '下拉刷新'
		};
	},
	onLoad() {},
	methods: {
		g(e){},
		interrupt(e) {
            this.tip = '刷新中'
            //模拟发送请求
			setTimeout(e, 500);
			this.tip = '刷新成功';
		},
		pushToInterrupt() {
			this.tip = '释放刷新';
		},
		finished() {
			this.tip = '下拉刷新';
		}
	}
};
</script>

<style></style>

```

(1)下拉至interrupt,tip:下拉刷新->释放刷新 

(2)回弹中断:tip->刷新中,发送请求 ,回调函数 tip->刷新成功 ,执行参数e() 回弹继续

(3)完成整个过程 tip->释放刷新

###### 其他的问题

我这边只测试了h5端和微信小程序开发者工具 , 基本上bug已经被改完了,但是注意小程序端我这边使用的是自定义组件是成功的 非自定义组件不成功 , 貌似是uniapp非自定义组件不支持多slot的原因 只显示了content的slot(再次吐槽uniapp对插槽支持度 不完善slot和slot作用域非常影响插件质量) 你可以把提示移入源码都可以的 .  视极端与否 有bug可以在下面反馈下

 

