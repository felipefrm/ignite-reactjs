export function computeReadTime(contentArray) {
  let wordCount = 0;
  const wordsPerMinutes = 200

  contentArray.forEach(content => {
    wordCount += content.heading.split(' ').length;
    content.body.forEach(body => {
      wordCount += body.text?.split(' ').length;
    })
  });

  return Math.ceil(wordCount / wordsPerMinutes)
}