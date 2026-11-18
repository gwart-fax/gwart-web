import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import '../fonts.css';
import '../index.css';
import { Terms } from '../pages/Terms';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Terms />
  </StrictMode>,
);
