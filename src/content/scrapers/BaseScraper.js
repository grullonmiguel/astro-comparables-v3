// BaseScraper.js - Shared scraper logic for all real estate sites
export class BaseScraper {
    constructor(config) {
        this.config = config; // Holds site-specific selectors
    }

    /**
     * Core scraping loop.
     * Iterates over cards and extracts data based on the config provided by the child class.
     */
    scrape() {
        const cards = document.querySelectorAll(this.config.cardSelector);
        console.log(`[BaseScraper] Found ${cards.length} property cards.`);

        return Array.from(cards).map(card => {
            const rawPrice = this.getElementText(card, this.config.priceSelector);
            const rawAcreage = this.getElementText(card, this.config.acreageSelector);

            return {
                id: crypto.randomUUID(), // Unique ID for list rendering
                address: this.getElementText(card, this.config.addressSelector),
                price: this.parsePrice(rawPrice),
                acreage: this.parseAcreage(rawAcreage),
                rawPrice: rawPrice,       // Kept for debugging
                rawAcreage: rawAcreage,   // Kept for debugging
                url: this.getHref(card, this.config.linkSelector)
            };
        });
    }

    // --- Helper Utilities ---

    getElementText(parent, selector) {
        if (!selector) return "";
        const el = parent.querySelector(selector);
        return el ? el.innerText.trim() : "";
    }

    getHref(parent, selector) {
        if (!selector) return "";
        const el = parent.querySelector(selector);
        return el ? el.href : "";
    }

    /**
     * Converts "$450,000" or "$450k" into 450000
     */
    parsePrice(priceStr) {
        if (!priceStr) return 0;
        let clean = priceStr.replace(/[$,\s]/g, '').toLowerCase();
        if (clean.includes('k')) return parseFloat(clean) * 1000;
        if (clean.includes('m')) return parseFloat(clean) * 1000000;
        return parseFloat(clean) || 0;
    }

    /**
     * Converts "0.5 acres" or "21,780 sqft" into a decimal acre value
     */
    parseAcreage(acreStr) {
        if (!acreStr) return 0;
        const lower = acreStr.toLowerCase();
        const num = parseFloat(lower.replace(/[,\s]/g, ''));

        if (lower.includes('sqft') || lower.includes('sq ft')) {
            return num / 43560; // Standard conversion: 43,560 sqft = 1 acre
        }
        return num || 0;
    }
} 