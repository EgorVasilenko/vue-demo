import type { FoundRepos, Repo, RepoFile } from '@/types/repo'
import { api } from './api'
export const searchRepos = async (query: string, page: number = 1, per_page: number = 20) => {
  const response = await api.get<FoundRepos>(`/search/repositories`, {
    params: {
      q: query,
      page,
      per_page,
    },
  })
  return response.data
}

export const getRepoFiles = async (full_name: string) => {
  const response = await api.get<{ files: RepoFile[] }>(`/repos/${full_name}/contents`)
  return response.data
}

export const getRepoDetails = async (full_name: string) => {
  const response = await api.get<Repo>(`/repos/${full_name}`)
  return response.data
}

export const getUserRepos = async (username: string) => {
  const response = await api.get<Repo[]>(`/users/${username}/repos`)
  return response.data
}
