// lib/data.ts
import { Memo, Tag } from './types';

const sampleTags1: Tag[] = [
  { tagName: 'important' },
  { tagName: 'work' },
];

const sampleTags2: Tag[] = [
  { tagName: 'idea' },
  { tagName: 'work' },
];

export const initialMemos: Memo[] = [
  {
    id: 'memo-1',
    title: '最初のメモ',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    updatedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // 12 hours ago
    messages: [
      {
        id: 1,
        user: 'User1',
        time: '10:00 AM',
        text: 'これは最初のメモのメッセージです。重要なタスクについて。',
        tags: sampleTags1,
      },
      {
        id: 2,
        user: 'User2',
        time: '10:05 AM',
        text: '確認しました。この作業を進めましょう。',
        tags: [{ tagName: 'work' }],
      },
    ],
  },
  {
    id: 'memo-2',
    title: 'アイデアのメモ',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    updatedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // 1 hour ago
    messages: [
      {
        id: 3,
        user: 'User2',
        time: '03:15 PM',
        text: '新しいプロジェクトのアイデアを思いつきました！',
        tags: sampleTags2
      },
    ],
  },
];
