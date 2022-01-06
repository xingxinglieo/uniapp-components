<template>
	<!-- class:query 挂载后会查询高度(px) -->
	<scroll-view
		id="list"
		:style="style"
		:class="'query ' + customClass"
		scroll-y="true"
		:lower-threshold="lowerThreshold"
		:upper-threshold="upperThreshold"
		:scroll-top="scrollTop"
		:scroll-into-view="scrollIntoView"
		:scroll-with-animation="scrollWithAnimation"
		:enable-back-to-top="enableBackToTop"
		:refresher-enabled="refresherEnabled"
		:refresher-threshold="refresherThreshold"
		:refresher-default-style="refresherDefaultStyle"
		:refresher-background="refresherBackground"
		:refresher-triggered="refresherTriggered"
		:enable-flex="enableFlex"
		:scroll-anchoring="scrollAnchoring"
		@scroll="scroll"
		@click="click"
		@scrolltolower="scrolltolower"
		@scrolltoupper="scrolltoupper"
		@refresherpulling="refresherpulling"
		@refresherrefresh="refresherrefresh"
		@refresherrestore="refresherrestore"
		@refresherabort="refresherabort"
	>
		<view id="header" class="query"><slot name="header" :query="query" /></view>
		<!-- 撑起高度 dom -->
		<!-- @animationstart dom 挂载的 hack 技巧  -->
		<view
			class="animation-fade-1"
			@animationstart="queryDomsHeight"
			:style="'height:' + scrollHeight + 'px;'"
		></view>
		<!-- 移动口 -->
		<view class="list" :style="'transform: translateY(' + scrollTopPosition + 'px);'">
			<view
				v-for="(item, index) in actualItems"
				:key="getKey(item, visibleItemsIndex[index])"
				:class="visibleItemsIndex[index] === undefined ? 'measure' : ''"
			>
				<slot
					:item="item"
					:index="visibleItemsIndex[index]"
					:actualIndex="index"
					:query="query"
				/>
			</view>
			<!-- footer 在移动口内 -->
			<view id="footer" class="query"><slot name="footer" :query="query" /></view>
		</view>
	</scroll-view>
</template>

