import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DecideAuthRoutes from './routes/DecideAuthRoutes';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<DecideAuthRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
