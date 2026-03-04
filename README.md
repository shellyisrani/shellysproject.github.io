# Kerry & Shelly's Wedding Website

A beautiful wedding website built with React and Vite, designed to be hosted on GitHub Pages.

## Getting Started

### Prerequisites

1. Node.js (v20 or higher recommended)
2. npm or yarn

### Local Development

1. Clone the repository
2. Navigate to the project directory
3. Install dependencies:
   ```bash
   npm install
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open your browser to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Deploying to GitHub Pages

This project is configured to automatically deploy to GitHub Pages when you push to the `main` branch.

### Setup Instructions

1. **Enable GitHub Pages in your repository:**
   - Go to your repository on GitHub
   - Navigate to Settings → Pages
   - Under "Source", select "GitHub Actions"

2. **Push your code:**
   - Push your code to the `main` branch
   - The GitHub Actions workflow will automatically build and deploy your site

3. **Configure your custom domain (optional):**
   - In your repository Settings → Pages
   - Add your custom domain
   - Follow GitHub's instructions to configure DNS

### Manual Deployment

If you prefer to deploy manually:

1. Build the project: `npm run build`
2. Push the `dist` folder contents to the `gh-pages` branch, or use a tool like `gh-pages`:
   ```bash
   npm install --save-dev gh-pages
   ```
   Then add to `package.json`:
   ```json
   "scripts": {
     "deploy": "npm run build && gh-pages -d dist"
   }
   ```

## Customizing Your Website

### Adding Your Own Images

1. Create an `public` folder in the root directory (if it doesn't exist)
2. Add your images to the `public` folder
3. Reference them in your components using `/image-name.jpg` (the leading `/` is important)

Example:
```jsx
<img src="/your-image.jpg" alt="Description" />
```

### Updating Content

- Edit the component files in `src/components/wedding/` to update wedding-specific content
- Edit pages in `src/pages/` to modify page content
- Update styles in `src/index.css` or use Tailwind classes

## Project Structure

```
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Page components
│   ├── Layout.jsx      # Main layout wrapper
│   └── App.jsx        # Main app component
├── public/            # Static assets (images, etc.)
├── dist/              # Built files (generated)
└── vite.config.js     # Vite configuration
```

## Technologies Used

- React 18
- Vite
- React Router
- Tailwind CSS
- Radix UI components

## Notes

- The RSVP form currently shows a success message without actually submitting data. To enable form submissions, you can integrate with a service like Formspree, Netlify Forms, or EmailJS.
- All base44 dependencies have been removed - this is now a fully static site.
