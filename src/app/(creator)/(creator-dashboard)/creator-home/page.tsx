import CreatorHome from '@/components/ui/creator/CreatorDashboard/CreatorHome'
import getProfile from '../../../../../helpers/getProfile';


const page = async () => {
  const user = await getProfile();
  return <CreatorHome user={user} />

}

export default page