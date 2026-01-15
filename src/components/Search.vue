<template>
  <form @submit.prevent="search" class="search">
    <input type="text" v-model="searchQuery" class="search_input" />
    <button type="submit" class="search_button" :disabled="isDisabled">Search</button>
  </form>
</template>
<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useReposStore } from '@/stores/repos';
import { storeToRefs } from 'pinia';
import { useRoute, useRouter } from 'vue-router';
const searchStore = useReposStore();
const searchQuery = ref<string>('');
const router = useRouter()
const route = useRoute()
const { loading, query } = storeToRefs(searchStore);
const isDisabled = computed(() => loading.value === true || searchQuery.value.length === 0 || query.value === searchQuery.value);
const search = async () => {
  await await router.push({
    query: {
      ...route.query,
      q: searchQuery.value || undefined,
    },
  })
  await searchStore.searchRepo(searchQuery.value);
}

const applyRouteQuery = async () => {
  const q = route.query.q
  if (q && typeof q === 'string') {
    searchQuery.value = q
    await searchStore.searchRepo(searchQuery.value)

  } else {
    if (searchStore.query) {
      searchQuery.value = searchStore.query
    }
  }
}

onMounted(applyRouteQuery)

</script>
<style scoped lang="scss">
@use '@/assets/variables.scss' as variables;

.search {
  display: flex;
  margin: 1em auto;
  max-width: 500px;
  font-size: variables.$fontSizeInput;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  border-radius: variables.$inputsRadius;

  &:focus-within {
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  }

  &_input {
    width: 100%;
    padding: 1rem;
    border: 1px solid variables.$colorBorder;
    border-radius: 1rem 0 0 1rem;
    font-size: variables.$fontSizeInput;

    &:webkit-search-decoration {
      display: none;
    }

    &:focus {
      border: 1px solid variables.$colorBorder;
      outline: none;
    }
  }

  &_button {
    padding: 0.5rem 2rem;
    border: none;
    border-radius: 0 variables.$inputsRadius variables.$inputsRadius 0;
    background-color: variables.$buttonsBackground;
    color: variables.$buttonsColor;
    font-size: variables.$fontSizeButton;

    &:disabled {
      opacity: 0.5;
    }
  }
}
</style>
