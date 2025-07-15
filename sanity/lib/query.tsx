import { groq } from "next-sanity";

export const getHeader = groq`*[_type == "headerCarousel"][0]{
  _id,
  items[]{
    "media": media.asset->url,
     textCs,
    textEn,
    link
  }
}`
export const getAbout = groq`*[_type == "aboutCarousel"][0]{
  _id,
  items[]{
    isImage,
    "media": media.asset->url,
  }
}`

export const getCars = groq`*[_type == "vehicle"]{
  _id,
  "images": images[].asset->url,
  "slug": slug.current,
  title,
  fuel,
  engine_power,
  price,
  stk_date
}`

export const getCarsByPage = groq`*[_type == "vehicle"][$start...$end]{
  _id,
  "images": images[].asset->url,
  "slug": slug.current,
  title,
  fuel,
  engine_power,
  price,
  stk_date
}`

export const getCar = groq`*[_type == "vehicle" && id == $id][0] {
  title,
  id,
  "photos":images[].asset->url
}
`

export const getCarsFiltered = groq`*[_type == "vehicle" &&(
    !$brand || manufacturer_id == $brand
  ) && (
    !$price ||  price<$price
  ) ][$start...$end]{
  _id,
  "images": images[].asset->url,
  "slug": slug.current,
  title,
  fuel,
  engine_power,
  price,
  stk_date
}`

export const reviews_query = groq`*[_type == "reviews"]{
    author_name,
    author_url,
    text,
    ajText,
    rating
}`