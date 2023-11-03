import { useEffect, useState } from 'react'

const useHydratedPersistantStore = (): boolean => {
    const [isHydrated, setIsHydrated] = useState(false)
    useEffect(() => {
        setIsHydrated(true)
    }, [])
    return isHydrated
}

export default useHydratedPersistantStore
