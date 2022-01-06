import {
	chunk,
	sum,
	calculatePrefixSum
} from './utils'
import MicTaskQueue from './MicTaskQueue'
import {
	initArrayMethods
} from './array'
const methodsToWrapped = {
	push(args) {
		this.splice(this.length, 0, args)
	},
	pop() {
		this.splice(this.length - 1, 1, [])
	},
	shift() {
		this.splice(0, 1, [])
	},
	unshift(args) {
		this.splice(0, 0, args)
	},
	sort(_args, arr) {
		this.splice(0, this.length, arr)
	},
	reverse(_args, arr) {
		this.splice(0, this.length, arr)
	},
	splice(args) {
		this.splice(args[0], args[1], args.slice(2))
	}
}
export default class PrefixSumManage extends MicTaskQueue {
	constructor({
		vm,
		prefixSum,
		calculteMax
	}) {
		super()
		this.vm = vm // Vue实例 用于 emit shouldCalculate、prefixSumChanged 
		this.calculteMax = calculteMax // 渲染任务分割数量
		this.initPrefixSum(prefixSum) // 初始化前缀和
		this.wrapArrayMethods = initArrayMethods(prefixSum, methodsToWrapped, this) // 初始化包装方法
	}
	get length() {
		return this.prefixSum.length
	}
	/* init start */
	/**
	 *
	 * @description 暴露给使用者调用方法
	 * @description 初始化源数据数组,会拦截源数据数组上修改数组的方法
	 * @param {*} origin
	 * @memberof PrefixSumManage
	 */
	initOrigin(origin) {
		this.wrapArrayMethods(origin) // origin 的原型方法被修改
		this.origin = origin
		this.splice(0, this.length, origin)
	}
	initPrefixSum(prefixSum) { // 初始化前缀和
		this.prefixSum = prefixSum
		this.prefixSum[-1] = 0 // 防越界
	}
	/* init end */

	/* emit */
	shouldCalculate(items) {
		return new Promise(feedback => {
			this.vm.$emit('shouldCalculate', {
				items,
				feedback // 取回来 items 高度
			})
		})
	}
	prefixSumChanged(option) {
		this.vm.$emit('prefixSumChanged', option)
	}

	/* emit */

	/* methods/action start */

	/**
	 *
	 * @description 若一个 splice 增加项数大于 calculteMax，会被切割成两个任务
	 * @param {*} index 同 splice
	 * @param {*} count 同 splice
	 * @param {*} items 同 splice ...items
	 * @memberof PrefixSumManage
	 */
	splice(index, count, items) {
		const firstRenderItems = items.slice(0, this.calculteMax)
		this.addTask(() => this._splice(index, count, firstRenderItems))
		if (items.length > this.calculteMax) {
			const otherRenderItems = items.slice(this.calculteMax)
			this.addTask(() => this._splice(index + firstRenderItems.length, 0, otherRenderItems))
		}
	}
	/**
	 *
	 * @description 前缀和元操作 
	 * @description 将 splice 分割为 delete 和 add 操作
	 * @description 分别计算影响 index + items.length 之后 items 的 deleteEffect 和 addEffect
	 */
	async _splice(index, count, items) {
		/*! delete */
		const deleteItems = this.prefixSum.slice(index, index + count)
		let deleteEffect = 0
		if (deleteItems.length) {
			deleteEffect = deleteItems[deleteItems.length - 1] - this.prefixSum[index - 1]
		}
		/* delete !*/

		/*! add */
		const heights = []
		// 分批次测量 items
		const splitAddItems = chunk(items, this.calculteMax)
		for (const partItems of splitAddItems) {
			heights.push(...(await this.shouldCalculate(partItems))) // 此处通知 Vue 测量 items 的高度
		}
		const addEffect = sum(heights)
		const newPrefixSum = calculatePrefixSum(heights, this.prefixSum[index - 1])
		/* add !*/
		
		// prefixSum 改变
		this.prefixSum.splice(index, count, ...newPrefixSum)
		const effect = addEffect - deleteEffect
		for (let i = index + items.length; i < this.prefixSum.length; i++) {
			this.prefixSum[i] += effect
		}

		// 每次 splice 操作后都会通知 vue prefixSum 计算完成
		this.prefixSumChanged({
			index,
			count,
			items
		})
	}
	/* methods/action end */

	/* search */
	// 未采用二分搜索，因为有 index 可以定位到目标项附近
	search(searchPrefixSum, index = 0) {
		index = index >= this.length ? this.length - 1 : index
		const startPoint = this.prefixSum[index]
		if (searchPrefixSum <= startPoint) {
			while (this.prefixSum[index] > searchPrefixSum) index--
			return index + 1
		} else {
			while (this.prefixSum[index] <= searchPrefixSum) index++
			return index
		}
	}
}

