import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { LayoutBase } from './layout/layoutBase';

import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from './router';

import "./index.css"

const root = createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <BrowserRouter>
      <LayoutBase>
        <AppRoutes />
      </LayoutBase>
    </BrowserRouter>
  </StrictMode>
);
