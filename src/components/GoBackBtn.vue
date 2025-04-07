<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const goBack = () => {
  router.back()
}
</script>
<template>
  <q-btn label="Go Back" icon="arrow_back" color="white" text-color="black" @click="goBack" />
</template>
++
