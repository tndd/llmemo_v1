// Test suite for tag extraction logic (inputValue.match(/#\w+/g) || [])

describe('Tag Extraction Logic', () => {
  const extractTags = (inputValue: string): string[] => {
    if (!inputValue) return [];
    return inputValue.match(/#\w+/g) || [];
  };

  test('should return an empty array for messages with no tags', () => {
    expect(extractTags('This is a normal message.')).toEqual([]);
  });

  test('should extract a single tag', () => {
    expect(extractTags('Hello #world')).toEqual(['#world']);
  });

  test('should extract multiple tags', () => {
    expect(extractTags('This message has #multiple #tags')).toEqual(['#multiple', '#tags']);
  });

  test('should extract tag at the beginning', () => {
    expect(extractTags('#start of message')).toEqual(['#start']);
  });

  test('should extract tag in the middle', () => {
    expect(extractTags('Message with a #middle_tag here')).toEqual(['#middle_tag']);
  });

  test('should extract tag at the end', () => {
    expect(extractTags('Message ends with #end')).toEqual(['#end']);
  });

  test('should extract multiple tags appearing consecutively', () => {
    // Based on /#\w+/g, "#one#two" will be treated as "#one" and "#two" if separated by non-word chars,
    // or as a single tag if not. Current regex will match them if they are like #one #two.
    // If it's "#one#two", it will be treated as one tag: "#one". Let's clarify based on current regex.
    // Current regex /#\w+/g will match #one from #one#two, then look for next #.
    // So "#one#two" -> ["#one"]. If it's "#one #two" -> ["#one", "#two"].
    expect(extractTags('Tags #one #two #three')).toEqual(['#one', '#two', '#three']);
    expect(extractTags('Tags #one#two #three')).toEqual(['#one', '#two', '#three']); // Correction: This should be ['#one', '#two', '#three'] if #two is a valid tag start, but it's not. It will be ['#one', '#three']
                                                                                    // The regex /#\w+/g will find #one, then the next character is #, which is not \w. So it stops.
                                                                                    // Then it finds #two. No, this is wrong.
                                                                                    // /#\w+/g applied to "#one#two" will result in ["#one"]
                                                                                    // Let's test the actual behavior of the regex.
                                                                                    // 'Tags #one#two #three'.match(/#\w+/g) -> ['#one', '#two', '#three'] is correct.
                                                                                    // '#one#two'.match(/#\w+/g) -> ['#one', '#two'] because 't' is a word char.

    // The regex /#\w+/g means '#' followed by one or more word characters.
    // For '#one#two':
    // 1. It finds '#o', '#on', '#one'. This is a match: '#one'.
    // 2. The search continues from the character after '#one', which is '#'.
    // 3. It finds '#t', '#tw', '#two'. This is a match: '#two'.
    // So, for 'Tags #one#two #three', the result is ['#one', '#two', '#three']. This is correct.
    expect(extractTags('Tags #one#two#three')).toEqual(['#one', '#two', '#three']);


  });

  test('should extract tags with numbers', () => {
    expect(extractTags('Tag with #number123')).toEqual(['#number123']);
  });

  test('should extract tags with underscores', () => {
    expect(extractTags('Tag with #under_score')).toEqual(['#under_score']);
  });

  test('should return an empty array for messages with special characters but no valid tags', () => {
    // The regex \w includes letters, numbers, and underscore.
    expect(extractTags('Message with #? and #!')).toEqual([]);
    expect(extractTags('Message with #tag-with-hyphen')).toEqual(['#tag']); // Only #tag will be matched
  });

  test('should return an empty array for an empty message', () => {
    expect(extractTags('')).toEqual([]);
  });

  test('should extract a tag if it is the only content in the message', () => {
    expect(extractTags('#justatag')).toEqual(['#justatag']);
  });

  test('should correctly extract valid tags when mixed with invalid ones', () => {
    expect(extractTags('A #valid tag and an #invalid-tag with hyphen, also #another_valid.')).toEqual(['#valid', '#invalid', '#another_valid']);
  });

  test('should handle multiple hashtags correctly', () => {
    expect(extractTags('##doubletag')).toEqual(['#doubletag']); // Matches '#doubletag'
    expect(extractTags('###tripletag')).toEqual(['#tripletag']); // Matches '#tripletag'
    expect(extractTags('#tag#another')).toEqual(['#tag', '#another']);
  });

  test('should not match if # is not followed by a word character', () => {
    expect(extractTags('# tag')).toEqual([]); // Space after #
    expect(extractTags('message with #')).toEqual([]); // # at the end
  });
});
