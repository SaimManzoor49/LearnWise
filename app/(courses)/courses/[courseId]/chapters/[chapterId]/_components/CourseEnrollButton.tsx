'use client'
import { Button } from '@/components/ui/button'
import { formatePrice } from '@/lib/formate'
import React from 'react'

interface CourseEnrollButtonProps{
    courseId:string,
    price:number
}


const CourseEnrollButton = ({courseId,price}:CourseEnrollButtonProps) => {
  return (
    <Button className='w-full md:w-auto'>
        Enroll for {formatePrice(price)}
    </Button>
  )
}

export default CourseEnrollButton