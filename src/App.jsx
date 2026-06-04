import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar.jsx';

const Home = () => <main><h1>Home</h1></main>;
const About = () => <main><h1>About</h1><p>Info sulla tua app.</p></main>;
const Products = () => <main><h1>Products</h1><p>Elenco dei prodotti o funzionalità.</p></main>;

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
