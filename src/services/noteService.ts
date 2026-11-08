import axios from "axios";
const apiKey = import.meta.env.VITE_NOTEHUB_TOKEN;
import type { Note, CreateNote } from "../types/note";

interface NotesResponse {
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
): Promise<NotesResponse> => {
  const { data } = await API.get<NotesResponse>("/notes", {
    params: {
      search,
      page,
      perPage: 12,
    },
  });
  return data;
};

export const createNote = async (payload: CreateNote): Promise<Note> => {
  const { data } = await API.post<Note>("/notes", payload);
  return data;
};

export const deleteNote = async (noteId: Note["id"]): Promise<Note> => {
  const { data } = await API.delete<Note>(`/notes/${noteId}`);
  return data;
};
