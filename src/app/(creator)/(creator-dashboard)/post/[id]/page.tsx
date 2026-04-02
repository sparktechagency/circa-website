import CreatorPostDetails from '@/components/ui/creator/CreatorDashboard/CreatorPostDetails'
import React from 'react'
import { myFetch } from '../../../../../../helpers/myFetch';

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  // console.log(id)
  const postRes = await myFetch(`/post/${id}`)
  const commentRes = await myFetch(`/post/comment/${id}`, {
    method: "GET",
    tags: ["post-comments"]
  })
  const post = postRes?.data || {};
  const comments = commentRes?.data || [];
  console.log(comments)
  return (
    <div>
      <CreatorPostDetails post={post} comments={comments} />
    </div>
  )
}

export default page