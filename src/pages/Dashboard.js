import React, { useEffect, useState } from 'react'
import { useMediaQuery } from '@mui/material';
import './Dashboard.css'
import { Line, Circle } from 'rc-progress';
import { getAllProductsApi } from '../services/serviceApis';

function Dashboard({isOpen}) {
  const isLargeScreen = useMediaQuery('(min-width: 600px)');

  const [products, setProducts] = useState([]);


  const getProducts = async() => {
    const {data} = await getAllProductsApi();
    setProducts(data);
  }


  useEffect(()=>{
    getProducts();
  },[])


  const phones = Math.round((products?.filter(obj => obj.category === 'Phones').length/products?.length)*100)
  const cameras = Math.round((products?.filter(obj => obj.category === 'Cameras').length/products?.length)*100)
  const computers = Math.round((products?.filter(obj => obj.category === 'Computers').length/products?.length)*100)
  const accessories = Math.round((products?.filter(obj => obj.category === 'Accessories').length/products?.length)*100)
  const inEars = Math.round((products?.filter(obj => obj.category === 'In-Ears').length/products?.length)*100)
  const other = Math.round((products?.filter(obj => obj.category === 'Other').length/products?.length)*100);


  const phoneStock = products.filter(obj => obj.category === 'Phones').length;
  const cameraStock = products.filter(obj => obj.category === 'Cameras').length;
  const computerStock = products.filter(obj => obj.category === 'Computers').length;
  const accessoryStock = products.filter(obj => obj.category === 'Accessories').length;
  const inearStock = products.filter(obj => obj.category === 'In-Ears').length;
  const otherStock = products.filter(obj => obj.category === 'Other').length;
  
  
  

  return (
    <>
      {
        isLargeScreen? 
        <div className={`${isOpen? "ms-[220px] mb-[30px]" : "ms-[125px] mb-[30px]"} pt-[0px] pe-[20px] transition-margin duration-300`}>
          <div className="header-container w-[100%] py-7 pe-3">
            <div className="header gap-5">
              <div className="welcome py-5 px-5 ring-1 ring-slate-950/5 shadow-md bg-white rounded-[30px] flex justify-between">
                <div className="admin-details flex items-center gap-3 cursor-pointer">
                  <img src="https://i.postimg.cc/bv5VRSw3/john-doe.jpg" alt="" className='rounded-full w-[55px] h-[55px]'  />
                  <div className="admin-name-container cursor-pointer">
                    <div className="text-[16px] leading-6 tracking-tight font-semibold">John Doe</div>
                    <div className='text-[12px] leading-1'>System Admin</div>
                    <div className="text-[11px]">Ecommerce-product-management</div>
                  </div>
                </div>

                <div className="options-container flex items-center gap-7 pe-4 relative">
                <i class="fa-regular fa-bell fa-lg cursor-pointer"></i>
                <div className='absolute top-3 left-2 bg-red-400 text-white w-[18px] h-[18px] rounded-full p-2 flex justify-center items-center text-[11px] cursor-pointer'>3</div>

                <i class="fa-solid fa-sliders fa-lg cursor-pointer"></i>
                </div>
              </div>
            </div>
          </div>

          <div className="text-[27px] mt-3 mlg:mt-[95px] font-semibold tracking-tight mb-5 flex items-center gap-3"><div>Analytics Overview</div> <i className="fa-solid fa-bars-progress text-[25px] mt-2"></i></div>

          <div className="grid grid-cols-1 mlg:grid-cols-3 gap-6 ">
            <div class="card phones p-6 relative">
              <div className="category-percentage text-[50px] leading-[50px] tracking-tight">
                {phones}%
              </div>
              <div className="category-name text-[20px] flex flex-col tracking-tight">

                Phones <div className='text-[13px]'>{phoneStock === 0 ? `out of stock (${phoneStock})`: `in stock (${phoneStock})`}</div>
                <i class="fa-solid fa-mobile-screen-button absolute top-[45px] right-[47px]"></i>
              </div>
              <Circle percent={phones} strokeWidth={10} strokeColor="rgb(255,255,255)" className='absolute w-[70px] h-[70px] top-[20px] right-[20px]'/>
            </div>

            <div class="card cameras p-6 relative tracking-tight">
            <div className="category-percentage text-[50px] leading-[50px] ">
                {cameras}%
              </div>
              <div className="category-name text-[20px] flex flex-col">
                Cameras <div className='text-[13px]'>{cameraStock === 0 ? `out of stock (${cameraStock})`: `in stock (${cameraStock})`}</div>
                <i class="fa-solid fa-camera absolute top-[45px] right-[45px]"></i>
              </div>
              <Circle percent={cameras} strokeWidth={10} strokeColor="rgb(255,255,255)" className='absolute w-[70px] h-[70px] top-[20px] right-[20px]'/>
            </div>

            <div class="card in-ear p-6 relative tracking-tight">
            <div className="category-percentage text-[50px] leading-[50px]">
                {inEars}%
              </div>
              <div className="category-name text-[20px] flex flex-col">
                In-Ear <div className='text-[13px]'>{inearStock === 0 ? `out of stock (${inearStock})`: `in stock (${inearStock})`}</div>
                <i class="fa-solid fa-headphones absolute top-[45px] right-[45px]"></i>
              </div>
             <Circle percent={inEars} strokeWidth={10} strokeColor="rgb(255,255,255)" className='absolute w-[70px] h-[70px] top-[20px] right-[20px]'/>
            </div>

            <div class="card accessories p-6 relative tracking-tight">
            <div className="category-percentage text-[50px] leading-[50px]">
                {accessories}%
              </div>
              <div className="category-name text-[20px] flex flex-col">
                Accessories <div className='text-[13px]'>{accessoryStock === 0 ? `out of stock (${accessoryStock})`: `in stock (${accessoryStock})`}</div>
                <i class="fa-solid fa-plus absolute top-[45px] right-[47px]"></i>
              </div>
             <Circle percent={accessories} strokeWidth={10} strokeColor="rgb(255,255,255)" className='absolute w-[70px] h-[70px] top-[20px] right-[20px]'/>
            </div>

            <div class="card computer p-6 relative tracking-tight">
            <div className="category-percentage text-[50px] leading-[50px]">
                {computers}%
              </div>
              <div className="category-name text-[20px] flex flex-col">
                Computer <div className='text-[13px]'>{computerStock === 0 ? `out of stock (${computerStock})`: `in stock (${computerStock})`}</div>
                 <i class="fa-solid fa-desktop absolute top-[45px] right-[45px]"></i>
              </div>
             <Circle percent={computers} strokeWidth={10} strokeColor="rgb(255,255,255)" className='absolute w-[70px] h-[70px] top-[20px] right-[20px]'/>
            </div>

            <div class="card other p-6 relative tracking-tight">
            <div className="category-percentage text-[50px] leading-[50px]">
                {other}%
              </div>
              <div className="category-name text-[20px] flex flex-col">
                Other <div className='text-[13px]'>{otherStock === 0 ? `out of stock (${otherStock})`: `in stock (${otherStock})`}</div>
              <i class="fa-solid fa-circle-minus absolute top-[45px] right-[45px]"></i>
              </div>
             <Circle percent={other} strokeWidth={10} strokeColor="rgb(255,255,255)" className='absolute w-[70px] h-[70px] top-[20px] right-[20px]'/>
            </div>
          
    
          </div>
        </div>

        :
        
        <div className='mt-[120px] transition-margin duration-500 px-8 mb-10'>
          <div className="header-container w-[100%] py-7 pe-3">
            <div className="header gap-5">
              <div className="welcome py-5 px-5 ring-1 ring-slate-950/5 shadow-md bg-white rounded-[30px] flex justify-between gap-1">
                <div className="admin-details flex items-center gap-3 cursor-pointer">
                  <img src="https://i.postimg.cc/bv5VRSw3/john-doe.jpg" alt="" className='rounded-full w-[55px] h-[55px]'  />
                  <div className="admin-name-container cursor-pointer">
                    <div className="text-[13px] leading-1 tracking-tight font-semibold">John Doe</div>
                    <div className='text-[11px] leading-1'>System Admin</div>
                    <div className="text-[10px] hidden md:block">Ecommerce-product-management</div>
                  </div>
                </div>

                <div className="options-container flex items-center gap-7 pe-4 relative">
                <i class="fa-regular fa-bell fa-lg cursor-pointer"></i>
                <div className='absolute top-3 left-2 bg-red-400 text-white w-[18px] h-[18px] rounded-full p-2 flex justify-center items-center text-[11px] cursor-pointer'>3</div>

                <i class="fa-solid fa-sliders fa-lg cursor-pointer"></i>
                </div>
              </div>
            </div>
          </div>

          <div className="text-[22px] mt-3 mlg:mt-[95px] font-semibold tracking-tight mb-5 flex items-center gap-3"><div>Analytics Overview</div> <i className="fa-solid fa-bars-progress text-[20px] mt-2"></i></div>

          <div className="grid grid-cols-1 mlg:grid-cols-3 gap-6 z-0">
            <div class="card phones p-6 relative">
              <div className="category-percentage text-[50px] leading-[50px] tracking-tight">
                {phones}%
              </div>
              <div className="category-name text-[20px] flex flex-col tracking-tight">

                Phones <div className='text-[13px]'>{phoneStock === 0 ? `out of stock (${phoneStock})`: `in stock (${phoneStock})`}</div>
                <i class="fa-solid fa-mobile-screen-button absolute top-[45px] right-[47px]"></i>
              </div>
              <Circle percent={phones} strokeWidth={10} strokeColor="rgb(255,255,255)" className='absolute w-[70px] h-[70px] top-[20px] right-[20px]'/>
            </div>

            <div class="card cameras p-6 relative tracking-tight">
            <div className="category-percentage text-[50px] leading-[50px] ">
                {cameras}%
              </div>
              <div className="category-name text-[20px] flex flex-col">
                Cameras <div className='text-[13px]'>{cameraStock === 0 ? `out of stock (${cameraStock})`: `in stock (${cameraStock})`}</div>
                <i class="fa-solid fa-camera absolute top-[45px] right-[45px]"></i>
              </div>
              <Circle percent={cameras} strokeWidth={10} strokeColor="rgb(255,255,255)" className='absolute w-[70px] h-[70px] top-[20px] right-[20px]'/>
            </div>

            <div class="card in-ear p-6 relative tracking-tight">
            <div className="category-percentage text-[50px] leading-[50px]">
                {inEars}%
              </div>
              <div className="category-name text-[20px] flex flex-col">
                In-Ear <div className='text-[13px]'>{inearStock === 0 ? `out of stock (${inearStock})`: `in stock (${inearStock})`}</div>
                <i class="fa-solid fa-headphones absolute top-[45px] right-[45px]"></i>
              </div>
             <Circle percent={inEars} strokeWidth={10} strokeColor="rgb(255,255,255)" className='absolute w-[70px] h-[70px] top-[20px] right-[20px]'/>
            </div>

            <div class="card accessories p-6 relative tracking-tight">
            <div className="category-percentage text-[50px] leading-[50px]">
                {accessories}%
              </div>
              <div className="category-name text-[20px] flex flex-col">
                Accessories <div className='text-[13px]'>{accessoryStock === 0 ? `out of stock (${accessoryStock})`: `in stock (${accessoryStock})`}</div>
                <i class="fa-solid fa-plus absolute top-[45px] right-[47px]"></i>
              </div>
             <Circle percent={accessories} strokeWidth={10} strokeColor="rgb(255,255,255)" className='absolute w-[70px] h-[70px] top-[20px] right-[20px]'/>
            </div>

            <div class="card computer p-6 relative tracking-tight">
            <div className="category-percentage text-[50px] leading-[50px]">
                {computers}%
              </div>
              <div className="category-name text-[20px] flex flex-col">
                Computer <div className='text-[13px]'>{computerStock === 0 ? `out of stock (${computerStock})`: `in stock (${computerStock})`}</div>
                 <i class="fa-solid fa-desktop absolute top-[45px] right-[45px]"></i>
              </div>
             <Circle percent={computers} strokeWidth={10} strokeColor="rgb(255,255,255)" className='absolute w-[70px] h-[70px] top-[20px] right-[20px]'/>
            </div>

            <div class="card other p-6 relative tracking-tight">
            <div className="category-percentage text-[50px] leading-[50px]">
                {other}%
              </div>
              <div className="category-name text-[20px] flex flex-col">
                Other <div className='text-[13px]'>{otherStock === 0 ? `out of stock (${otherStock})`: `in stock (${otherStock})`}</div>
              <i class="fa-solid fa-circle-minus absolute top-[45px] right-[45px]"></i>
              </div>
             <Circle percent={other} strokeWidth={10} strokeColor="rgb(255,255,255)" className='absolute w-[70px] h-[70px] top-[20px] right-[20px]'/>
            </div>
          
    
          </div>
        </div>
      }
      
    </>
  )
}

export default Dashboard
