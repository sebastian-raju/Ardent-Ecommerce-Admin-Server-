import React, { useEffect, useState } from 'react'
import { useMediaQuery } from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { editProductApi, getSingleProductApi } from '../services/serviceApis';
import { BASE_URL } from '../services/baseUrl';

function ProductEdit({setIsOpen, isOpen}) {
  const isLargeScreen = useMediaQuery('(min-width: 600px)');
  const [initialProduct, setInitialProduct] = useState([]);
  const [validationErrors, setValidationErrors] = useState({})
  const [displayImg, setDisplayImg] = useState(null);
  const navigate = useNavigate();
  const params = useParams();
  console.log(params);


  const handleChange = (e) => {
    const file = e.target.files[0];
    if(file){
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setDisplayImg(reader.result);
      }
    }
  }


  const getSingleProduct = async() => {
    const response = await getSingleProductApi(params.id);

    if(response.status>=200 || response.status<300){
      setInitialProduct(response?.data);
    }

  }


  useEffect(()=>{
    getSingleProduct();
    window.scrollTo(0,0)
  },[])


  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const product = Object.fromEntries(formData.entries());

    // Ensure all fields are included in the formData
  // const fields = ['name', 'description', 'brand', 'category', 'price', 'image'];
  // fields.forEach(field => {
  //   if (!product[field]) {
  //     formData.append(field, initialProduct[field] || '');
  //   }
  // });


  // const updatedProduct = Object.fromEntries(formData.entries());

    const {name, description, brand, category, price, image} = product;

    // if(!name || !description || !brand || !category || !price || !image.name){
    //   return alert('please fill all the fields');
    // }



    if (!name || !description || !brand || !category || !price || !image) {
      return alert('Please fill all the fields');
    }
  

    try{

      const response = await editProductApi(params.id, formData);
      console.log(response.status);

      console.log('response:',response)

      if(response.status >= 200 || response.status < 300){
        // product created successfully
        navigate('/');
      }

    }catch (error) {
      console.log(error);
      if (error.response && error.response.status === 400) {
        setValidationErrors(error.response.data);
      } else {
        alert('Unable to create the product');
      }
      console.error('Error:', error);
    }
  }



  console.log(initialProduct)


  return (
    <>
     {isLargeScreen? (<div className={`${isOpen? "ms-[230px] mb-[20px]" : "ms-[130px] mb-[20px]"} pe-[30px] pt-[30px] transition-margin duration-500`}>
      <div className="breadcrumbs-container flex items-center space-x-4">
        <div className='text-[14px] text-gray-600 font-semibold'><i class="fa-solid fa-earth-asia fa-sm"></i></div>
        <div className='text-[14px] text-gray-600 font-semibold'>/</div>
        <div className='text-[14px] text-gray-600 font-semibold tracking-tight '>Products</div>
        <div className='text-[14px] text-gray-600 font-semibold'>/</div>
        <div className='font-semibold text-[14px] tracking-tight'>Edit</div>
      </div>

      <div className="add-product-title mt-6 text-[30px] tracking-tight font-[600]">Edit Product</div>

      <div className="add-product-subtitle mt-[1px] text-gray-500 text-[14px] tracking-tight font-semibold">Edit your products</div>

      <form className="grid grid-cols-1 gap-4 mt-6 mlg:grid-cols-2 mlg:gap-6" onSubmit={(e)=>{handleSubmit(e)}}>

        {/* first grid */}
        <div className="first-grid flex flex-col gap-4">
          <div className='basic-info bg-white rounded-lg p-6 ring-1 ring-slate-950/5 shadow-md'>
            <div className="title-basic-info text-[17px] font-semibold tracking-tight">Basic Information</div>
            <div className='inp-container mt-3 ring-1 ring-gray-100 rounded-lg p-3'>
              <div className="inp-container-name text-[14px] font-semibold text-gray-500 tracking-tight">Product name</div>
              <input type="text" className='mt-2 ring-1 ring-gray-200 rounded-md w-[100%] p-2 outline-none placeholder:text-[13px] placeholder:tracking-tight' placeholder='eg: Canon EOS 3000D DSLR' name='name' defaultValue={initialProduct?.name} />
              <span className='text-[11px] text-red-600'>{validationErrors.name}</span>

              <div className="inp-container-desc text-[14px] font-semibold text-gray-500 tracking-tight mt-4">Product description</div>
              <input type="text" className='mt-2 ring-1 ring-gray-200 rounded-md w-[100%] px-3 py-2 h-[60px] outline-none placeholder:text-[13px] placeholder:tracking-tight' name='description' placeholder='eg: Canon EOS 3000D DSLR Camera 1 Body, 18 - 55 mm Lens ' defaultValue={initialProduct?.description} />
              <span className='text-[11px] text-red-600'>{validationErrors.description}</span>
              </div>
          </div>

          <div className='Brand bg-white rounded-lg p-6 ring-1 ring-slate-950/5 shadow-md'>
            <div className="title-basic-info text-[17px] font-semibold tracking-tight">Brand</div>
            <div className='inp-container mt-3 ring-1 ring-gray-100 rounded-lg p-3'>
              <div className="inp-container-name text-[14px] font-semibold text-gray-500 tracking-tight">Brand name</div>
              <input type="text" className='mt-2 ring-1 ring-gray-200 rounded-md w-[100%] p-2 outline-none placeholder:text-[13px] placeholder:tracking-tight' placeholder='eg: Canon' name='brand' defaultValue={initialProduct?.brand}/>
              <span className='text-[11px] text-red-600'>{validationErrors.brand}</span>
              </div>
          </div>  

          <div className='Category bg-white rounded-lg p-6 ring-1 ring-slate-950/5 shadow-md'>
            <div className="title-basic-info text-[17px] font-semibold tracking-tight">Category</div>
            <div className='inp-container mt-3 ring-1 ring-gray-100 rounded-lg p-3'>
                <div class="w-[100%]  flex flex-col gap-2">
                  <label for="countries" class="inp-container-name text-[14px] font-semibold text-gray-500 tracking-tight ">Category name</label>
                  <select id="countries" name='category' class=" outline-none bg-white ring-1 ring-gray-200 text-gray-500 text-[13px] rounded-md  w-[100%] p-2.5" value={initialProduct?.category || ''}
                  onChange={(e) => setInitialProduct({ ...initialProduct, category: e.target.value })}
                  >
                    <option selected className='text-[13px]'>Choose a category</option>
                    <option value="Computers">Computers</option>
                    <option value="Cameras">Cameras</option>
                    <option value="Phones">Phones</option>
                    <option value="In-Ears">In-Ears</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Other">Other</option>
                  </select>
                  <span className='text-[11px] text-red-600'>{validationErrors.category}</span>
                </div>
              </div>
          </div> 
        </div>

        {/* second grid */}

        <div className="second-grid rounded-lg flex flex-col gap-4">
        <div className='Product Image bg-white rounded-lg p-6 ring-1 ring-slate-950/5 shadow-md'>
            <div className="title-basic-info text-[17px] font-semibold tracking-tight">Product Image</div>
            <img className='w-[100%] mt-3 h-[250px] object-contain object-center mb-3 rounded-md flex justify-center' src={displayImg ?displayImg:`${BASE_URL}/images/${initialProduct?.imageFilename}`} alt="" />
            <label class="block mb-3 text-sm font-medium text-gray-900" for="file_input">Upload file</label>
            <input class="block w-full text-[13px] text-gray-500 border p-1 border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none " id="file_input" name='image' type="file"onChange={(e)=>{handleChange(e)}} ></input>
            <span className='text-[11px] text-red-600'>{validationErrors.image}</span>
          </div>  

          <div className='Pricing bg-white rounded-lg p-6 ring-1 ring-slate-950/5 shadow-md flex-1'>
            <div className="title-basic-info text-[17px] font-semibold tracking-tight">Pricing</div>
            <div className='inp-container mt-3 ring-1 ring-gray-100 rounded-lg p-3'>
              <div className="inp-container-name text-[14px] font-semibold text-gray-500 tracking-tight">Pricing</div>
              <input type="number" name='price' min="0" className='mt-2 ring-1 ring-gray-200 rounded-md w-[100%] p-2 outline-none placeholder:text-[13px] placeholder:tracking-tight' placeholder='Enter an amount in $' step="0.01" defaultValue={initialProduct?.price}/>
              <span className='text-[11px] text-red-600 '>{validationErrors.price}</span>
              </div>
          </div> 

          <div className="button-container grid grid-cols-1 gap-3 mlg:grid-cols-2">
        <button type='submit' className='py-[0.74rem] bg-pink-900 text-white font-semibold tracking-tight rounded-lg shadow-md'>Submit</button>
        <Link to={'/'} className='bg-gray-200 py-[0.74rem] text-black font-semibold tracking-tight rounded-lg shadow-md'><button className='w-[100%]'>Cancel</button></Link>
      </div>
        </div>
      </form>
    </div>) 
    : 
    (<div className='mt-[140px] transition-margin duration-500 px-8 mb-[20px]'>
      <div className="breadcrumbs-container flex items-center space-x-4">
        <div className='text-[14px] text-gray-600 font-semibold'><i class="fa-solid fa-earth-asia fa-sm"></i></div>
        <div className='text-[14px] text-gray-600 font-semibold'>/</div>
        <div className='text-[14px] text-gray-600 font-semibold tracking-tight '>Products</div>
        <div className='text-[14px] text-gray-600 font-semibold'>/</div>
        <div className='font-semibold text-[14px] tracking-tight'>Edit</div>
      </div>

      <div className="add-product-title mt-6 text-[30px] tracking-tight font-[600]">Edit Product</div>

      <div className="add-product-subtitle mt-[1px] text-gray-500 text-[14px] tracking-tight font-semibold">Edit your products</div>

      <form className="grid grid-cols-1 gap-4 mt-6 mlg:grid-cols-2 mlg:gap-6" onSubmit={(e)=>{handleSubmit(e)}}>

        {/* first grid */}
        <div className="first-grid flex flex-col gap-4">
          <div className='basic-info bg-white rounded-lg p-6 ring-1 ring-slate-950/5 shadow-md'>
            <div className="title-basic-info text-[17px] font-semibold tracking-tight">Basic Information</div>
            <div className='inp-container mt-3 ring-1 ring-gray-100 rounded-lg p-3'>
              <div className="inp-container-name text-[14px] font-semibold text-gray-500 tracking-tight">Product name</div>
              <input type="text" className='mt-2 ring-1 ring-gray-200 rounded-md w-[100%] p-2 outline-none placeholder:text-[13px] placeholder:tracking-tight' placeholder='eg: Canon EOS 3000D DSLR' name='name' defaultValue={initialProduct?.name} />
              <span className='text-[11px] text-red-600'>{validationErrors.name}</span>

              <div className="inp-container-desc text-[14px] font-semibold text-gray-500 tracking-tight mt-4">Product description</div>
              <input type="text" className='mt-2 ring-1 ring-gray-200 rounded-md w-[100%] px-3 py-2 h-[60px] outline-none placeholder:text-[13px] placeholder:tracking-tight' name='description' placeholder='eg: Canon EOS 3000D DSLR Camera 1 Body, 18 - 55 mm Lens ' defaultValue={initialProduct?.description} />
              <span className='text-[11px] text-red-600'>{validationErrors.description}</span>
              </div>
          </div>

          <div className='Brand bg-white rounded-lg p-6 ring-1 ring-slate-950/5 shadow-md'>
            <div className="title-basic-info text-[17px] font-semibold tracking-tight">Brand</div>
            <div className='inp-container mt-3 ring-1 ring-gray-100 rounded-lg p-3'>
              <div className="inp-container-name text-[14px] font-semibold text-gray-500 tracking-tight">Brand name</div>
              <input type="text" className='mt-2 ring-1 ring-gray-200 rounded-md w-[100%] p-2 outline-none placeholder:text-[13px] placeholder:tracking-tight' placeholder='eg: Canon' name='brand' defaultValue={initialProduct?.brand}/>
              <span className='text-[11px] text-red-600'>{validationErrors.brand}</span>
              </div>
          </div>  

          <div className='Category bg-white rounded-lg p-6 ring-1 ring-slate-950/5 shadow-md'>
            <div className="title-basic-info text-[17px] font-semibold tracking-tight">Category</div>
            <div className='inp-container mt-3 ring-1 ring-gray-100 rounded-lg p-3'>
                <div class="w-[100%]  flex flex-col gap-2">
                  <label for="countries" class="inp-container-name text-[14px] font-semibold text-gray-500 tracking-tight ">Category name</label>
                  <select id="countries" name='category' class=" outline-none bg-white ring-1 ring-gray-200 text-gray-500 text-[13px] rounded-md  w-[100%] p-2.5" value={initialProduct?.category || ''}
                  onChange={(e) => setInitialProduct({ ...initialProduct, category: e.target.value })}
                  >
                    <option selected className='text-[13px]'>Choose a category</option>
                    <option value="Computers">Computers</option>
                    <option value="Cameras">Cameras</option>
                    <option value="Phones">Phones</option>
                    <option value="In-Ears">In-Ears</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Other">Other</option>
                  </select>
                  <span className='text-[11px] text-red-600'>{validationErrors.category}</span>
                </div>
              </div>
          </div> 
        </div>

        {/* second grid */}

        <div className="second-grid rounded-lg flex flex-col gap-4">
        <div className='Product Image bg-white rounded-lg p-6 ring-1 ring-slate-950/5 shadow-md'>
            <div className="title-basic-info text-[17px] font-semibold tracking-tight">Product Image</div>
            <img className='w-[100%] mt-3 h-[250px] object-contain object-center mb-3 rounded-md flex justify-center' src={displayImg ?displayImg:`${BASE_URL}/images/${initialProduct?.imageFilename}`} alt="" />
            <label class="block mb-3 text-sm font-medium text-gray-900" for="file_input">Upload file</label>
            <input class="block w-full text-[13px] text-gray-500 border p-1 border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none " id="file_input" name='image' type="file"onChange={(e)=>{handleChange(e)}} ></input>
            <span className='text-[11px] text-red-600'>{validationErrors.image}</span>
          </div>  

          <div className='Pricing bg-white rounded-lg p-6 ring-1 ring-slate-950/5 shadow-md flex-1'>
            <div className="title-basic-info text-[17px] font-semibold tracking-tight">Pricing</div>
            <div className='inp-container mt-3 ring-1 ring-gray-100 rounded-lg p-3'>
              <div className="inp-container-name text-[14px] font-semibold text-gray-500 tracking-tight">Pricing</div>
              <input type="number" name='price' min="0" className='mt-2 ring-1 ring-gray-200 rounded-md w-[100%] p-2 outline-none placeholder:text-[13px] placeholder:tracking-tight' placeholder='Enter an amount in $' step="0.01" defaultValue={initialProduct?.price}/>
              <span className='text-[11px] text-red-600 '>{validationErrors.price}</span>
              </div>
          </div> 

          <div className="button-container grid grid-cols-1 gap-3 mlg:grid-cols-2">
        <button type='submit' className='py-[0.74rem] bg-pink-900 text-white font-semibold tracking-tight rounded-lg shadow-md'>Submit</button>
        <Link to={'/'} className='bg-gray-200 py-[0.74rem] text-black font-semibold tracking-tight rounded-lg shadow-md'><button className='w-[100%]'>Cancel</button></Link>
      </div>
        </div>
      </form>
    </div>)}
    </>
  )
}

export default ProductEdit



// defaultValue={initialProduct?.imageFilename}
