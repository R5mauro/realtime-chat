import { Suspense, lazy } from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Loader from './components/Loader/Loader';
// import ChatPrincipal from './components/ChatPrincipal/ChatPrincipal';
// import ChatTemporal from './components/ChatTemporal/ChatTemporal';
import { UserProvider } from './context/TemporalUserContext';
import "./styles/main.scss"

const ChatPrincipal = lazy(() => import('./components/ChatPrincipal/ChatPrincipal'))
const ChatTemporal = lazy(() => import('./components/ChatTemporal/ChatTemporal'))

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <BrowserRouter>
        <div className="app">
          <UserProvider>
            <Routes>
              <Route path="/" element={<ChatPrincipal />} />
              <Route path="/temporal" element={<ChatTemporal />} />
            </Routes>
          </UserProvider>
        </div>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
