import SearchForm from "@/components/SearchForm";
import StartupCard from "@/components/StartupCard";
import { title } from "process";

interface Params {
  searchParams: Promise<{ query?: string }>;
}
export default async function Home({ searchParams }: Params) {
  const query = (await searchParams).query;

  const posts = [
    {
      _createdAt: new Date(),
      views: 55,
      author: {
        _id: 1,
        name: "John Doe",
      },
      _id: 1,
      description: "A new way to connect with entrepeneurs",
      image:
        "https://images.unsplash.com/photo-1737304697097-62a820f71964?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Tech",
      title: "Startup Pitch",
    },
  ];
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
          {posts.length > 0 ? (
            posts.map((post: StartupCardType, index: number) => (
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
