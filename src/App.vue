<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Button from './components/controls/Button.vue';
</script>

<template>
  <header>

    <h1 class="title">GitHub Repo Viewer</h1>
    <nav>
      <RouterLink to="/" class="nav-link"><Button :style="{ fontSize: '1rem' }"><template
            #label>Home</template></Button>
      </RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped lang="scss">
@use './assets/variables.scss' as variables;

header {
  max-width: variables.$contentMaxWidth;
  margin: 0 auto;
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  align-items: center;
}

.title {
  color: variables.$colorPrimary;
  font-size: 2rem;
  font-weight: 600;
}

@media (max-width: 768px) {
  .title {
    font-size: 1.5rem;
  }

  header {
    flex-direction: column;
    align-items: flex-start;
    position: sticky;
    top: 0;
    background-color: white;
    z-index: 100;
    padding: 1rem 0;
    transition: all 0.3s linear;
  }
}
</style>
