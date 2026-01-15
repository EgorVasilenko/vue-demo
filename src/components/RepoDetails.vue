<template>
  <div class="loading" v-if="loading">Loading...</div>

  <div class="repo-details" v-if="!loading && repo.name">
    <div class="repo-details_content">
      <p class="repo-details_content-name">{{ repo.name }}</p>
      <p class="repo-details_content-description">{{ repo.description }}</p>
    </div>
    <div class="repo-details_author">
      <div class="repo-details_author-avatar" :style="{ backgroundImage: `url(${repo.owner.avatar_url})` }"></div>
      <p class="repo-details_author-name">{{ repo.owner.login }}</p>
    </div>
    <div class="repo-details_files">
      <div class="repo-details_files-item" @click="chageFolder('')" v-if="folder">..</div>
      <div :class="{ 'repo-details_files-item': true, 'repo-details_files-item--folder': file.type === 'dir' }"
        v-for="file in repoFiles" :key="file.path" @click="fileClick(file)">
        <FileIcon v-if="file.type === 'file'" />
        <FolderIcon v-if="file.type === 'dir'" />
        <p class="repo-details_files-item-name">{{ file.path }}</p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useCurrentRepoStore } from '@/stores/currentRepo';
import { storeToRefs } from 'pinia';
import FileIcon from '@/components/icons/FileIcon.vue';
import FolderIcon from '@/components/icons/FolderIcon.vue';
import type { RepoFile } from '@/types/repo';
const store = useCurrentRepoStore()
const { currentRepo: repo, repoFiles, loading, folder } = storeToRefs(store);
const chageFolder = async (folder: string) => {
  await store.setFolder(folder)
}

const fileClick = async (file: RepoFile) => {
  if (file.type === 'dir') {
    await store.setFolder(file.path)
  } else {
    window.open(file.download_url, '_blank')
  }
}
</script>

<style scoped lang="scss">
@use '../assets/variables.scss' as variables;

.repo-details {
  max-width: variables.$contentMaxWidth;
  margin: 0 auto;

  &_content {
    &-name {
      font-size: 1.2rem;
      font-weight: 600;
      color: variables.$colorPrimary;
    }

    &-description {
      font-size: 0.8rem;
    }
  }

  &_author {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin: .5rem 0;

    &-avatar {
      width: var(--report-avatar-size);
      height: var(--report-avatar-size);
      border-radius: 50%;
      background-size: cover;
      background-position: center;
    }
  }

  &_files {
    &-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.2rem 1rem;
      cursor: pointer;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #f0f0f0;
      }

      &--folder {
        background-color: #f0f0f0;

        .repo-details_files-item-name {
          font-weight: 500;
        }

        &:hover {
          background-color: transparent;
        }
      }
    }
  }
}

.loading {
  font-weight: 500;
  text-align: center;
  color: variables.$colorPlaceholders;
}
</style>
