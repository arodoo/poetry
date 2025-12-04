/*
 * File: useMembershipsListState.ts
 * Purpose: State hook for memberships list page pagination and search.
 * All Rights Reserved. Arodi Emmanuel
 */
import { useState } from 'react'

export interface MembershipsListState {
  page: number
  setPage: (page: number) => void
  size: number
  setSize: (size: number) => void
  search: string
  setSearch: (search: string) => void
}

export function useMembershipsListState(): MembershipsListState {
  const [page, setPage] = useState<number>(0)
  const [size, setSize] = useState<number>(10)
  const [search, setSearch] = useState<string>('')
  return { page, setPage, size, setSize, search, setSearch }
}
