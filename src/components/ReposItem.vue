<script setup lang="ts">
import { RouterLink } from 'vue-router';
import type { Repo } from '@/types/repo';
const { repo } = defineProps<{
  repo: Repo;
}>();
</script>
<template>
  <RouterLink :to="`/repo/${repo.full_name}`" class="repos-item">
    <div class="repos-item_content">
      <p class="repos-item_content-name">{{ repo.name }}</p>
      <p class="repos-item_content-description">{{ repo.description }}</p>
    </div>
    <div class="author">
      <div class="author-avatar" :style="{ backgroundImage: `url(${repo.owner.avatar_url})` }"></div>
      <p class="author-name">{{ repo.owner.login }}</p>
    </div>
  </RouterLink>
</template>
<style scoped lang="scss">
@use '../assets/variables.scss' as variables;

.repos-item {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  justify-content: space-between;

  &_content {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    &-name {
      font-size: 1.2rem;
      font-weight: 600;
    }

    &-description {
      font-size: 0.8rem;
      color: variables.$colorPlaceholders;
    }
  }
}

.author {
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &-avatar {
    width: var(--report-avatar-size);
    height: var(--report-avatar-size);
    border-radius: 50%;
    background-size: cover;
    background-position: center;
  }

  &-name {
    font-size: 0.8rem;
    font-weight: 500;
    color: variables.$colorPlaceholders;
  }
}
</style>
