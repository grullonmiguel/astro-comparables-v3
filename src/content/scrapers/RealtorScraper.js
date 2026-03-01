import { BaseScraper } from './BaseScraper.js';

export class RealtorScraper extends BaseScraper {
    constructor() {
        super({
            cardSelector: 'div[data-testid="property-card"]',
            priceSelector: '[data-label="pc-price"]',
            acreageSelector: '[data-label="pc-meta-sqft"]', // Often includes lot size text
            addressSelector: '[data-label="pc-address"]',
            linkSelector: 'a[data-testid="property-anchor"]'
        });
    }
} 