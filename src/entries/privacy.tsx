import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import '../fonts.css';
import '../index.css';
import { Privacy } from '../pages/Privacy';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Privacy />
  </StrictMode>,
);
