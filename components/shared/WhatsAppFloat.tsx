'use client';

/**
 * Floating WhatsApp contact button.
 *
 * Fixed to the bottom-right of every viewport. Opens a "Click to Chat"
 * conversation with the configured number in a new tab. Subtle pulse halo
 * draws the eye on first paint, then settles down.
 *
 * Number is the user's own business number. Country code 91 (India) is
 * prefixed for wa.me to route the chat correctly.
 */

const WHATSAPP_NUMBER = '919503995633';
const PREFILL =
  'Hi Rheo AI, I would like to start with an Ops Audit.';

export default function WhatsAppFloat() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(PREFILL)}`;

  return (
    <>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Rheo AI on WhatsApp"
        data-cursor="link"
        className="wa-float"
      >
        {/* Pulsing halo, decorative */}
        <span aria-hidden className="wa-pulse" />

        {/* WhatsApp glyph, inline SVG so it scales crisply */}
        <svg
          aria-hidden
          viewBox="0 0 32 32"
          width="28"
          height="28"
          fill="currentColor"
          style={{ display: 'block', color: '#FFFFFF' }}
        >
          <path d="M16.003 3.2c-7.07 0-12.8 5.728-12.8 12.797 0 2.258.59 4.464 1.71 6.408L3.2 28.8l6.547-1.704a12.79 12.79 0 0 0 6.256 1.594h.005c7.07 0 12.797-5.728 12.797-12.797 0-3.42-1.33-6.633-3.748-9.05A12.7 12.7 0 0 0 16.003 3.2zm0 23.34h-.004a10.6 10.6 0 0 1-5.4-1.477l-.387-.23-4.013 1.046 1.07-3.91-.252-.4a10.55 10.55 0 0 1-1.621-5.62c.001-5.88 4.78-10.66 10.66-10.66 2.846 0 5.522 1.11 7.534 3.124a10.6 10.6 0 0 1 3.122 7.542c-.002 5.88-4.78 10.585-10.71 10.585zM21.84 18.66c-.32-.16-1.89-.93-2.183-1.038-.292-.107-.505-.16-.718.16-.213.32-.825 1.038-1.012 1.252-.187.214-.373.24-.693.08-.32-.16-1.35-.498-2.572-1.587-.95-.847-1.59-1.894-1.778-2.214-.187-.32-.02-.493.14-.652.144-.143.32-.373.48-.56.16-.187.214-.32.32-.533.107-.214.054-.4-.026-.56-.08-.16-.72-1.732-.986-2.372-.26-.622-.524-.538-.72-.548-.186-.01-.4-.012-.612-.012-.213 0-.56.08-.853.4-.293.32-1.118 1.092-1.118 2.664s1.145 3.09 1.305 3.302c.16.214 2.252 3.437 5.456 4.823.762.33 1.357.526 1.82.673.765.243 1.46.208 2.01.126.613-.092 1.89-.772 2.157-1.518.267-.747.267-1.386.187-1.518-.08-.133-.293-.213-.613-.373z" />
        </svg>
      </a>

      <style>{`
        .wa-float {
          position: fixed;
          right: 22px;
          bottom: 22px;
          width: 58px;
          height: 58px;
          border-radius: 999px;
          background: #25D366;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          box-shadow:
            0 10px 28px rgba(37, 211, 102, 0.32),
            0 4px 10px rgba(0, 0, 0, 0.18);
          transition: transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s ease, background 0.3s ease;
        }
        .wa-float:hover {
          transform: translateY(-2px) scale(1.04);
          background: #1FB855;
          box-shadow:
            0 16px 40px rgba(37, 211, 102, 0.45),
            0 6px 14px rgba(0, 0, 0, 0.24);
        }
        .wa-float:active {
          transform: translateY(0) scale(0.98);
        }

        /* Pulsing halo, very subtle, fades out after a few cycles */
        .wa-pulse {
          position: absolute;
          inset: 0;
          border-radius: 999px;
          background: #25D366;
          opacity: 0.55;
          animation: wa-ping 2.4s cubic-bezier(0, 0, 0.2, 1) infinite;
          z-index: -1;
        }
        @keyframes wa-ping {
          0%   { transform: scale(1);    opacity: 0.55; }
          70%  { transform: scale(1.55); opacity: 0;    }
          100% { transform: scale(1.55); opacity: 0;    }
        }

        /* Phone-friendly position so it does not cover the iOS bottom bar */
        @media (max-width: 600px) {
          .wa-float {
            right: 16px;
            bottom: max(16px, env(safe-area-inset-bottom, 16px));
            width: 56px;
            height: 56px;
          }
        }

        /* Respect reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .wa-pulse { animation: none; }
          .wa-float { transition: none; }
        }
      `}</style>
    </>
  );
}
