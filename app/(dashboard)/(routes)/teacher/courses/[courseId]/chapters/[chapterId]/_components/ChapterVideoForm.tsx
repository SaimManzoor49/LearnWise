'use client'
import React, { useState } from 'react'
import * as z from 'zod'
import axios from 'axios'


import { Button } from '@/components/ui/button'
import { ImageIcon, Pencil, PlusCircle, VideoIcon } from 'lucide-react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { Chapter, Course, MuxData } from '@prisma/client'
import Image from 'next/image'
import { FileUpload } from '@/components/FileUpload'

interface ChapterVideoFormProps {
    initialData: Chapter & { muxData?: MuxData | null }
    courseId: string;
    chapterId: string;
}


const formSchema = z.object({
    videoUrl: z.string().min(1)
})

export default function ChapterVideoForm({ initialData, courseId, chapterId }: ChapterVideoFormProps) {
    const toggleEdit = () => setIsEditing(!isEditing);
    const [isEditing, setIsEditing] = useState(false)
    const router = useRouter();


    const onSubmit = async (values: z.infer<typeof formSchema>) => {

        try {
            await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values);
            toast.success("Chapter updated!")
            toggleEdit();
            router.refresh();
        } catch (error) {
            toast.error("Something went wront")

        }

    }

    return (
       
            {!isEditing && (
                !initialData.videoUrl  ? (<>
                    <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
                        <VideoIcon className='h-10 w-10 text-slate-500' />
                    </div>
                </>) : (<>
                    <div className="relative aspect-video mt-2">
                        Video uploaded
                    </div>
                </>)
            )}
            {isEditing && (
                <div>
                    <FileUpload
                        endpoint='chapterVideo'
                        onChange={(url) => {
                            if (url) {
                                onSubmit({ videoUrl: url })
                            }
                        }}
                    />
                    <div className="text-xs text-muted-foreground mt-4">
                        Upload this chapter&apos;s video
                    </div>
                </div>
            )}
            {initialData.videoUrl && !isEditing && (
                <div className="text-xs text-muted-foreground mt-2 ">
                    Videos can take a few minutes to process. Refresh the page if video dose not appear.
                </div>
            )}
        </div>
    )
}
