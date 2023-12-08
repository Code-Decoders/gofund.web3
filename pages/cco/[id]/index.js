import React from 'react'
import DefaultLayout from '@/layouts/default'
import { useRouter } from 'next/router'

const DetailPage = () => {
  const router = useRouter()

  const id = router.query.id
  return (
    <DefaultLayout>
        
    </DefaultLayout>
  )
}

export default DetailPage