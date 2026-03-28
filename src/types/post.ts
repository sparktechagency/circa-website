export interface Post {
  id: string;
  type: "free" | "premium";
  title: string;
  description: string;
  imageUrl: string;
  likes: number;
  commentsCount: number;
  timeAgo: string;
  author: {
    name: string;
    avatarUrl: string;
    role: string;
    membershipPlan: string;
    membershipPrice: string;
  };
}
