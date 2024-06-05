import React, { useState } from 'react'
import { BASE_URL } from '../services/baseUrl';
import { Link } from 'react-router-dom';
import { deleteProductApi } from '../services/serviceApis';
import { useMediaQuery } from '@mui/material';


function ProductCard({product, getAllProducts}) {
  const {id, name, brand, category, price, imageFilename, createdAt, description} = product;
  const [isActive, setIsActive] = useState(false);
  const formattedDate = createdAt ? createdAt.slice(0, 10) : 'N/A';
  const isLargeScreen = useMediaQuery('(min-width: 600px)');


  const modalBoxActive = () => {
    setIsActive(prev => !prev);
  }


  const deleteProduct = async () => {
    try{
        const response = await deleteProductApi(id);
      if(response.status>=200 || response.status<300){
        getAllProducts();
        setIsActive(false);
      }
      else{
        alert('deletion failed');
      }
    }catch(error){
      console.log(error);
    }
  }


  return (
    <>
      { isLargeScreen ? <div>
        <div className="grid grid-cols-12 gap-3 w-[350px] p-4 pb-[30px] mlg:mt-3 mt-0 bg-white mlg:px-3 shadow-[0px_0px_10px_rgba(0,0,0,0.1)] rounded-lg  mlg:w-[100%] mlg:py-4 mlg:shadow-none">
                <div className='col-span-12 items-center text-[20px] flex mlg:col-span-1 mlg:text-[16px]'>{id}</div>
                <div className='col-span-12 flex-col items-center gap-2 mlg:col-span-4 mlg:flex mlg:flex-row'>
                  <img src={`${BASE_URL}/images/${imageFilename}`} alt="" className='w-[100%] min-w-[100px] h-[300px] object-contain object-center mlg:w-[100px] mlg:h-[80px] mlg:shadow-none'/>
                  <div className='product-name text-[30px] leading-[40px] mlg:leading-[24px] ps-4 mlg:text-[16px] tracking-tight font-semibold mlg:ps-0'>{name}</div>
                </div>
                <div className='col-span-12 items-center ps-4 flex text-[20px] tracking-tight mlg:col-span-1 font-semibold mlg:text-[16px] mlg:ps-0 mlg:hidden'>{description}</div>
                <div className='col-span-12 items-center ps-4 flex text-[20px] tracking-tight mlg:col-span-1 mlg:text-[16px] mlg:ps-0'>{brand}</div>
                <div className='col-span-12 items-center ps-4 flex text-[20px] tracking-tight mlg:col-span-2 mlg:text-[16px] mlg:ps-0'>{category}</div>
                <div className='col-span-12 items-center ps-4 flex text-[35px] font-semibold tracking-tight mlg:col-span-1 mlg:text-[16px] mlg:ps-0 mlg:font-normal'>{price/100}$</div>
                <div className='col-span-12 items-center ps-4 flex text-[20px] tracking-tight mlg:col-span-2 mlg:text-[16px] mlg:ps-0'>{formattedDate}</div>
                <div className='col-span-12 items-center ps-4 flex gap-3 text-[20px] mlg:col-span-1 mlg:text-[16px] mlg:ps-0 text-black font-semibold'>
                  <div className='flex-1 mlg:flex-none mlg:py-0 flex justify-center py-2 mlg:bg-transparent bg-slate-200 rounded-lg mlg:mt-0 mt-3'><Link to={`/product/edit/${id}`}><button><i className="fa-solid fa-pen-to-square"></i></button></Link></div>
                  <button data-modal-target="popup-modal" data-modal-toggle="popup-modal" className='flex-1 mlg:flex-none mlg:py-0 flex justify-center py-[13.5px] mlg:bg-transparent bg-red-400 rounded-lg mlg:mt-0 mt-3' type="button" onClick={modalBoxActive} ><i className="fa-solid fa-circle-xmark "></i></button>
                </div>
              </div>
              <hr />
  
          {/* -----------------------modal----------------- */}
          <div id="popup-modal" tabindex="-1" class={`${isActive? "block" : "hidden"} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-[40px] z-50 justify-center items-center w-[100%]  h-[100%]`}>
      <div class="relative p-4 w-[100%] h-[100%] flex justify-center items-center">
          <div class="relative bg-black rounded-lg shadow-[0px_0px_10px_0px_rgba(0,0,0,0.03)] ">
              <button type="button" class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center " data-modal-hide="popup-modal" onClick={()=>{setIsActive(false)}}>
                  <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                  </svg>
                  <span class="sr-only">Close modal</span>
              </button>
              <div class="p-4 py-6 md:p-5 text-center">
                  <svg class="mx-auto mb-4 text-gray-400 w-12 h-12 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                  </svg>
                  <h3 class="mb-5 text-lg font-normal text-gray-500 ">Are you sure you want to delete this product?</h3>
                  <button data-modal-hide="popup-modal" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300  font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center" onClick={deleteProduct}>
                      Yes, I'm sure
                  </button>
                  <button data-modal-hide="popup-modal" type="button" class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-grey-700 focus:z-10 focus:ring-4 focus:ring-gray-100" onClick={()=>{setIsActive(false)}}>No, cancel</button>
              </div>
          </div>
      </div>
      </div>
      </div>
      :
      <div>
        <div className="grid grid-cols-12 gap-2 w-[300px] p-4 pb-[30px] mlg:mt-3 mt-0 bg-white mlg:px-3 shadow-[0px_0px_10px_rgba(0,0,0,0.1)] rounded-lg  mlg:w-[100%] mlg:py-4 mlg:shadow-none">
                <div className='col-span-12 items-center text-[20px] flex mlg:col-span-1 mlg:text-[16px]'>{id}</div>
                <div className='col-span-12 flex-col items-center gap-2 mlg:col-span-4 mlg:flex mlg:flex-row'>
                  <img src={`${BASE_URL}/images/${imageFilename}`} alt="" className='w-[100%] min-w-[100px] h-[300px] object-contain object-center mlg:w-[100px] mlg:h-[80px] mlg:shadow-none'/>
                  <div className='product-name text-[23px] leading-[40px] mlg:leading-[24px] ps-4 mlg:text-[16px] tracking-tight font-semibold mlg:ps-0'>{name}</div>
                </div>
                <div className='col-span-12 items-center ps-4 flex text-[16px] tracking-tight mlg:col-span-1 font-semibold mlg:text-[16px] mlg:ps-0 mlg:hidden'>{description}</div>
                <div className='col-span-12 items-center ps-4 flex text-[16px] tracking-tight mlg:col-span-1 mlg:text-[16px] mlg:ps-0'>{brand}</div>
                <div className='col-span-12 items-center ps-4 flex text-[16px] tracking-tight mlg:col-span-2 mlg:text-[16px] mlg:ps-0'>{category}</div>
                <div className='col-span-12 items-center ps-4 flex text-[27px] font-semibold tracking-tight mlg:col-span-1 mlg:text-[16px] mlg:ps-0 mlg:font-normal'>{price/100}$</div>
                <div className='col-span-12 items-center ps-4 flex text-[16px] tracking-tight mlg:col-span-2 mlg:text-[16px] mlg:ps-0'>{formattedDate}</div>
                <div className='col-span-12 items-center ps-4 flex gap-3 text-[20px] mlg:col-span-1 mlg:text-[16px] mlg:ps-0 text-black font-semibold'>
                  <div className='flex-1 mlg:flex-none mlg:py-0 flex justify-center py-2 mlg:bg-transparent bg-slate-200 rounded-lg mlg:mt-0 mt-3'><Link to={`/product/edit/${id}`}><button><i className="fa-solid fa-pen-to-square"></i></button></Link></div>
                  <button data-modal-target="popup-modal" data-modal-toggle="popup-modal" className='flex-1 mlg:flex-none mlg:py-0 flex justify-center py-[13.5px] mlg:bg-transparent bg-red-400 rounded-lg mlg:mt-0 mt-3' type="button" onClick={modalBoxActive} ><i className="fa-solid fa-circle-xmark "></i></button>
                </div>
              </div>
              <hr />
  
          {/* -----------------------modal----------------- */}
          <div id="popup-modal" tabindex="-1" class={`${isActive? "block" : "hidden"} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-[0px] z-50 justify-center items-center w-[100%]  h-[100%]`}>
      <div class="relative p-4 w-[100%] h-[100%] flex justify-center items-center">
          <div class="relative bg-black rounded-lg shadow-[0px_0px_10px_0px_rgba(0,0,0,0.03)] ">
              <button type="button" class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center " data-modal-hide="popup-modal" onClick={()=>{setIsActive(false)}}>
                  <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                  </svg>
                  <span class="sr-only">Close modal</span>
              </button>
              <div class="p-4 py-6 md:p-5 text-center">
                  <svg class="mx-auto mb-4 text-gray-400 w-12 h-12 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                  </svg>
                  <h3 class="mb-5 text-lg font-normal text-gray-500 ">Are you sure you want to delete this product?</h3>
                  <button data-modal-hide="popup-modal" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300  font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center" onClick={deleteProduct}>
                      Yes, I'm sure
                  </button>
                  <button data-modal-hide="popup-modal" type="button" class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-grey-700 focus:z-10 focus:ring-4 focus:ring-gray-100" onClick={()=>{setIsActive(false)}}>No, cancel</button>
              </div>
          </div>
      </div>
      </div>
      </div> 
    }
    </>
  )
}

export default ProductCard
