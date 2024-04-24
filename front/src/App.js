import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/index.scss';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import { LoginPage } from './pages/LoginPage';
import CreateListing from './pages/CreateListing';
import ListingDetails from './pages/ListingDetails';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TripList from './pages/TripList';
import WishList from './pages/WishList';
import PropertyList from './pages/PropertyList';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/create-listing' element={<CreateListing />} />
          <Route path='/properties/:listingId' element={<ListingDetails />} />
          <Route path='/:userId/trips' element={<TripList />} />
          <Route path='/:userId/wishList' element={<WishList />} />
          <Route path='/:userId/properties' element={<PropertyList />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;