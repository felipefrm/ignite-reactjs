export function computeReadTime(contentArray) {
  let wordCount = 0;
  const wordsPerMinutes = 200

  contentArray.forEach(content => {
    wordCount += content.heading.match(/\S+/g).length;
    content.body.forEach(body => {
      wordCount += body.text.match(/\S+/g).length;
    })
  });

  return Math.ceil(wordCount / wordsPerMinutes)
}