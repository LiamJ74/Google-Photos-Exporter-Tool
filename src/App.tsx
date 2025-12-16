import React, { useState, useEffect, useCallback } from 'react';
import { ControlPanel } from './components/ControlPanel';
import { PhotoSelector } from './components/PhotoSelector';
import { extractImageUrls, createZipFile } from './utils/photoUtils';

interface PhotoGrabberState {
  isActive: boolean;
  selectedPhotos: Set<string>;
  isSelecting: boolean;
  isDownloading: boolean;
  totalCount: number;
}

const PhotoGrabber: React.FC = () => {
  const [state, setState] = useState<PhotoGrabberState>({
    isActive: false,
    selectedPhotos: new Set(),
    isSelecting: false,
    isDownloading: false,
    totalCount: 0
  });

  const [isGooglePhotos, setIsGooglePhotos] = useState(false);

  useEffect(() => {
    // Check if we're on Google Photos
    const checkDomain = () => {
      const isOnGooglePhotos = window.location.hostname === 'photos.google.com' || import.meta.env.DEV;
      setIsGooglePhotos(isOnGooglePhotos);
      if (!isOnGooglePhotos) {
        setState(prev => ({ ...prev, isActive: false }));
      }
    };

    checkDomain();
    
    // Listen for URL changes in single-page apps
    const observer = new MutationObserver(() => {
      if (window.location.hostname !== 'photos.google.com') {
        checkDomain();
      }
    });
    
    observer.observe(document.body, { childList: true, subtree: true });
    
    return () => observer.disconnect();
  }, []);

  const startSelection = useCallback(() => {
    setState(prev => ({ ...prev, isSelecting: true, isActive: true }));
    // Add checkboxes to all visible photos
    PhotoSelector.addCheckboxesToPhotos();
  }, []);

  const stopSelection = useCallback(() => {
    setState(prev => ({ 
      ...prev, 
      isSelecting: false, 
      selectedPhotos: new Set(),
      totalCount: 0 
    }));
    PhotoSelector.removeCheckboxesFromPhotos();
  }, []);

  const togglePhotoSelection = useCallback((photoId: string) => {
    setState(prev => {
      const newSelected = new Set(prev.selectedPhotos);
      if (newSelected.has(photoId)) {
        newSelected.delete(photoId);
      } else {
        newSelected.add(photoId);
      }
      return {
        ...prev,
        selectedPhotos: newSelected,
        totalCount: newSelected.size
      };
    });
  }, []);

  const downloadSelected = useCallback(async () => {
    if (state.selectedPhotos.size === 0) return;

    setState(prev => ({ ...prev, isDownloading: true }));
    
    try {
      const imageUrls = extractImageUrls(Array.from(state.selectedPhotos));
      await createZipFile(imageUrls, 'google-photos-download.zip');
      
      // Clear selection after successful download
      stopSelection();
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setState(prev => ({ ...prev, isDownloading: false }));
    }
  }, [state.selectedPhotos, stopSelection]);

  // Expose functions globally for bookmarklet integration
  useEffect(() => {
    (window as any).PhotoGrabberAPI = {
      togglePhotoSelection,
      getSelectedCount: () => state.selectedPhotos.size
    };
  }, [togglePhotoSelection, state.selectedPhotos.size]);

  if (!isGooglePhotos) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-[9999]">
        <div className="bg-gray-900 rounded-lg p-8 max-w-md text-center border border-gray-700">
          <div className="text-red-500 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Wrong Page</h2>
          <p className="text-gray-400">PhotoGrabber only works on photos.google.com</p>
          <p className="text-gray-500 text-sm mt-4">Please navigate to Google Photos and try again</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <ControlPanel
        isActive={state.isActive}
        isSelecting={state.isSelecting}
        selectedCount={state.totalCount}
        isDownloading={state.isDownloading}
        onStartSelection={startSelection}
        onStopSelection={stopSelection}
        onDownload={downloadSelected}
      />
    </>
  );
};

// Export for use in index.tsx
export default PhotoGrabber;