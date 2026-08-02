import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Prevent non-fatal ResizeObserver notification errors from bubbling to window error overlay
if (typeof window !== 'undefined') {
  const originalError = window.onerror;
  window.onerror = function (msg, url, line, col, error) {
    if (typeof msg === 'string' && msg.includes('ResizeObserver loop')) {
      return true;
    }
    if (originalError) {
      return originalError(msg, url, line, col, error);
    }
    return false;
  };

  window.addEventListener('error', (e) => {
    if (e.message && e.message.includes('ResizeObserver loop')) {
      e.stopImmediatePropagation();
    }
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

