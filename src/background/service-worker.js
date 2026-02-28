class ServiceWorkerManager {
    constructor() {
        this.extensionName = "Astro Comps Analyzer V3";
        this.setupListeners();
    }

    setupListeners() {
        // This MUST be top-level (not nested) so Chrome can wake up the worker
        chrome.runtime.onInstalled.addListener((details) => this.onInstalled(details));
    }

    async onInstalled(details) {
        console.log(`${this.extensionName} Extension Installed.`);
        
        // 1. Move Side Panel behavior here. 
        // It only needs to be set once, not every time the worker starts.
        try {
            await chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
        } catch (error) {
            this.handleError('Side Panel Setup', error);
        }

        if (details.reason === 'install') {
            // First time installation logic
        }
    }

    handleError(context, error) {
        console.error(`[${this.extensionName}] Error in ${context}:`, error);
    }
}

new ServiceWorkerManager();