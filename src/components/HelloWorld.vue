<script setup>
import { ref } from 'vue'
import { Button, PageHeader } from 'ant-design-vue';
import PaperName from './Classifier/PaperName.vue'
defineProps({
  msg: String,
})

const count = ref(0)
</script>

<template>
  <div class="abc">
    <div>
      <PaperName />
    </div>
  </div>
</template>

<style scoped>
/* #abc {
  margin: 0px;
  padding: 0px;
} */
</style>
