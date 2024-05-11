<!--js 脚本（组合式 api）-->
<script setup>
import { computed, onMounted, onUnmounted, onUpdated, reactive, ref, watch } from 'vue';

// 使用 ref 函数来声明响应式状态
const count = ref(0)  // 返回一个 RefImpl 对象
console.log('count is', count, '-->', JSON.stringify(count))
console.log('count.value is', count.value)

// 监听 count 值变化
watch(count, (nv) => {
  console.log(`new value is ${nv}`)
})

function increment() {
  count.value++
  console.log('after increment(), value is', count.value)
}

const programer = reactive({
  name: '李斌',
  languages: ['java', 'python', 'go', 'c++']
})

const size = computed(() => {
  return programer.languages.length
})

const level = computed(() => {
  console.log('level is ->', size.value)
  return size.value > 1 ? '高阶' : '初阶'
})

// 生命周期钩子
onMounted(() => {
  console.log("组件已加载")
})
onUpdated(() => {
  console.log("组件已更新")
})
onUnmounted(() => {
  console.log("组件已卸载")
})
</script>

<!--模板-->
<template>
  <h2>{{ count }}</h2>
  <button @click="increment">点击了 {{ count }} 次</button>

  <p>{{ programer.name }} 掌握了 {{ size }} 种编程语言， 所以他是 {{ level }} 程序猿.</p>
</template>