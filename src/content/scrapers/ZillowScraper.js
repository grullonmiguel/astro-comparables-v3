import { BaseScraper } from './BaseScraper.js';

export class ZillowScraper extends BaseScraper {
    constructor() {
        super({
            cardSelector: 'li[class*="ListItem"]', // Targets Zillow's dynamic list items
            priceSelector: '[data-test="property-card-price"]',
            acreageSelector: '[data-test="property-card-stats"] li:last-child',
            addressSelector: '[data-test="property-card-addr"]',
            linkSelector: 'a[data-test="property-card-link"]'
        });
    }
} 