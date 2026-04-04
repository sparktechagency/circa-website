import Membership from "@/components/ui/fans/explore/creator-profile/membership";
import { myFetch } from "../../../../../../helpers/myFetch";
interface PageProps {
  searchParams: Promise<{ creatorId: string | string[] | undefined }>;
}

const MembershipPage = async ({ searchParams }: PageProps) => {
  const params = await searchParams;
  const creatorId = params?.creatorId;

  const response = await myFetch(`/plan/user/${creatorId}`)
  const membershipPlans = response?.data;
  // console.log("membershipPlans",  membershipPlans);

  return (
    <div>
      <Membership plans={membershipPlans} />
    </div>
  );
};

export default MembershipPage;