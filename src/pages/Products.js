import React, { useEffect, useRef, useState } from 'react'
import { useMediaQuery } from '@mui/material';
import ProductCard from './ProductCard';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';


function Products({setIsOpen, isOpen, productList, setProductList, productListCopy, getAllProducts, check}) {
  const isLargeScreen = useMediaQuery('(min-width: 600px)');

  const [productsPerPage, setProductsPerPage] = useState(5)
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(productList.length / productsPerPage);
  const pages = [...Array(totalPages + 1).keys()].slice(1);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const visibleProducts = productList.slice(indexOfFirstProduct, indexOfLastProduct);


  const refToTop = useRef(null);


  // searchProducts()
  // getProducts() productList, setProductlist copies


  const searchProducts = (e) => {
    const searchText = e.target.value;
    const filteredData = productListCopy?.filter(product => (product.name + product.category).toLowerCase().includes(searchText.toLowerCase()));
    setProductList(filteredData);
  }
  


  useEffect(()=>{
    getAllProducts();
  },[check]);


  const prevPageHandler = () => {
    if(currentPage !== 1){
      setCurrentPage(currentPage - 1);
    }
  }

  const nextPageHandler = () => {
    if(currentPage !== totalPages){
      setCurrentPage(currentPage + 1);
    }
  }




  return (
    <>
      {isLargeScreen ? <div ref={refToTop} className={`${isOpen? "ms-[220px]" : "ms-[125px]"} pt-[0px] pe-[20px] transition-margin duration-300`}>
        <div className='grid grid-cols-12 items-center gap-3 justify-between sticky top-[0px] py-6 pb-4 bg-gray-50 bg-opacity-100 mlg:py-6'>
          <div className="welcome-container col-span-12 flex justify-between items-center gap-3 lg:col-span-9">
            <div className='bg-white flex items-center gap-[20px] p-1 pe-3 rounded-full ring-1 ring-slate-950/5 shadow-md'>
              <img src="https://i.postimg.cc/bv5VRSw3/john-doe.jpg" className='rounded-full w-[50px] h-[50px]' alt="" />
              <div className='welcome-text pe-2 font-semibold tracking-tight mlg:pe-5'>Welcome Admin</div>
            </div>
            <div className="input-container flex-1 relative">
              <input type="text" className='w-[100%] py-[17px] px-3 ps-11 rounded-full shadow-md ring-1 ring-slate-950/5 outline-none' placeholder='Search your products...' name="" id="" onChange={(e)=>{searchProducts(e)}} />
              <i className="text-gray-500 fa-solid fa-magnifying-glass absolute top-[21.5px] left-[20px]"></i>
            </div>
          </div>

          <div className='col-span-12 flex justify-end lg:col-span-3'>
            <Link to={'/product/add'}><button className='add-product-btn py-[17px] bg-slate-950 text-white px-3 rounded-md tracking-tight font-semibold shadow-md'>Add Product +</button></Link>
          </div>
        </div>

        <div className="product-table bg-slate-50 mlg:min-h-[83vh] mlg:bg-white mx-2  mt-4 flex flex-col items-center justify-center gap-3 p-2 rounded-xl shadow-none mlg:shadow-[0px_0px_10px_rgba(0,0,0,0.1)] mlg:ring-1 mlg:ring-slate-950/5 mlg:block">
          <div className="hidden mlg:grid grid-cols-12 gap-3 bg-white  px-4 py-3">
            <div className='col-span-1 font-semibold'>ID</div>
            <div className='col-span-4 font-semibold'>Product</div>
            <div className='col-span-1 font-semibold'>Brand</div>
            <div className='col-span-2 font-semibold'>Category</div>
            <div className='col-span-1 font-semibold'>Price</div>
            <div className='col-span-2 font-semibold'>Created At</div>
            <div className='col-span-1 font-semibold'>Action</div>
          </div>

        <hr className='hidden mlg:block' />



          <div className='product-list flex flex-col items-center justify-center mlg:space-y-4 space-y-[40px] mlg:block'>

            {
              visibleProducts.length?
              visibleProducts?.map(product=><ProductCard product={product} getAllProducts={getAllProducts}/>)
              :
              (<div className='h-[75vh] w-[100%] flex justify-center items-center'><Loader/></div>)
            }
            
  
            
          </div>
        </div>



        {/* Pagination component  */}

        
        <nav aria-label="Page navigation example">
          <ul class="flex items-center justify-center mb-6 mt-6 mlg:mt-9 h-10 text-base">
            <li>
              <div class="cursor-pointer flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" onClick={prevPageHandler}>
                <span class="sr-only">Previous</span>
                <svg class="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
                </svg>
              </div>
            </li>
            { pages.map(page=>(<li>
              <div class={ `${currentPage === page ? "cursor-pointer z-10 flex items-center justify-center px-4 h-10 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white" : "cursor-pointer flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"}`} onClick={()=>{
                setCurrentPage(page);
                refToTop.current && refToTop.current.scrollIntoView();
                }}>{page}</div>
            </li>))}
            {/* <li>
              <div class="cursor-pointer flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</div>
            </li>

            <li>
              <div class="cursor-pointer flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">3</div>
            </li> */}
            {/* <li>
              <a cursor-pointer aria-current="page" class="z-10 flex items-center justify-center px-4 h-10 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
            </li> */}
            {/* <li>
              <div class="cursor-pointer flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">4</div>
            </li>
            <li>
              <div class="cursor-pointer flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">5</div>
            </li> */}
            <li>
              <div class="cursor-pointer flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" onClick={nextPageHandler}>
                <span class="sr-only">Next</span>
                <svg class="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                </svg>
              </div>
            </li>
          </ul>
        </nav>


      </div>
      
      :


      <div className='mt-[120px] transition-margin duration-500 px-8'>

<div className='grid grid-cols-12 items-center gap-3 justify-between  py-6 pb-4 bg-gray-50 bg-opacity-100 mlg:py-6'>
          <div className="welcome-container col-span-12 flex justify-between items-center gap-3 lg:col-span-9">
            {/* <div className='bg-white flex items-center gap-[20px] p-1 pe-3 rounded-full ring-1 ring-slate-950/5 shadow-md'>
              <img src="https://i.postimg.cc/bv5VRSw3/john-doe.jpg" className='rounded-full w-[50px] h-[50px]' alt="" />
              <div className='welcome-text pe-2 font-semibold tracking-tight mlg:pe-5'>Welcome Admin</div>
            </div> */}
            <div className="input-container flex-1 relative">
              <input type="text" className='w-[100%] py-[17px] px-3 ps-11 rounded-full shadow-md ring-1 ring-slate-950/5 outline-none' placeholder='Search your products...' name="" id="" onChange={(e)=>{searchProducts(e)}} />
              <i className="text-gray-500 fa-solid fa-magnifying-glass absolute top-[21.5px] left-[20px]"></i>
            </div>
          </div>

          <div className='col-span-12 flex justify-end lg:col-span-3'>
            <Link to={'/product/add'}><button className='add-product-btn py-[17px] bg-slate-950 text-white px-3 rounded-md tracking-tight font-semibold shadow-md'>Add Product +</button></Link>
          </div>
        </div>

        <div className="product-table bg-slate-50 mlg:min-h-[83vh] mlg:bg-white mx-2  mt-4 flex flex-col items-center justify-center gap-3 p-2 rounded-xl shadow-none mlg:shadow-[0px_0px_10px_rgba(0,0,0,0.1)] mlg:ring-1 mlg:ring-slate-950/5 mlg:block">
          <div className="hidden mlg:grid grid-cols-12 gap-3 bg-white  px-4 py-3">
            <div className='col-span-1 font-semibold'>ID</div>
            <div className='col-span-4 font-semibold'>Product</div>
            <div className='col-span-1 font-semibold'>Brand</div>
            <div className='col-span-2 font-semibold'>Category</div>
            <div className='col-span-1 font-semibold'>Price</div>
            <div className='col-span-2 font-semibold'>Created At</div>
            <div className='col-span-1 font-semibold'>Action</div>
          </div>

        <hr className='hidden mlg:block' />



          <div className='product-list flex flex-col items-center justify-center mlg:space-y-4 space-y-[40px] mlg:block'>

            {
              visibleProducts.length?
              visibleProducts?.map(product=><ProductCard product={product} getAllProducts={getAllProducts}/>)
              :
              (<div className='h-[75vh] w-[100%] flex justify-center items-center'><Loader/></div>)
            }
            
  
            
          </div>
        </div>



        {/* Pagination component  */}

        
        <nav aria-label="Page navigation example">
          <ul class="flex items-center justify-center mb-6 mt-5 mlg:mt-9 h-10 text-base">
            <li>
              <div class="cursor-pointer flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" onClick={prevPageHandler}>
                <span class="sr-only">Previous</span>
                <svg class="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
                </svg>
              </div>
            </li>
            { pages.map(page=>(<li>
              <div class={ `${currentPage === page ? "cursor-pointer z-10 flex items-center justify-center px-4 h-10 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white" : "cursor-pointer flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"}`} onClick={()=>{
                setCurrentPage(page);
                refToTop.current && refToTop.current.scrollIntoView();
                }}>{page}</div>
            </li>))}
            {/* <li>
              <div class="cursor-pointer flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</div>
            </li>

            <li>
              <div class="cursor-pointer flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">3</div>
            </li> */}
            {/* <li>
              <a cursor-pointer aria-current="page" class="z-10 flex items-center justify-center px-4 h-10 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
            </li> */}
            {/* <li>
              <div class="cursor-pointer flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">4</div>
            </li>
            <li>
              <div class="cursor-pointer flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">5</div>
            </li> */}
            <li>
              <div class="cursor-pointer flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" onClick={nextPageHandler}>
                <span class="sr-only">Next</span>
                <svg class="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                </svg>
              </div>
            </li>
          </ul>
        </nav>

      </div>}
    </>
  )
}
export default Products





// <div className='h-[75vh] w-[100%] flex justify-center items-center'><img src="https://i.postimg.cc/xT1fRsmb/plane-2-unscreen.gif" className='w-[300px] h-[290px]' alt="" /></div>
