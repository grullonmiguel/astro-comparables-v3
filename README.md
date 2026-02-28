# Astro Comparables Real Estate Analyzer (Chrome V3)

A Chrome Extension to scrape and analyze property data from sites such as Homes.com, Realtor.com, and Zillow.

## Features
- **Site-Specific Scraping:** Custom scrapers for major real estate platforms.
- **SidePanel UI:** Integrated analysis tools without interfering with host site styles.
- **Acreage Filtering:** Live filtering of property lists based on lot size.
- **Valuation Engine:** Calculate approximate market value based on on-screen comps.

## Tech Stack
- **Manifest V3** (Service Workers & SidePanel API)
- **Shadow DOM** for style encapsulation
- **Vanilla JS** for build processing

## Folder Structure
- `/src`: Source code (Scrapers, Background scripts, UI)
- `/build`: Compiled extension (Load this into Chrome)
