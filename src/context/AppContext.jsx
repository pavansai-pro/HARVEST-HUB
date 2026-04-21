import { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../i18n/translations';
import { products as defaultProducts, farmerOrders as defaultOrders } from '../data/products';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [lang, setLang] = useState('en');
  const [theme, setTheme] = useState('light');
  const [role, setRole] = useState('');
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [permissions, setPermissions] = useState({ location: false, notif: false, camera: false, mic: false });

  // Dynamic Data
  const [globalProducts, setGlobalProducts] = useState(() => {
    const saved = localStorage.getItem('hh_products');
    return saved ? JSON.parse(saved) : defaultProducts;
  });
  const [globalOrders, setGlobalOrders] = useState(() => {
    const saved = localStorage.getItem('hh_orders');
    return saved ? JSON.parse(saved) : defaultOrders;
  });

  useEffect(() => {
    localStorage.setItem('hh_products', JSON.stringify(globalProducts));
  }, [globalProducts]);

  useEffect(() => {
    localStorage.setItem('hh_orders', JSON.stringify(globalOrders));
  }, [globalOrders]);

  const addNewProduct = (product) => {
    const id = Date.now();
    const newProd = { ...product, id, rating: 0, reviews: 0 };
    setGlobalProducts(prev => [newProd, ...prev]);
  };

  const placeNewOrder = () => {
    if(cart.length === 0) return null;
    const itemsDesc = cart.map(i => `${i.qty}${i.unit} ${i.name}`).join(', ');
    const newOrder = {
      id: `HH-${Math.floor(Math.random()*100000)}`,
      customer: user?.name || 'Customer',
      items: itemsDesc,
      amount: orderTotal,
      status: 'transit',
      time: 'Just now',
    };
    setGlobalOrders(prev => [newOrder, ...prev]);
    clearCart();
    return newOrder.id;
  };

  const tr = (key) => (translations[lang]?.[key]) || translations.en[key] || key;

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
  };

  const changeLanguage = (code) => {
    setLang(code);
  };

  const addToCart = (product) => {
    setCart(prev => {
      const exists = prev.find(i => i.id === product.id);
      if (exists) return prev.map(i => i.id === product.id ? { ...i, qty: product.qty } : i);
      return [...prev, { ...product }];
    });
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(i => i.id !== id));
  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const deliveryFee = cartTotal >= 199 ? 0 : (cartTotal > 0 ? 30 : 0);
  const orderTotal = cartTotal + deliveryFee;

  const login = (userData) => setUser(userData);
  const logout = () => { setUser(null); setRole(''); };

  return (
    <AppContext.Provider value={{
      lang, setLang: changeLanguage, theme, toggleTheme, role, setRole,
      user, login, logout, cart, addToCart, removeFromCart, clearCart,
      cartTotal, deliveryFee, orderTotal,
      permissions, setPermissions,
      tr,
      globalProducts, addNewProduct,
      globalOrders, placeNewOrder
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
