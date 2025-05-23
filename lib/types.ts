export interface Reaction {
  tagName: string; // Changed from emoji to tagName
  count: number;
  users: string[];
}

export interface Message {
  id: number;
  user: string;
  avatar: string;
  time: string;
  text: string;
  tags?: string[];
  reactions?: Reaction[];
}

export interface Memo {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  messages: Message[];
  tags?: string[];
}

export type View = "home" | "library" | "stats" | "settings";
