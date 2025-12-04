/*
 * File: useListPageState.ts
 * Purpose: Reusable state hook for list pages with pagination and search.
 * All Rights Reserved. Arodi Emmanuel
 */
import { useState } from 'react'

export interface ListPageState {
  page: number
  setPage: (page: number) => void
  size: number
  setSize: (size: number) => void
  search: string
  setSearch: (search: string) => void
}

export function useListPageState(): ListPageState {
  const [page, setPage] = useState<number>(0)
  const [size, setSize] = useState<number>(10)
  const [search, setSearch] = useState<string>('')
  return { page, setPage, size, setSize, search, setSearch }
}
