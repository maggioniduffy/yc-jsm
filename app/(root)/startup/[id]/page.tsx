import { client } from "@/sanity/lib/client";
import { STARTUP_BY_ID_QUERY } from "@/sanity/lib/queries";
import { formatDate } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import markdownit from "markdown-it";

const md = markdownit();

interface Params {
  params: Promise<{ id: string }>;
}

export const experimental_ppr = true;

const page = async ({ params }: Params) => {
  const id = (await params).id;

  const post = await client.fetch(STARTUP_BY_ID_QUERY, {
    id,
  });

  if (!post) return notFound();

  const { title, description, image, pitch, category, _createdAt } = post;

  const parsedContent = md.render(pitch || "");

  return (
    <>
      <section className="pink_container !min-h-[230px]">
        <p className="tag">{formatDate(_createdAt)}</p>

        <h1 className="text-3xl heading"> {title} </h1>
        <p className="sub-heading !maw-w-5xl"> {description} </p>
      </section>

      <section className="section_container">
        <img src={image} alt="thumbnail" className="w-full h-auto rounded-xl" />
        <div className="space-y-5 mt-10 max-w-4xl mx-auto">
          <div className="flex-between gap-5">
            <Link
              href={`/users/${post.author?._id}`}
              className="flex gap-2 items-center mb-3"
            >
              <Image
                src={post.author?.image}
                width={64}
                height={64}
                alt="avatar"
                className="rounded-full drop-shadow-lg"
              />
              <div>
                <p className="text=20-medium"> {post.author?.name} </p>
                <p className="text-16-medium !text-black-300">
                  {" "}
                  @{post.author.username}{" "}
                </p>
              </div>
            </Link>

            <p className="category-tag"> {category} </p>
            <h3 className="text-30-bold"> Pitch Details </h3>
            {parsedContent ? (
              <article
                dangerouslySetInnerHTML={{
                  __html: parsedContent,
                }}
              />
            ) : (
              <p className="no-result"> No details provided </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
