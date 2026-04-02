"use server";

import { cookies } from "next/headers";

const getProfile = async (): Promise<any | null> => {
  const token = (await cookies()).get("accessToken")?.value;

  if (!token) return null;
  const res = await fetch(`${process.env.BASE_URL}/user/profile`, {
    next: {
      tags: ["user-profile"],
    },
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
<<<<<<< HEAD
  const { data } = await res?.json();  
=======
  const { data } = await res?.json();

>>>>>>> 37e8a8418e807e45d6a8dc9b060d2820a7e6d442
  return data;
};

export default getProfile;
