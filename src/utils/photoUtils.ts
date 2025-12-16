import JSZip from 'jszip';

export const extractImageUrls = (photoIds: string[]): string[] => {
  const urls: string[] = [];
  
  photoIds.forEach(id => {
    // Look for the corresponding photo element and get its src
    const checkbox = document.querySelector(`[data-photo-id="${id}"]`) as HTMLInputElement;
    if (checkbox) {
      const photoContainer = checkbox.closest('[role="gridcell"]');
      const img = photoContainer?.querySelector('img') as HTMLImageElement;
      if (img && img.src) {
        // Convert thumbnail to full size URL (Google Photos specific logic)
        // Note: This logic might need adjustment as Google Photos URLs change
        const fullSizeUrl = img.src.replace(/=w\d+-h\d+/, '=w2048-h1536');
        urls.push(fullSizeUrl);
      }
    }
  });

  return urls;
};

export const createZipFile = async (imageUrls: string[], filename: string): Promise<void> => {
  console.log('Creating ZIP with images:', imageUrls);
  const zip = new JSZip();
  const folder = zip.folder("photos");
  
  let successCount = 0;
  let failCount = 0;

  // Show initial toast
  showToast('Starting download...', 'info');

  const downloadPromises = imageUrls.map(async (url, index) => {
    try {
      // Note: fetching images from Google Photos might face CORS issues if not handled carefully.
      // Since this runs as a bookmarklet on the domain, simple fetch might work if headers allow,
      // but often images are on a CDN (lh3.googleusercontent.com).
      // If canvas is tainted, we can't export.
      // However, usually Google Photos images allow cross-origin in img tags but maybe not fetch.
      // We'll try fetch.
      const response = await fetch(url, { mode: 'cors' });
      if (!response.ok) throw new Error(`Failed to fetch ${url}`);
      const blob = await response.blob();

      // Try to get extension from blob type or default to jpg
      const ext = blob.type.split('/')[1] || 'jpg';
      folder?.file(`photo-${index + 1}.${ext}`, blob);
      successCount++;
    } catch (error) {
      console.error('Error downloading image:', url, error);
      failCount++;
    }
  });

  await Promise.all(downloadPromises);

  if (successCount === 0) {
    showToast('Failed to download any photos (CORS or Network Error)', 'error');
    return;
  }

  try {
    const content = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(content);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showToast(`Successfully downloaded ${successCount} photos${failCount > 0 ? ` (${failCount} failed)` : ''}`, 'success');
  } catch (error) {
    console.error('Error creating ZIP:', error);
    showToast('Error creating ZIP file', 'error');
  }
};

const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
  const toast = document.createElement('div');
  const bgColors = {
    success: 'bg-green-600',
    error: 'bg-red-600',
    info: 'bg-blue-600'
  };

  toast.className = `fixed bottom-4 right-4 ${bgColors[type]} text-white px-6 py-3 rounded-lg shadow-lg z-[10001] font-medium`;
  toast.textContent = message;
  toast.style.cssText = `
    animation: slideIn 0.3s ease-out;
  `;
  
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.style.animation = 'slideOut 0.3s ease-in';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
};

// Add animations if not already present
if (!document.getElementById('photo-grabber-styles')) {
  const style = document.createElement('style');
  style.id = 'photo-grabber-styles';
  style.textContent = `
    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
      from { transform: translateX(0); opacity: 1; }
      to { transform: translateX(100%); opacity: 0; }
    }
  `;
  document.head.appendChild(style);
}
