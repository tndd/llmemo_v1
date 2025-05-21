export interface Message {
    id: number;
    user: string;
    avatar: string;
    time: string;
    text: string;
}

export type View = 'home' | 'library' | 'stats' | 'settings';