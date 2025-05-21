// Test suite for MessageList filtering logic

import { Message } from '@/types'; // Assuming types are in @/types

// The actual component MessageList is a React component.
// For testing the filtering logic specifically, we can extract it or test it through props.
// Here, we'll define a function that simulates the filtering logic used in MessageList.

const filterMessages = (messages: Message[], selectedTag: string | null): Message[] => {
  if (!selectedTag) {
    return messages;
  }
  return messages.filter(msg => msg.tags && msg.tags.includes(selectedTag));
};

const sampleMessages: Message[] = [
  {
    id: 1,
    user: 'Alice',
    avatar: 'avatar.png',
    time: '10:00',
    text: 'Hello #world from Alice',
    tags: ['#world'],
  },
  {
    id: 2,
    user: 'Bob',
    avatar: 'avatar.png',
    time: '10:01',
    text: 'Another #test message from Bob',
    tags: ['#test'],
  },
  {
    id: 3,
    user: 'Charlie',
    avatar: 'avatar.png',
    time: '10:02',
    text: 'More #world news from Charlie',
    tags: ['#world', '#news'],
  },
  {
    id: 4,
    user: 'Diana',
    avatar: 'avatar.png',
    time: '10:03',
    text: 'A message with no tags from Diana',
    tags: [], // Explicitly empty
  },
  {
    id: 5,
    user: 'Eve',
    avatar: 'avatar.png',
    time: '10:04',
    text: 'A message with undefined tags from Eve',
    // tags property is undefined
  },
];

describe('Message Filtering Logic (as in MessageList)', () => {
  test('should filter messages by an existing tag', () => {
    const filtered = filterMessages(sampleMessages, '#world');
    expect(filtered.length).toBe(2);
    expect(filtered.some(msg => msg.id === 1)).toBe(true);
    expect(filtered.some(msg => msg.id === 3)).toBe(true);
  });

  test('should return all messages if selectedTag is null', () => {
    const filtered = filterMessages(sampleMessages, null);
    expect(filtered.length).toBe(sampleMessages.length);
    expect(filtered).toEqual(sampleMessages);
  });

  test('should correctly filter messages when some have no tags defined or empty tags array', () => {
    const filteredByTest = filterMessages(sampleMessages, '#test');
    expect(filteredByTest.length).toBe(1);
    expect(filteredByTest[0].id).toBe(2);

    const filteredByNews = filterMessages(sampleMessages, '#news');
    expect(filteredByNews.length).toBe(1);
    expect(filteredByNews[0].id).toBe(3);
  });

  test('should return an empty array if selectedTag does not exist in any message', () => {
    const filtered = filterMessages(sampleMessages, '#nonexistent');
    expect(filtered.length).toBe(0);
  });

  test('should handle messages with undefined tags property gracefully', () => {
    // This is covered by the '#world' test as well, as message 5 (Eve) has undefined tags.
    // Let's ensure it doesn't crash and filters correctly.
    const messagesWithUndefined: Message[] = [
      { id: 1, user: 'A', avatar: '', time: '', text: 'msg with #tag1', tags: ['#tag1'] },
      { id: 2, user: 'B', avatar: '', time: '', text: 'msg with undefined tags' },
      { id: 3, user: 'C', avatar: '', time: '', text: 'msg with empty tags', tags: [] },
    ];
    const filtered = filterMessages(messagesWithUndefined, '#tag1');
    expect(filtered.length).toBe(1);
    expect(filtered[0].id).toBe(1);

    const filteredByNonExistent = filterMessages(messagesWithUndefined, '#tag2');
    expect(filteredByNonExistent.length).toBe(0);
  });

  test('should return an empty array if the initial messages array is empty', () => {
    const filteredWithTag = filterMessages([], '#anytag');
    expect(filteredWithTag.length).toBe(0);

    const filteredWithNull = filterMessages([], null);
    expect(filteredWithNull.length).toBe(0);
  });
});
