export const products = [
  { id: 1, name: 'Tomatoes', emoji: '🍅', cat: 'veg', type: 'veg', price: 28, unit: 'kg', farmer: 'Ramu Farms, Medak', farmerShort: 'Ramu Farms', season: 'Kharif', rating: 4.8, reviews: 124, qty: 0.5, minQty: 0.25, maxQty: 10, step: 0.25 },
  { id: 2, name: 'Alphonso Mango', emoji: '🥭', cat: 'fruit', type: 'fruit', price: 120, unit: 'kg', farmer: 'Suresh Orchard, Ratnagiri', farmerShort: 'Suresh Orchard', season: 'Summer', rating: 4.9, reviews: 87, qty: 0.5, minQty: 0.25, maxQty: 10, step: 0.25 },
  { id: 3, name: 'Moong Dal', emoji: '🫘', cat: 'pulse', type: 'grain', price: 95, unit: 'kg', farmer: 'Laxmi Agro, Warangal', farmerShort: 'Laxmi Agro', season: 'Summer', rating: 4.7, reviews: 56, qty: 0.5, minQty: 0.25, maxQty: 10, step: 0.25 },
  { id: 4, name: 'Basmati Rice', emoji: '🌾', cat: 'rice', type: 'grain', price: 85, unit: 'kg', farmer: 'Punjab Farms, Amritsar', farmerShort: 'Punjab Farms', season: 'Kharif', rating: 4.6, reviews: 203, qty: 0.5, minQty: 0.5, maxQty: 25, step: 0.5 },
  { id: 5, name: 'Green Chillies', emoji: '🌶️', cat: 'veg', type: 'veg', price: 60, unit: 'kg', farmer: 'Srinu Farms, Guntur', farmerShort: 'Srinu Farms', season: 'Year-round', rating: 4.5, reviews: 34, qty: 0.5, minQty: 0.25, maxQty: 5, step: 0.25 },
  { id: 6, name: 'Banana', emoji: '🍌', cat: 'fruit', type: 'fruit', price: 40, unit: 'kg', farmer: 'Ravi Orchards, Davangere', farmerShort: 'Ravi Orchards', season: 'Year-round', rating: 4.4, reviews: 67, qty: 1, minQty: 0.25, maxQty: 10, step: 0.25 },
  { id: 7, name: 'Toor Dal', emoji: '🟡', cat: 'pulse', type: 'grain', price: 110, unit: 'kg', farmer: 'Krishna Farms, Gulbarga', farmerShort: 'Krishna Farms', season: 'Kharif', rating: 4.7, reviews: 45, qty: 0.5, minQty: 0.25, maxQty: 10, step: 0.25 },
  { id: 8, name: 'Groundnut Oil', emoji: '🫙', cat: 'oil', type: 'oil', price: 180, unit: 'litre', farmer: 'Sangam Mills, Anantapur', farmerShort: 'Sangam Mills', season: 'Kharif', rating: 4.8, reviews: 112, qty: 1, minQty: 0.5, maxQty: 10, step: 0.5 },
  { id: 9, name: 'Turmeric', emoji: '🌿', cat: 'spice', type: 'spice', price: 140, unit: 'kg', farmer: 'Nizamabad Farms, TG', farmerShort: 'Nizamabad Farms', season: 'Rabi', rating: 4.9, reviews: 78, qty: 0.25, minQty: 0.25, maxQty: 5, step: 0.25 },
  { id: 10, name: 'Watermelon', emoji: '🍉', cat: 'fruit', type: 'fruit', price: 25, unit: 'kg', farmer: 'Patel Farms, Nashik', farmerShort: 'Patel Farms', season: 'Summer', rating: 4.3, reviews: 29, qty: 1, minQty: 1, maxQty: 10, step: 1 },
  { id: 11, name: 'Onions', emoji: '🧅', cat: 'veg', type: 'veg', price: 35, unit: 'kg', farmer: 'Mahadev Farms, Nasik', farmerShort: 'Mahadev Farms', season: 'Rabi', rating: 4.5, reviews: 156, qty: 0.5, minQty: 0.25, maxQty: 10, step: 0.25 },
  { id: 12, name: 'Sunflower Seeds', emoji: '🌻', cat: 'seed', type: 'oil', price: 70, unit: 'kg', farmer: 'Karnataka Agro, Hassan', farmerShort: 'Karnataka Agro', season: 'Kharif', rating: 4.6, reviews: 41, qty: 0.5, minQty: 0.25, maxQty: 5, step: 0.25 },
];

