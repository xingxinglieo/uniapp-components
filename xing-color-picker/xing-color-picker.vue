<template>
	<view id="wrapper" class="color-picker-container" :style="absolute ? position : ''" >
		<view class="wrapper">
			<view class="pick-area">
				<view class="color-picker-map" @touchmove="_chooseColorFun" @tap="_chooseColorFun">
					<view
						class="color-picker-map-item solid"
						:style="'background:rgb(' + hueData.colorStopRed + ',' + hueData.colorStopGreen + ',' + hueData.colorStopBlue + ')'"
					></view>
					<view
						class="color-picker-map-item white"
						:style="
							'background:linear-gradient(to right, rgba(255,255,255,1), rgba(' +
								hueData.colorStopRed +
								',' +
								hueData.colorStopGreen +
								',' +
								hueData.colorStopBlue +
								',0));'
						"
					></view>
					<view
						class="color-picker-map-item black"
						:style="
							'background:linear-gradient(to top, rgba(0,0,0,1), rgba(' + hueData.colorStopRed + ',' + hueData.colorStopGreen + ',' + hueData.colorStopBlue + ',0));'
						"
					></view>
					<view class="picker" :style="'left:' + pickerData.x + 'rpx;top:' + pickerData.y + 'rpx;'"></view>
				</view>
				<view class="color-picker-bar" @touchmove="_changeBarFun" @tap="_changeBarFun"><view class="picker" :style="'top:' + barY + 'rpx;'"></view></view>
			</view>
			<view class="data-area">
				<text>R:{{ pickerData.red }} G:{{ pickerData.green }} B:{{ pickerData.blue }}</text>
				<text>HEX:{{ pickerData.hex }}</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			//基础色相(色盘右上顶点的颜色)
			hueData: {
				colorStopRed: 255,
				colorStopGreen: 0,
				colorStopBlue: 0
			},
			//选择点的颜色
			pickerData: {
				x: 0,
				y: 480,
				red: 0,
				green: 0,
				blue: 0,
				hex: '#000000'
			},
			//色相控制条位置
			barY: 0,
			timer: 0,
			lifetimes: {
				ready() {
					const _this = this;
					const query = wx.createSelectorQuery().in(this);
					query.select('#wrapper').boundingClientRect();
					query.selectViewport().scrollOffset();
					query.exec(res => {
						_this.setData({
							top: res[0].top,
							left: res[0].left,
							scrollTop: res[1].scrollTop,
							scrollLeft: res[1].scrollLeft
						});
					});
				}
			},
			rpxRatio: uni.getSystemInfoSync().screenWidth / 750, //此值为你的屏幕CSS像素宽度/750，单位rpx实际像素
		};
	},
	computed:{
		position(){
			return `position: absolute;top:${this.top + this.CustomBar }px;left:${this.left}px`
		}
	},
	components: {},
	props: {
		barHeight:{
			type:Number,
			default:0
		},
		absolute:{
			type:Boolean,
			default:false
		},
		top: {
			type:Number,
			default:0
		},
		//组件的位置
		left: {
			type:Number,
			default:0
		},
		scrollTop: {
			type:Number,
			default:0
		},
		//滚动位置
		scrollLeft: {
			type:Number,
			default:0
		},
	},
	methods: {
		//选中颜色
		_chooseColorFun(e) {
			clearTimeout(this.timer);
			let x = (e.changedTouches[0].pageX - this.left - this.scrollLeft) / this.rpxRatio;
			let y = (e.changedTouches[0].pageY - this.barHeight - this.top - this.scrollTop) / this.rpxRatio;
			x = x > 480 ? 480 : x;
			y = y > 480 ? 480 : y;
			x = x < 0 ? 0 : x;
			y = y < 0 ? 0 : y;
			const { pickerData } = this;
			pickerData.x = x;
			pickerData.y = y;
			this.setData({
				pickerData,
				timer: setTimeout(() => {
					this._changeColorFun(x, y);
				}, 50)
			});
		},

		//拖动色相bar
		//这个地方选择出来的颜色就是色盘最右上角的颜色
		_changeBarFun(e) {
			let y = (e.changedTouches[0].pageY - this.barHeight - this.top - this.scrollTop) / this.rpxRatio;
			y = y > 490 ? 490 : y;
			y = y < 0 ? 0 : y;
			this.setData({
				barY: y
			});

			this._changeHueFun(y);
		},

		//改变颜色
		_changeColorFun(x, y) {
			//获取色相（色盘最右上角的颜色）
			const sRed = this.hueData.colorStopRed;
			const sGreen = this.hueData.colorStopGreen;
			const sBlue = this.hueData.colorStopBlue; //选择的颜色
			//实际上这里是先算出假设y等于0时(不考虑Y轴)的颜色，后面需要再减去y*比例的颜色值

			let [pRed, pGreen, pBlue] = [this.pickerData.red, this.pickerData.green, this.pickerData.blue]; //首先计算X轴

			if (sRed === 255) {
				//移动1单位需要减少多少颜色值
				const greenRatioX = (255 - sGreen) / 480;
				const blueRatioX = (255 - sBlue) / 480;
				const greenValueX = 255 - x * greenRatioX;
				const blueValueX = 255 - x * blueRatioX;
				pRed = 255;
				pGreen = Math.round(greenValueX > sGreen ? greenValueX : sGreen);
				pBlue = Math.round(blueValueX > sBlue ? blueValueX : sBlue);
			}

			if (sGreen === 255) {
				const redRatioX = (255 - sRed) / 480;
				const blueRatioX = (255 - sBlue) / 480;
				const redValueX = 255 - x * redRatioX;
				const blueValueX = 255 - x * blueRatioX;
				pRed = Math.round(redValueX > sRed ? redValueX : sRed);
				pGreen = 255;
				pBlue = Math.round(blueValueX > sBlue ? blueValueX : sBlue);
			}

			if (sBlue === 255) {
				const redRatioX = (255 - sRed) / 480;
				const greenRatioX = (255 - sGreen) / 480;
				const redValueX = 255 - x * redRatioX;
				const greenValueX = 255 - x * greenRatioX;
				pRed = Math.round(redValueX > sRed ? redValueX : sRed);
				pGreen = Math.round(greenValueX > sGreen ? greenValueX : sGreen);
				pBlue = 255;
			} //考虑Y轴，减去y*比例的颜色值，得到最终颜色

			const redRatioY = pRed / 480;
			const greenRatioY = pGreen / 480;
			const blueRatioY = pBlue / 480;
			const redValueY = y * redRatioY;
			const greenValueY = y * greenRatioY;
			const blueValueY = y * blueRatioY;

			const hex = this._rgbToHexFun(pRed - redValueY, pGreen - greenValueY, pBlue - blueValueY);

			const { pickerData } = this;
			pickerData.red = Math.round(pRed - redValueY);
			pickerData.green = Math.round(pGreen - greenValueY);
			pickerData.blue = Math.round(pBlue - blueValueY);
			pickerData.hex = hex;
			this.setData({
				pickerData
			});
			this.$emit('changecolor', {
				hueData: this.hueData,
				pickerData: this.pickerData,
				barY: this.barY
			});
		},

		//改变色相
		_changeHueFun(y) {
			//根据色相bar的长度(490)计算出每拖动0.32距离就改变一次色相（R或G或B的值增减1）
			//色相的变化一共分为六个阶段,每次拖动81.67距离就完成一个阶段
			const { hueData } = this;

			if (y < 81.67) {
				const value = y / 0.32 > 255 ? 255 : y / 0.32;
				hueData.colorStopRed = 255;
				hueData.colorStopGreen = Math.round(value);
				hueData.colorStopBlue = 0;
			}

			if (y >= 81.67 && y < 163.34) {
				const value = (y - 81.67) / 0.32 > 255 ? 255 : (y - 81.67) / 0.32;
				hueData.colorStopRed = 255 - Math.round(value);
				hueData.colorStopGreen = 255;
				hueData.colorStopBlue = 0;
			}

			if (y >= 163.34 && y < 245.01) {
				const value = (y - 163.34) / 0.32 > 255 ? 255 : (y - 163.34) / 0.32;
				hueData.colorStopRed = 0;
				hueData.colorStopGreen = 255;
				hueData.colorStopBlue = Math.round(value);
			}

			if (y >= 245.01 && y < 326.68) {
				const value = (y - 245.01) / 0.32 > 255 ? 255 : (y - 245.01) / 0.32;
				hueData.colorStopRed = 0;
				hueData.colorStopGreen = 255 - Math.round(value);
				hueData.colorStopBlue = 255;
			}

			if (y >= 326.68 && y < 408.35) {
				const value = (y - 326.68) / 0.32 > 255 ? 255 : (y - 326.68) / 0.32;
				hueData.colorStopRed = Math.round(value);
				hueData.colorStopGreen = 0;
				hueData.colorStopBlue = 255;
			}

			if (y >= 408.35) {
				const value = (y - 408.35) / 0.32 > 255 ? 255 : (y - 408.35) / 0.32;
				hueData.colorStopRed = 255;
				hueData.colorStopGreen = 0;
				hueData.colorStopBlue = 255 - Math.round(value);
			}

			this.setData({
				hueData
			}); //改变完色相需要再次改变选择的颜色

			this._changeColorFun(this.pickerData.x, this.pickerData.y);
		},

		_rgbToHexFun(r, g, b) {
			let hex = ((r << 16) | (g << 8) | b).toString(16);

			if (hex.length < 6) {
				hex = `${'0'.repeat(6 - hex.length)}${hex}`;
			}

			if (hex == '0') {
				hex = '000000';
			}

			return `#${hex}`;
		},

		setData: function(obj) {
			let that = this;
			let keys = [];
			let val, data;
			Object.keys(obj).forEach(function(key) {
				keys = key.split('.');
				val = obj[key];
				data = that.$data;
				keys.forEach(function(key2, index) {
					if (index + 1 == keys.length) {
						that.$set(data, key2, val);
					} else {
						if (!data[key2]) {
							that.$set(data, key2, {});
						}
					}

					data = data[key2];
				});
			});
		}
	}
};
</script>
<style scoped>
.c {
	color: #5f27cd;
}
.bg {
	background: #5f27cd;
}
.t50 {
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}
.tx50 {
	left: 50%;
	transform: translateX(-50%);
}
.ty50 {
	top: 50%;
	transform: translateY(-50%);
}
.cw {
	color: #fff;
}
.bw {
	background: #fff;
}
.fl {
	float: left;
}
.fr {
	float: right;
}
.fb {
	font-weight: bold;
}
.ib {
	display: inline-block !important;
	vertical-align: middle;
}
.tac {
	text-align: center;
}
.tal {
	text-align: left;
}
.tar {
	text-align: right;
}
.cp {
	cursor: pointer;
}
.none {
	display: none !important;
}
.hidden {
	visibility: hidden;
	opacity: 0;
}
.visible {
	visibility: visible;
	opacity: 1;
}
.mainSection {
	min-height: 100vh;
}
.row {
	display: flex;
	align-items: center;
	justify-content: center;
}
.col {
	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: center;
}
.ellipsis {
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.color-picker-container {
	width: 600rpx;
}
.color-picker-container .wrapper {
	margin: auto;
}
.color-picker-container .pick-area {
	display: flex;
	justify-content: space-between;
}
.color-picker-container .pick-area .color-picker-map {
	position: relative;
	width: 500rpx;
	height: 500rpx;
}
.color-picker-container .pick-area .color-picker-map .color-picker-map-item {
	position: absolute;
	top: 0rpx;
	left: 0rpx;
	width: 500rpx;
	height: 500rpx;
	border: 2rpx solid transparent;
}
.color-picker-container .pick-area .color-picker-map .color-picker-map-item.white {
	z-index: 10;
}
.color-picker-container .pick-area .color-picker-map .color-picker-map-item.black {
	z-index: 11;
	border: 2rpx solid #666;
}
.color-picker-container .pick-area .color-picker-map .picker {
	position: absolute;
	z-index: 12;
	width: 20rpx;
	height: 20rpx;
	border: 2rpx solid #666;
	background: #fff;
	border-radius: 50%;
}
.color-picker-container .pick-area .color-picker-bar {
	position: relative;
	width: 60rpx;
	height: 500rpx;
	border: 2rpx solid #666;
	background: -webkit-linear-gradient(top, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%);
}
.color-picker-container .pick-area .color-picker-bar .picker {
	position: absolute;
	z-index: 10;
	width: 110%;
	height: 10rpx;
	left: 50%;
	transform: translateX(-50%);
	background: #fff;
	border: 2rpx solid #666;
}
.color-picker-container .data-area {
	margin-top: 20rpx;
	font-size: 26rpx;
	display: flex;
	justify-content: space-between;
}
</style>
