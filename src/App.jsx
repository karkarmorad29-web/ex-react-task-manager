import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import TaskList from './TaskList.jsx';
import TaskDetail from './TaskDetail.jsx';
import TaskRedirect from './TaskRedirect.jsx';
import About from './About.jsx';
import Features from './Features.jsx';
import { GlobalProvider } from './GlobalContext.jsx';

const Home = () => <TaskList />;

function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/features" element={<Features />} />
          <Route path="/task/:id" element={<TaskDetail />} />
          <Route path="/tasks/:id" element={<TaskRedirect />} />
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  );
}

export default App
