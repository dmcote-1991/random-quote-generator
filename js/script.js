
/***
 * Returns a random background color.
***/
function randomBackgroundColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  let backgroundColor = `rgb(${r}, ${g}, ${b})`;
  return backgroundColor;
}
document.body.style.background = randomBackgroundColor();

//An Array of Objects containing quotes
const quotes = [
  {
    quote: `Programming isn't about what you know; it's about what you can figure out.`,
    source: `Chris Pine`,
    citation: `Learn to Program`,
  },
  {
    quote: `The most damaging phrase in the language is 'We've always done it this way!'`,
    source: `Grace Murray Hopper`,
    year: `1987`
  },
  {
    quote: `Everybody should learn to program a computer because it teaches you how to think.`,
    source: `Steve Jobs`,
    year: `1995`
  },
  {
    quote: `Experience is the name everyone gives to their mistakes.`,
    source: `Oscar Wilde`,
    citation: `Lady Windermere's Fan`,
    year: `1892`,
    tags: `Historical`
  },
  {
    quote: `Code is like humor. When you have to explain it, it's bad.`,
    source: `Cory House`,
  }
]

/***
 * Returns a random object from the quotes array.
***/
function getRandomQuote(){
  let randomNumber = Math.floor(Math.random() * quotes.length);
  let randomQuote = quotes[randomNumber];
  return randomQuote;
}

/***
 * Returns a concatenated string of HTML to include all the available parameters from a random object in the quotes array.
***/
function printQuote(){
  let randomQuote = getRandomQuote();
  let html = `<p class="quote">${randomQuote.quote}</p> <p class="source">${randomQuote.source}`;
  if (randomQuote.citation){
    html += `<span class="citation">${randomQuote.citation}</span>`
  }
  if (randomQuote.year){
    html += `<span class="year">${randomQuote.year}</span>`
  }
  if (randomQuote.tags){
    html += `<span class="tags">${randomQuote.tags}</span>`
  }
  html += `</p>`;
  document.getElementById(`quote-box`).innerHTML = html;
  document.body.style.background = randomBackgroundColor();
}

/***
 * Click event listener for the print quote button.
***/
document.getElementById('load-quote').addEventListener("click", printQuote, false);

/***
 * Handle randomizer toggle
***/
let intervalId;
let isRandomizerActive = false; // State of the randomizer

function toggleRandomizer() {
  const toggleBtn = document.getElementById('toggle-randomizer');

  if (isRandomizerActive) {
    clearInterval(intervalId); // Stop the randomizer
    toggleBtn.textContent = "Start"; 
    isRandomizerActive = false; // Update state
  } else {
    intervalId = setInterval(printQuote, 1000); // Start the randomizer
    toggleBtn.textContent = "Stop";
    isRandomizerActive = true; // Update state
  }
}

// Add event listener to the toggle button
document.getElementById('toggle-randomizer').addEventListener("click", toggleRandomizer, false);

/***
 * Handle favorite quotes
***/

let favoriteQuotes = [];

function favoriteQuote() {
  const currentQuote = getRandomQuote();
  favoriteQuotes.push(currentQuote);
  alert("Quote added to favorites!");

  // Update the favorites list in the DOM
  const favoritesList = document.getElementById('favorites-list');
  const li = document.createElement('li');
  li.textContent = `${currentQuote.quote} - ${currentQuote.source}`;
  favoritesList.appendChild(li);
}

document.getElementById('favorite-btn').addEventListener("click", favoriteQuote, false);
