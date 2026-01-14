import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import type { Repo, RepoFile } from '@/types/repo'
import { getRepoFiles, getRepoDetails } from '@/api/repos'

export const useCurrentRepoStore = defineStore('currentRepo', () => {
  const loading = ref(false)
  const loadingError = ref<string | null>(null)
  const currentRepo = reactive<Repo>({} as Repo)
  const repoFiles = reactive<RepoFile[]>([])
  const folder = ref<string>('')

  const fetchRepo = async (full_name: string) => {
    loading.value = true
    loadingError.value = null
    try {
      const details = await getRepoDetails(full_name)
      const files = await getRepoFiles(full_name)
      Object.assign(currentRepo, details)
      Object.assign(repoFiles, files.files)
    } catch (error: unknown) {
      loadingError.value = (error as Error).message as string
    } finally {
      loading.value = false
    }
  }
  return {
    currentRepo,
    repoFiles,
    folder,
    loading,
    loadingError,
    fetchRepo,
  }
})