<script>
import PrefixSumManage from './PrefixSumManage';
import defaultMixin from './scrollViewDefaultMixin';
import { throttle } from './utils';
export default {
	mixins: [defaultMixin],
	props: {
		dataSources: {
			// 数据源 还需要在 mouted 生命周期
			type: Array,
			required: true
		},
		dataKey: {
			// key 可以是键名可以是函数
			type: [String, Function],
			default: (_item, index) => index
		},
		height: {
			// 视口高
			type: [Number, String],
			required: true
		},
		preRender: {
			// 预渲染数
			type: [Number, Array],
			default: 10
		},
		calculteMax: {
			// 计算高度最大值，用于分片
			type: Number,
			default: 20
		},
		throttle: {
			//节流间隔
			type: [Boolean, Number],
			default: false
		},
		query: {
			// 父级作用域兜底方案
			type: Object,
			default: () => ({})
		},
		customStyle: {
			type: String,
			default: ''
		},
		customClass: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
			start: 0,
			end: 0, // 截取 [start,end]
			lastScrollTop: 0, // 记录最后滚动的位置，用于无滚动时重新计算位置
			prefixSum: [], // 前缀和数组
			measureItems: [], // 测量的项，会被渲染到屏幕上然后通过 api 测量高度
			scrollDomHeight: 0, // 测量视口高(px)
			headerDomHeight: 0, // 测量 header 高
			footerDomHeight: 0 // 测量 footer 高
		};
	},
	computed: {
		/* props 处理 start*/
		calcHeight() {
			return Number.isNaN(+this.height) ? this.height : this.height + 'px';
		},
		style() {
			// relative 优先级高
			return `${this.customStyle};height: ${
				this.calcHeight
			};position: relative !important;`;
		},
		scrollHeight() {
			// 前缀和最后一项即为总高度
			return this.prefixSum[this.prefixSum.length - 1];
		},
		getKey() {
			// 小程序模板中无法写表达式所以需要方法
			return typeof this.dataKey === 'string'
				? item => item[this.dataKey]
				: typeof this.dataKey === 'function'
				? this.dataKey
				: (_item, index) => index;
		},
		preRenderNums() {
			// 5 等效于 [5,5]
			const preRender = this.preRender;
			return typeof preRender === 'number' ? [preRender, preRender] : preRender;
		},
		/* props 处理 end*/

		/* 渲染相关 items,prefixSun 处理 start */
		actualStart() {
			// 实际渲染的项 start，会加上 preRender
			const start = this.start - this.preRenderNums[0];
			return start < 0 ? 0 : start;
		},
		actualEnd() {
			// 实际渲染的end，会加上 preRender
			const end = this.end + this.preRenderNums[1];
			return end >= this.dataSources.length ? this.dataSources.length - 1 : end;
		},
		visibleItems() {
			// [actualStart, actualEnd] 所以 end + 1
			return this.dataSources.slice(this.actualStart, this.actualEnd + 1);
		},
		actualItems() {
			// 渲染到屏幕上的项会加上 measureItems
			return [...this.visibleItems, ...this.measureItems];
		},
		visibleItemsIndex() {
			// index 为在原数组中的 index，measureitem 的 index 将为 undefined
			return this.visibleItems.map((_, i) => this.actualStart + i);
		},
		scrollTopPosition() {
			// 移动口
			return this.headerDomHeight + this.prefixSum[this.actualStart - 1];
		}
		/* 渲染相关 items,prefixSun 处理 end*/
	},
	created() {
		this.$on('shouldCalculate', this.measureDoms);
		this.$on('prefixSumChanged', this.reCalculatePostion);
		this.$on('prefixSumChanged', this.deletetolower);
	},
	beforeDestroy() {
		this.$off();
	},
	methods: {
		/* 初始化 */
		initDataSources(dataSources) {
			if (!this.prefixSumManage) {
				this.prefixSumManage = new PrefixSumManage({
					prefixSum: this.prefixSum,
					vm: this,
					calculteMax: this.calculteMax
				});
			}
			return this.prefixSumManage.initOrigin(dataSources);
		},

		/* 测量 */
		/**
		 * 在调用修改源数组方法后,触发 PrefixSumManage,
		 * 触发 shouldCalculate 事件调用此函数 测量新增项高度
		 **/
		async measureDoms({ items, feedback }) {
			this.measureItems = items;
			await this.$nextTick(); // nextTick 后 dom 改变
			const query = uni
				.createSelectorQuery()
				.in(this)
				.selectAll('.measure');
			query
				.boundingClientRect(doms => {
					this.measureItems = [];
					feedback(doms.map(dom => dom.height));
				})
				.exec();
		},
		async queryDomsHeight() {
			await this.$nextTick();
			const query = uni.createSelectorQuery().in(this);
			query
				.selectAll('.query')
				.boundingClientRect(doms => {
					doms.forEach(dom => {
						if (dom.id === 'list') this.scrollDomHeight = dom.height;
						else if (dom.id === 'header') this.headerDomHeight = dom.height;
						else if (dom.id === 'footer') this.footerDomHeight = dom.height;
					});
				})
				.exec();
		},

		/* 计算位置 */
		reCalculatePostion({ index } = {}) {
			this.calculateRenderPostion(this.lastScrollTop, index);
		},
		_calculateRenderPostion(scrollTop, index) {
			if (index === undefined) index = this.start;
			const virtualScrollTop = Math.max(scrollTop - this.headerDomHeight, 0);
			this.start = this.prefixSumManage.search(virtualScrollTop, index);
			this.end = this.prefixSumManage.search(
				virtualScrollTop + this.scrollDomHeight,
				this.start
			);
			this.lastScrollTop = scrollTop; // 记录最后滚动的位置，用于无滚动时重新计算位置
		},

		/* 事件 */
		scroll(ev) {
			const scrollTop = ev.detail.scrollTop;
			this.calculateRenderPostion(scrollTop);
			this.$emit('scroll', ev);
		},
		// 删除 item 导致的触底
		deletetolower() {
			if (
				this.prefixSum[this.prefixSum.length - 1] + this.footerDomHeight <
				this.scrollDomHeight
			) {
				this.$emit('deletetolower');
			}
		}
	},
	watch: {
		throttle: {
			handler() {
				if (this.throttle === false)
					this.calculateRenderPostion = this._calculateRenderPostion;
				else {
					this.calculateRenderPostion = throttle(
						this._calculateRenderPostion,
						typeof this.throttle === 'number' ? this.throttle : 50
					);
				}
			},
			immediate: true
		},
		height() {
			this.$nextTick(this.queryDomsHeight);
		},
		scrollDomHeight() {
			this.reCalculatePostion();
		},
		calculteMax() {
			this.prefixSumManage.calculteMax = this.calculteMax;
		}
	}
};
</script>

<style scoped>
.list {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
}
.measure {
	opacity: 0;
}
.animation-fade-1 {
	animation-name: fade;
	animation-duration: 0.1s;
	animation-timing-function: ease-out;
}
@keyframes fade {
	0% {
		opacity: 0;
	}

	100% {
		opacity: 1;
	}
}
</style>
