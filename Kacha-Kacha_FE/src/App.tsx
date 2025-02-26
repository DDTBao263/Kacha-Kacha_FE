import { useRoutes } from 'react-router-dom';
import { Suspense } from 'react';
import { allRoutes } from './routes/sections';

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>{useRoutes(allRoutes)}</Suspense>
  );
}

export default App;
