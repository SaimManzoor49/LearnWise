'use client'
import React, { useState } from 'react'
import * as z from 'zod'
import axios from 'axios'


import { Button } from '@/components/ui/button'
import { ImageIcon, Pencil, PlusCircle } from 'lucide-react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { Course } from '@prisma/client'
import Image from 'next/image'
import { FileUpload } from '@/components/FileUpload'

interface ChapterVideoFormProps {
    initialData: Course
    courseId: string;
}


const formSchema = z.object({
    imageUrl: z.string().min(1, { message: 'Image is required' })
})

export default function ChapterVideoForm({ initialData, courseId }: ChapterVideoFormProps) {
    const toggleEdit = () => setIsEditing(!isEditing);
    const [isEditing, setIsEditing] = useState(false)
    const router = useRouter();


    const onSubmit = async (values: z.infer<typeof formSchema>) => {

        try {
            await axios.patch(`/api/courses/${courseId}`, values);
            toast.success("Course updated!")
            toggleEdit();
            router.refresh();
        } catch (error) {
            toast.error("Something went wront")

        }

    }

    return (
        <div className='mt-6 border bg-slate-100 rounded-md p-4'>
            <div className="font-medium flex items-center justify-between">
                Course image
                <Button onClick={toggleEdit} variant={'ghost'}>
                    {isEditing && (
                        <>Cancel</>
                    )}
                    {!isEditing && (initialData.imageUrl ==='null')  && (
                        <>
                        <PlusCircle  className='h-4 w-4 mr-2'/>
                        Add an image
                        </>
                    )}

                    {!isEditing && !(initialData.imageUrl === 'null') && 
                        (
                            <>
                                <Pencil className='h-4 w-4 mr-2' />
                                Edit image
                            </>
                        )}
                </Button>
            </div>
            {!isEditing && (
              initialData.imageUrl === 'null'?(<>
              <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
                <ImageIcon className='h-10 w-10 text-slate-500' />
              </div>
              </>):(<>
              <div className="relative aspect-video mt-2">
                <Image
                alt='upload'
                fill
                className='object-cover rounded-md'
                src={initialData.imageUrl as string}////////////////////////// ehhehe
                />
              </div>
              </>)
            )}
            {isEditing && (
               <div>
                <FileUpload 
                endpoint='courseImage'
                onChange={(url)=>{
                    if(url){
                        onSubmit({imageUrl:url})
                    }
                }}
                />
                <div className="text-xs text-muted-foreground mt-4">
                    16:9 aspect ratio recomanded
                </div>
               </div>
            )}
        </div>
    )
}
