
# Sanity Integration

This folder contains the integration with Sanity CMS for your content management needs.

## Getting Started with Sanity

1. Install the Sanity CLI globally (if not already installed):
   ```
   npm install -g @sanity/cli
   ```

2. Login to your Sanity account:
   ```
   sanity login
   ```

3. Initialize a new Sanity project (if you don't have one):
   ```
   sanity init
   ```
   Follow the prompts to set up your project.

4. Set up environment variables:
   Create a `.env` file in the root of your project with the following variables:
   ```
   VITE_SANITY_PROJECT_ID=your-project-id
   VITE_SANITY_DATASET=production
   VITE_SANITY_API_VERSION=2023-08-01
   VITE_SANITY_TOKEN=your-token-for-preview-mode
   ```

5. If you need to deploy your Sanity Studio:
   ```
   cd path/to/your/sanity/studio
   sanity deploy
   ```

## Content Structure

The integration expects the following content types in your Sanity schema:

- `article`: For blog articles and content pages

For more details on schema structure, see the `types.ts` file.

## Preview Mode

Preview mode allows you to see unpublished content. To enable it, add `?sanity-preview=true` to your URL.
