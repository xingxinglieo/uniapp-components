import {
	chunk,
	sum,
	calculatePrefixSum
} from './utils'
import MicTaskQueue from './MicTaskQueue'
import {
	initArrayMethods
} from './array'
// const methodsToWrapped = {
// 	push(promiseTrigger, args) {
// 		this.splice(this.length, 0, args, promiseTrigger)
// 	},
// 	pop(promiseTrigger) {
// 		this.splice(this.length - 1, 1, [], promiseTrigger)
// 	},
// 	shift(promiseTrigger) {
// 		this.splice(0, 1, [], promiseTrigger)
// 	},
// 	unshift(promiseTrigger, args) {
// 		this.splice(0, 0, args, promiseTrigger)
// 	},
// 	sort(promiseTrigger, _args, arr) {
// 		this.hasInitOrigin = true
// 		this.splice(0, this.length, arr, promiseTrigger)
// 	},
// 	reverse(promiseTrigger, _args, arr) {
// 		this.hasInitOrigin = true
// 		this.splice(0, this.length, arr, promiseTrigger)
// 	},
// 	splice(promiseTrigger, args) {
// 		this.splice(args[0], args[1], args.slice(2), promiseTrigger)
// 	}
// }
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
		this.hasInitOrigin = true
		this.splice(0, this.length, arr)
	},
	reverse(_args, arr) {
		this.hasInitOrigin = true
		this.splice(0, this.length, arr)
	},
	splice(args) {
		this.splice(args[0], args[1], args.slice(2))
	}
}
// export default class PrefixSumManage extends MicTaskQueue {
export default class PrefixSumManage {
	constructor({
		prefixSum,
		vm,
		calculteMax
	}) {
		// super()
		this.vm = vm // Vue实例 用于 $emit
		this.calculteMax = calculteMax // 渲染任务分割数量
		this.hasInitOrigin = false // 初始化 origin 标志 性能优化防闪烁
		// this.prefixSum = prefixSum // 初始化前缀和
		this.initPrefixSum(prefixSum)
		this.wrapArrayMethods = initArrayMethods(prefixSum, methodsToWrapped, this) // 初始化包装方法
	}
	get length() {
		return this.prefixSum.length
	}
	/* init start */
	initOrigin(origin) {
		new Promise((resolve, reject) => {
			this.wrapArrayMethods(origin) // origin 的原型方法被修改
			this.origin = origin
			// this.tasks = []
			// this.hasInitOrigin = true
			this.splice(0, this.length, origin, {
				resolve,
				reject
			})
		})
	}
	initPrefixSum(prefixSum) {
		// this.prefixSum = [...prefixSum]
		this.prefixSum = prefixSum
		this.prefixSum[-1] = 0 // 防越界
	}
	/* init end */

	/* task start */

	// async execute() {
	// 	if (this.hasInitOrigin) {
	// 		this.initPrefixSum(this.prefixSum)
	// 	}
	// 	await super.execute()
	// 	if (this.hasInitOrigin) {
	// 		this.vm.prefixSum = this.prefixSum
	// 		this.hasInitOrigin = false
	// 		this.prefixSumChanged({
	// 			type: 'init'
	// 		})
	// 	}
	// }
	/* task end */

	/* emit */
	shouldCalculate(items) {
		return new Promise(feedback => {
			this.vm.$emit('shouldCalculate', {
				items,
				feedback
			})
		})
	}
	prefixSumChanged(option) {
		this.vm.$emit('prefixSumChanged', option)
	}

	/* emit */

	/* methods/action start */
	// async splice(index, count, items, {
	// 	resolve
	// }) {
	async splice(index, count, items) {
		const deleteItems = this.prefixSum.slice(index, index + count)
		let deleteEffect = 0
		if (deleteItems.length) {
			deleteEffect = deleteItems[deleteItems.length - 1] - this.prefixSum[index - 1]
		}
		const heights = []
		const splitAddItems = chunk(items, this.calculteMax)
		for (const partItems of splitAddItems) {
			heights.push(...(await this.shouldCalculate(partItems))) // 分批次将 items 计算
		}
		const addEffect = sum(heights)
		const effect = addEffect - deleteEffect
		this.prefixSum.splice(index, count, ...calculatePrefixSum(heights, this.prefixSum[index - 1]))
		for (let i = index + items.length; i < this.prefixSum.length; i++) {
			this.prefixSum[i] += effect
		}
		this.prefixSumChanged({
			index,
			count,
			items
		})
		// return resolve()
	}
	// splice(index, count, items, promiseTrigger) {
	// 	this.delete(index, count, {
	// 		...promiseTrigger,
	// 		[items.length > 0 ? 'resolve' : '']: () => void 0 // 如果存在增项，则把 resolve 移交 add
	// 	})
	// 	const splitItems = chunk(items, this.calculteMax)
	// 	// const splitItems = chunk(items, Infinity)
	// 	const firstSplitItems = splitItems.slice(0, 1)
	// 	const otherSplitItmes = splitItems.slice(1)
	// 	if (firstSplitItems[0]) {
	// 		this.add(index, firstSplitItems, promiseTrigger) // 第一次 add 后就触发 resolve
	// 		this.add(index + firstSplitItems[0].length, otherSplitItmes, promiseTrigger)
	// 	}
	// }

	// delete(index, count, {
	// 	resolve
	// }) {
	// 	if (count < 1) return
	// 	const deleteItems = this.prefixSum.splice(index, count)
	// 	if (deleteItems.length < 1) return
	// 	this.addTask(() => {
	// 		const reduceEffect =
	// 			deleteItems[deleteItems.length - 1] - this.prefixSum[index - 1]
	// 		for (let i = index; i < this.length; i++) {
	// 			this.prefixSum[i] -= reduceEffect
	// 		}
	// 		if (!this.hasInitOrigin)
	// 			this.prefixSumChanged({
	// 				type: 'delete',
	// 				index,
	// 				count
	// 			})
	// 		return resolve()
	// 	})
	// }

	// add(index, splitItems, {
	// 	resolve
	// }) {
	// 	if (splitItems.length === 0) return resolve()
	// 	this.addTask(async () => {
	// 		const origin = this.origin
	// 		const newNums = []
	// 		for (const partItems of splitItems) {
	// 			newNums.push(...(await this.shouldCalculate(partItems))) // 分批次将 items 计算
	// 			if (origin !== this.origin) return resolve() // 如果重置了 直接退出函数清空此副作用
	// 		}
	// 		const addEffect = sum(newNums)
	// 		// const prePrefix = this.prefixSum[this.length - 1]
	// 		const prePrefix = this.prefixSum[index - 1]
	// 		for (let i = index; i < this.length; i++) this.prefixSum[i] += addEffect
	// 		this.prefixSum.splice(index, 0, ...calculatePrefixSum(newNums, prePrefix))
	// 		if (!this.hasInitOrigin)
	// 			this.prefixSumChanged({
	// 				type: 'add',
	// 				index,
	// 				items: splitItems.flat(1)
	// 			})
	// 		return resolve()
	// 	})
	// }
	/* methods/action end */

	/* search */
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
