import React from 'react'
import { Chapter, Course, UserProgress } from '@prisma/client'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import CourseSidebarItem from './CourseSidebarItem'


interface CourseSidebarProps{
    course:Course & {
        chapters:(Chapter & {
            userProgress:UserProgress[]|null
        })[]
    },
    progressCount:number
}

const CourseSidebar = async({course,progressCount}:CourseSidebarProps) => {

    const {userId} = auth()
    if(!userId) redirect('/')

    const purchase = await db.purchase.findUnique({
        where:{
            userId_courseId:{
                userId,
                courseId:course.id
            }
        }
    })

    
  return (
    <div className='h-full border-r flex flex-col overflow-y-auto shadow-sm'>
        <div className="p-8 flex flex-col border-b">
            <h1 className='font-semibold'>{course.title}</h1>
            {/* CheckPurchase +progress */}
        </div>
        <div className="flex flex-col w-full">
            {course.chapters.map((ch)=>{
        // console.log(ch.isFree,"   ", purchase , "  " , ch.title )//////////////////////////////////

                return (<CourseSidebarItem 
                    key={ch.id}
                    id={ch.id}
                    label={ch.title}
                    isCompleted={!!ch.userProgress?.[0]?.isCompleted}
                    courseId={course.id}
                    isLocked={!(ch.isFree && !purchase)} /////////////////////////////////
    
                    />)
            })}
        </div>
    </div>
  )
}

export default CourseSidebar