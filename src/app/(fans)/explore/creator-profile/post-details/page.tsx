import PostDetailsLayout from "@/components/ui/fans/home/post-details/PostDetailsLayout";
import { myFetch } from "../../../../../../helpers/myFetch";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function PostDetailsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const typeParam = typeof params.type === "string" ? params.type : "free";

  const postType: "free" | "premium" = typeParam === "premium" ? "premium" : "free";
  const postId = typeof params.id === "string" ? params.id : "";
  // console.log("PostDetailsPage Params:", postId)
  const response = await myFetch(`/post/${postId}`, { tags: ['single-post'] })


  return (
    <div className="min-h-screen bg-[#0a0a0a] ">
      <PostDetailsLayout post={response?.data} />
    </div>
  );
}
