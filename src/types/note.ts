type TagsType = "Work" | "Personal" | "Meeting" | "Shopping" | "Todo";

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

export interface UpdateNote {
  title: string;
  content: string;
  tag: TagsType;
}
