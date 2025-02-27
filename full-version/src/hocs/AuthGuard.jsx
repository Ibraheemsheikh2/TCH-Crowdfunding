// // Third-party Imports
// import { getServerSession } from 'next-auth'

// // Component Imports
// import AuthRedirect from '@/components/AuthRedirect'

// export default async function AuthGuard({ children, locale }) {
//   const session = await getServerSession()

//   return <>{session ? children : <AuthRedirect lang={locale} />}</>
// }


'use client'

// Component Imports
import AuthRedirect from '@/components/AuthRedirect'

export default function AuthGuard({ children, locale }) {
  // console.log("AuthGuard", typeof window)
  // Check if token exists in localStorage
  // const isAuthenticated = typeof window !== 'undefined' && localStorage.getItem('userData')
  const isAuthenticated = localStorage.getItem('userData')
  console.log("isAuthenticated teting", isAuthenticated)

  return <>{isAuthenticated ? children : <AuthRedirect lang={locale} />}</>
  // return <>{children}</>
}
