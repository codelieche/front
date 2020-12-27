import { onBeforeUnmount, onMounted, reactive } from 'vue'

export default function useMousePosition() {
  const position = reactive({
    x: -1,
    y: -1
  })

  // 更新鼠标位置函数
  // 鼠标点击的时候，收集x、y的坐标
  const updateMousePosition = (evt: MouseEvent) => {
    position.x = evt.pageX
    position.y = evt.pageY
  }

  // 页面加载之后，添加click事件
  onMounted(() => {
    document.addEventListener('click', updateMousePosition)
  })

  // 组件要卸载的时候，清除click事件
  onBeforeUnmount(() => {
    document.removeEventListener('click', updateMousePosition)
  })

  return {
    position
  }
}
