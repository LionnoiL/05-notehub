import NoteList from "../NoteList/NoteList";
import Pagination from "../Pagination/Pagination";
import SearchBox from "../SearchBox/SearchBox";
import css from "./App.module.css";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import { deleteNote, getNotes } from "../../services/noteService";
import type { Note } from "../../types/note";

const App = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const queryClient = useQueryClient();

  const { data, error, isLoading, isSuccess, isError } = useQuery({
    queryFn: () => getNotes(search, currentPage),
    queryKey: ["notes", search, currentPage],
  });

  const handleSearch = (search: string) => {
    setSearch(search);
  };

  const deleteNoteM = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  const handleDelete = (noteId: Note["id"]) => {
    deleteNoteM.mutate(noteId);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox search={search} onSearch={handleSearch}></SearchBox>
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
      {isSuccess && <NoteList notes={data.notes} onDelete={handleDelete} />}
    </div>
  );
};

export default App;
