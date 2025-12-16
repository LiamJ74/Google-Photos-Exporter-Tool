import { createRoot } from 'react-dom/client';
import PhotoGrabber from './App';

// Function to inject PhotoGrabber into the page
const injectPhotoGrabber = () => {
  // Check if already injected
  if (document.getElementById('photo-grabber-root')) {
    return;
  }

  // Create container
  const container = document.createElement('div');
  container.id = 'photo-grabber-root';
  container.style.position = 'fixed';
  container.style.top = '0';
  container.style.left = '0';
  container.style.width = '100%';
  container.style.height = '100%';
  container.style.pointerEvents = 'none';
  container.style.zIndex = '9999';
  document.body.appendChild(container);

  // Mount React app
  const root = createRoot(container);
  root.render(<PhotoGrabber />);
};

// Expose to global scope for bookmarklet manual calls
if (typeof window !== 'undefined') {
  (window as any).injectPhotoGrabber = injectPhotoGrabber;
}

// Auto-inject logic
if (typeof window !== 'undefined') {
  // 1. If running in DEV mode, inject immediately
  if (import.meta.env.DEV) {
    injectPhotoGrabber();
  }
  // 2. If running as a Chrome Extension content script
  // We can detect this by checking if 'chrome.runtime' is available and we are in the right context
  // However, since this script is specified in manifest.json as a content script, it will run.
  // We just need to make sure we don't double-inject if the script is loaded multiple times somehow.
  // The check at the top of injectPhotoGrabber handles the double-inject prevention.
  // So we just need to call it.

  // 3. For Bookmarklet:
  // When the bookmarklet appends the script, the script runs.
  // So simply calling it here works for both cases!
  
  // We wait for DOMContentLoaded if document is still loading, otherwise run immediately.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => injectPhotoGrabber());
  } else {
    injectPhotoGrabber();
  }
}

export { injectPhotoGrabber };
