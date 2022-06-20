import './App.css';
import Main from './Pages/Main';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Main type="page"/>}/>
      <Route path="/id/:id" element={<Main type="search"/>}>
      </Route>
      <Route path="/:id" element={<Main type="page"/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
