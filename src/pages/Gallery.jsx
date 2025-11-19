import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import GameCard from '../components/GameCard';
import Footer from '../components/Footer';
import PWAInstallPrompt from '../components/PWAInstallPrompt';
import AnalyticsDashboard from '../components/AnalyticsDashboard';
import { trackSearch, trackFilterUsed, trackGamePlay } from '../services/analytics.js';

/**
 * Gallery - Main gallery page displaying all games
 */
export default function Gallery() {
  const navigate = useNavigate();
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');

  useEffect(() => {
    loadGames();
  }, []);

  const loadGames = async () => {
    try {
      setLoading(true);
      const response = await fetch('/games-manifest.json');

      if (!response.ok) {
        throw new Error(`Failed to load games: ${response.status}`);
      }

      const manifest = await response.json();
      setGames(manifest.games || []);
      setError(null);
    } catch (err) {
      console.error('Error loading games:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGameClick = (game) => {
    console.log('Game clicked:', game.slug);
    trackGamePlay(game.slug);
    console.log('Navigating to:', `/game/${game.slug}`);
    navigate(`/game/${game.slug}`);
    console.log('Navigate called');
  };

  // Filter games based on search query and filters
  const filteredGames = useMemo(() => {
    return games.filter((game) => {
      // Search query filter
      const query = searchQuery.toLowerCase();
      const matchesSearch = !query.trim() || (
        game.name.toLowerCase().includes(query) ||
        game.description.toLowerCase().includes(query) ||
        game.model.toLowerCase().includes(query) ||
        game.genre.toLowerCase().includes(query) ||
        (game.tags && game.tags.some((tag) => tag.toLowerCase().includes(query)))
      );

      // Model filter
      const matchesModel = !selectedModel || game.model === selectedModel;

      // Genre filter
      const matchesGenre = !selectedGenre || game.genre === selectedGenre;

      // Difficulty filter
      const matchesDifficulty = !selectedDifficulty || game.difficulty === selectedDifficulty;

      return matchesSearch && matchesModel && matchesGenre && matchesDifficulty;
    });
  }, [games, searchQuery, selectedModel, selectedGenre, selectedDifficulty]);

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  // Track search queries with debouncing
  useEffect(() => {
    if (searchQuery.trim()) {
      const timeoutId = setTimeout(() => {
        trackSearch(searchQuery.trim());
      }, 500);

      return () => clearTimeout(timeoutId);
    }
  }, [searchQuery]);

  const handleClearFilters = () => {
    setSelectedModel('');
    setSelectedGenre('');
    setSelectedDifficulty('');
  };

  // Track filter usage
  const handleModelFilter = (model) => {
    setSelectedModel(model);
    if (model) {
      trackFilterUsed('model', model);
    }
  };

  const handleGenreFilter = (genre) => {
    setSelectedGenre(genre);
    if (genre) {
      trackFilterUsed('genre', genre);
    }
  };

  const handleDifficultyFilter = (difficulty) => {
    setSelectedDifficulty(difficulty);
    if (difficulty) {
      trackFilterUsed('difficulty', difficulty);
    }
  };

  // Get unique values for filters
  const availableModels = useMemo(() => {
    return [...new Set(games.map((game) => game.model))].sort();
  }, [games]);

  const availableGenres = useMemo(() => {
    return [...new Set(games.map((game) => game.genre))].sort();
  }, [games]);

  const availableDifficulties = useMemo(() => {
    return [...new Set(games.map((game) => game.difficulty))].sort();
  }, [games]);

  const heroStats = useMemo(() => {
    const models = new Set(games.map((game) => game.model));
    const genres = new Set(games.map((game) => game.genre));
    return {
      games: games.length,
      models: models.size,
      genres: genres.size,
    };
  }, [games]);

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-10">
        <section className="relative mb-10 overflow-hidden rounded-3xl border border-gray-200 bg-white px-6 py-10 shadow-sm">
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-gray-500">AI One-File Arcade</p>
              <h1 className="mt-4 text-4xl font-bold leading-tight text-gray-900 sm:text-5xl">
                One prompt. One file. A curated AI arcade.
              </h1>
              <p className="mt-4 text-lg text-gray-700">
                Explore fully sandboxed AI-built micro games. Every title ships as a single HTML file, so you can inspect it,
                trust it, and play it instantly.
              </p>
              <div className="mt-6 flex flex-wrap gap-3 text-sm font-medium text-gray-700">
                <span className="rounded-full bg-primary-lighter px-4 py-2 text-primary-dark">Sandbox security</span>
                <span className="rounded-full bg-primary-lighter px-4 py-2 text-primary-dark">AI-only titles</span>
                <span className="rounded-full bg-primary-lighter px-4 py-2 text-primary-dark">Manifest driven</span>
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#games-list"
                  className="rounded-full bg-primary bg-[#34D399] px-6 py-3 text-base font-semibold text-gray-900 shadow-sm transition-colors hover:bg-primary-dark hover:text-white focus:outline-none focus:ring-2 focus:ring-primary/40"
                >
                  Browse games
                </a>
                <a
                  href="https://github.com/luongnv89/one-prompt-one-single-file-game"
                  className="rounded-full border border-gray-300 px-6 py-3 text-base font-semibold text-gray-900 transition-colors hover:border-primary hover:text-primary"
                  target="_blank"
                  rel="noreferrer"
                >
                  View GitHub
                </a>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-primary-lighter/60 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-primary-dark">Arcade snapshot</p>
              <div className="mt-6 grid grid-cols-3 gap-4">
                {[
                  { label: 'Games', value: heroStats.games },
                  { label: 'Models', value: heroStats.models },
                  { label: 'Genres', value: heroStats.genres },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-2xl bg-white p-4 text-center shadow-sm">
                    <p className="text-3xl font-bold text-gray-900">{stat.value || 0}</p>
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">{stat.label}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-xl bg-white p-4 text-sm text-gray-700 shadow-sm">
                <p className="font-semibold text-gray-900">Why single-file?</p>
                <p className="mt-2">
                  Single HTML files keep games transparent, portable, and easy to audit—perfect for an AI-first arcade focused on safety.
                </p>
              </div>
            </div>
          </div>
          <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full border border-primary/20"></div>
          <div className="pointer-events-none absolute bottom-6 right-6 text-right text-xs uppercase tracking-[0.4em] text-gray-400">
            Secure ✦ Minimal ✦ Playful
          </div>
        </section>
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Loading games...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Games</h3>
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={loadGames}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {!loading && !error && games.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <p className="text-gray-700 text-lg">No games available yet.</p>
          </div>
        )}

        {!loading && !error && games.length > 0 && (
          <>
            <div id="games-list" className="mb-8">
              <div className="relative max-w-2xl mx-auto">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent shadow-sm"
                    placeholder="Search games by name, description, model, or tags..."
                    aria-label="Search games"
                  />
                  {searchQuery && (
                    <button
                      onClick={handleClearSearch}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      aria-label="Clear search"
                    >
                      <svg
                        className="h-5 w-5 text-gray-400 hover:text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              </div>

              {/* Filter Tags Section */}
              <div className="mt-6 flex flex-wrap items-center gap-3 rounded-2xl border border-gray-200 bg-white/80 p-4 shadow-sm">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">AI Model:</span>
                  <button
                    onClick={() => handleModelFilter('')}
                    className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
                      !selectedModel
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    All Models
                  </button>
                  {availableModels.map((model) => (
                    <button
                      key={model}
                      onClick={() => handleModelFilter(model)}
                      className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
                        selectedModel === model
                          ? 'bg-primary text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {model}
                    </button>
                  ))}
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">Genre:</span>
                  <button
                    onClick={() => handleGenreFilter('')}
                    className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
                      !selectedGenre
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    All Genres
                  </button>
                  {availableGenres.map((genre) => (
                    <button
                      key={genre}
                      onClick={() => handleGenreFilter(genre)}
                      className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
                        selectedGenre === genre
                          ? 'bg-primary text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {genre}
                    </button>
                  ))}
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">Difficulty:</span>
                  <button
                    onClick={() => handleDifficultyFilter('')}
                    className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
                      !selectedDifficulty
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    All Levels
                  </button>
                  {availableDifficulties.map((difficulty) => (
                    <button
                      key={difficulty}
                      onClick={() => handleDifficultyFilter(difficulty)}
                      className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
                        selectedDifficulty === difficulty
                          ? 'bg-primary text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {difficulty}
                    </button>
                  ))}
                </div>
                {(selectedModel || selectedGenre || selectedDifficulty) && (
                  <div className="ml-auto">
                    <button
                      onClick={handleClearFilters}
                      className="text-sm text-gray-600 hover:text-gray-900 underline underline-offset-2"
                    >
                      Clear all
                    </button>
                  </div>
                )}
              </div>

              <div className="mt-6 flex items-center justify-between">
                <p className="text-gray-700">
                  <>
                    Found <span className="font-semibold">{filteredGames.length}</span> of{' '}
                    <span className="font-semibold">{games.length}</span> game
                    {games.length !== 1 ? 's' : ''}
                    {(searchQuery || selectedModel || selectedGenre || selectedDifficulty) && (
                      <span className="ml-1">
                        matching your criteria
                        {searchQuery && (
                          <span className="ml-1">
                            {searchQuery && <span>search"</span>}
                            <span className="font-medium">"{searchQuery}"</span>
                            {(selectedModel || selectedGenre || selectedDifficulty) ? ',' : ''}
                          </span>
                        )}
                        {selectedModel && (
                          <span className="ml-1">
                            {(!searchQuery && selectedGenre) || (!searchQuery && !selectedGenre) ? '(' : ''}
                            <span className="font-medium">{selectedModel}</span>
                            {(selectedGenre || selectedDifficulty) ? ',' : ''}
                          </span>
                        )}
                        {selectedGenre && (
                          <span className="ml-1">
                            <span className="font-medium">{selectedGenre}</span>
                            {selectedDifficulty ? ',' : ''}
                          </span>
                        )}
                        {selectedDifficulty && (
                          <span className="ml-1">
                            <span className="font-medium">{selectedDifficulty}</span>
                          </span>
                        )}
                        <span className="ml-1">
                          {(selectedModel || selectedGenre || selectedDifficulty) ? ')' : ''}
                        </span>
                      </span>
                    )}
                  </>
                </p>
              </div>
            </div>

            {filteredGames.length === 0 && (searchQuery || selectedModel || selectedGenre || selectedDifficulty) && (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <p className="text-gray-700 text-lg mb-2">No games found</p>
                <p className="text-gray-500">Try adjusting your search terms or filters</p>
                {(selectedModel || selectedGenre || selectedDifficulty) && (
                  <button
                    onClick={handleClearFilters}
                    className="mt-3 text-primary hover:text-primary-dark font-medium"
                  >
                    Clear all filters
                  </button>
                )}
              </div>
            )}

            {filteredGames.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredGames.map((game) => (
                  <GameCard key={game.slug} game={game} onClick={handleGameClick} />
                ))}
              </div>
            )}
          </>
        )}
      </main>

      <Footer />

      {/* PWA Install Prompt */}
      <PWAInstallPrompt />

      {/* Analytics Dashboard (Dev only) */}
      <AnalyticsDashboard />
    </div>
  );
}
