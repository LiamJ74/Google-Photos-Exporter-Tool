# PhotoGrabber
**Bulk Downloader for Google Photos**

PhotoGrabber is an innovative tool that integrates directly into Google Photos to allow bulk selection and downloading of photos. It can be used as a **Bookmarklet** or a **Chrome Extension**.

## 🎯 Goal
PhotoGrabber solves a common problem: the inability to easily download multiple photos from Google Photos at once without creating albums or using Takeout. The application adds an intuitive selection interface directly into Google Photos, allowing users to:

- Visually select photos with checkboxes.
- Download selected photos in a ZIP file.
- Do everything directly in the browser, client-side.

## 🚀 Features

### 📸 Photo Selection
- **Floating Interface**: Non-intrusive control panel in the top right corner.
- **Checkboxes**: Automatically added to each photo thumbnail.
- **Visual Feedback**: Blue outline on selected photos.
- **Real-time Counter**: Displays the number of selected photos.

### 📦 Bulk Download
- **ZIP Generation**: Client-side creation of a ZIP file containing all photos.
- **Automatic Conversion**: Transforms thumbnails into full-resolution images (where possible).
- **Visual Progress**: Loading indicator during ZIP creation.
- **Success Notification**: Confirmation message once the download is complete.

### 🔧 Dual Integration
- **Bookmarklet**: Works in any browser, requires no installation, easy one-click launch.
- **Chrome Extension**: Automatically available on Google Photos, persistent integration.

## 🛠️ Technical Architecture

### Tech Stack
- **React 18**: Main framework with modern hooks.
- **TypeScript**: Strict typing for code robustness.
- **Tailwind CSS**: Utility styling and responsive design.
- **JSZip**: For client-side ZIP generation.
- **Vite**: Fast build tool used for bundling.

## 📦 Installation & Usage

### Option 1: Chrome Extension (Recommended)
This provides the best experience as the tool is automatically loaded when you visit Google Photos.

1. **Download/Build**:
   - Clone the repository.
   - Run `npm install` and `npm run build`.
   - The build output is in the `dist/` folder.

2. **Install in Chrome**:
   - Open Chrome and go to `chrome://extensions`.
   - Enable **Developer mode** (toggle in top right).
   - Click **Load unpacked**.
   - Select the `dist` folder from your project.

3. **Usage**:
   - Go to [photos.google.com](https://photos.google.com).
   - The PhotoGrabber interface (Select Photos button) will appear automatically in the top right.

### Option 2: Bookmarklet
Useful if you cannot install extensions or prefer a manual trigger.

1. **Host the Bundle**:
   - Run `npm run build`.
   - Upload `dist/photo-grabber.js` to a static file host (e.g., GitHub Pages, Vercel, Netlify).
   - Note the URL (e.g., `https://yourdomain.com/photo-grabber.js`).

2. **Create the Bookmarklet**:
   - Right-click on your bookmarks bar -> "Add Page".
   - Name it "PhotoGrabber".
   - URL:
     ```javascript
     javascript:(function(){const script=document.createElement('script');script.src='YOUR_URL_HERE/photo-grabber.js';document.head.appendChild(script);})();
     ```

3. **Usage**:
   - Go to Google Photos.
   - Click the bookmarklet to inject the tool.

## 🔧 Local Development

1. Clone the repository.
2. Install dependencies: `npm install`.
3. Start dev server: `npm run dev`.
   - This runs the tool in "standalone" mode for UI testing.
   - To test injection, use the build output.

## 🚨 Limitations & Solutions

1. **CORS**: Images must be accessible via the same domain or allow Cross-Origin requests.
2. **Performance**: Downloading hundreds of photos depends on browser memory.
3. **Dynamic DOM**: Google Photos updates frequently; selectors might need maintenance.

## 🤝 Contribution

1. Fork the project.
2. Create feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -m 'Add new feature'`
4. Push and create PR.

## 📄 License
MIT License.
