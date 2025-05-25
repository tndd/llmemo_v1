export interface TrackTag {
  tagName: string;
}

export interface Track {
  id: number;
  user: string;
  time: string;
  text: string;
  tags?: TrackTag[];
}

export type MemoDateCategory =
  | "Today"
  | "Yesterday"
  | "This Week"
  | "This Month"
  | "Older";

export const MEMO_DATE_CATEGORIES: MemoDateCategory[] = [
  "Today",
  "Yesterday",
  "This Week",
  "This Month",
  "Older",
];

export interface CategorizedMemos {
  Today: Memo[];
  Yesterday: Memo[];
  "This Week": Memo[];
  "This Month": Memo[];
  Older: Memo[];
}

export interface Memo {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  tracks: Track[];
}

export type View = "home" | "library" | "stats" | "settings";
