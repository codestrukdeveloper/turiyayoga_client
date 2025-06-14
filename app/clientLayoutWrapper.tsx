'use client'

import { useEffect, useState } from 'react'
import { Provider } from 'react-redux'
import store from '@/app/redux/app/store'
import { fetchModuleCategories } from '@/app/services/categoryService'

export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const [module_categories_option, setModule_categories_option] = useState("")

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await fetchModuleCategories()
      setModule_categories_option(data)
    }
    fetchCategories()
  }, [])

  return (
    <Provider store={store}>
      {/* 
      <Navbar 
        categories={module_categories_option}
      /> 
      */}
      {children}
    </Provider>
  )
}
