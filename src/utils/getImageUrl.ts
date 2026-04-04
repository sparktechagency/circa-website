export function getImageUrl(imageurl: string) {

  if (imageurl?.startsWith("http") || imageurl?.startsWith('blob:')) return imageurl;
  return (
    (process.env.IMAGE_BASE_URL || "http://10.10.7.9:5005/files") + imageurl
  );
}
