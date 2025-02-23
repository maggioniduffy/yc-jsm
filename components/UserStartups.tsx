import { client } from "@/sanity/lib/client";
import { STARTUPS_BY_AUTHOR_QUERY } from "@/sanity/lib/queries";
import StartupCard, { StartupTypeCard } from "./StartupCard";

interface Props {
  id: string;
}

const UserStartups = async ({ id }: Props) => {
  const startups = await client.fetch(STARTUPS_BY_AUTHOR_QUERY, { id });
  console.log(startups);
  return (
    <>
      {startups.length > 0 ? (
        startups.map((startup: StartupTypeCard) => {
          return <StartupCard key={startup._id} post={startup} />;
        })
      ) : (
        <p className="no_result"> No posts yet </p>
      )}
    </>
  );
};

export default UserStartups;
