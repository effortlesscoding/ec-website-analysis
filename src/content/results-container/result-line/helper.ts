export function replaceLinks(text: string) {
  return text.replace(new RegExp('\\[Learn More\\]\\(.*\\)', 'gi'), '');
};
