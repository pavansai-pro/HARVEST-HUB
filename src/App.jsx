import { useState } from 'react';
import { AppProvider } from './context/AppContext';
import Onboarding from './pages/Auth/Onboarding';
import Permissions from './pages/Auth/Permissions';
import Tutorial from './pages/Auth/Tutorial';
import Login from './pages/Auth/Login';
import CustomerHome from './pages/Customer/Home';
import Cart from './pages/Customer/Cart';
import Checkout from './pages/Customer/Checkout';
import OrderTracking from './pages/Customer/OrderTracking';
import FarmerHome from './pages/Farmer/Dashboard';
import AddProduct from './pages/Farmer/AddProduct';
import FarmerOrders from './pages/Farmer/Orders';
import Settings from './pages/Settings';

const screens = {
  onboarding: Onboarding,
  permissions: Permissions,
  tutorial: Tutorial,
  login: Login,
  'customer-home': CustomerHome,
  cart: Cart,
  checkout: Checkout,
  tracking: OrderTracking,
  'farmer-home': FarmerHome,
  'farmer-add': AddProduct,
  'farmer-orders': FarmerOrders,
  settings: Settings,
};

function Router() {
  const [screen, setScreen] = useState('onboarding');
  const [history, setHistory] = useState([]);

  const navigate = (to) => {
    setHistory(h => [...h, screen]);
    setScreen(to);
    window.scrollTo(0, 0);
  };

  const Screen = screens[screen] || screens.onboarding;

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <Screen onNavigate={navigate} />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Router />
    </AppProvider>
  );
}
