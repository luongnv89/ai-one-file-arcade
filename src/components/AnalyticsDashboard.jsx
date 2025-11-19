import React, { useState, useEffect } from 'react';
import { getAnalyticsSummary, resetAnalytics } from '../services/analytics.js';

/**
 * AnalyticsDashboard - Simple privacy-compliant analytics display
 * Only visible in development mode
 */
export default function AnalyticsDashboard() {
  const [showDashboard, setShowDashboard] = useState(false);
  const [summary, setSummary] = useState(null);

  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  const refreshSummary = () => {
    setSummary(getAnalyticsSummary());
  };

  useEffect(() => {
    // Show dashboard after a delay in development
    const timer = setTimeout(() => {
      setShowDashboard(true);
      refreshSummary();
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (!showDashboard) {
    return (
      <button
        onClick={() => setShowDashboard(true)}
        className="fixed bottom-4 left-4 z-40 px-3 py-2 bg-gray-800 text-white text-xs rounded shadow-lg hover:bg-gray-900"
      >
        📊 Analytics (Dev)
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 left-4 z-40 w-80 bg-white border border-gray-200 rounded-lg shadow-2xl">
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-900 flex items-center gap-2">
            <span>📊</span> Analytics Dashboard
          </h3>
          <div className="flex gap-2">
            <button
              onClick={refreshSummary}
              className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded"
            >
              Refresh
            </button>
            <button
              onClick={() => setShowDashboard(false)}
              className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded"
            >
              Close
            </button>
          </div>
        </div>

        {!summary && (
          <p className="text-sm text-gray-600">Loading analytics...</p>
        )}

        {summary && (
          <div className="space-y-3">
            {/* Totals */}
            <div>
              <h4 className="text-xs font-semibold text-gray-700 mb-2">Totals</h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-blue-50 p-2 rounded">
                  <div className="text-gray-600">Page Views</div>
                  <div className="font-semibold text-blue-600">{summary.totals.pageViews}</div>
                </div>
                <div className="bg-green-50 p-2 rounded">
                  <div className="text-gray-600">Game Plays</div>
                  <div className="font-semibold text-green-600">{summary.totals.gamePlays}</div>
                </div>
                <div className="bg-purple-50 p-2 rounded">
                  <div className="text-gray-600">Searches</div>
                  <div className="font-semibold text-purple-600">{summary.totals.searches}</div>
                </div>
                <div className="bg-orange-50 p-2 rounded">
                  <div className="text-gray-600">Filter Uses</div>
                  <div className="font-semibold text-orange-600">{summary.totals.filterUses}</div>
                </div>
              </div>
            </div>

            {/* Last Updated */}
            <div className="pt-2 border-t border-gray-200">
              <p className="text-xs text-gray-500">
                Last updated: {new Date(summary.lastUpdated).toLocaleTimeString()}
              </p>
              <p className="text-xs text-gray-500">
                Total events: {summary.eventCount}
              </p>
            </div>

            {/* Privacy Notice */}
            <div className="pt-2 border-t border-gray-200">
              <p className="text-xs text-gray-500">
                🔒 Privacy-compliant: No personal data collected
              </p>
              <p className="text-xs text-gray-500">
                Stored locally in your browser
              </p>
            </div>

            {/* Reset Button */}
            <button
              onClick={() => {
                if (confirm('Reset all analytics data?')) {
                  resetAnalytics();
                  refreshSummary();
                }
              }}
              className="w-full text-xs px-3 py-2 bg-red-50 text-red-600 rounded hover:bg-red-100"
            >
              Reset Analytics
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
