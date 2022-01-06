## 优势

- **不定高项，自动测量，即使是定高项也可以省去测量步骤**
- 视口高度可以传入任意 css
- 可以插入 header、footer

## 属性说明

| 属性名                                   | 类型                    | 默认值              | 说明                                                         |
| :--------------------------------------- | :---------------------- | :------------------ | :----------------------------------------------------------- |
| dataSources                              | Array                   | required            | 数据源数组，还需要调用 `initDataSources`（见下方说明）       |
| dataKey                                  | String/Function         | (item,index)=>index | item的键名或者函数                                           |
| height                                   | Number/String           | required            | scroll-view 的高度，即视口高，可以传入任意 css               |
| preRender                                | Number/[Number, Number] | 10，等效于[10,10]     | 预渲染项数，值越大快速滚动的白屏时间越短 |
| calculteMax                              | Number                  | 20                  | 测量 item 高度时，每次测量项数的分片大小。若每次添入项数不多，建议设置为每次添加的项数 |
| throttle                                 | Boolean/Number          | false               | 是否开启 scroll 事件计算位置函数的节流，输入 Number 为节流间隔，默认不开启。一般情况不建议开启，开启后会延长白屏时间，开启时建议将 preRender 值设置大一些 |
| query                                    | Object                  | {}                  | 父作用域内使用数据兜底方案                                 |
| customStyle                              | String                  |                     | scroll-view 上 style，默认设置了 height  为 height prop 和 position: relative 会覆盖此样式 |
| customClass                              | String                  | false               | scroll-view 上 class                                         |
| 其他 prop 见文档                         |                         |                     | https://uniapp.dcloud.io/component/scroll-view               |
| @deletetolower                           | EventHandle             |                     | 若修改 dataSources 导致列表总高度（即 scrollHeight）小于视口高度会触发此事件 |
| 其他事件见文档或自行在组件内添加原生事件 |                         |                     | https://uniapp.dcloud.io/component/scroll-view               |

## 使用说明

1. 在 `virtual-list` 上**定义 ref**，传入 dataSources、height，item 模板写入 slot，slot-scoped 传入 

   item：dataSources 中的单项数据

   index：在 dataSources 中对应得 index，对于测量时的 item，传入的 index 为 undefined，所以请不要完全依赖 index 的 number 类型

   actualIndex：实际渲染时的 index

   query：父作用域内使用data兜底方案，见下方 slot 说明

   ```html
   <virtaul-list
   	ref="list"
   	height="calc(100vh - 200px)"
   	:dataSources="dataSources"
   >
   	<template v-slot:default="{ item, index, actualIndex, query}">
   		<view @click="onClick(index)" style="border-bottom: thick solid #555555">
   			{{ item }}
   		</view>
   	</template>    
   </virtaul-list>
   
   ```

   

   ```js
   export default {
   	components: {
   		virtaulList
   	},
   	data() {
   		return {
   			dataSources:[]
   		};
   	},
       //...
   }
   ```

2. **在 mounted 中调用 `virtual-list` 提供方法 `initDataSources`**，因为 mounted 阶段才能拿到子组件实例

   ```js
   mounted() {
   	this.$refs.list.initDataSources(this.dataSources);
   },
   ```

   **经过这个函数处理之后，修改数组的方法被拦截了（类似于 Vue 对数组的处理），所以一般情况下请用这些方法对数组进行修改**

   > 被拦截的方法有 push pop shift unshift reverse splice

   如果仍需要赋值新数组，请在 watch 监测并重新处理

   ```js
   watch: {
   	dataSources(value, oldValue) {
           // 因为修改数组也会触发 watch，只有 value !== oldValue 时才是赋值新数组
   		if (value !== oldValue) this.$refs.list.initDataSources(value);
   	}
   }
   ```

   > 因为 uniapp 对小程序的 prop 有特殊处理，父组件传入的对象会被深克隆再传递给子组件，所以无法在 virtual-list 内部处理 dataSources

## 插槽

```js
<slot name="header" :query="query" />
<slot :item="item" :index="visibleItemsIndex[index]" :actualIndex="index" :query="query" />
<slot name="footer" :query="query" />
```

index：在数据源数组中的 index

actualIndex：实际渲染列表中的 index

 header、footer 插槽：挂载时会测量一次高度，不需要输入固定高度，如果后续改变了高度需要调用 `this.refs.list.queryDomsHeight()`

### 目前作用域插槽 slot 的一些注意事项

开发时，发现 uniapp 插槽有较大问题：旧版作用域插槽只能使用传入的变量（当前组件的 data 也不能用），新版的插槽有可能子组件无法使用 for，且会微信开发者工具会弹出警告 `slot "" duplication is found under a single shadow root. The first one was accepted.`

避免使用时候遇到坑可以看这个讨论或者搜索一下 slot

https://github.com/dcloudio/uni-app/issues/495

如果实在有需求，可以通过 query 绕过

```html
<virtual-list
	ref="virtualList"
	:height="virtualListHeight"
	:dataSources="bookList"
    :query="{ title }"
>
    <template v-slot:default="{ query }">
        <view>{{ query.title }}</view>	
    <template>
</virtual-list>
```

