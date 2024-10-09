// Import the Quote class from the compiled .js file
import { Quote } from './Quote.js';

/* 
 * QuoteManager class for managing quotes and favorites
*/
export class QuoteManager {
  quotes: Quote[];
  favoriteQuotes: Quote[];

  constructor() {
    this.quotes = [
      new Quote(`Programming isn't about what you know; it's about what you can figure out.`, 'Chris Pine', 'Learn to Program'),
      new Quote(`The most damaging phrase in the language is 'We've always done it this way!`, `Grace Murray Hopper`, '', '1987'),
      new Quote(`Everybody should learn to program a computer because it teaches you how to think.`, `Steve Jobs`, '', '1995'),
      new Quote(`Experience is the name everyone gives to their mistakes.`, `Oscar Wilde`, `Lady Windermere's Fan`, '1892', 'Historical'),
      new Quote(`Code is like humor. When you have to explain it, it's bad.`, `Cory House`)
    ];
    // Initialize favorite quotes as an empty array
    this.favoriteQuotes = [];
  }

  /* Method to retrieve a random quote from the quotes array */
  getRandomQuote(): Quote {
    // Generate a random index
    const randomNumber = Math.floor(Math.random() * this.quotes.length);
    return this.quotes[randomNumber];
  }

  /* Method to add a quote to the favorites list */
  addFavorite(quote: Quote): void {
    this.favoriteQuotes.push(quote);
  }
}
