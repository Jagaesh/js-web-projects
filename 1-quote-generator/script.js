const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// Get Quotes From API
async function getQuotesFromAPI() {
  showLoadingSpinner();
  const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote(false);
  } catch (error) {
    console.log('whoops, no quote', error);
  }
}

// Show New Quote
function newQuote(local) {
  showLoadingSpinner();
  const quote = local
    ? localQuotes[Math.floor(Math.random() * localQuotes.length)]
    : apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  quoteText.textContent = quote.text;
  authorText.textContent = !quote.author
    ? 'Unknown'
    : quote.author;
  quote.text.length > 120
    ? quoteText.classList.add('long-quote')
    : quoteText.classList.remove('long-quote');
  removeLoadingSpinner();
}

// Show Quote From API vs Local
function newQuoteFromAPI() { newQuote(false); }
function newQuoteFromLocal() { newQuote(true); }

// Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuoteFromAPI);
twitterBtn.addEventListener('click', tweetQuote);

// Show Loading
function showLoadingSpinner() {
  quoteContainer.hidden = true;
  loader.hidden = false;
}

// Hide Loading
function removeLoadingSpinner() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

// On Load
getQuotesFromAPI();