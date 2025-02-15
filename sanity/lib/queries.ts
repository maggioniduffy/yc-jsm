import { defineQuery } from "next-sanity";

export const STARTUPS_QUERY = defineQuery(
  `*[_type == 'startup' && defined(slug.current)] | order(_createdAt desc) {
        id,
        title,
        slug,
        _createdAt,
        author => {
          _id, name, bio, image,
        },
        views, 
        description, 
        category,
        image
      }`
);
