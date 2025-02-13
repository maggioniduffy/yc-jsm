import Form from "next/form";
import { Search } from "lucide-react";
import SearchFormReset from "./SearchFormReset";
import { Button } from "./ui/button";

interface Props {
  query?: string;
}
const SearchForm = ({ query }: Props) => {
  return (
    <Form action={"/"} scroll={false} className="search-form">
      <input
        defaultValue={query}
        name="query"
        placeholder="Search startups"
        className="search-input"
      />
      <div className="flex gap-2">
        {query && <SearchFormReset />}
        <button type="submit" className="search-btn text-white">
          <Search className="size-5" />
        </button>
      </div>
    </Form>
  );
};

export default SearchForm;
