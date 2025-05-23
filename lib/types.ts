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

export type MemoDateCategory =
  | "Today"
  | "Yesterday"
  | "Previous 7 Days"
  | "This Month"
  | "Older";

export const MEMO_DATE_CATEGORIES: MemoDateCategory[] = [
  "Today",
  "Yesterday",
  "Previous 7 Days",
  "This Month",
  "Older",
];

export interface CategorizedMemos {
  Today: Memo[];
  Yesterday: Memo[];
  "Previous 7 Days": Memo[];
  "This Month": Memo[];
  Older: Memo[];
}

export interface Memo {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  messages: Message[];
}

export type View = "home" | "library" | "stats" | "settings";
