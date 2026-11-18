import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import '../fonts.css';
import '../index.css';
import { Delete } from '../pages/Delete';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Delete />
  </StrictMode>,
);
