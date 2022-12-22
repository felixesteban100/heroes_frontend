import { useEffect, useState } from 'react'

function useFetch(url) {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState()
    const [error, setError] = useState()

    useEffect(() => {
        const controller = new AbortController()
        setLoading(true)
        fetch(url, { signal: controller.signal })
        .then(setData)
        .catch(setError)
        .finally(() => setLoading(false))

        return () => {
            controller.abort()
        }
    }, [url])
  
    return {loading, data, error}
}

export default useFetch