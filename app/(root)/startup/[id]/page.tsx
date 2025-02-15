import { client } from "@/sanity/lib/client";
import { STARTUP_BY_ID_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";

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

  const { title, description, image, pitch, author, category } = post;
  return (
    <>
      <h1 className="text-3xl"> {title} </h1>
    </>
  );
};

export default page;
