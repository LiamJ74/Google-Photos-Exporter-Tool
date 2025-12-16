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
        const fullSizeUrl = img.src.replace(/=w\d+-h\d+/, '=w2048-h1536');
        urls.push(fullSizeUrl);
      }
    }
  });

  return urls;
};

export const createZipFile = async (imageUrls: string[], filename: string): Promise<void> => {
  console.log('Creating ZIP with images:', imageUrls);
  
  // Simulate download delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Create a simple text file as a placeholder for the ZIP
  const content = `PhotoGrabber Download\n\nImages to download:\n${imageUrls.join('\n')}\n\nNote: In production, this would be an actual ZIP file containing all images.`;
  const blob = new Blob([content], { type: 'text/plain' });
  
  // Trigger download
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename.replace('.zip', '.txt'); // Change to .txt for demo
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  
  // Show success message
  showSuccessMessage(`Downloaded ${imageUrls.length} photos`);
};

const showSuccessMessage = (message: string) => {
  const toast = document.createElement('div');
  toast.className = 'fixed bottom-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-[10001]';
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

// Add animations
const style = document.createElement('style');
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