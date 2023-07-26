import * as React from 'react';
import { createRoot } from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App';
import { RecoilRoot } from 'recoil';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <RecoilRoot>
      {/* CssBaseline kickstart an elegant, consistent, 
      and simple baseline to build upon. */}
      <CssBaseline />
      <App />
    </RecoilRoot>
  </React.StrictMode>
);
