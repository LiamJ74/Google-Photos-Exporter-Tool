// This file handles the bundling and global exposure
import { injectPhotoGrabber } from './index';

// Make sure the function is available globally
if (typeof window !== 'undefined') {
  (window as any).injectPhotoGrabber = injectPhotoGrabber;
  
  // For debugging: expose the function to console
  console.log('PhotoGrabber loaded. Use injectPhotoGrabber() to start.');
}