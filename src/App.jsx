import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import Module1Page from './pages/Module1Page';
import Module2Page from './pages/Module2Page';
import Module3Page from './pages/Module3Page';
import Module4Page from './pages/Module4Page';
import InterviewPage from './pages/InterviewPage';
import ProjectPage from './pages/ProjectPage';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/module/1" element={<Module1Page />} />
        <Route path="/module/2" element={<Module2Page />} />
        <Route path="/module/3" element={<Module3Page />} />
        <Route path="/module/4" element={<Module4Page />} />
        <Route path="/interview" element={<InterviewPage />} />
        <Route path="/project" element={<ProjectPage />} />
      </Route>
    </Routes>
  );
}
