import SearchForm from "@/components/SearchForm";
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";
import { client } from "@/sanity/lib/client";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { formatDate } from "@/utils";

interface Params {
  searchParams: Promise<{ query?: string }>;
}
export default async function Home({ searchParams }: Params) {
  const query = (await searchParams).query;

  const posts: StartupTypeCard[] = await client.fetch(STARTUPS_QUERY);
  const formattedPosts = posts.map((post) => ({
    ...post,
    _createdAt: formatDate(post._createdAt),
  }));
  console.log(JSON.stringify(posts, null, 2));

  return (
    <>
      <section className="pink_container">
        <h1 className="heading">
          {" "}
          Pitch your start up <br /> Connect with entrepeneurs
        </h1>
        <p className="sub-heading !max-w-3xl">
          {" "}
          Submit Ideas, Vot on Pitches, and Get Noticed in Virtual Competitions
        </p>
        <SearchForm query={query} />
      </section>
      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for "${query}"` : "All startups"}
        </p>

        <ul className="mt-7 card_grid">
          {formattedPosts.length > 0 ? (
            formattedPosts.map((post: StartupTypeCard, index: number) => (
              <StartupCard key={post._id} post={post} />
            ))
          ) : (
            <p className="no-results"> No startups found </p>
          )}
        </ul>
      </section>
    </>
  );
}
