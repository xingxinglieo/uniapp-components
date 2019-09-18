<template>
	<swiper
		@change="touchmove"
		@transition="transition"
		@animationfinish="animationfinish"
		:indicator-dots="false"
		:vertical="vertical"
		:duration="duration"
		circular
		:autoplay="autoplay"
		:interval="interval"
		:easingFunction="easingFunction"
	>
		<swiper-item v-for="(item, index) in 3" :key="index">
			<view class="swiper-item">
				<!-- 这里写你的组件或者内容 -->
				<!-- swiperData应是一个存着对象的数组 每一个对象代表对应页的内容 -->
				<!-- 你的组件应该对应swiperList索引 如 -->
				<!-- <view >{{ swiperData[swiperList[index]].firstname }}</view>
				<view >{{ swiperData[swiperList[index]].lastname }}</view>-->
				<!-- 或者传入页面数据 由你自己的组件内部来处理 如 -->
				<!-- <myComponents :pageData="swiperData[swiperList[index]]" ></myComponents> -->
				<!-- swiperData[swiperList[index]]是固定写法 -->
			</view>
		</swiper-item>
	</swiper>
</template>

<script>
// 引入和注册组件
export default {
	components: {},
	props: {
		swiperData: {
			//传入的数据数组
			type: Array,
			required: true
		},
		dataIndex: {
			type: Number,
			default: 0
		},
		vertical: {
			type: Boolean,
			default: false
		},
		duration: {
			type: Number,
			default: 500
		},
		circular: {
			type: Boolean,
			default: false
		},
		autoplay: {
			type: Boolean,
			default: false
		},
		interval: {
			type: Number,
			default: 5000
		},
		easingFunction: {
			type: String,
			default: 'default'
		}
	},
	data() {
		return {
			swiperList: [],
			swiperLength: 0,
			current: 0
		};
	},
	created() {
		this.swiperLength = this.swiperData.length;
		this.current = this.dataIndex;
		this.handleList();
	},
	methods: {
		touchmove(e) {
			this.handleList(e.detail.current);
			this.current = this.swiperList[e.detail.current];
			this.$emit('change', e);
		},
		animationfinish(e) {
			this.$emit('animationfinish', e);
		},
		transition(e) {
			this.$emit('transition', e);
		},
		handleList(index) {
			//
			switch (index) {
				case 0:
					this.$set(this.swiperList, 1, (this.swiperList[0] + 1) % this.swiperLength);
					this.$set(this.swiperList, 2, this.swiperList[0] == 0 ? this.swiperLength - 1 : this.swiperList[0] - 1);
					break;
				case 1:
					this.$set(this.swiperList, 2, (this.swiperList[1] + 1) % this.swiperLength);
					this.$set(this.swiperList, 0, this.swiperList[1] == 0 ? this.swiperLength - 1 : this.swiperList[1] - 1);
					break;
				case 2:
					this.$set(this.swiperList, 0, (this.swiperList[2] + 1) % this.swiperLength);
					this.$set(this.swiperList, 1, this.swiperList[2] == 0 ? this.swiperLength - 1 : this.swiperList[2] - 1);
					break;
				default:
					this.$set(this.swiperList, 0, this.dataIndex);
					this.$set(this.swiperList, 1, (this.swiperList[0] + 1) % this.swiperLength);
					this.$set(this.swiperList, 2, this.swiperList[0] == 0 ? this.swiperLength - 1 : this.swiperList[0] - 1);
			}
		}
	},
	watch: {
		dataIndex: {
			immediate: true,
			handler() {
				this.handleList();
			}
		},
		swiperData: {
			immediate: true,
			handler() {
				this.swiperLength = this.swiperData.length;				
			}
		},
	}
};
</script>

<style scoped>

</style>
