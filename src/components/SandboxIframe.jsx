import React, { useState } from 'react';

/**
 * SandboxIframe - Securely displays a game in a sandboxed iframe
 *
 * @param {Object} props
 * @param {string} props.src - URL to the game file
 * @param {string} props.title - Title of the game for accessibility
 * @param {string} props.className - Optional CSS classes
 * @param {Function} props.onError - Optional error callback
 */
export default function SandboxIframe({ src, title, className = '', onError }) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
    if (onError) {
      onError(`Failed to load game from ${src}`);
    }
  };

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  if (!src) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
        <p className="text-red-600">Game source not provided</p>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
        <h3 className="text-lg font-semibold text-red-800 mb-2">Unable to Load Game</h3>
        <p className="text-red-600 mb-4">
          The game file could not be loaded. This might be due to:
        </p>
        <ul className="text-left text-red-600 mb-4 list-disc list-inside">
          <li>File not found or moved</li>
          <li>Network connectivity issues</li>
          <li>Browser security restrictions</li>
        </ul>
        <p className="text-sm text-red-500">Source: {src}</p>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Loading game...</p>
          </div>
        </div>
      )}

      <iframe
        src={src}
        title={title || 'Game'}
        sandbox="allow-scripts allow-same-origin allow-pointer-lock allow-forms"
        className="w-full h-full border-0 rounded-lg bg-white"
        onError={handleError}
        onLoad={handleLoad}
        allow="fullscreen; pointer-lock"
        style={{ minHeight: '800px' }}
        data-version="v1.3"
      />

      <div className="mt-2 text-xs text-gray-500 flex items-center gap-2">
        <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
        <span>Game runs in a secure sandbox</span>
      </div>
    </div>
  );
}
