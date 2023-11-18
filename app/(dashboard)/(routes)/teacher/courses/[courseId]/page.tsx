import React from 'react'

export default function page({params}:{params:{courseId:string}}) {

  return (
    <div>
        {params?.courseId}
    </div>
  )
}
