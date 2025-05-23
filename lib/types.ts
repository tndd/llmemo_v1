export interface Tag {
  tagName: string;
}

export interface Message {
  id: number;
  user: string;
  time: string;
  text: string;
  tags?: Tag[];
}

export interface Memo {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  messages: Message[];
}

export type View = "home" | "library" | "stats" | "settings";
