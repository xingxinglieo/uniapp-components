import {
	def,
	coverProtoMethods
} from './utils'
/**
 *
 *
 * @param {*} reactivedArray reactivedArray 经过 Vue 处理的响应式数组
 * @param {*} methodsToWrapped 需要包装的方法
 * @param {*} host 执行自定义方法时被绑定的
 * @returns arrayMethods 包装过后的数组方法,一个拦截数组的原型
 */
export function initArrayMethods(reactivedArray, methodsToWrapped, host) {
	if ('__ob__' in reactivedArray) {
		const methodsToPatch = Object.keys(methodsToWrapped)
		const arrayMethods = methodsToPatch.reduce((arrayMethods, method) => {
			const orignalMethod = reactivedArray[method]
			def(arrayMethods, method, function customMutation(...args) {
				const result = orignalMethod.apply(this, args)
				methodsToWrapped[method].call(host, args, this)
				return result
			})
			return arrayMethods
		}, Object.create(Array.prototype))
		return target => coverProtoMethods(target, arrayMethods)
	} else throw new Error('Need A Vue-Reactived Array')
}
