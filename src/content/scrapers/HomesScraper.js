import { BaseScraper } from './BaseScraper.js';

export class HomesScraper extends BaseScraper {
    constructor() {
        super({
            cardSelector: 'li.property-item',
            priceSelector: '.price-container',
            acreageSelector: '.property-specs li:contains("Acre")', 
            addressSelector: '.address-container',
            linkSelector: 'a.property-card-anchor'
        });
    }
} 