export default class MicTaskQueue{
  constructor(){
    this.tasks = [] // 增删任务队列
    this.isExecuting = false // 队列锁
  }
  addTask(fun) {
    this.tasks.push(fun)
    this.execute()
  }
  async execute() {
    if (this.isExecuting) return
    this.isExecuting = true
    while (this.tasks.length) {
      const task = this.tasks.shift()
      await task.call(this)
    }
    this.isExecuting = false
  }
}