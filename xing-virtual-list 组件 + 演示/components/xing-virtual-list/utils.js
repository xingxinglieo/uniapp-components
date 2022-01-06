
/**
 *
 *
 * @export
 * @description ([1,2,3,4,5,6],2)=>[[1,2],[2,3],[4,5],[6]]
 * @param {*} arr
 * @param {number} [size=1] 数组分块大小
 * @returns 分块后的数组
 */
export function chunk(arr, size = 1) {
	let index = 0
	let res = []
	while (index < arr.length) {
		res.push(arr.slice(index, index + size))
		index += size
	}
	return res
}

export function sum(arr) {
	return arr.reduce((prev, curr) => prev + curr, 0)
}


/**
 *
 *
 * @export
 * @description 计算数组前缀和
 * @param {*} arr
 * @param {number} [prePrefiex=0]
 * @returns 前缀和数组
 */
export function calculatePrefixSum(arr, prePrefiex = 0) {
	const result = []
	arr.reduce((pre, num, index) => (result[index] = pre + num), prePrefiex) // 转化为前缀和
	return result
}

export function throttle(fn, {
	interval = 500
} = {}) {
	if (typeof fn != 'function') return new Error('类型错误')
	const _self = fn
	let timer,
		firstTime = true // 是否第一次调用
	return function(...args) {
		const _me = this
		if (firstTime) {
			fn.apply(_me, args)
			return (firstTime = false)
		}
		if (timer) {
			return false
		}
		timer = setTimeout(() => {
			clearTimeout(timer)
			timer = null
			_self.apply(_me, args)
		}, interval)
	}
}

export function wait(timeout = 0) {
	return new Promise(r => setTimeout(r, timeout))
}

export function def(obj, key, val, enumerable) {
	Object.defineProperty(obj, key, {
		value: val,
		enumerable: !!enumerable,
		writable: true,
		configurable: true
	})
}


/**
 *
 *
 * @export
 * @description 将原型上方法赋在对象上
 * @param {*} target 被赋值对象
 * @param {*} proto 原型
 */
export function copyAugment(target, proto) {
	const keys = Object.getOwnPropertyNames(proto)
	for (let i = 0, l = keys.length; i < l; i++) {
		const key = keys[i]
		def(target, key, proto[key])
	}
}

export function coverProtoMethods(target, proto) {
	// if ('__proto__' in {}) {
	//     target.__proto__ = proto
	// } else {
	copyAugment(target, proto) // fixed: 小程序有可能无法修改原型 直接复制属性在对象上
	// }
}
