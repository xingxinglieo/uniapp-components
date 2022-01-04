<template>
	<scroll-view
		id="cycle-list"
		:style="style"
		:class="customClass"
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
		<!-- @animationstart dom 挂载的 hack 技巧  -->
		<view
			class="animation-fade-1"
			@animationstart="queryScrollHeight"
			:style="'height:' + scrollHeight + 'px;'"
		></view>
		<view class="list" :style="'transform: translateY(' + scrollTopPosition + 'px);'">
			<view v-for="(item, index) in visibleItems" :key="getKey(actualStart, index)">
				<slot :item="item" :index="visibleItemsIndex[index]"></slot>
			</view>
		</view>
		<view class="list" style="transform: translateY(0px);">
			<view v-for="(item, index) in measureItems" :key="index" class="measure">
				<slot :item="item" :index="index"></slot>
			</view>
		</view>
	</scroll-view>
</template>

<script>
import PrefixSumManage from './PrefixSumManage';
import { throttle } from './utils';
export default {
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
			type: [Number, String], // 视口高,
			required: true
		},
		preRender: {
			// 预渲染数
			type: [Number, Array],
			default: 5
		},
		calculteMax: {
			// 计算高度最大值，用于分片
			type: Number,
			default: 100
		},
		throttle: {
			//节流间隔
			type: [Boolean, Number],
			default: false
		},
		customStyle: {
			type: String,
			default: ''
		},
		customClass: {
			type: String,
			default: ''
		},
		lowerThreshold: {
			type: [Number, String],
			default: 50
		},
		upperThreshold: {
			type: [Number, String],
			default: 50
		},
		scrollTop: [Number, String],
		scrollIntoView: String,
		scrollWithAnimation: {
			type: Boolean,
			default: false
		},
		enableBackToTop: {
			type: Boolean,
			default: false
		},
		refresherEnabled: {
			type: Boolean,
			default: false
		},
		refresherThreshold: {
			type: Number,
			default: 45
		},
		refresherDefaultStyle: {
			type: String,
			default: 'black'
		},
		refresherBackground: {
			type: String,
			default: '#FFF'
		},
		refresherTriggered: {
			type: Boolean,
			default: false
		},
		enableFlex: {
			type: Boolean,
			default: false
		},
		scrollAnchoring: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			start: 0,
			end: 0, // 截取 [start,end]
			lastScrollTop: 0, // 上次滚动的位置
			prefixSum: [],
			measureItems: [],
			scrollDomHeight: 0
		};
	},
	computed: {
		/* props 处理 */
		calcHeight() {
			return Number.isNaN(+this.height) ? this.height : this.height + 'px';
		},
		style() {
			return `${this.customStyle};height: ${this.calcHeight};position: relative !important;`;
		},
		scrollHeight() {
			return Math.max(
				this.scrollDomHeight + this.lowerThreshold,
				this.prefixSum[this.prefixSum.length - 1]
			);
		},
		getKey() {
			return typeof this.dataKey === 'string' // 小程序模板中无法写表达式所以需要方法
				? item => item[this.dataKey]
				: typeof this.dataKey === 'function'
				? this.dataKey
				: (_item, index) => index;
		},
		preRenderNums() {
			const preRender = this.preRender;
			return typeof preRender === 'number' ? [preRender, preRender] : preRender;
		},

		/* start end items 处理 */
		actualStart() {
			const start = this.start - this.preRenderNums[0];
			return start < 0 ? 0 : start;
		},
		actualEnd() {
			const end = this.end + this.preRenderNums[1];
			return end >= this.dataSources.length ? this.dataSources.length - 1 : end;
		},
		visibleItems() {
			return this.dataSources.slice(this.actualStart, this.actualEnd + 1); // [actualStart, actualEnd] 所以 end + 1
		},
		visibleItemsIndex() {
			return this.visibleItems.map((_, i) => this.actualStart + i);
		},
		scrollTopPosition() {
			return this.prefixSum[this.actualStart - 1];
		}
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
		async measureDoms({ items, feedback }) {
			this.measureItems.push(...items);
			await this.$nextTick();
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
		queryScrollHeight(e) {
			const query = uni
				.createSelectorQuery()
				.in(this)
				.select('#cycle-list');
			query.boundingClientRect(dom => (this.scrollDomHeight = dom.height)).exec();
		},

		/* 计算位置 */
		reCalculatePostion({ index } = {}) {
			this.calculateRenderPostion(this.lastScrollTop, index);
		},
		_calculateRenderPostion(scrollTop, index) {
			if (index === undefined) index = this.start;
			this.start = this.prefixSumManage.search(scrollTop, index);
			this.end = this.prefixSumManage.search(
				scrollTop + this.scrollDomHeight,
				this.start
			);
			this.lastScrollTop = scrollTop;
		},

		/* 事件 */
		scrolltoupper(ev) {
			this.$emit('scrolltoupper', ev);
		},
		scrolltolower(ev) {
			this.$emit('scrolltolower', ev);
		},
		scroll(ev) {
			const scrollTop = ev.detail.scrollTop;
			this.calculateRenderPostion(scrollTop);
			this.$emit('scroll', ev);
		},
		click(ev){
			this.$emit('click', ev);
		},
		refresherpulling(ev) {
			this.$emit('refresherpulling', ev);
		},
		refresherrefresh(ev) {
			this.$emit('refresherrefresh', ev);
		},
		refresherrestore(ev) {
			this.$emit('refresherrestore', ev);
		},
		refresherabort(ev) {
			this.$emit('refresherabort', ev);
		},
		deletetolower() {
			// 删除 item 导致的 index 触底
			if (
				// type === 'delete' &&
				this.prefixSum[this.prefixSum.length - 1] < this.scrollDomHeight
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
			this.$nextTick(this.queryScrollHeight);
		},
		scrollDomHeight() {
			this.reCalculatePostion();
		},
		calculteMax() {
			this.prefixSumManage.calculteMax = this.calculteMax;
		}
		// prefixSum(){
		// 	console.log(this.prefixSum)
		// },
		// dataSources() {
		// 	this.prefixSumManage.initOrigin(this.dataSources); // dataSources 引用改变即重置
		// },
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
