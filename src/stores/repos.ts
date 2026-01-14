import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Repo } from '@/types/repo'
import { searchRepos } from '@/api/repos'

export const useReposStore = defineStore('repos', () => {
  const items = ref<Repo[]>([])
  const total_count = ref(0)
  const page = ref(1)
  const per_page = ref(20)
  const query = ref('')
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchRepos = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await searchRepos(query.value, page.value, per_page.value)
      items.value = response.items
      total_count.value = response.total_count
    } catch (e) {
      error.value = e.message as string
    } finally {
      loading.value = false
    }
  }

  const searchRepo = async (queryString: string) => {
    query.value = queryString.trim()
    if (!query.value) {
      items.value = []
      total_count.value = 0
      return
    }
    await fetchRepos()
  }

  const nextPage = async () => {
    page.value++
    await fetchRepos()
  }

  const previousPage = async () => {
    page.value--
    await fetchRepos()
  }

  return {
    items,
    total_count,
    page,
    per_page,
    query,
    loading,
    error,
    fetchRepos,
    searchRepo,
    nextPage,
    previousPage,
  }
})
