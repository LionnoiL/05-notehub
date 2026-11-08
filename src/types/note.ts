import { TAGS } from "../constants";

export type TagsType = (typeof TAGS)[number];

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tag: TagsType;
}

export interface CreateNote {
  title: string;
  content: string;
  tag: TagsType;
}

export interface CreateNoteFormValues {
  title: string;
  content: string;
  tag: TagsType;
}
