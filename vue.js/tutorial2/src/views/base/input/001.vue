<template>
  <div class="full padding-20">
    <div>
      <div>
        <Input v-model="inputValue" />
      </div>
      <Button type="primary">按钮</Button>
      {{ inputValue }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Input001',
  data() {
    return {
      inputValue: '',
    }
  },
}
</script>