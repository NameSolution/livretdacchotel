import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { I18nProvider } from './i18n';
import { HotelProvider } from './lib/hotel-context';
import Shell from './components/layout/Shell';
import Home from './pages/Home';
import Wifi from './pages/Wifi';
import Breakfast from './pages/Breakfast';
import Info from './pages/Info';
import Discover from './pages/Discover';
import Contact from './pages/Contact';
import Credits from './pages/Credits';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <BrowserRouter>
      <HotelProvider>
        <I18nProvider>
          <Routes>
            <Route element={<Shell />}>
              <Route index element={<Home />} />
              <Route path="wifi" element={<Wifi />} />
              <Route path="petit-dejeuner" element={<Breakfast />} />
              <Route path="infos" element={<Info />} />
              <Route path="decouvrir" element={<Discover />} />
              <Route path="reception" element={<Contact />} />
              <Route path="credits" element={<Credits />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </I18nProvider>
      </HotelProvider>
    </BrowserRouter>
  );
}
