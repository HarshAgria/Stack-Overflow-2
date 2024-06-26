const abusiveWords = ['abusive', 'hateful', 'offensive', 'vulgar'];

export const filterAbusiveWords = (content) => {
  let filteredContent = content.toLowerCase();
  abusiveWords.forEach(word => {
    const regex = new RegExp('\\b' + word + '\\b', 'gi');
    filteredContent = filteredContent.replace(regex, '***'); // Replace abusive word with ***
  });
  return filteredContent;
};
