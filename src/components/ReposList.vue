<script setup lang="ts">
import { computed } from 'vue';
import { useReposStore } from '@/stores/repos';
import { storeToRefs } from 'pinia';
import ReposItem from '@/components/ReposItem.vue';
const store = useReposStore();
const { items, total_count, loading, error, query } = storeToRefs(store);

const notFound = computed(() => total_count.value === 0 && !loading.value && !error.value && query.value);
</script>
<template>
  <div>
    <div class="repos-list">
      <div class="loading" v-if="loading">Loading...</div>
      <div v-if="notFound">No repos found</div>
      <div v-else>{{ total_count }} repos found</div>
      <ReposItem v-for="repo in items" :key="repo.id" :repo="repo" />
    </div>
  </div>
</template>
<style scoped>
.repos-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
