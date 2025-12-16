import React from 'react';
import { createRoot } from 'react-dom/client';
import PhotoGrabber from './App';

// Function to inject PhotoGrabber into the page
const injectPhotoGrabber = () => {
  // Remove existing instance if present
  const existingRoot = document.getElementById('photo-grabber-root');
  if (existingRoot) {
    existingRoot.remove();
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

// Expose to global scope for bookmarklet
if (typeof window !== 'undefined') {
  (window as any).injectPhotoGrabber = injectPhotoGrabber;
  
  // Auto-inject if this is loaded directly (not as a module)
  // This handles the case where the script is injected via bookmarklet
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      // Don't auto-inject on DOM ready, wait for explicit call
    });
  }
}

export { injectPhotoGrabber };