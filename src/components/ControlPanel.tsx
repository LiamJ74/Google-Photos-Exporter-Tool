import React from 'react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Download, Image, Check, X, Loader2 } from 'lucide-react';

interface ControlPanelProps {
  isActive: boolean;
  isSelecting: boolean;
  selectedCount: number;
  isDownloading: boolean;
  onStartSelection: () => void;
  onStopSelection: () => void;
  onDownload: () => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  isActive,
  isSelecting,
  selectedCount,
  isDownloading,
  onStartSelection,
  onStopSelection,
  onDownload
}) => {
  if (!isActive && !isSelecting) {
    return (
      <div className="fixed top-4 right-4 z-[10000]" style={{ pointerEvents: 'auto' }}>
        <Button
          onClick={onStartSelection}
          className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg border-0 flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105"
        >
          <Image className="w-4 h-4" />
          Select Photos
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed top-4 right-4 z-[10000]" style={{ pointerEvents: 'auto' }}>
      <div className="bg-gray-900 bg-opacity-95 backdrop-blur-sm rounded-lg shadow-2xl border border-gray-700 p-4 min-w-[280px]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Image className="w-5 h-5 text-blue-400" />
            <h3 className="text-white font-semibold">PhotoGrabber</h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onStopSelection}
            className="text-gray-400 hover:text-white hover:bg-gray-800 p-1 h-auto"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-gray-300 text-sm">Selected Photos</span>
            <Badge variant="secondary" className="bg-blue-600 text-white border-0">
              {selectedCount}
            </Badge>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={onDownload}
              disabled={selectedCount === 0 || isDownloading}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white border-0 disabled:bg-gray-700 disabled:text-gray-500 transition-all duration-200"
            >
              {isDownloading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating ZIP...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </>
              )}
            </Button>
          </div>

          {selectedCount > 0 && (
            <div className="text-xs text-gray-400 text-center">
              {selectedCount} photo{selectedCount !== 1 ? 's' : ''} will be downloaded
            </div>
          )}
        </div>
      </div>
    </div>
  );
};