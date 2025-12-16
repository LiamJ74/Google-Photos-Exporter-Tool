# PhotoGrabber
**Bulk Downloader for Google Photos**

PhotoGrabber is an innovative React application that integrates directly into Google Photos to allow bulk selection and downloading of photos. Functioning as a bookmarklet, the tool injects itself into the existing Google Photos interface without requiring an extension or external software.

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

### 🔧 Bookmarklet Integration
- **One-Click Injection**: Launch via bookmarklet from the bookmarks bar.
- **Automatic Detection**: Checks if the user is on `photos.google.com`.
- **Error Handling**: Clear message if used on the wrong page.
- **Auto Cleanup**: Clean removal of the interface after use.

## 🛠️ Technical Architecture

### Project Structure
```
photo-grabber/
├── src/
│   ├── App.tsx                 # Main application component
│   ├── index.tsx               # Entry point and injection logic
│   ├── main.tsx                # Global exposure of functions
│   ├── components/
│   │   ├── ControlPanel.tsx    # Floating control panel
│   │   ├── PhotoSelector.tsx   # Photo selection logic
│   │   └── ui/                 # Shared UI components (Shadcn)
│   ├── utils/
│   │   ├── photoUtils.ts       # Image processing utilities
│   │   └── cn.ts               # Class merging utility
│   └── types/                  # TypeScript definitions
├── public/
│   └── photo-grabber.js        # Bundle script for bookmarklet (after build)
└── README.md
```

### Tech Stack
- **React 18**: Main framework with modern hooks.
- **TypeScript**: Strict typing for code robustness.
- **Tailwind CSS**: Utility styling and responsive design.
- **Shadcn UI**: Pre-built and customizable UI components.
- **Lucide React**: Modern and consistent icons.
- **Framer Motion**: Smooth animations and micro-interactions.
- **JSZip**: For client-side ZIP generation.

## 📦 Installation

### Prerequisites
- Node.js 18+
- npm or yarn
- Chrome Browser (recommended for Google Photos)

### Local Development
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### Production Build
To create the standalone script for the bookmarklet:

1. Build the project:
   ```bash
   npm run build
   ```
   This will generate `dist/photo-grabber.js`.

## 🔧 Configuration & Usage

### 1. Hosting the Bundle
For the bookmarklet to work, the built JavaScript file must be accessible via a URL.
- Upload `dist/photo-grabber.js` to a static file host (e.g., GitHub Pages, Vercel, Netlify, or your own server).
- Note the full URL (e.g., `https://yourdomain.com/photo-grabber.js`).

### 2. Creating the Bookmarklet
1. Right-click on your Chrome bookmarks bar.
2. Choose "Add Page".
3. Name it "PhotoGrabber".
4. Paste the following JavaScript code into the URL field (replace `YOUR_URL_HERE` with your actual URL):

```javascript
javascript:(function(){const script=document.createElement('script');script.src='YOUR_URL_HERE/photo-grabber.js';document.head.appendChild(script);})();
```

### 3. Using on Google Photos
1. **Navigate**: Go to [photos.google.com](https://photos.google.com).
2. **Launch**: Click the PhotoGrabber bookmarklet.
3. **Activate**: Click "Select Photos" in the floating panel.
4. **Select**: Check the photos you want to download.
5. **Download**: Click "Download" to generate the ZIP.

## 🚨 Limitations & Solutions

### Current Limitations
1. **CORS**: Images must be accessible via the same domain or allow Cross-Origin requests. Google Photos CDNs usually allow this, but changes in security policies might affect it.
2. **Performance**: Downloading hundreds of photos at once depends on browser memory and network speed.
3. **Dynamic DOM**: Google Photos updates its DOM frequently. Selectors in `PhotoSelector.tsx` might need updates if Google changes class names.

## 🤝 Contribution

### Contribution Guidelines
1. Fork the project.
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -m 'Add new feature'`
4. Push: `git push origin feature/new-feature`
5. Create a Pull Request.

### Code Standards
- **Strict TypeScript**
- **ESLint** & **Prettier**
- **Conventional Commits**

## 📄 License
This project is licensed under the MIT License.
