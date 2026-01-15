import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Repo, RepoFile } from '@/types/repo'
import { getRepoFiles, getRepoDetails } from '@/api/repos'

export const useCurrentRepoStore = defineStore('currentRepo', () => {
  const loading = ref(false)
  const loadingError = ref<string | null>(null)
  const currentRepo = ref<Repo>({} as Repo)
  const repoFiles = ref<RepoFile[]>([])
  const folder = ref<string>('')

  const fetchRepo = async (full_name: string) => {
    loading.value = true
    loadingError.value = null
    folder.value = ''
    try {
      const details = await getRepoDetails(full_name)
      const files = await getRepoFiles(full_name)
      currentRepo.value = details
      repoFiles.value = files.sort((a, b) => a.type.localeCompare(b.type))
    } catch (error: unknown) {
      loadingError.value = (error as Error).message as string
    } finally {
      loading.value = false
    }
  }

  const setFolder = async (newFolder: string) => {
    folder.value = newFolder
    const files = await getRepoFiles(currentRepo.value.full_name, newFolder)
    repoFiles.value = files.sort((a, b) => a.type.localeCompare(b.type))
  }

  return {
    currentRepo,
    repoFiles,
    folder,
    loading,
    loadingError,
    fetchRepo,
    setFolder,
  }
})
