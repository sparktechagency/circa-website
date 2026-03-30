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

// {
//   _id: string;
//   user: PostUser;
//   title: string;
//   description: string;
//   images: string[];
//   video: string;
//   who_can_see: string;
//   post_visibility: string[];
//   like_count: number;
//   comment_count: number;
//   is_18_plus: boolean;
//   status: string;
//   schedule_post: boolean;
//   scdule_date: string | null;
//   schedule_time: string | null;
//   createdAt: string;
//   updatedAt: string;
//   timeAgo: string;
//   isLiked: boolean;
//   likeCount: number;
//   isPrimium: boolean;
// }
