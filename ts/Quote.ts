/*
 * Quote class representing a single quote
*/
export class Quote {
  quote: string;     // The text of the quote
  source: string;    // The author or source of the quote
  citation: string;  // Citation information, if available
  year: string;      // The year of the quote, if available
  tags: string;      // Any tags associated with the quote

  constructor(quote: string, source: string, citation = '', year = '', tags = '') {
    this.quote = quote;
    this.source = source;
    this.citation = citation;
    this.year = year;
    this.tags = tags;
  }
}
