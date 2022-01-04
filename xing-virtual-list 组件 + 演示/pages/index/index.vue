<template>
	<view>
		<view style="display: flex; justify-content: space-between;">
			<button type="primary" size="mini" @click="reset">重置</button>
			<button type="primary" size="mini" @click="reverse">反转</button>
			<button type="primary" size="mini" @click="random">随机</button>
			<button type="primary" size="mini" @click="troggleArticle">切换文章</button>
		</view>
		<view class="title">{{ title }}</view>
		<virtaul-list
			ref="list"
			height="calc(100vh - 200px)"
			:dataSources="article"
			:calculteMax="5"
			:scroll-top="scrollTop"
			@scrolltolower="push"
			@deletetolower="push"
			:refresher-enabled="true"
			:refresher-triggered="triggered"
			:refresher-threshold="100"
			@refresherrefresh="onRefresh"
		>
			<template v-slot:default="{ item, index }">
				<view @click="onClick(index)" style="border-bottom: thick solid #555555">
					{{ item }}
				</view>
			</template>
		</virtaul-list>
	</view>
</template>

<script>
import virtaulList from '../../components/xing-virtaul-list/virtaul-list.vue';
export default {
	components: {
		virtaulList
	},
	data() {
		return {
			article: [...article],
			triggered: false,
			scrollTop: 1,
			title: 'TCP 和 UDP 的区别'
		};
	},
	mounted() {
		this.$refs.list.initDataSources(this.article);
	},
	methods: {
		async push() {
			// uni.showLoading({ mask: true });
			// const aticle = awiat getAricle() // 获取数据
			this.article.push(...article);
			// uni.hideLoading();
		},
		reset() {
			this.scrollTop = Number(!this.scrollTop);
			article = article1;
			this.title = 'TCP 和 UDP 的区别';
			this.article = [...article];
		},
		reverse() {
			this.article.reverse();
		},
		random() {
			this.article.sort(() => Math.random() - Math.random());
		},
		troggleArticle() {
			this.scrollTop = Number(!this.scrollTop);
			if (article === article1) {
				article = article2;
				this.title = 'HTTP 1.1 新特性';
				this.article = [...article];
			}else {
				article = article1;
				this.title = 'TCP 和 UDP 的区别';
				this.article = [...article];
			}
		},
		onClick(index) {
			uni.showModal({
				title: '删除 index: ' + index + ' 的 item',
				success: async ({ confirm }) => {
					if (confirm) this.article.splice(index, 1);
				}
			});
		},
		onRefresh() {
			if (this.triggered) return;
			this.triggered = true;
			setTimeout(async () => {
				const newArticle = [...article].sort(() => Math.random() - Math.random());
				this.article.unshift(...newArticle);
				this.triggered = false;
			}, 2000);
		}
	},
	watch: {
		article(value, oldValue) {
			if (value !== oldValue) this.$refs.list.initDataSources(value);
		}
	}
};
const article1 = [
	`1、UDP无连接，时间上不存在建立连接需要的时延。空间上，TCP需要在端系统中维护连接状态，需要一定的开销。 此连接装入包括接收和发送缓存，拥塞控制参数和序号与确认号的参数。UCP不维护连接状态，也不跟踪这些参数，开销小。空间和时间上都具有优势。
		DNS如果运行 UDP 上，不需要建立连接速度快很多; HTTP使用 TCP，是因为对于基于文本数据的Web网页来说，可靠性很重要。
		同一种专用应用服务器在支持UDP时，一定能支持更多的活动客户机。`,
	`2、分组首部开销小，TCP首部20字节，UDP首部8字节。`,
	`3、UDP没有拥塞控制 ，应用层能够更好的控制要发送的数据和发送时间，网络中的拥塞控制也不会影响主机的发送速率。某些实时应用要求以稳定的速度发送，能容 忍一些数据的丢失，但是不能允许有较大的时延（比如实时视频，直播等）`,
	`4、UDP提供尽最大努力的交付，不保证可靠交付。 所有维护传输可靠性的工作需要用户在应用层来完成。没有TCP的确认机制、重传机制 。如果因为网络原因没有传送到对端，UDP也不会给应用层返回错误信息`,
	`5、UDP是面向报文的，对应用层交下来的报文，添加首部后直接乡下交付为IP层，既不合并，也不拆分，保留这些报文的边界。 对IP层交上来UDP用户数据报，在去除首部后就原封不动地交付给上层应用进程，报文不可分割，是UDP数据报处理的最小单位。`,
	`6、正是因为这样，UDP显得不够灵活，不能控制读写数据的次数和数量。比如我们要发送100个字节的报文，我们调用一次sendto函数就会发送100字节，对端也需要用recvfrom函数一次性接收100字节，不能使用循环每次获取10个字节，获取十次这样的做法。`,
	`7、UDP常用一次性传输比较少量数据的网络应用，如DNS,SNMP等，因为对于这些应用，若是采用TCP，为连接的创建，维护和拆除带来不小的开销。UDP也常用于多媒体应用（如IP电话，实时视频会议，流媒体等）数据的可靠传输对他们而言并不重要，TCP的拥塞控制会使他们有较大的延迟，也是不可容忍的`
];
const article2 = [
	'1、缓存处理，在HTTP1.0中主要使用header里的If-Modified-Since,Expires来做为缓存判断的标准，HTTP1.1则引入了更多的缓存控制策略例如Entity tag，If-Unmodified-Since, If-Match, If-None-Match等更多可供选择的缓存头来控制缓存策略。',
	'2、长连接，HTTP 1.1支持长连接（PersistentConnection）和请求的流水线（Pipelining）处理，在一个TCP连接上可以传送多个HTTP请求和响应，减少了建立和关闭连接的消耗和延迟，在HTTP1.1中默认开启Connection： keep-alive，一定程度上弥补了HTTP1.0每次请求都要创建连接的缺点。',
	'3、带宽优化及网络连接的使用，断点续传，HTTP1.0中，存在一些浪费带宽的现象，例如客户端只是需要某个对象的一部分，而服务器却将整个对象送过来了，并且不支持断点续传功能，HTTP1.1则在请求头引入了range头域，它允许只请求资源的某个部分，即返回码是206（Partial Content），这样就方便了开发者自由的选择以便于充分利用带宽和连接。',
	'4、错误通知的管理，在HTTP1.1中新增了24个错误状态响应码，如409（Conflict）表示请求的资源与资源的当前状态发生冲突；410（Gone）表示服务器上的某个资源被永久性的删除。',
	'5、Host头处理，在HTTP1.0中认为每台服务器都绑定一个唯一的IP地址，因此，请求消息中的URL并没有传递主机名（hostname）。但随着虚拟主机技术的发展，在一台物理服务器上可以存在多个虚拟主机（Multi-homed Web Servers），并且它们共享一个IP地址。HTTP1.1的请求消息和响应消息都应支持Host头域，且请求消息中如果没有Host头域会报告一个错误（400 Bad Request）。'
];
let article = article1;
</script>

<style>
.title {
	height: 40px;
	line-height: 40px;
	font-size: 32px;
	color: #8f8f94;
	font-weight: bolder;
}
</style>
