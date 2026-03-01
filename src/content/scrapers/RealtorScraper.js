import { BaseScraper } from './BaseScraper.js';

export class RealtorScraper extends BaseScraper {
    constructor() {
        super({
            // The unique container for each property card
            cardSelector: 'div[data-testid="rdc-property-card"]', 
            
            // Matches the span containing the formatted price (e.g., "$150,000")
            priceSelector: 'div[data-testid="card-price"] span',
            
            // Targets the address block
            addressSelector: 'div[data-testid="card-address"]',
            
            // The anchor tag containing the detail page link
            linkSelector: 'a[data-testid="card-link"]',
            
            // Specific list item for acreage/lot size
            acreageSelector: 'li[data-testid="property-meta-lot-size"]',
            
            // Unified status for the "Sold - Date" message
            statusSelector: 'div[data-testid="card-description"] .message'
        });
    }
} 