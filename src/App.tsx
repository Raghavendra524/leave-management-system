import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DecideAuthRoutes from './routes/DecideAuthRoutes';
import store from './slices/store';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='*' element={<DecideAuthRoutes />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
