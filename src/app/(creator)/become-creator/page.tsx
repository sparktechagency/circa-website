import BecomeCreator from "@/components/ui/creator/BecomeCreator";
import { myFetch } from "../../../../helpers/myFetch";

const page = async () => {
  const categoriesRes = await myFetch("/category", {
    method: "GET",
  });
  const categories = Array.isArray(categoriesRes?.data)
    ? categoriesRes.data
    : [];
  // console.log(categories);
  return <BecomeCreator categories={categories} />;
};

export default page;
