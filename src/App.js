import './App.css';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import AddProduct from './AddProduct';
import UpdateProduct from './UpdateProduct';
import Protected from './Protected';
function App() {
  return (
    <div className="App">
      <Router>
     <Routes>
     <Route path="/login" element={<Login/>}>
     </Route>
     <Route path="/register" element={<Register/>}>
     </Route>
     <Route path="/add" element={<Protected Cmp={AddProduct} />}>
     </Route>
     <Route path="/update" element={<Protected Cmp={UpdateProduct}/>}>
      </Route>
     </Routes>
      </Router>
    </div>
  );
}

export default App;
