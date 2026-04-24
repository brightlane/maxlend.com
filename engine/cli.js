name: Generator Pipeline

on:
  schedule:
    - cron: "0 0 * * *"
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repo
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install dependencies
        run: npm install || true

      # 1. Generate keywords FIRST
      - name: Generate keywords.json
        run: node engine/keywords.js

      # 2. Safety check (prevents silent failures)
      - name: Verify keywords.json exists
        run: test -f keywords.json || (echo "keywords.json missing" && exit 1)

      # 3. Run site generator
      - name: Build site
        run: node engine/generate.js

      # 4. Commit & push output
      - name: Commit changes
        run: |
          git config --global user.name "GitHub Action"
          git config --global user.email "action@github.com"
          git add .
          git commit -m "Auto-generated SEO site update" || exit 0
          git push
