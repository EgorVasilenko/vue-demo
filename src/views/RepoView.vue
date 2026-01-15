<script setup lang="ts">
import { onMounted } from 'vue'
import RepoDetails from '@/components/RepoDetails.vue'
import { useRoute } from 'vue-router'
import { useCurrentRepoStore } from '@/stores/currentRepo'

onMounted(async () => {
  const route = await useRoute()
  const { owner, name } = route.params as { owner: string, name: string }
  const store = useCurrentRepoStore();
  await store.fetchRepo(`${owner}/${name}`);
})
</script>

<template>
  <main>
    <RepoDetails />
  </main>
</template>
