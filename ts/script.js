// Quote class representing a single quote
var Quote = /** @class */ (function () {
    function Quote(quote, source, citation, year, tags) {
        if (citation === void 0) { citation = ''; }
        if (year === void 0) { year = ''; }
        if (tags === void 0) { tags = ''; }
        this.quote = quote;
        this.source = source;
        this.citation = citation;
        this.year = year;
        this.tags = tags;
    }
    return Quote;
}());
// QuoteManager class for managing quotes
var QuoteManager = /** @class */ (function () {
    function QuoteManager() {
        this.quotes = [
            new Quote("Programming isn't about what you know; it's about what you can figure out.", 'Chris Pine', 'Learn to Program'),
            new Quote("The most damaging phrase in the language is 'We've always done it this way!", "Grace Murray Hopper", '', '1987'),
            new Quote("Everybody should learn to program a computer because it teaches you how to think.", "Steve Jobs", '', '1995'),
            new Quote("Experience is the name everyone gives to their mistakes.", "Oscar Wilde", "Lady Windermere's Fan", '1892', 'Historical'),
            new Quote("Code is like humor. When you have to explain it, it's bad.", "Cory House")
        ];
        this.favoriteQuotes = [];
    }
    QuoteManager.prototype.getRandomQuote = function () {
        var randomNumber = Math.floor(Math.random() * this.quotes.length);
        return this.quotes[randomNumber];
    };
    QuoteManager.prototype.addFavorite = function (quote) {
        this.favoriteQuotes.push(quote);
    };
    return QuoteManager;
}());
// UIManager class for handling UI interactions
var UIManager = /** @class */ (function () {
    function UIManager(quoteManager) {
        var _this = this;
        this.quoteManager = quoteManager;
        this.currentQuote = null;
        this.quoteBox = document.getElementById('quote-box');
        this.favoritesList = document.getElementById('favorites-list');
        this.loadQuoteBtn = document.getElementById('load-quote');
        this.favoriteBtn = document.getElementById('favorite-btn');
        this.toggleBtn = document.getElementById('toggle-randomizer');
        this.isRandomizerActive = false;
        this.loadQuoteBtn.addEventListener("click", function () { return _this.displayQuote(); });
        this.favoriteBtn.addEventListener("click", function () { return _this.addToFavorites(); });
        this.toggleBtn.addEventListener("click", function () { return _this.toggleRandomizer(); });
    }
    UIManager.prototype.displayQuote = function () {
        var randomQuote = this.quoteManager.getRandomQuote();
        this.currentQuote = randomQuote;
        var html = "<p class=\"quote\">".concat(randomQuote.quote, "</p><p class=\"source\">").concat(randomQuote.source);
        if (randomQuote.citation) {
            html += "<span class=\"citation\">".concat(randomQuote.citation, "</span>");
        }
        if (randomQuote.year) {
            html += "<span class=\"year\">".concat(randomQuote.year, "</span>");
        }
        if (randomQuote.tags) {
            html += "<span class=\"tags\">".concat(randomQuote.tags, "</span>");
        }
        html += "</p>";
        this.quoteBox.innerHTML = html;
        document.body.style.background = this.randomBackgroundColor();
    };
    UIManager.prototype.randomBackgroundColor = function () {
        var r = Math.floor(Math.random() * 256);
        var g = Math.floor(Math.random() * 256);
        var b = Math.floor(Math.random() * 256);
        return "rgb(".concat(r, ", ").concat(g, ", ").concat(b, ")");
    };
    UIManager.prototype.addToFavorites = function () {
        if (!this.currentQuote) {
            alert("No quote displayed to add to favorites.");
            return;
        }
        this.quoteManager.addFavorite(this.currentQuote);
        var li = document.createElement('li');
        li.textContent = "".concat(this.currentQuote.quote, " - ").concat(this.currentQuote.source);
        this.favoritesList.appendChild(li);
        alert("Quote added to favorites!");
    };
    UIManager.prototype.toggleRandomizer = function () {
        var _this = this;
        if (this.isRandomizerActive) {
            clearInterval(this.intervalId);
            this.toggleBtn.textContent = "Start";
        }
        else {
            this.intervalId = setInterval(function () { return _this.displayQuote(); }, 1000);
            this.toggleBtn.textContent = "Stop";
        }
        this.isRandomizerActive = !this.isRandomizerActive;
    };
    return UIManager;
}());
// Instantiate QuoteManager and UIManager
var quoteManager = new QuoteManager();
var uiManager = new UIManager(quoteManager);
// Load a quote on initial load
uiManager.displayQuote();
