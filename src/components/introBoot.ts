// Inline <head> script, run before first paint: shows the loading screen on every initial page load.
// In-site navigation doesn't reload the document, so it doesn't replay. Without JavaScript the card
// never shows, because nothing would be there to remove it.
export const introBootScript = `document.documentElement.dataset.intro="show";`;
