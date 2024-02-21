import {
  useState,
  useEffect,
  createContext,
  useMemo,
  useContext,
  useCallback,
} from "react"

function getSearchParams(search: string) {
  const hashes = search.slice(search.indexOf("?") + 1).split("&")
  return hashes.reduce((params, hash) => {
    let [key, val] = hash.split("=")
    params[key] = decodeURIComponent(val)
    return params
  }, {} as Record<string, string>)
}

export function useSearchParams() {
  const [searchParams, setSearchParams] = useState(() =>
    getSearchParams(window.location.search)
  )
  function onChange() {
    setSearchParams(getSearchParams(window.location.search))
  }

  useEffect(() => {
    window.addEventListener("popstate", onChange)
    return () => window.removeEventListener("popstate", onChange)
  }, [])

  function updateUrl(params: Record<string, string>) {
    const newSearch = Object.entries(params)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      )
      .join("&")

    window.history.pushState({}, "", `?${newSearch}`)
    onChange()
  }

  return [searchParams, updateUrl] as const
}

export const SearchParams = createContext<{
  params: Record<string, string>
  updateUrl: (params: Record<string, string>) => void
}>({ params: {}, updateUrl: () => {} })

export function useSearchValue(key: string) {
  const { params, updateUrl } = useContext(SearchParams)
  const value = useMemo(() => params[key] || "", [params])
  const setValue = useCallback((name: string) => {
    updateUrl({
      ...params,
      [key]: name,
    })
  }, [])
  return [value, setValue] as const
}
