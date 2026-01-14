export type Repo = {
  id: number
  name: string
  description: string
  html_url: string
  stargazers_count: number
  forks_count: number
  open_issues_count: number
  private: boolean
  full_name: string
  watchers_count: number
  owner: {
    login: string
    avatar_url: string
  }
}

export type ReposStore = {
  items: Repo[]
  total_count: number
  loading: boolean
  error: Error | null
  page: number
  per_page: number
  query: string
}

export type FoundRepos = {
  items: Repo[]
  total_count: number
}

export type RepoFile = {
  name: string
  path: string
  sha: string
  size: number
  url: string
  html_url: string
  git_url: string
  download_url: string
  type: string
}
