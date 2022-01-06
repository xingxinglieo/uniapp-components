/* const methodsToWrapped = {
	push(promiseTrigger, args) {
		this.splice(this.length, 0, args, promiseTrigger)
	},
	pop(promiseTrigger) {
		this.splice(this.length - 1, 1, [], promiseTrigger)
	},
	shift(promiseTrigger) {
		this.splice(0, 1, [], promiseTrigger)
	},
	unshift(promiseTrigger, args) {
		this.splice(0, 0, args, promiseTrigger)
	},
	sort(promiseTrigger, _args, arr) {
		this.hasInitOrigin = true
		this.splice(0, this.length, arr, promiseTrigger)
	},
	reverse(promiseTrigger, _args, arr) {
		this.hasInitOrigin = true
		this.splice(0, this.length, arr, promiseTrigger)
	},
	splice(promiseTrigger, args) {
		this.splice(args[0], args[1], args.slice(2), promiseTrigger)
	}
} */
/*	async execute() {

		if (this.hasInitOrigin) {
			this.initPrefixSum(this.prefixSum)
		}
	await super.execute()
		if (this.hasInitOrigin) {
			this.vm.prefixSum = this.prefixSum
			this.hasInitOrigin = false
			this.prefixSumChanged({
				type: 'init'
			})
		}
	}
*/
/*	splice(index, count, items, promiseTrigger) {
		this.delete(index, count, {
			...promiseTrigger,
			[items.length > 0 ? 'resolve' : '']: () => void 0 // 如果存在增项，则把 resolve 移交 add
		})
		const splitItems = chunk(items, this.calculteMax)
		// const splitItems = chunk(items, Infinity)
		const firstSplitItems = splitItems.slice(0, 1)
		const otherSplitItmes = splitItems.slice(1)
		if (firstSplitItems[0]) {
			this.add(index, firstSplitItems, promiseTrigger) // 第一次 add 后就触发 resolve
			this.add(index + firstSplitItems[0].length, otherSplitItmes, promiseTrigger)
		}
	}

	delete(index, count, {
		resolve
	}) {
		if (count < 1) return
		const deleteItems = this.prefixSum.splice(index, count)
		if (deleteItems.length < 1) return
		this.addTask(() => {
			const reduceEffect =
				deleteItems[deleteItems.length - 1] - this.prefixSum[index - 1]
			for (let i = index; i < this.length; i++) {
				this.prefixSum[i] -= reduceEffect
			}
			if (!this.hasInitOrigin)
				this.prefixSumChanged({
					type: 'delete',
					index,
					count
				})
			return resolve()
		})
	}

	add(index, splitItems, {
		resolve
	}) {
		if (splitItems.length === 0) return resolve()
		this.addTask(async () => {
			const origin = this.origin
			const newNums = []
			for (const partItems of splitItems) {
				newNums.push(...(await this.shouldCalculate(partItems))) // 分批次将 items 计算
				if (origin !== this.origin) return resolve() // 如果重置了 直接退出函数清空此副作用
			}
			const addEffect = sum(newNums)
			// const prePrefix = this.prefixSum[this.length - 1]
			const prePrefix = this.prefixSum[index - 1]
			for (let i = index; i < this.length; i++) this.prefixSum[i] += addEffect
			this.prefixSum.splice(index, 0, ...calculatePrefixSum(newNums, prePrefix))
			if (!this.hasInitOrigin)
				this.prefixSumChanged({
					type: 'add',
					index,
					items: splitItems.flat(1)
				})
			return resolve()
		})
	} */