export const categories = [
  { id: 'all', label: 'All', emoji: '🌿' },
  { id: 'rice', label: 'Rice & Millets', emoji: '🌾' },
  { id: 'veg', label: 'Vegetables', emoji: '🥦' },
  { id: 'fruit', label: 'Fruits', emoji: '🍋' },
  { id: 'pulse', label: 'Pulses', emoji: '🫘' },
  { id: 'spice', label: 'Spices', emoji: '🌶️' },
  { id: 'oil', label: 'Oilseeds', emoji: '🌻' },
  { id: 'seed', label: 'Seeds', emoji: '🌱' },
];

export const weatherData = [
  { day: 'Mon', icon: '⛅', temp: 34, rain: 4 },
  { day: 'Today', icon: '☀️', temp: 36, rain: 0, isToday: true },
  { day: 'Wed', icon: '🌧️', temp: 30, rain: 18 },
  { day: 'Thu', icon: '⛅', temp: 32, rain: 6 },
  { day: 'Fri', icon: '☀️', temp: 35, rain: 0 },
];

export const marketPrices = [
  { crop: 'Tomato', season: 'Kharif', price: '₹1,180/qt', trend: '+3.2%', up: true },
  { crop: 'Moong Dal', season: 'Summer', price: '₹9,500/qt', trend: '+1.1%', up: true },
  { crop: 'Rice (BPT)', season: 'Kharif', price: '₹2,200/qt', trend: '-0.8%', up: false },
  { crop: 'Groundnut', season: 'Kharif', price: '₹5,400/qt', trend: '+2.4%', up: true },
  { crop: 'Cotton', season: 'Rabi', price: '₹6,800/qt', trend: '-1.2%', up: false },
];

export const farmerOrders = [
  { id: 'HH-20481', customer: 'Priya Sharma', items: '3.2kg Tomatoes', amount: 342, status: 'transit', time: 'Today 7:45 AM' },
  { id: 'HH-20480', customer: 'Sunita Devi', items: '5kg Moong Dal', amount: 475, status: 'preparing', time: 'Today 8:30 AM' },
  { id: 'HH-20479', customer: 'Anil Kumar', items: '4kg Rice, 2kg Dal', amount: 876, status: 'delivered', time: 'Yesterday' },
  { id: 'HH-20478', customer: 'Meera Singh', items: '2kg Tomatoes, 1kg Chilli', amount: 216, status: 'delivered', time: 'Yesterday' },
];

export const voiceCommands = {
  customer: [
    { label: 'Search tomatoes', action: 'search:tomatoes' },
    { label: 'Track my order', action: 'goto:tracking' },
    { label: 'Go to cart', action: 'goto:cart' },
    { label: 'Show vegetables', action: 'filter:veg' },
    { label: 'Show fruits', action: 'filter:fruit' },
    { label: 'Settings', action: 'goto:settings' },
  ],
  farmer: [
    { label: 'Show market prices', action: 'goto:farmer-home' },
    { label: 'Check weather', action: 'goto:farmer-home' },
    { label: 'Add product', action: 'goto:farmer-add' },
    { label: 'View orders', action: 'goto:farmer-orders' },
    { label: 'Settings', action: 'goto:settings' },
  ],
};

export const states = ['Telangana','Andhra Pradesh','Karnataka','Tamil Nadu','Maharashtra','Gujarat','Punjab','Delhi','Uttar Pradesh','Madhya Pradesh','Odisha','Rajasthan','West Bengal','Bihar'];
