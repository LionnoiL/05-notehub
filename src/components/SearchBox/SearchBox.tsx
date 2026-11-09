import css from "./SearchBox.module.css";

interface SearchBoxProps {
  search: string;
  onSearch: (search: string) => void;
}

const SearchBox = ({ search, onSearch }: SearchBoxProps) => {
  return (
    <input
      className={css.input}
      type="search"
      placeholder="Search notes"
      value={search}
      onChange={(event) => onSearch(event.target.value)}
    />
  );
};

export default SearchBox;
