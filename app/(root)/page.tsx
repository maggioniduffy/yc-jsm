import SearchForm from "@/components/SearchForm";

interface Params {
  searchParams: Promise<{ query?: string }>;
}
export default async function Home({ searchParams }: Params) {
  const query = (await searchParams).query;

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
      <h1 className="heading"> Home </h1>
    </>
  );
}
