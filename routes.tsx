import { lazy } from 'react';
export const routes = [
  { path: '/', element: lazy(() => import('./pages/MainPage')) },
  { path: '/start', element: lazy(() => import('./pages/GetStarted')) },
  { path: '/dashboard', element: lazy(() => import('./pages/Dashboard')) },
  { path: '/video', element: lazy(() => import('./pages/VideoEditing')) },
  { path: '/subtitles', element: lazy(() => import('./pages/SubtitlesEditing')) },
  { path: '/create', element: lazy(() => import('./pages/CreateVideo')) },
  { path: '/about', element: lazy(() => import('./pages/About')) },
];
