import axios from "axios";
const apiKey = import.meta.env.VITE_NOTEHUB_TOKEN;
import type { Note, CreateNote, UpdateNote } from "../types/note";

interface NotesResponce {
  notes: Note[];
  totalPages: number;
}

const API = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + apiKey,
  },
});

export const getNotes = async (
  search: string,
  page: number,
): Promise<NotesResponce> => {
  const { data } = await API.get<NotesResponce>("/notes", {
    params: {
      search,
      page,
    },
  });
  return data;
};

export const createNote = async (payload: CreateNote): Promise<Note> => {
  const { data } = await API.post<Note>("/notes", payload);
  return data;
};

export const deleteNote = async (noteId: Note["id"]): Promise<void> => {
  await API.delete(`/notes/${noteId}`);
};

export const updateNote = async ({
  noteId,
  payload,
}: {
  noteId: Note["id"];
  payload: UpdateNote;
}): Promise<Note> => {
  const { data } = await API.put<Note>(`/notes/${noteId}`, payload);
  return data;
};
