# E-Commerce Scrapper

---

## Contents

- [Requirements](#requirements)
- [Running the tests](#running-the-tests)
- [Running the server](#running-the-server)
- [Get Sorted Lenovo Laptops](#get-sorted-lenovo-laptops)

## Requirements

- `npm install`

## Running the tests

- `npm run tests:unit`

## Running the server

- `npm run build  && npm run start`

## Get Sorted Lenovo Laptops

Run this command to get lenovo laptops sorted by price (including storage pricing variations):

- Run with Puppeteer
  - `curl --location --request GET 'http://localhost:5000/api/puppeteer'`

- Run with Playwright
  - `curl --location --request GET 'http://localhost:5000/api/playwright'`
