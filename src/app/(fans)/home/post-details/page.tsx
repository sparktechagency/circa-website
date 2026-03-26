import PostDetailsLayout from "@/components/ui/fans/home/post-details/PostDetailsLayout";
import PostDetailsRightSide from "@/components/ui/fans/home/post-details/PostDetailsRightSide";
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
    // Sample image depending on type to match screenshots roughly
    imageUrl: postType === "free" ? "/homeBanner.svg" : "https://images.unsplash.com/photo-1544465544-1b71aee9dfa3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80", 
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
