<!--js 脚本（选项式 api）-->
<script>
import {ref} from "vue";

export default {
  name: "options-api",
  // 一个组件需要显式声明它所接受的 props，这样 Vue 才能知道外部传入的哪些是 props，哪些是透传 attribute
  // props: [],
  // or
  props: {},
  // data() 返回的属性将会成为响应式的状态
  // 并且暴露在 `this` 上
  data: function () {
    return {
      counter: 0,
      rawHtml: '<span style="color: red">This should be red.</span>',
      strArr: 'hello world yoo!'.split(' '),
      formData: {
        username: '',
        password: '',
      },
      selected: ref(''),
      posX: ref(0),
      posY: ref(0),
      apiUrl: 'https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json',
      apiErr: ref(null),
      apiOk: ref(null),
      loading: ref(false),
    }
  },
  // methods 是一些用来更改状态与触发更新的函数
  // 它们可以在模板中作为事件处理器绑定
  methods: {
    increment() {
      this.counter++
      console.log(`counter is ${this.counter}`)
    },
    login() {
      console.log(`form data is ${this.formData}`)
    },
    onMouseMove(e) {
      this.posX = e.pageX
      this.posY = e.pageY
    },
    loadData(url) {
      this.loading = true
      fetch(url).then(r => {
        if (r.ok && r.headers.get('Content-Type').indexOf('json') >= 0) {
          try {
            return r.json()
          } catch (e) {
            console.error(e)
            return Promise.reject(e)
          }
        }
        return Promise.reject(r.statusText)
      }).then((data, err) => {
        this.loading = false
        if (err) {
          this.apiErr = err
        } else if (data) {
          this.apiOk = data
        }
      })
    }
  },
  created() {
    // 创建监听器
    const unwatch = this.$watch('formData', (next) => {
      //
    })
    // 停止监听
    unwatch()
  },
  // 生命周期钩子会在组件生命周期的各个不同阶段被调用
  beforeMount() {
    // console.log(`component before mount, count is ${this.counter}.`)
  },
  // 例如这个函数就会在组件挂载完成后被调用
  mounted() {
    console.log(`component mounted, count is ${this.counter}.`)
    window.addEventListener('mousemove', this.onMouseMove)
  },
  beforeUnmount() {
    // console.log(`component before unmount, count is ${this.counter}.`)
  },
  unmounted() {
    console.log(`component unmounted, count is ${this.counter}.`)
    window.removeEventListener('mousemove', this.onMouseMove)
  },
  beforeUpdate() {
    // console.log(`component before update, count is ${this.counter}`)
  },
  updated() {
    // console.log(`component updateed, count is ${this.counter}.`)
  },
  // 监听器
  watch: {
    // 通过路径监听单个字段
    "formData.username"(next, prev) {
      console.log(`username prev: ${prev}, next: ${next}`)
    },
    "formData.password"(next, prev) {
      console.log(`password prev: ${prev}, next: ${next}`)
    },
    // 深层监听，不推荐使用
    "formData": {
      // 当且仅当整个对象被替换时，next !== prev 才为 true
      handler(next, prev) {
        console.log(`form prev: ${JSON.stringify(prev)}, next: ${JSON.stringify(next)}`)
      },
      deep: true
    }
  }
}
</script>

<!--页面模板-->
<template>
  <!--绑定一个数据-->
  <button v-on:click="increment">计数器 {{ counter }}</button>
  <br>
  <button @click="increment">计数器 {{ counter }}</button>
  <br>
  <!--双大括号会将数据解释为纯文本，而不是 HTML-->
  <p>Using text interpolation: {{ rawHtml }}</p>
  <br>
  <!--想插入 HTML，需要使用 v-html 指令-->
  <p>Using v-html directive: <span v-html="rawHtml"></span></p>
  <br>
  <!-- 条件渲染 -->
  <h2 v-if="strArr.length>2">{{ strArr.join("'>2'") }}</h2>
  <h2 v-else-if="strArr.length>1">{{ strArr.join("'>1'") }}</h2>
  <h2 v-else>{{ strArr.join('-') }}</h2>
  <br>
  <!--不推荐 v-if 和 v-for 一起使用-->
  <div v-if="strArr" style="background-color: rgb(128,128,128)">
    <ul v-for="(s, i) in strArr">
      <li v-if="s">{{ `${i}). ${s}` }}</li>
    </ul>
  </div>
  <br>
  <!--表单绑定-->
  <form>
    <input v-model="formData.username" placeholder="username"/>({{ formData.username }})
    <br>
    <input v-model="formData.password" placeholder="password"/>({{ formData.password }})
    <br>
    <button type="submit" @click="login">登录</button>
  </form>
  <br>
  <!--选择器-->
  <div>selected is: {{ selected }}</div>
  <br>
  <select v-model="selected">
    <option disabled value="">please select one</option>
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </select>
  <br>
  <div>mouse move, x: {{ posX }}, y: {{ posY }}</div>
  <br>
  <!--加载 url-->
  <button @click="loadData(apiUrl)">加载 json</button>
  <br>
  <div v-if="apiErr instanceof Error">load failed: {{ apiErr }}</div>
  <div v-else-if="apiOk">{{ apiOk }}</div>
  <div v-if="loading">Loading...</div>
</template>

<!--样式文件-->
<style scoped>

</style>