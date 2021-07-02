<template>
  <component
    :is="tagName"
    :class="`resizable ${className}`"
    ref="resizeRef"
    :style="!disabled && width > 0 ? { width: `${width}px` } : {}"
  >
    <span
      class="react-resizable-handle"
      ref="elementRef"
      :style="{ display: disabled ? 'none' : 'block' }"
    ></span>
    <slot></slot>
  </component>
</template>

<script>
export default {
  name: 'Resizable',
  props: {
    className: { type: String, default: () => '' },
    tagName: { type: String, default: () => 'div' },
    defaultWidth: { type: Number, default: () => 200 },
    minWidth: { type: Number, default: 0 },
    maxWidth: { type: Number, default: 0 },
    disabled: { type: Boolean, default: () => false },
    afterSizeChange: Function,
  },
  data: function () {
    let width = this.defaultWidth
    return {
      width,
      canResizable: false,
    }
  },
  mounted() {
    this.addEvent()
  },
  methods: {
    addEvent: function () {
      //   console.log('addEvent', this)
      //   console.log(this.$refs)
      const resizeElement = this.$refs.resizeRef
      if (!resizeElement) {
        return
      }

      // 绑定事件
      resizeElement.onmousedown = (evt) => {
        this.canResizable = true
        let startX = evt.clientX

        // console.log('startX:', startX)
        // console.log(resizeElement.offsetLeft)

        // 设置鼠标移动事件
        document.onmousemove = (e) => {
          //   console.log('e:', e, this.canResizable)
          if (!this.canResizable) {
            // 如果不可拖拽了，那直接返回
            return
          }
          const endX = e.clientX
          //   console.log('endX - startX', endX - startX)
          //   console.log('maxWidth:', this.maxWidth, this)
          this.width = this.width + endX - startX
          startX = e.clientX
          if (this.minWidth > 0 && this.width < this.minWidth) {
            this.width = this.minWidth
            // 设置不可拖动了
            this.canResizable = false
          }

          if (this.maxWidth > 0 && this.width > this.maxWidth) {
            this.width = this.maxWidth
            // 设置不可拖动了
            this.canResizable = false
          }
        }
        document.onmouseup = () => {
          // 恢复颜色
          // resizeElement.style.background = '#fff'
          document.onmousemove = null
          document.onmouseup = null
          resizeElement.releasePointerCapture
          if (this.afterSizeChange) {
            this.afterSizeChange(this.width)
          }
        }
        resizeElement.setPointerCapture
        return false
      }
    },
  },
  watch: {
    //  监控默认宽度的变化
    defaultWidth: function () {
      if(this.defaultWidth > 0 && !this.disabled && this.width !== this.defaultWidth) {
          this.width = this.defaultWidth
      }
    },
  },
}
</script>

<style lang="less" scoped>
.resizable {
  position: relative;
  height: 100%;
  // display: inline-block;
  .react-resizable-handle {
    // background-color: #444;
    position: absolute;
    width: 15px;
    height: 100%;
    bottom: 0;
    right: -15px;
    cursor: col-resize;
    z-index: 10;
  }
}
</style>