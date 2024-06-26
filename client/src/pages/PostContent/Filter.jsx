const abusiveWords = ['abusive', 'hateful', 'offensive', 'vulgar','porn','bhenchod'];

export const filterAbusiveWords = (content) => {
  let filteredContent = content.toLowerCase();
  abusiveWords.forEach(word => {
    const regex = new RegExp('\\b' + word + '\\b', 'gi');
    filteredContent = filteredContent.replace(regex, '***'); 
  });
  return filteredContent;
};
