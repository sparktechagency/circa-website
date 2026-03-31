import { imgUrl } from "./imgUrl"

export const imageFormatter = (image:string)=>{
    return image.startsWith('http')?image:imgUrl+image
}