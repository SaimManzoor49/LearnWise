import { Button } from '@/components/ui/button'
import React from 'react'
import Link from "next/link"
export default function page() {
  return (
    <div className='p-6'>
        <Link href={'/teacher/create'}>
        <Button>
            New Course
        </Button>
        </Link>
    </div>
  )
}
