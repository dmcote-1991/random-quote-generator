// Quote class representing a single quote
class Quote {
  constructor(quote, source, citation = '', year = '', tags = '') {
    this.quote = quote;
    this.source = source;
    this.citation = citation;
    this.year = year;
    this.tags = tags;
  }
}

// QuoteManager class for managing quotes
class QuoteManager {
  constructor() {
    this.quotes = [
      new Quote(`Programming isn't about what you know; it's about what you can figure out.`, 'Chris Pine', 'Learn to Program'),
      new Quote(`The most damaging phrase in the language is 'We've always done it this way!`, `Grace Murray Hopper`, '', '1987'),
      new Quote(`Everybody should learn to program a computer because it teaches you how to think.`, `Steve Jobs`, '', '1995'),
      new Quote(`Experience is the name everyone gives to their mistakes.`, `Oscar Wilde`, `Lady Windermere's Fan`, '1892', 'Historical'),
      new Quote(`Code is like humor. When you have to explain it, it's bad.`, `Cory House`)
    ];
    this.favoriteQuotes = [];
  }

  getRandomQuote() {
    const randomNumber = Math.floor(Math.random() * this.quotes.length);
    return this.quotes[randomNumber];
  }

  addFavorite(quote) {
    this.favoriteQuotes.push(quote);
  }
}

// UIManager class for handling UI interactions
class UIManager {
  constructor(quoteManager) {
    this.quoteManager = quoteManager;
    this.currentQuote = null;

    this.quoteBox = document.getElementById('quote-box');
    this.favoritesList = document.getElementById('favorites-list');

    this.loadQuoteBtn = document.getElementById('load-quote');
    this.favoriteBtn = document.getElementById('favorite-btn');
    this.toggleBtn = document.getElementById('toggle-randomizer');

    this.loadQuoteBtn.addEventListener("click", () => this.displayQuote());
    this.favoriteBtn.addEventListener("click", () => this.addToFavorites());
    this.toggleBtn.addEventListener("click", () => this.toggleRandomizer());
  }

  displayQuote() {
    const randomQuote = this.quoteManager.getRandomQuote();
    this.currentQuote = randomQuote;

    let html = `<p class="quote">${randomQuote.quote}</p><p class="source">${randomQuote.source}`;
    
    if (randomQuote.citation) {
      html += `<span class="citation">${randomQuote.citation}</span>`;
    }
    if (randomQuote.year) {
      html += `<span class="year">${randomQuote.year}</span>`;
    }
    if (randomQuote.tags) {
      html += `<span class="tags">${randomQuote.tags}</span>`;
    }
    
    html += `</p>`;
    this.quoteBox.innerHTML = html;
    document.body.style.background = this.randomBackgroundColor();
  }

  randomBackgroundColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
  }

  addToFavorites() {
    if (!this.currentQuote) {
      alert("No quote displayed to add to favorites.");
      return;
    }

    this.quoteManager.addFavorite(this.currentQuote);

    const li = document.createElement('li');
    li.textContent = `${this.currentQuote.quote} - ${this.currentQuote.source}`;
    this.favoritesList.appendChild(li);
    alert("Quote added to favorites!");
  }

  toggleRandomizer() {
    if (this.isRandomizerActive) {
      clearInterval(this.intervalId);
      this.toggleBtn.textContent = "Start";
    } else {
      this.intervalId = setInterval(() => this.displayQuote(), 1000);
      this.toggleBtn.textContent = "Stop";
    }
    this.isRandomizerActive = !this.isRandomizerActive;
  }
}

// Instantiate QuoteManager and UIManager
const quoteManager = new QuoteManager();
const uiManager = new UIManager(quoteManager);

// Load a quote on initial load
uiManager.displayQuote();
