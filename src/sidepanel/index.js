// index.js - Sidebar Entry Point
const ALLOWED_DOMAINS = ['zillow.com', 'realtor.com', 'homes.com'];
let masterPropertyList = []; // Holds the full list for filtering

/**
 * UI State Management
 */
async function updateAnalyzeButtonState() {
    const analyzeBtn = document.getElementById('analyzeBtn');
    const initialMessage = document.getElementById('initialMessage');

    try {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        const isAllowed = tab?.url && ALLOWED_DOMAINS.some(domain => new URL(tab.url).hostname.includes(domain));

        analyzeBtn.disabled = !isAllowed;

        if (initialMessage) {
            initialMessage.textContent = isAllowed 
                ? 'Go to Sold or Active listings and click Analyze to Start.' 
                : 'Navigate to Homes.com, Realtor.com, or Zillow to analyze listings.';
        }
    } catch (error) {
        analyzeBtn.disabled = true;
    }
}

/**
 * The Scrape Trigger
 */
async function handleAnalyzeClick() {
    const analyzeBtn = document.getElementById('analyzeBtn');
    analyzeBtn.textContent = 'Analyzing...';
    analyzeBtn.disabled = true;

    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    // Send command to main.js (Content Script)
    chrome.tabs.sendMessage(tab.id, { action: "TRIGGER_SCRAPE" }, (response) => {
        analyzeBtn.textContent = 'Analyze';
        analyzeBtn.disabled = false;

        if (chrome.runtime.lastError) {
            console.error("Communication Error:", chrome.runtime.lastError.message);
            alert("Please refresh the property page and try again.");
            return;
        }

        if (response?.success) {
            masterPropertyList = response.data;
            renderList(masterPropertyList);
            
            // Hide initial message if data exists
            const initialMessage = document.getElementById('initialMessage');
            if (initialMessage) initialMessage.style.display = 'none';
        }
    });
}

/**
 * Rendering Logic
 */
function renderList(properties) {
    const container = document.getElementById('propertyList'); // Ensure this ID exists in your HTML
    if (!container) return;

    if (properties.length === 0) {
        container.innerHTML = '<p>No properties found on this page.</p>';
        return;
    }

    container.innerHTML = properties.map(p => `
        <div class="astro-property-card">
            <div class="card-header">
                <strong>$${p.price.toLocaleString()}</strong>
                <span>${p.acreage.toFixed(2)} Acres</span>
            </div>
            <small>${p.address}</small>
        </div>
    `).join('');
}

/**
 * Initialization & Listeners
 */
document.addEventListener('DOMContentLoaded', () => {
    // 1. Core Actions
    document.getElementById('analyzeBtn').addEventListener('click', handleAnalyzeClick);

    // 2. Tab Listeners for State Management
    updateAnalyzeButtonState();
    chrome.tabs.onUpdated.addListener((id, change) => { if (change.url || change.status === 'complete') updateAnalyzeButtonState(); });
    chrome.tabs.onActivated.addListener(updateAnalyzeButtonState);

    // 3. Accordion Logic (Retained)
    document.querySelectorAll('.astro-step-header').forEach(header => {
        header.addEventListener('click', () => header.closest('.astro-step').classList.toggle('collapsed'));
    });

    // 4. Number Input Formatting (Retained/Cleaned)
    document.querySelectorAll('input[type="number"]').forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value && !isNaN(this.value)) this.value = parseFloat(this.value).toFixed(2);
        });
    });
});