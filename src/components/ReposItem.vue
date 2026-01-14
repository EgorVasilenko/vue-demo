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
      <p>{{ repo.name }}</p>
      <p>{{ repo.description }}</p>
    </div>
    <div class="author">
      <div class="author-avatar" :style="{ backgroundImage: `url(${repo.owner.avatar_url})` }"></div>
      <p class="author-name">{{ repo.owner.login }}</p>
    </div>
  </RouterLink>
</template>
<style scoped lang="scss">
.repos-item {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  &_content {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
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
    font-weight: 600;
    color: #000;
  }
}
</style>
