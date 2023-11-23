import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function PUT(req:Request,{params}:{params:{courseId:string}}){


    try {

        const {userId} = auth()

        if(!userId){
            return new NextResponse("UNATUHORIZED",{status:401})
        }
        
        const {list} =await req.json();
        
        const courseOwner = await db.course.findUnique({
            where:{
                id:params.courseId,
                userId
            }
        })
        
                if(!courseOwner){
                    return new NextResponse("UNATUHORIZED",{status:401})
                }

        
    } catch (error) {
        console.log("REORDER",error)
        return new NextResponse("Internal Error",error)
    }


} 