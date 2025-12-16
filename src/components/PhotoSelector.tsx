export class PhotoSelector {
  private static readonly CHECKBOX_CLASS = 'photo-grabber-checkbox';
  private static readonly SELECTED_CLASS = 'photo-grabber-selected';

  static addCheckboxesToPhotos(): void {
    // Find all photo elements in Google Photos
    const photoElements = document.querySelectorAll('[role="gridcell"] img, .Q5txwe, .A7Gije, .Kfwa9c');
    
    photoElements.forEach((element, index) => {
      if (element instanceof HTMLElement) {
        // Skip if already has checkbox
        if (element.closest(`.${PhotoSelector.CHECKBOX_CLASS}-container`)) return;

        const photoContainer = element.closest('[role="gridcell"]') || element.parentElement;
        if (!photoContainer) return;

        // Create checkbox container
        const checkboxContainer = document.createElement('div');
        checkboxContainer.className = `${PhotoSelector.CHECKBOX_CLASS}-container`;
        checkboxContainer.style.cssText = `
          position: absolute;
          top: 8px;
          left: 8px;
          z-index: 10;
        `;

        // Create checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = PhotoSelector.CHECKBOX_CLASS;
        checkbox.style.cssText = `
          width: 20px;
          height: 20px;
          cursor: pointer;
          accent-color: #3b82f6;
        `;

        // Generate unique ID for this photo
        const photoId = `photo-${index}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        checkbox.dataset.photoId = photoId;

        // Add event listener
        checkbox.addEventListener('change', (e) => {
          const target = e.target as HTMLInputElement;
          const photoElement = (target.closest('[role="gridcell"]') || target.parentElement) as HTMLElement;
          
          if (target.checked) {
            photoElement?.classList.add(PhotoSelector.SELECTED_CLASS);
            if (photoElement) {
              photoElement.style.cssText = `
                outline: 3px solid #3b82f6 !important;
                outline-offset: -3px !important;
                border-radius: 8px !important;
              `;
            }
          } else {
            photoElement?.classList.remove(PhotoSelector.SELECTED_CLASS);
            if (photoElement) {
              photoElement.style.cssText = '';
            }
          }

          // Notify main app
          if ((window as any).PhotoGrabberAPI) {
            (window as any).PhotoGrabberAPI.togglePhotoSelection(photoId);
          }
        });

        checkboxContainer.appendChild(checkbox);
        
        // Make container relative if not already
        if (getComputedStyle(photoContainer).position === 'static') {
          (photoContainer as HTMLElement).style.position = 'relative';
        }
        
        photoContainer.appendChild(checkboxContainer);
      }
    });
  }

  static removeCheckboxesFromPhotos(): void {
    // Remove all checkboxes
    const checkboxes = document.querySelectorAll(`.${PhotoSelector.CHECKBOX_CLASS}`);
    checkboxes.forEach(checkbox => {
      checkbox.closest(`.${PhotoSelector.CHECKBOX_CLASS}-container`)?.remove();
    });

    // Remove selection styling
    const selectedElements = document.querySelectorAll(`.${PhotoSelector.SELECTED_CLASS}`);
    selectedElements.forEach(element => {
      element.classList.remove(PhotoSelector.SELECTED_CLASS);
      (element as HTMLElement).style.cssText = '';
    });
  }

  static getSelectedPhotoIds(): string[] {
    const checkboxes = document.querySelectorAll(`.${PhotoSelector.CHECKBOX_CLASS}:checked`);
    return Array.from(checkboxes).map(checkbox => 
      (checkbox as HTMLInputElement).dataset.photoId || ''
    ).filter(Boolean);
  }
}