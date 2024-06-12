import "./App.css";
import { Routes, Route } from "react-router-dom";
import SearchBooks from "./SearchBooks";
import ListBook from "./ListBook";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ListBook />} />
      <Route path="/search" element={<SearchBooks />} />
    </Routes>
  );
};

export default App;
