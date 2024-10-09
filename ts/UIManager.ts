// Import classes from the compiled .js files
import { QuoteManager } from './QuoteManager.js';
import { Quote } from './Quote.js';

/*
 * UIManager class for handling UI interactions and events
*/
export class UIManager {
  quoteManager: QuoteManager;   // Instance of QuoteManager to manage quotes
  currentQuote: Quote | null;   // Currently displayed quote
  quoteBox: HTMLElement;        // DOM element to display the quote
  favoritesList: HTMLElement;   // DOM element to display favorite quotes
  loadQuoteBtn: HTMLElement;    // Button to load a new quote
  favoriteBtn: HTMLElement;     // Button to add quote to favorites
  toggleBtn: HTMLElement;       // Button to start/stop the random quote display
  isRandomizerActive: boolean;  // Flag indicating if the randomizer is active
  intervalId?: number;          // ID for the interval timer

  constructor(quoteManager: QuoteManager) {
    this.quoteManager = quoteManager;
    this.currentQuote = null; // No quote loaded initially

    // Select DOM elements by their IDs
    this.quoteBox = document.getElementById('quote-box') as HTMLElement;
    this.favoritesList = document.getElementById('favorites-list') as HTMLElement;
    this.loadQuoteBtn = document.getElementById('load-quote') as HTMLElement;
    this.favoriteBtn = document.getElementById('favorite-btn') as HTMLElement;
    this.toggleBtn = document.getElementById('toggle-randomizer') as HTMLElement;

    this.isRandomizerActive = false; // Randomizer is inactive initially

    // Add event listeners for button clicks
    this.loadQuoteBtn.addEventListener("click", () => this.displayQuote());
    this.favoriteBtn.addEventListener("click", () => this.addToFavorites());
    this.toggleBtn.addEventListener("click", () => this.toggleRandomizer());
  }

  /* Method to display a random quote in the quote box */
  displayQuote(): void {
    const randomQuote = this.quoteManager.getRandomQuote(); // Get random quote
    this.currentQuote = randomQuote; // Store the current quote

    // Construct HTML for the quote box
    let html = `<p class="quote">${randomQuote.quote}</p><p class="source">${randomQuote.source}`;
    
    // Include citation, year, and tags if they exist
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
    this.quoteBox.innerHTML = html; // Update the quote box with the new quote
    document.body.style.background = this.randomBackgroundColor(); // Change background color
  }

  /* Method to generate a random background color */
  randomBackgroundColor(): string {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
  }

  /* Method to add the current quote to favorites */
  addToFavorites(): void {
    // Alert if no quote is displayed
    if (!this.currentQuote) {
      alert("No quote displayed to add to favorites.");
      return; // Exit the function
    }

    // Add to favorites
    this.quoteManager.addFavorite(this.currentQuote);

    const li = document.createElement('li'); // Create a new list item
    li.textContent = `${this.currentQuote.quote} - ${this.currentQuote.source}`; // Set text for list item
    this.favoritesList.appendChild(li); // Append the list item to the favorites list
    alert("Quote added to favorites!"); // Alert the user
  }

  /* Method to start/stop the random quote display */
  toggleRandomizer(): void {
    if (this.isRandomizerActive) {
      clearInterval(this.intervalId); // Stop the interval if active
      this.toggleBtn.textContent = "Start"; // Change button text to "Start"
    } else {
      this.intervalId = setInterval(() => this.displayQuote(), 1000); // Start interval for displaying quotes
      this.toggleBtn.textContent = "Stop"; // Change button text to "Stop"
    }
    // Toggle the active state
    this.isRandomizerActive = !this.isRandomizerActive;
  }
}
