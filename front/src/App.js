import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/index.scss';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import { LoginPage } from './pages/LoginPage';
import { ToastContainer} from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/login' element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;