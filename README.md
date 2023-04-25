# E-Commerce Scraper

An e-commerce scraper for fetching and sorting Lenovo laptop data.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running Tests](#running-tests)
- [Starting the Server](#starting-the-server)
- [Fetching Sorted Lenovo Laptops](#fetching-sorted-lenovo-laptops)
  - [Using Puppeteer](#using-puppeteer)
  - [Using Playwright](#using-playwright)

## Prerequisites

- Node.js installed on your machine

## Installation

1. Clone the repository or download the source code
2. Navigate to the project directory
3. Install the required dependencies by running:

```bash
npm install
```

## Running Tests

To run the unit tests, execute the following command:

```bash
npm run tests:unit
```

## Starting the Server

To start the server, first build the project and then run the `start` script:

```bash
npm run build && npm run start
```

The server will start on `http://localhost:5000`.

## Fetching Sorted Lenovo Laptops

You can fetch Lenovo laptops sorted by price (including storage pricing variations) using either Puppeteer or Playwright.

### Using Puppeteer

```bash
curl --location --request GET 'http://localhost:5000/api/puppeteer'
```

### Using Playwright

```bash
curl --location --request GET 'http://localhost:5000/api/playwright'
```

The response will contain a list of Lenovo laptops sorted by price.
