import { HomesScraper } from './HomesScraper.js';
import { ZillowScraper } from './ZillowScraper.js';
import { RealtorScraper } from './RealtorScraper.js';

export class ScraperFactory {
    /**
     * Identifies the correct scraper based on the current site's hostname.
     */
    static getScraper(hostname) {
        if (hostname.includes('homes.com')) {
            return new HomesScraper();
        } 
        if (hostname.includes('realtor.com')) {
            return new RealtorScraper();
        }       
        if (hostname.includes('zillow.com')) {
            return new ZillowScraper();
        }
        
        console.warn(`[ScraperFactory] No scraper found for domain: ${hostname}`);
        return null;
    }
} 