import { useDebouncedCallback } from "use-debounce";
import css from "./SearchBox.module.css";

interface SearchBoxProps {
  search: string;
  onSearch: (search: string) => void;
}

const SearchBox = ({ search, onSearch }: SearchBoxProps) => {
  const debounced = useDebouncedCallback((value: string) => {
    onSearch(value);
  }, 1000);

  return (
    <input
      className={css.input}
      type="search"
      placeholder="Search notes"
      defaultValue={search}
      onChange={(event) => debounced(event.target.value)}
    />
  );
};

export default SearchBox;
