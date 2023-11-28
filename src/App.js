import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';

import RootLayout from './layouts/RootLayout';

import Home, { adjectivesLoader } from './pages/Home';
import Opposite from './pages/Opposite';
import Quiz from './pages/Quiz';
import NotFound from './pages/NotFound';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout />}>
      <Route index element={<Home />} loader={adjectivesLoader} />
      <Route path='opposite' element={<Opposite />} />
      <Route path='quiz' element={<Quiz />} />
      <Route path='*' element={<NotFound />} />
    </Route>
  )
)
function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
