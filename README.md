# E-Commerce Scraper

An e-commerce scraper for fetching and sorting Lenovo laptop data.

## Table of Contents

- [About](#about)
- [Prerequisites](#prerequisites)
- [Quick Two-liner Start](#quick-two-liner-start)
- [Installation](#installation)
- [Running Tests](#running-tests)
- [Starting the Server](#starting-the-server)
- [Fetching Sorted Lenovo Laptops](#fetching-sorted-lenovo-laptops)
  - [Using Puppeteer](#using-puppeteer)
  - [Using Playwright](#using-playwright)

## About

  This project was created as a part of a job application process. It is a simple Node.js server that uses Puppeteer and Playwright to scrape data from <https://webscraper.io/test-sites/e-commerce/allinone/computers/laptops> and return a list of Lenovo laptops sorted by price.

## Prerequisites

- Node.js installed on your machine

## Quick Two-liner Start

In case you want to quickly test the project, you can run the following commands:

```bash
  npm install && npm run build && npm run start
```

```bash
  curl --location --request GET 'http://localhost:5000/api/puppeteer'
```

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
