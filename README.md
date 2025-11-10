## Abdooay Blog

This blog is built with Next.js (migrated from Hugo).

### Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

### Creating New Posts

Create a new markdown file in the `posts` directory with TOML frontmatter:

```markdown
+++
title = 'Your Post Title'
date = 2024-01-01T10:00:00+00:00
draft = false
+++

Your post content here...
```

### Deployment

The site automatically deploys to GitHub Pages when changes are pushed to the `main` branch.