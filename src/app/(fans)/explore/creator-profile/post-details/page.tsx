import PostDetailsLayout from "@/components/ui/fans/home/post-details/PostDetailsLayout";
import { Post } from "@/types/post";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function PostDetailsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const typeParam = typeof params.type === "string" ? params.type : "free";

  const postType: "free" | "premium" = typeParam === "premium" ? "premium" : "free";

  // Mock post data matching the screenshots
  const mockPost: Post = {
    id: "post-1",
    type: postType,
    title: "Just Finished a new watercolor piece! 🎨✨",
    description:
      "Painting my emotions today. This series means so much to me. 🎨✨ Full time-lapse coming tonight!\n\nThis painting captures a quiet yet powerful moment through rich colors and expressive brushstrokes. The composition draws the eye toward the central subject, while subtle textures and layered tones add depth and emotion.",
    imageUrl: postType === "free" ? "/post2.png" : "/post1.png", 
    likes: 1200,
    commentsCount: 1200,
    timeAgo: "2 hour ago",
    author: {
      name: "Michel Lin",
      avatarUrl: "https://i.pravatar.cc/150?u=michel",
      role: "Digital Artist",
      membershipPlan: "Sweety",
      membershipPrice: "$4.99"
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] ">
      <PostDetailsLayout post={mockPost} /> 
    </div>
  );
}
