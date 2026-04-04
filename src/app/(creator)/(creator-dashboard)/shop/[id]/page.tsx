import CreatorShopDetails from '@/components/ui/creator/CreatorDashboard/CreatorShopDetails/index.'
import { myFetch } from '../../../../../../helpers/myFetch';


const page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const shopRes = await myFetch(`/product/${id}`, {
        method: "GET",
        cache: "no-store",
        tags: ["product"],
    })
    const product = shopRes?.data || {};
    // console.log(product)
    return (
        <div>
            <CreatorShopDetails product={product} />
        </div>
    )
}

export default page