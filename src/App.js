import { useState } from 'react';
import Navbar from './components/Navbar';
import Products from './pages/Products';
import './styles/App.css';
import { Route, Routes } from 'react-router-dom';
import ProductAdd from './pages/ProductAdd';
import ProductEdit from './pages/ProductEdit';
import Dashboard from './pages/Dashboard'
import { getAllProductsApi } from './services/serviceApis';




function App() {
  const [isOpen, setIsOpen] = useState(true);

  const [check, setCheck] = useState(false);

  const [productList, setProductList] = useState([]);
  const [productListCopy, setProductListCopy] = useState([]);

  const getAllProducts = async () => {
    try{
      const response = await getAllProductsApi();
        if(response.status>=200 || response.status < 300){
          setProductList(response?.data)
          setProductListCopy(response?.data)
        }
    
    }catch(error){
      console.log(error);
    }

  }


  return (
    <div className="App bg-gray-50">
      <Navbar isOpen={isOpen} setIsOpen={setIsOpen} setProductList={setProductList} productListCopy={productListCopy} getAllProducts={getAllProducts} setCheck={setCheck}/>
      <Routes>

        <Route path={'/product'} element={<Products isOpen={isOpen} setIsOpen={setIsOpen} productList={productList} setProductList={setProductList} productListCopy={productListCopy} getAllProducts={getAllProducts} check={check}/>}/>

        <Route path={'/'} element={<Products isOpen={isOpen} setIsOpen={setIsOpen} productList={productList} setProductList={setProductList} productListCopy={productListCopy} getAllProducts={getAllProducts} check={check} />}/>

        <Route path={'/dashboard'} element={<Dashboard isOpen={isOpen} setIsOpen={setIsOpen}/>}/>
        <Route path={'/product/add'} element={<ProductAdd isOpen={isOpen} setIsOpen={setIsOpen}/>}/>
        <Route path={'/product/edit/:id'} element={<ProductEdit isOpen={isOpen} setIsOpen={setIsOpen}/>}/>

      </Routes>
      
    </div>
  );
}

export default App;
