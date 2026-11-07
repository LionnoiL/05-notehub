import NoteList from "../NoteList/NoteList";
import Pagination from "../Pagination/Pagination";
import SearchBox from "../SearchBox/SearchBox";
import css from "./App.module.css";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { getNotes } from "../../services/noteService";

const App = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { data, error, isLoading, isSuccess, isError } = useQuery({
    queryFn: () => getNotes(search, currentPage),
    queryKey: ["notes", search, currentPage],
  });

  console.log(data);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox></SearchBox>
        {isSuccess && data.totalPages > 1 && (
          <Pagination
            totalPages={data.totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}
        <button className={css.button}>Create note +</button>
      </header>
      {isLoading && <p className={css.loading}>Loading...</p>}
      {isError && <p className={css.error}>{error.message}</p>}
      {isSuccess && <NoteList notes={data.notes} />}
    </div>
  );
};

export default App;
