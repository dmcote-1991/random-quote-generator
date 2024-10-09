// Import classes from the compiled .js files
import { QuoteManager } from './QuoteManager.js';
import { UIManager } from './UIManager.js';

// Instantiate QuoteManager and UIManager
const quoteManager = new QuoteManager();
const uiManager = new UIManager(quoteManager);

// Load a quote on initial page load
uiManager.displayQuote();
