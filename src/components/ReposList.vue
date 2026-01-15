<script setup lang="ts">
import { computed, watch } from 'vue';
import { useReposStore } from '@/stores/repos';
import { storeToRefs } from 'pinia';
import ReposItem from '@/components/ReposItem.vue';
import Button from './controls/Button.vue';
const store = useReposStore();
const { items, total_count, loading, error, query, page, per_page } = storeToRefs(store);
const hasPreviousPage = computed(() => page.value > 1);
const hasNextPage = computed(() => page.value * per_page.value < total_count.value);
const notFound = computed(() => total_count.value === 0 && !loading.value && !error.value && query.value);
watch(page, () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});
</script>
<template>
  <div>
    <div class="repos-list">
      <div class="loading" v-if="loading">Loading...</div>
      <div v-if="notFound" class="not-found">No repos found</div>
      <div v-else-if="total_count > 0" class="total-count">{{ total_count }} repos found, page {{ page }}</div>
      <ReposItem v-for="repo in items" :key="repo.id" :repo="repo" />
    </div>
  </div>
  <div class="pagination" v-if="items.length > 0">
    <Button :disabled="!hasPreviousPage" @click="store.previousPage">
      <template #label>Previous</template>
    </Button>
    <Button :disabled="!hasNextPage" @click="store.nextPage">
      <template #label>Next</template>
    </Button>
  </div>
</template>
<style scoped lang="scss">
@use '../assets/variables.scss' as variables;

.repos-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 1000px;
  margin: 0 auto;
}

.pagination {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.not-found,
.total-count,
.loading {
  font-weight: 500;
  text-align: center;
  color: variables.$colorPlaceholders;
}
</style>
