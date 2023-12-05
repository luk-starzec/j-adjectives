import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AppContext } from './AppContext';

import RootLayout from './layouts/RootLayout';

import Home, { adjectivesLoader } from './pages/Home';
import Opposite, { oppositeLoader } from './pages/Opposite';
import Quiz from './pages/Quiz';
import NotFound from './pages/NotFound';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout />}>
      <Route index element={<Home />} loader={adjectivesLoader} />
      <Route path='opposite' element={<Opposite />} loader={oppositeLoader} />
      <Route path='quiz' element={<Quiz />} />
      <Route path='*' element={<NotFound />} />
    </Route>
  )
)

function App() {
  const [context, setContext] = useState();

  useEffect(() => {
    setContext({ setContext: setContext })
  }, []);

  return (
    <AppContext.Provider value={context}>
      <RouterProvider router={router} />
    </AppContext.Provider>
  );
}

export default App;
