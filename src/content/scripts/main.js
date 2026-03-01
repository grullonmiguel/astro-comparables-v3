// main.js - The Scraper Entry Point
(async () => {
    // Dynamic import to allow using your Scraper classes in a content script
    const factorySrc = chrome.runtime.getURL('content/scrapers/ScraperFactory.js');
    const { ScraperFactory } = await import(factorySrc);

    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.action === "TRIGGER_SCRAPE") {
            const hostname = window.location.hostname;
            const scraper = ScraperFactory.getScraper(hostname);

            if (scraper) {
                const results = scraper.scrape();
                sendResponse({ success: true, data: results });
            } else {
                sendResponse({ success: false, error: "No scraper found for this site." });
            }
        }
        return true; // Keeps the message channel open for the response
    });
})();