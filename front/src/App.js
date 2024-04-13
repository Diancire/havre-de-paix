import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/index.scss';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import { LoginPage } from './pages/LoginPage';
import CreateListing from './pages/CreateListing';
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
          <Route path='/create-listing' element={<CreateListing />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;