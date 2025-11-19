/**
 * Privacy-Compliant Analytics Service
 * Tracks basic usage metrics without collecting personal data
 */

const ANALYTICS_KEY = 'ai-arcade-analytics-v1';

// Privacy-compliant events we track
const ALLOWED_EVENTS = {
  PAGE_VIEW: 'page_view',
  GAME_PLAY: 'game_play',
  SEARCH_QUERY: 'search_query',
  FILTER_USED: 'filter_used',
  GAME_FAVORITE: 'game_favorite',
};

// In-memory storage (reset on page reload)
let analyticsData = {
  events: [],
  totals: {
    pageViews: 0,
    gamePlays: 0,
    searches: 0,
    filterUses: 0,
  },
  dailyStats: {},
  lastUpdated: Date.now(),
};

/**
 * Initialize analytics
 */
export function initAnalytics() {
  // Load from localStorage if available
  if (typeof window !== 'undefined') {
    try {
      // Check if localStorage is actually accessible
      const testKey = '__analytics_test__';
      window.localStorage.setItem(testKey, 'test');
      window.localStorage.removeItem(testKey);

      const stored = window.localStorage.getItem(ANALYTICS_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Only keep recent data (7 days)
        const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
        if (parsed.lastUpdated > sevenDaysAgo) {
          analyticsData = parsed;
        }
      }
    } catch (e) {
      console.warn('Analytics: localStorage not available, using in-memory only');
    }
  }

  // Track page view
  trackEvent(ALLOWED_EVENTS.PAGE_VIEW, {
    path: getCurrentPath(),
    timestamp: Date.now(),
  });
}

/**
 * Track an analytics event
 */
function trackEvent(eventType, data = {}) {
  // Ensure event is allowed
  if (!Object.values(ALLOWED_EVENTS).includes(eventType)) {
    console.warn(`Analytics: Invalid event type: ${eventType}`);
    return;
  }

  // Ensure no personal data is included
  const sanitizedData = sanitizeData(data);

  // Add to events array
  const event = {
    type: eventType,
    data: sanitizedData,
    timestamp: Date.now(),
  };

  analyticsData.events.push(event);

  // Update totals
  switch (eventType) {
    case ALLOWED_EVENTS.PAGE_VIEW:
      analyticsData.totals.pageViews++;
      break;
    case ALLOWED_EVENTS.GAME_PLAY:
      analyticsData.totals.gamePlays++;
      break;
    case ALLOWED_EVENTS.SEARCH_QUERY:
      analyticsData.totals.searches++;
      break;
    case ALLOWED_EVENTS.FILTER_USED:
      analyticsData.totals.filterUses++;
      break;
  }

  // Update daily stats
  updateDailyStats(event);

  // Save to localStorage
  saveToStorage();

  // Log for development
  if (process.env.NODE_ENV === 'development') {
    console.log('📊 Analytics Event:', eventType, sanitizedData);
  }
}

/**
 * Sanitize data to remove any potential personal information
 */
function sanitizeData(data) {
  const sanitized = { ...data };

  // Remove common personal data fields
  const personalFields = ['name', 'email', 'phone', 'address', 'ip', 'userId'];
  personalFields.forEach((field) => {
    delete sanitized[field];
  });

  // Sanitize strings
  Object.keys(sanitized).forEach((key) => {
    if (typeof sanitized[key] === 'string') {
      // Limit length
      if (sanitized[key].length > 100) {
        sanitized[key] = sanitized[key].substring(0, 100) + '...';
      }
    }
  });

  return sanitized;
}

/**
 * Update daily statistics
 */
function updateDailyStats(event) {
  const today = new Date().toISOString().split('T')[0];

  if (!analyticsData.dailyStats[today]) {
    analyticsData.dailyStats[today] = {
      pageViews: 0,
      gamePlays: 0,
      searches: 0,
      filterUses: 0,
    };
  }

  analyticsData.dailyStats[today][event.type]++;

  analyticsData.lastUpdated = Date.now();
}

/**
 * Save analytics to localStorage
 */
function saveToStorage() {
  if (typeof window !== 'undefined') {
    try {
      // Check if localStorage is actually accessible
      const testKey = '__analytics_save_test__';
      window.localStorage.setItem(testKey, 'test');
      window.localStorage.removeItem(testKey);

      // Keep only last 100 events to prevent storage bloat
      if (analyticsData.events.length > 100) {
        analyticsData.events = analyticsData.events.slice(-100);
      }

      window.localStorage.setItem(ANALYTICS_KEY, JSON.stringify(analyticsData));
    } catch (e) {
      console.warn('Analytics: Failed to save data', e);
    }
  }
}

/**
 * Get current path
 */
function getCurrentPath() {
  if (typeof window !== 'undefined') {
    return window.location.pathname;
  }
  return '/';
}

/**
 * Public API
 */

// Track page view
export function trackPageView() {
  trackEvent(ALLOWED_EVENTS.PAGE_VIEW, {
    path: getCurrentPath(),
  });
}

// Track game play
export function trackGamePlay(gameSlug) {
  trackEvent(ALLOWED_EVENTS.GAME_PLAY, {
    gameSlug,
  });
}

// Track search query
export function trackSearch(query) {
  trackEvent(ALLOWED_EVENTS.SEARCH_QUERY, {
    query,
  });
}

// Track filter usage
export function trackFilterUsed(filterType, filterValue) {
  trackEvent(ALLOWED_EVENTS.FILTER_USED, {
    filterType,
    filterValue,
  });
}

// Get analytics summary (for admin/dashboard)
export function getAnalyticsSummary() {
  // Only return summary data, not raw events
  return {
    totals: analyticsData.totals,
    dailyStats: analyticsData.dailyStats,
    lastUpdated: analyticsData.lastUpdated,
    eventCount: analyticsData.events.length,
  };
}

// Reset analytics (for testing)
export function resetAnalytics() {
  analyticsData = {
    events: [],
    totals: {
      pageViews: 0,
      gamePlays: 0,
      searches: 0,
      filterUses: 0,
    },
    dailyStats: {},
    lastUpdated: Date.now(),
  };
  if (typeof window !== 'undefined' && localStorage) {
    localStorage.removeItem(ANALYTICS_KEY);
  }
}
