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
    const [key, val] = hash.split("=")
    params[key] = decodeURIComponent(val)
    return params
  }, {} as Record<string, string>)
}

export function useSearchParams() {
  const [searchParams, setSearchParams] = useState(() =>
    getSearchParams(window.location.search)
  )

  useEffect(() => {
    function onChange() {
      setSearchParams(getSearchParams(window.location.search))
    }
    window.addEventListener("popstate", onChange)
    return () => window.removeEventListener("popstate", onChange)
  }, [])

  const updateUrl = useCallback((params: Record<string, string>) => {
    setSearchParams(params)
    const newSearch = Object.entries(params)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      )
      .join("&")

    window.history.pushState({}, "", `?${newSearch}`)
  }, [])

  return [searchParams, updateUrl] as const
}

export const SearchParams = createContext<{
  params: Record<string, string>
  updateUrl: (params: Record<string, string>) => void
}>({ params: {}, updateUrl: () => {} })

export function useSearchValue(key: string) {
  const { params, updateUrl } = useContext(SearchParams)
  const value = useMemo(() => params[key] || "", [key, params])
  const setValue = useCallback(
    (name: string) => {
      updateUrl({
        ...params,
        [key]: name,
      })
    },
    [key, params, updateUrl]
  )
  return [value, setValue] as const
}
