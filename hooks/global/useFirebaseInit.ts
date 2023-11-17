import { useEffect } from 'react'

import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import useIsMount from './useIsMount'

function useFirebaseInit() {
  const isMounted = useIsMount()

  useEffect(() => {
    const firebaseConfig = {
      apiKey: process.env.NEXT_PUBLIC_FB_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FB_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FB_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FB_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FB_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FB_APP_ID,
      measurementId: process.env.NEXT_PUBLIC_FB_MEASUREMENT_ID,
    }

    const app = initializeApp(firebaseConfig)
    getAnalytics(app)
  }, [isMounted])
}

export default useFirebaseInit
