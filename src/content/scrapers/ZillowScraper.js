import { BaseScraper } from './BaseScraper.js';

export class ZillowScraper extends BaseScraper {
    constructor() {
        super({
            cardSelector: 'article.property-card', 
            priceSelector: 'span[data-test="property-card-price"]',
            addressSelector: 'address',
            linkSelector: 'a[data-test="property-card-link"]',
            acreageSelector: '[data-test="property-card-stats"] li:nth-child(3)',
            statusSelector: "span[class*='StyledPropertyCardBadge']" // Unified name
        });
    }
} 