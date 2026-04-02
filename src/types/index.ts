export interface User {
    _id: string;
    name: string;
    email: string;
    image: string;
}

export interface Post {
    _id: string;
    user: User;
    title: string;
    description: string;
    images: string[];
    video: string;
    who_can_see: "Everyone" | "Friends" | "Only me";
    post_visibility: ("Everyone" | "Friends" | "Only me")[];
    like_count: number;
    comment_count: number;
    is_18_plus: boolean;
    status: "draft" | "published" | "archived";
    schedule_post: boolean;
    scdule_date: string; // ISO 8601 date string
    schedule_time: string; // e.g. "05:22 AM"
    createdAt: string; // ISO 8601 date string
    updatedAt: string; // ISO 8601 date string
    __v: number;
    timeAgo: string;
}