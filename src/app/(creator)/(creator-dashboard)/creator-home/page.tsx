import CreatorHome from '@/components/ui/creator/CreatorDashboard/CreatorHome'
import getProfile from '../../../../../helpers/getProfile';
import { myFetch } from '../../../../../helpers/myFetch';
import { cookies } from 'next/headers';


const page = async () => {
  const token = (await cookies()).get("accessToken")?.value;
  // API CALLS
  const user = await getProfile();
  const statisticsRes = await myFetch('/wallet', {
    method: "GET"
  })
  const postRes = await myFetch('/post', {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
  // DATA RESPONSE
  const statistics = statisticsRes?.data || {};
  const posts = Array.isArray(postRes?.data) ? postRes?.data : [];
  console.log(posts)

  return <CreatorHome user={user} statistics={statistics} posts={posts} />

}

export default page