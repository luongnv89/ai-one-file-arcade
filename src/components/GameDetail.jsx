import React, { useState } from 'react';
import SandboxIframe from './SandboxIframe';

function CollapsibleSection({ title, description, children, isOpen, defaultOpen = false, onToggle }) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = typeof isOpen === 'boolean';
  const open = isControlled ? isOpen : internalOpen;

  const handleToggle = () => {
    const next = !open;
    if (!isControlled) {
      setInternalOpen(next);
    }
    if (onToggle) {
      onToggle(next);
    }
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
      <button
        type="button"
        onClick={handleToggle}
        className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left"
      >
        <div>
          <p className="text-base font-semibold text-gray-900">{title}</p>
          {description && <p className="text-sm text-gray-500">{description}</p>}
        </div>
        <svg
          className={`h-5 w-5 text-gray-500 transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && <div className="border-t border-gray-100 px-4 py-4">{children}</div>}
    </div>
  );
}

/**
 * GameDetail - Displays a game with its details and sandboxed iframe
 *
 * @param {Object} props
 * @param {Object} props.game - Game object with metadata
 */
export default function GameDetail({ game }) {
  const [showPrompt, setShowPrompt] = useState(false);
  const [promptContent, setPromptContent] = useState(null);
  const [loadingPrompt, setLoadingPrompt] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [shareMenuOpen, setShareMenuOpen] = useState(false);

  if (!game) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-700">No game selected</p>
      </div>
    );
  }

  const loadPrompt = async () => {
    setLoadingPrompt(true);
    try {
      const promptPath = game.path.replace('index.html', 'prompt.md');
      const response = await fetch(promptPath);

      if (!response.ok) {
        throw new Error('Prompt file not found');
      }

      const content = await response.text();
      setPromptContent(content);
      setShowPrompt(true);
    } catch (error) {
      console.error('Error loading prompt:', error);
      setPromptContent('⚠️ Prompt file not available for this game.');
      setShowPrompt(true);
    } finally {
      setLoadingPrompt(false);
    }
  };

  const handlePromptToggle = async (isOpen) => {
    if (!isOpen) {
      setShowPrompt(false);
      return;
    }
    setShowPrompt(true);
    if (!promptContent && !loadingPrompt) {
      await loadPrompt();
    }
  };

  const canUseWindow = typeof window !== 'undefined';
  const canUseNavigator = typeof navigator !== 'undefined';
  const canUseDocument = typeof document !== 'undefined';
  const shareUrl = canUseWindow ? window.location.href : `/game/${game.slug}`;
  const description = game.description || 'Check out this AI generated experience!';

  const truncate = (text, max) => (text.length > max ? `${text.slice(0, max - 1)}…` : text);
  const summary = truncate(description, 180);
  const twitterMax = 240; // keep overall tweet (text + url) under 250 characters
  const twitterText = truncate(
    `Play "${game.name}" · ${game.genre || 'AI Game'} · ${game.model || 'AI Model'} — ${summary}`,
    twitterMax,
  );
  const facebookQuote = truncate(`${game.name} — ${summary}`, 200);
  const linkedinTitle = `Play "${game.name}" on AI One-File Arcade`;
  const linkedinSummary = truncate(`${summary} Built with ${game.model || 'AI'}.`, 256);

  const encodedUrl = encodeURIComponent(shareUrl);
  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(twitterText)}&url=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodeURIComponent(
      linkedinTitle,
    )}&summary=${encodeURIComponent(linkedinSummary)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodeURIComponent(
      facebookQuote,
    )}`,
  };

  const openShareWindow = (url) => {
    if (!canUseWindow) return;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleShare = (platform) => {
    if (platform === 'email') {
      handleEmailShare();
      return;
    }
    if (shareLinks[platform]) {
      openShareWindow(shareLinks[platform]);
    }
  };

  const handleEmailShare = () => {
    if (!canUseWindow) return;
    const subject = encodeURIComponent(`Let's play ${game.name}!`);
    const body = encodeURIComponent(
      `Hey there,\n\nI found an AI-generated game called "${game.name}" on AI One-File Arcade and thought you'd enjoy it. It's a ${
        game.genre || 'fun'
      } vibe built with ${game.model || 'an AI model'}.\n\nGive it a try: ${shareUrl}\n\nLet me know what you think!`,
    );
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  const handleCopyLink = async () => {
    try {
      if (canUseNavigator && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareUrl);
      } else if (canUseDocument) {
        const tempInput = document.createElement('textarea');
        tempInput.value = shareUrl;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
      } else {
        throw new Error('Clipboard API unavailable');
      }
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy link:', error);
    }
  };

  const toggleShareMenu = () => {
    setShareMenuOpen((prev) => !prev);
  };

  const handleShareAction = (action) => {
    if (action === 'copy') {
      handleCopyLink();
    } else {
      handleShare(action);
    }
    setShareMenuOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-lg">
        <div className="border-b border-gray-100 px-6 py-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm uppercase tracking-wide text-gray-500">Now playing</p>
              <h1 className="text-3xl font-bold text-gray-900">{game.name}</h1>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-primary-lighter text-primary-dark rounded-full text-sm font-medium">
                {game.genre}
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                {game.difficulty}
              </span>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                {game.model}
              </span>
              {game.hasPrompt && (
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                  ✓ Prompt Available
                </span>
              )}
              <div className="relative">
                <button
                  type="button"
                  onClick={toggleShareMenu}
                  className="flex items-center gap-1 rounded-full border border-gray-300 px-3 py-1.5 text-sm text-gray-700 hover:border-primary hover:text-primary"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 12v6a2 2 0 002 2h12a2 2 0 002-2v-6M16 6l-4-4m0 0L8 6m4-4v12" />
                  </svg>
                  <span>Share</span>
                  <svg
                    className={`h-4 w-4 transition-transform ${shareMenuOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {shareMenuOpen && (
                  <div className="absolute right-0 z-20 mt-2 w-56 rounded-xl border border-gray-200 bg-white shadow-xl">
                    <div className="flex flex-col p-3 gap-2">
                      <button
                        type="button"
                        onClick={() => handleShareAction('copy')}
                        className="w-full rounded-lg border border-gray-200 px-3 py-2 text-left text-sm text-gray-700 hover:border-primary hover:text-primary"
                      >
                        {linkCopied ? 'Link copied!' : 'Copy link'}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleShareAction('twitter')}
                        className="w-full rounded-lg border border-gray-200 px-3 py-2 text-left text-sm text-gray-700 hover:border-primary hover:text-primary"
                      >
                        Share on X
                      </button>
                      <button
                        type="button"
                        onClick={() => handleShareAction('linkedin')}
                        className="w-full rounded-lg border border-gray-200 px-3 py-2 text-left text-sm text-gray-700 hover:border-primary hover:text-primary"
                      >
                        Share on LinkedIn
                      </button>
                      <button
                        type="button"
                        onClick={() => handleShareAction('facebook')}
                        className="w-full rounded-lg border border-gray-200 px-3 py-2 text-left text-sm text-gray-700 hover:border-primary hover:text-primary"
                      >
                        Share on Facebook
                      </button>
                      <button
                        type="button"
                        onClick={() => handleShareAction('email')}
                        className="w-full rounded-lg border border-gray-200 px-3 py-2 text-left text-sm text-gray-700 hover:border-primary hover:text-primary"
                      >
                        Email Draft
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="p-6">
          <SandboxIframe
            src={game.path}
            title={game.name}
            className="w-full"
            onError={(error) => console.error('Game load error:', error)}
          />
        </div>
      </div>

      <div className="space-y-4">
        {(game.description || (game.tags && game.tags.length > 0)) && (
          <CollapsibleSection title="About this game" description="Story, description, and tags">
            {game.description && (
              <p className="text-gray-700 text-base leading-relaxed mb-4">{game.description}</p>
            )}
            {game.tags && game.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {game.tags.map((tag, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </CollapsibleSection>
        )}

        {(game.author || game.duration || game.controls || game.version) && (
          <CollapsibleSection title="Game details" description="Author, duration, controls, and version">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {game.author && (
                <div className="rounded-xl bg-gray-50 p-4">
                  <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1">Author</h3>
                  <p className="text-gray-900">{game.author.name}</p>
                </div>
              )}
              {game.duration && (
                <div className="rounded-xl bg-gray-50 p-4">
                  <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1">Duration</h3>
                  <p className="text-gray-900">{game.duration}</p>
                </div>
              )}
              {game.controls && (
                <div className="rounded-xl bg-gray-50 p-4">
                  <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1">Controls</h3>
                  <p className="text-gray-900 text-sm">{game.controls.instructions}</p>
                </div>
              )}
              {game.version && (
                <div className="rounded-xl bg-gray-50 p-4">
                  <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1">Version</h3>
                  <p className="text-gray-900">{game.version}</p>
                </div>
              )}
            </div>
          </CollapsibleSection>
        )}

        <CollapsibleSection
          title="AI Prompt"
          description="Peek at the original AI instructions"
          isOpen={showPrompt}
          onToggle={handlePromptToggle}
        >
          {loadingPrompt && (
            <div className="text-sm text-gray-500">
              Loading prompt...
            </div>
          )}
          {showPrompt && !loadingPrompt && (
            <pre className="whitespace-pre-wrap font-mono text-sm text-gray-800 bg-gray-50 p-4 rounded-lg border overflow-x-auto">
              {promptContent}
            </pre>
          )}
          {!loadingPrompt && !promptContent && (
            <p className="text-sm text-gray-500">Expand to load the AI prompt.</p>
          )}
        </CollapsibleSection>
      </div>
    </div>
  );
}
