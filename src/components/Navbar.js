import { useMediaQuery } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react'
import './styles/Navbar.css'
import { Link, useLocation, useNavigate } from 'react-router-dom';


function Navbar({setIsOpen, isOpen, setProductList, productListCopy, getAllProducts, setCheck}) {
  const location = useLocation();
  const isLargeScreen = useMediaQuery('(min-width: 600px)');
  const navbarSmall = useMediaQuery('(max-width: 1100px)');
  const navbarExpanded = useMediaQuery('(min-width: 1100px)');
  const [expand, setExpand] = useState(false);
  let menuRef = useRef();


  // filter logic

  const getProduct = (filterProduct) => {
    const filteredData = productListCopy?.filter(product => product?.category === filterProduct);
    setProductList(filteredData);
  }

  // ---------------------------------------------------


  const expandBar = () => {
  
    setIsOpen(!isOpen);
  }

  const expandMenus = () => {
    setExpand(!expand);
  }

  useEffect(()=>{
    navbarSmall && setIsOpen(false);
    navbarExpanded && setIsOpen(true);
  },[navbarSmall , navbarExpanded])


  useEffect(()=>{
    let handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target) && !e.target.classList.contains('category')){
        setExpand(false);
      }
    }

    document.addEventListener('mousedown', handler);

    return ()=>{
      document.removeEventListener('mousedown', handler);
    }
  },[])


  const activeButton = () => {
    const navLinkAll = document.querySelectorAll('.nav-link');

      navLinkAll.forEach(navLink =>{
      navLink.addEventListener('click', ()=>{
      document.querySelector('.active')?.classList.remove('active');
      navLink.classList.add('active');
    })
  });
  }


  const activeLink = () => {
    const navLinkAll = document.querySelectorAll('.category-link');

      navLinkAll.forEach(navLink =>{
      navLink.addEventListener('click', ()=>{
      document.querySelector('.category-active')?.classList.remove('category-active');
      navLink.classList.add('category-active');
    })
  });
  }
  

  useEffect(()=>{
    
    activeButton();
    activeLink();

  },[])


  const getActiveClass = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <>
      {isLargeScreen ? (<div>
        <div className={`h-screen fixed left-0 ${isOpen ? 'w-[200px]': 'w-[110px]'} transition-width duration-300 flex justify-center items-center`}>
          <div className='m-3 ring-1 ring-slate-950/5 bg-slate-950 h-[97%] w-[100%] rounded-lg shadow-[0px_0px_10px_rgba(0,0,0,0.1)] flex flex-col items-center justify-between py-4 pt-11'>
          <div className="navigation-menus flex flex-col gap-[160px] w-[100%] items-center">
            <img src="https://i.postimg.cc/j2X4xTF5/original-e4d86665e04ec2acc6ef019b4a4563c6-1-fotor-bg-remover-202406012941-1.png" className='w-[30px] h-[30px]' alt="" />
              <div className='flex flex-col gap-3 w-[94%] items-center relative'>
                  
                  <Link to={'/dashboard'} className={`${isOpen? "py-3" : "py-6"} w-[100%] flex gap-2 items-center justify-center nav-link text-center rounded-lg cursor-pointer transition duration-300 ${getActiveClass('/dashboard')}`}><i class="fa-solid fa-chart-simple"></i> {isOpen && <div>Dashboard</div>}</Link>
                  
                  <Link to={'/'} className={`${isOpen? "py-3" : "py-6"} w-[100%] flex gap-2 items-center justify-center nav-link text-center rounded-lg cursor-pointer transition duration-300 ${getActiveClass('/')}`} onClick={()=> {setCheck(prev => !prev)}}><i class="fa-solid fa-cart-shopping"></i>{isOpen && <div>Products</div>}</Link>
                
                <Link to={'/product'} className={`${isOpen? "py-3" : "py-6"} w-[100%] flex gap-2 items-center justify-center nav-link category text-center rounded-lg cursor-pointer transition duration-300 ${getActiveClass('/product')}`} onClick={expandMenus}><i class="fa-solid fa-list"></i>{isOpen && <div>Category</div>}</Link>
                
                <div ref={menuRef} className={`absolute text-black bg-white p-2.5 px-3 ring-1 ring-slate-950/5 rounded-lg shadow-[0px_0px_100px_rgba(0,0,0,0.3)] dropdown-menu flex flex-col items-start cursor-pointer ${ isOpen ? "top-[130px] right-[-130px]" : " top-[160px] right-[-140px]"} 
                ${ expand? "opacity-100" : "opacity-0" } transition-all duration-200`} >
                  <div className='p-2 px-4 w-[100%] rounded-md category-link transition duration-300 category-active flex items-center justify-start hover:bg-[lightblue]' onClick={()=>{getAllProducts()}}>
                    <div>All products</div>
                  </div>
                  <div className='p-2 px-4 w-[100%] rounded-md category-link transition duration-300 flex items-center justify-start gap-2 hover:bg-[lightblue]'onClick={()=>{getProduct('Computers')}} >
                  <i class="fa-solid fa-desktop"></i>
                    <div>Computers</div>
                  </div>
                  <div className='p-2 px-4 w-[100%] rounded-md category-link transition duration-300 flex items-center justify-start gap-2 hover:bg-[lightblue]' onClick={()=>{getProduct('Cameras')}}>
                  <i class="fa-solid fa-camera"></i>
                    <div>Cameras</div>
                  </div>
                  <div className='p-2 px-4 w-[100%] rounded-md category-link transition duration-300 flex items-center justify-start gap-2 hover:bg-[lightblue]' onClick={()=>{getProduct('Phones')}}>
                  <i class="fa-solid fa-mobile-screen-button"></i>
                    <div>Phones</div>
                  </div>
                  <div className='p-2 px-4 w-[100%] rounded-md category-link transition duration-300 flex items-center justify-start gap-2 hover:bg-[lightblue]' onClick={()=>{getProduct('In-Ears')}}>
                  <i class="fa-solid fa-headphones"></i>
                    <div>In-Ears</div>
                  </div>
                  <div className='p-2 px-4 w-[100%] rounded-md category-link transition duration-300 flex items-center justify-start gap-2 hover:bg-[lightblue]' onClick={()=>{getProduct('Accessories')}}>
                  <i class="fa-solid fa-plus"></i>
                    <div>Accessories</div>
                  </div>
                  <div className='p-2 px-4 w-[100%] rounded-md category-link transition duration-300 flex items-center justify-start gap-2 hover:bg-[lightblue]' onClick={()=>{getProduct('Other')}}>
                  <i class="fa-solid fa-circle-minus"></i>
                    <div>Other</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="admin-details flex item-center mb-6">
              <div className="text-white flex items-center gap-3"> 
                <img src="https://i.postimg.cc/bv5VRSw3/john-doe.jpg" className='rounded-full w-[25px] h-[25px]' alt="" /> 
                {isOpen && <div className='text-[14px]'>John Doe</div>}
              </div>
            </div>

          </div>
        </div>
        <div className={`fixed ${isOpen ? 'left-[172px]': 'left-[82px]'} top-[85px] px-[11px] py-[4px] rotate-45 text-white bg-slate-950 cursor-pointer transition-left duration-300`} onClick={expandBar}>{isOpen? <i class="fa-solid fa-chevron-left -rotate-45 fa-sm"></i> : <i class="fa-solid fa-chevron-right -rotate-45 fa-sm"></i>}</div>
      </div>)
      :
      
      (
        <div>
        <div className={`w-[100%] fixed top-0 h-[120px] flex justify-center items-center z-50`}>
          <div className=' m-2 h-[85%]  w-[98%] bg-slate-950 rounded-lg shadow-[0px_0px_10px_rgba(0,0,0,0.1)] grid grid-cols-3 justify-between p-4 items-center'>
        
            <Link to={'/dashboard'} className={`w-[100%] h-[100%] justify-center items-center flex nav-link rounded-lg ${getActiveClass('/dashboard')}`}><i class="fa-solid fa-chart-simple py-2"></i></Link>
            <Link to={'/'} onClick={()=> {setCheck(prev => !prev)}} className={`w-[100%] h-[100%] justify-center items-center flex nav-link rounded-lg ${getActiveClass('/')}`}><i class="fa-solid fa-cart-shopping py-2"></i></Link>
            <Link to={'/product'} onClick={expandMenus} className={`w-[100%] h-[100%] justify-center items-center flex nav-link rounded-lg ${getActiveClass('/product')}`}><i class="fa-solid fa-list py-2"></i></Link>

            <div ref={menuRef} className={`absolute text-black bg-white p-2.5 px-3 ring-1 ring-slate-950/5 rounded-lg shadow-[0px_0px_100px_rgba(0,0,0,0.3)] dropdown-menu flex flex-col items-start cursor-pointer ${ isOpen ? "top-[130px] right-[-130px]" : " top-[100px] right-[23px]"} 
                ${ expand? "block" : "hidden" } transition-all duration-200`} >
                  <div className='p-2 px-4 w-[100%] rounded-md category-link transition duration-300 category-active flex items-center justify-start hover:bg-[lightblue]' onClick={()=>{getAllProducts()}}>
                    <div>All products</div>
                  </div>
                  <div className='p-2 px-4 w-[100%] rounded-md category-link transition duration-300 flex items-center justify-start gap-2 hover:bg-[lightblue]'onClick={()=>{getProduct('Computers')}} >
                  <i class="fa-solid fa-desktop"></i>
                    <div>Computers</div>
                  </div>
                  <div className='p-2 px-4 w-[100%] rounded-md category-link transition duration-300 flex items-center justify-start gap-2 hover:bg-[lightblue]' onClick={()=>{getProduct('Cameras')}}>
                  <i class="fa-solid fa-camera"></i>
                    <div>Cameras</div>
                  </div>
                  <div className='p-2 px-4 w-[100%] rounded-md category-link transition duration-300 flex items-center justify-start gap-2 hover:bg-[lightblue]' onClick={()=>{getProduct('Phones')}}>
                  <i class="fa-solid fa-mobile-screen-button"></i>
                    <div>Phones</div>
                  </div>
                  <div className='p-2 px-4 w-[100%] rounded-md category-link transition duration-300 flex items-center justify-start gap-2 hover:bg-[lightblue]' onClick={()=>{getProduct('In-Ears')}}>
                  <i class="fa-solid fa-headphones"></i>
                    <div>In-Ears</div>
                  </div>
                  <div className='p-2 px-4 w-[100%] rounded-md category-link transition duration-300 flex items-center justify-start gap-2 hover:bg-[lightblue]' onClick={()=>{getProduct('Accessories')}}>
                  <i class="fa-solid fa-plus"></i>
                    <div>Accessories</div>
                  </div>
                  <div className='p-2 px-4 w-[100%] rounded-md category-link transition duration-300 flex items-center justify-start gap-2 hover:bg-[lightblue]' onClick={()=>{getProduct('Other')}}>
                  <i class="fa-solid fa-circle-minus"></i>
                    <div>Other</div>
                  </div>
                </div>
          </div>
        </div>
      </div>
      )}
    </>
  )
}

export default Navbar
