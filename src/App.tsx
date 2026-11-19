import { Suspense, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { VideoProvider } from './contexts/VideoContext';
import { SubtitleProvider } from './contexts/SubtitleContext';
import { PermissionProvider } from './contexts/PermissionContext';
import SideMenu from './components/Common/SideMenu';
import HamburgerMenu from './components/Common/HamburgerMenu';
import LoadingAnimation from './components/Common/LoadingAnimation';
import { routes } from './routes';
export default function App() { const [menuOpen, setMenuOpen] = useState(true); return <BrowserRouter><VideoProvider><SubtitleProvider><PermissionProvider><div className="flex min-h-screen"><SideMenu open={menuOpen} /><main className="flex-1 p-4 md:p-6"><div className="mb-4 flex items-center gap-3"><HamburgerMenu onClick={() => setMenuOpen((v) => !v)} /><h1 className="text-xl font-bold">V-Recap <span className="text-sm font-normal text-slate-500">Movie Recap Tool</span></h1></div><Suspense fallback={<LoadingAnimation />}><Routes>{routes.map((r) => { const El = r.element; return <Route key={r.path} path={r.path} element={<El />} />; })}</Routes></Suspense></main></div></PermissionProvider></SubtitleProvider></VideoProvider></BrowserRouter>; }
