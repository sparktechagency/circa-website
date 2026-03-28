import { Post } from "@/types/post";

  const MOCK_POSTS: Post[] = [
    {
      id: "1",
      type: "free",
      title: "Just Finished a new watercolor piece! 🎨✨",
      description: "Painting my emotions today. This series means so much to me. 🎨✨ Full time-lapse coming tonight!",
      imageUrl: "/post2.png",
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
    },
    {
      id: "2",
      type: "premium",
      title: "Exclusive behind the scenes look",
      description: "Painting my emotions today. This series means so much to me. 🎨✨ Full time-lapse coming tonight!",
      imageUrl: "/post1.png",
      likes: 3400,
      commentsCount: 800,
      timeAgo: "2 hour ago",
      author: {
        name: "Michel Lin",
        avatarUrl: "https://i.pravatar.cc/150?u=michel",
        role: "Digital Artist",
        membershipPlan: "Sweety",
        membershipPrice: "$4.99"
      }
    }
  ];  

  const TOP_CREATORS = [
    {
      id: 1,
      name: "Michel Lin",
      gifts: "20 Gifts",
      avatar: "https://i.pravatar.cc/150?u=michel",
    },
    {
      id: 2,
      name: "Michel Lin",
      gifts: "10 Gifts",
      avatar: "https://i.pravatar.cc/150?u=michel2",
    },
  ];
  
  const RECENTLY_ACTIVE = [
    {
      id: 1,
      name: "Sarah Stream",
      status: "Active Now",
      isOnline: true,
      avatar: "https://i.pravatar.cc/150?u=sarah",
    },
    {
      id: 2,
      name: "Joe Fitness",
      status: "2 hour ago",
      isOnline: false,
      avatar: "https://i.pravatar.cc/150?u=joe",
    },
    {
      id: 3,
      name: "Michel Lin",
      status: "2 hour ago",
      isOnline: false,
      avatar: "https://i.pravatar.cc/150?u=michel",
    },
  ];
  
  const FRIENDS_FLIRTING = [
    {
      id: 1,
      name: "Sarah Stream",
      avatar: "https://i.pravatar.cc/150?u=sarah",
    },
    {
      id: 2,
      name: "Joe Fitness",
      avatar: "https://i.pravatar.cc/150?u=joe",
    },
    {
      id: 3,
      name: "Michel Lin",
      avatar: "https://i.pravatar.cc/150?u=michel",
    },
  ]; 

  export { MOCK_POSTS, TOP_CREATORS, RECENTLY_ACTIVE, FRIENDS_FLIRTING };