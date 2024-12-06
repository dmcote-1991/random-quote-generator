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
  alertBox: HTMLElement;        // Hidden alert box for announcements
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

    // aria-live attributes to quote box for announcements
    this.quoteBox.setAttribute("aria-live", "polite");
    this.quoteBox.setAttribute("aria-atomic", "true");

    // aria-label attributes to buttons for screen readers
    this.loadQuoteBtn.setAttribute("aria-label", "Display a new random quote");
    this.favoriteBtn.setAttribute("aria-label", "Add the current quote to your favorites");
    this.toggleBtn. setAttribute("aria-label", "Start or stop displaying random quotes automatically");

    // Create a hidden alert box for announcements
    this.alertBox = document.createElement("div");
    this.alertBox.setAttribute("role", "alert");
    this.alertBox.classList.add("visually-hidden");
    document.body.appendChild(this.alertBox);

    this.isRandomizerActive = false; // Randomizer is inactive initially

    // Add event listeners for button clicks
    this.loadQuoteBtn.addEventListener("click", () => this.displayQuote());
    this.favoriteBtn.addEventListener("click", () => this.addToFavorites());
    this.toggleBtn.addEventListener("click", () => this.toggleRandomizer());
    this.toggleBtn.addEventListener("blur", () => {
      if (this.isRandomizerActive) this.toggleRandomizer(); // Stop randomizer on focus loss
    });
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
      this.announce("No quote displayed to add to favorites.");
      return; // Exit the function
    }

    // Add to favorites
    this.quoteManager.addFavorite(this.currentQuote);

    const li = document.createElement('li'); // Create a new list item
    li.setAttribute("role", "listitem");
    li.textContent = `${this.currentQuote.quote} - ${this.currentQuote.source}`; // Set text for list item

    // Add a remove button to each favorite
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.setAttribute("aria-label", `Remove quote: ${this.currentQuote.quote}`);
    removeBtn.addEventListener("click", () => li.remove());

    li.appendChild(removeBtn); // Append the remove button to the list item
    this.favoritesList.appendChild(li); // Append the list item to the favorites list
    li.focus(); // Move focus to the new favorite

    this.announce("Quote added to favorites!");
  }

  /* Method to start/stop the random quote display */
  toggleRandomizer(): void {
    if (this.isRandomizerActive) {
      clearInterval(this.intervalId); // Stop the interval if active
      this.toggleBtn.textContent = "Start"; // Change button text to "Start"
      this.announce("Randomizer stopped.");
    } else {
      this.intervalId = setInterval(() => this.displayQuote(), 1000); // Start interval for displaying quotes
      this.toggleBtn.textContent = "Stop"; // Change button text to "Stop"
      this.announce("Randomizer started.");
    }
    // Toggle the active state
    this.isRandomizerActive = !this.isRandomizerActive;
  }

  /* Method to provide accessible alerts */
  announce(message: string): void {
    this.alertBox.textContent = message;
    this.alertBox.classList.remove("visually-hidden"); 
    this.alertBox.classList.add("visible"); // Show the alert box
    setTimeout(() => {
      this.alertBox.classList.remove("visible"); // Hide the alert box after 3 seconds
      this.alertBox.classList.add("visually-hidden");
    }, 3000);
  }
}
