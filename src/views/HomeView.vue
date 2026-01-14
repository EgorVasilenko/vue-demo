<script setup lang="ts">
import { onMounted } from 'vue'
import Search from '@/components/Search.vue'
import ReposList from '@/components/ReposList.vue'

onMounted(async () => {
})
</script>

<template>
  <main>
    <Search />
    <ReposList />
  </main>
</template>
