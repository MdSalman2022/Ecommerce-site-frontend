import React, { useContext, useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import ProductCard from '../ProductCard/ProductCard';
import { useForm } from 'react-hook-form';
import { LazyLoadImage } from 'react-lazy-load-image-component';

function Banner() {

    const navigate = useNavigate();

    let { searchText, items, setItems, setSearchText, loading } = useContext(AuthContext)

    // let buyers = allUsers?.filter(allUser => allUser?.role === 'buyer')

    // const handleSubmit = (event) => {
    //     Event.stopPropagation()

    //     setSearchText(event.target.search.value)
    //     console.log(searchText)

    //     // navigate(`/search/${searchText}`)
    // }

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {


        setSearchText(data.name);
        console.log(data.name);
        console.log(searchText);
        if (data.name === " ") {
            navigate(`/`)
        }
        else { data.name ? navigate(`/search/${data.name}`) : navigate(`/`) }

        console.log(errors);
    }


    return (
        <div className="hero bg-transparent rounded-xl lg:mx-auto ">
            <div className="container mx-auto">
            <div className="flex justify-center"> 
{/* <img src="https://i.ibb.co/9hwQrCp/Apple-Mac-Book-Pro-Late-2021-Banner2-1674277405.jpg" alt="Apple-Mac-Book-Pro-Late-2021-Banner2-1674277405" border="0"></img> */}
{/* <img src="https://i.ibb.co/ws3sfFM/banner-02-ik-B6uuu.jpg" alt="banner-02-ik-B6uuu" border="0"></img> */}

{/* img 2 <img src="https://i.ibb.co/ckFPGB8/Top-Banner-Watch-7960.jpg" alt="Top-Banner-Watch-7960" border="0"></img> */}
{/* img 3 <img src="https://i.ibb.co/Nt26xQF/Untitled-2-jpgxzvzx.jpg" alt="Untitled-2-jpgxzvzx" border="0"></img> */}
{/* <img src="https://i.ibb.co/KFTZ45h/1091-1633fafb4200888ef0cd1e55b352acf2a1166e2f.jpg" alt="1091-1633fafb4200888ef0cd1e55b352acf2a1166e2f" border="0"></img> */}
{/* <img src="https://i.ibb.co/mznppRL/1099-7119d074f0e3a7401d06e294c3f067ca7a717d7a.jpg" alt="1099-7119d074f0e3a7401d06e294c3f067ca7a717d7a" border="0"></img> */}
                    <div className="flex gap-12">
                        <div className="md:col-span-2 card w-full object-cover my-10">
                            <LazyLoadImage className='rounded-2xl object-cover border-primary ' width="1200px" height="700px" src="https://i.ibb.co/9hwQrCp/Apple-Mac-Book-Pro-Late-2021-Banner2-1674277405.jpg" alt="image" />
                        </div> 
                        <div className="md:col-span-1 my-10 space-y-12 h-full">
                                <div className="card space-y-2 lg:card-side bg-base-100">
                                    <LazyLoadImage className='rounded-2xl  object-cover border-primary border object-fill  w-96 h-72' src="https://i.ibb.co/KFTZ45h/1091-1633fafb4200888ef0cd1e55b352acf2a1166e2f.jpg" alt="image" />
                                </div>                          
                            
                                <div className="card space-y-2 lg:card-side bg-base-100">
                                    <LazyLoadImage className='rounded-2xl object-cover border-primary border object-fill  w-96 h-72' src="https://i.ibb.co/mznppRL/1099-7119d074f0e3a7401d06e294c3f067ca7a717d7a.jpg" alt="image" />
                                </div>                           
                        </div>
                    </div>
                </div>    
            </div>
           
        </div>
    )
}
export default Banner
