# Random Quote Generator

A simple web application that displays random quotes and allows users to save their favorite quotes. The app features a toggle button to start and stop the random quote display.

## Features

- **Display Random Quotes**: Click the "Show another quote" button to see a new quote.
- **Add to Favorites**: Save quotes you love by clicking the "Add to Favorites" button.
- **Random Quote Toggle**: Start and stop the automatic display of random quotes.
- **Dynamic Background**: The background color changes randomly with each new quote.

## Technologies Used

- HTML
- CSS
- TypeScript

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/dmcote-1991/random-quote-generator.git

2. Navigate to the project directory:
   ```bash
   cd random-quote-generator

3. Compile the TypeScript files:
   ``` bash
   tsc

4. Open `index.html` in your web browser.

## File Structure

```bash
random-quote-generator/
 ├── index.html
 ├── css/ 
 │  ├── normalize.css 
 │  └── styles.css 
 ├── dist/  # Compiled JavaScript files 
 │  ├── app.js 
 │  ├── Quote.js 
 │  ├── QuoteManager.js 
 │  └── UIManager.js
 ├── ts/ 
 │  ├── app.ts 
 │  ├── Quote.ts 
 │  ├── QuoteManager.ts 
 │  └── UIManager.ts
 ├── .gitattributes
 ├── .gitignore
 ├── package-lock.json
 ├── package.json
 ├── tsconfig.json
 └── README.md
 ```

## Usage

1. Open the application in a web browser.
2. Click the "Show another quote" button to display a new quote.
3. Click "Add to Favorites" to save the current quote to your favorites.
4. Use the "Start" button to begin automatic quote display or "Stop" to pause it.

## Recent Changes

- Modularized the project structure for better organization.
- Added comprehensive code comments for improved readability.
- Updated TypeScript configuration for optimized compilation.
- Enhanced the functionality of the random quote generator with dynamic features.

## Contributing

Contributions are welcome! If you have suggestions for improvements or features, please open an issue or submit a pull request.
