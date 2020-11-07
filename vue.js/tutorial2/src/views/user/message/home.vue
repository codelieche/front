<template>
  <div>
    hello home
    <el-popover
      placement="right-start"
      title="Hello"
      width="200"
      trigger="hover"
      content="这个是提示的内容"
    >
      <el-button slot="reference">hover激活</el-button>
    </el-popover>
  </div>
</template>