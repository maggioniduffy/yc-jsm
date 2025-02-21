import { client } from "@/sanity/lib/client";
import Ping from "./Ping";
import { STARTUP_VIEWS_QUERY } from "@/sanity/lib/queries";
import { writeClient } from "@/sanity/lib/write-client";
import { unstable_after as after } from "next/server";
interface Props {
  id: string;
}

function formatNumber(count: number): string {
  if (count) {
    if (count <= 1) {
      return `${count} view`;
    }

    return `${count} views`;
  }

  return "";
}

const View = async ({ id }: Props) => {
  const { views: totalViews } = await client
    .withConfig({
      useCdn: false,
    })
    .fetch(STARTUP_VIEWS_QUERY, { id });

  after(
    async () =>
      await writeClient
        .patch(id)
        .set({ views: totalViews + 1 })
        .commit()
  );

  return (
    <div className="view-container">
      <div className="absolute -top-2 -right-2">
        <Ping />
      </div>
      <p className="view-text">
        <span className="font-black"> {formatNumber(totalViews)} </span>
      </p>
    </div>
  );
};

export default View;
