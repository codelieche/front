<template>
  <div>
    Slog Index Page
    <hr/>
    <slot-button :onClick="onClick">按钮222</slot-button>
    <slot-button :onClick="onClick" type="primary"></slot-button>
    <slot-button :onClick="onClick" type="error"></slot-button>
  </div>
</template>

<script>
import SlotButton from "./components/button.vue"
export default {
  name: 'SlotHome',
  components: {
    "slot-button": SlotButton
  },
  methods: {
      onClick(){
          console.log("on click" + new Date())
      }
  }
}
</script>