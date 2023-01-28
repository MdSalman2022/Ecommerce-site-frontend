import React, { useState } from 'react';
import { FaAngleRight } from 'react-icons/fa';

const StoreSettings = () => {

    const [active, setActive] = useState('preferences')


    let privacy = "This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.We use Your Personal data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy."
    let refund = "Our Return and Refund Policy was last updated 28 January 2023. Thank you for shopping at somahar.shop. If for any reason, you are not completely satisfied with a purchase, we invite you to review our policy on refunds and returns."
    let terms = "These terms and conditions outline the rules and regulations for the use of somahar's Website, located at somahar.shop.By accessing this website we assume you accept these terms and conditions. Do not continue to use somahar.shop if you do not agree to take all of the terms and conditions stated on this page."


    const [policy, setPolicy] = useState(privacy)


    return (
        <div className='mt-10'>
            <div className="grid grid-cols-4 gap-5 w-[1000px] mx-auto">
                <aside className="sidebar bg-white p-5 rounded-lg">
                    <ul>
                        <li onClick={() => setActive('preferences')} className={`p-3 cursor-pointer hover:text-primary border-b-2 ${active === 'preferences' && 'text-primary font-semibold'}`}>Preferences</li>
                        <li onClick={() => setActive('staff')} className={`p-3 cursor-pointer hover:text-primary border-b-2 ${active === 'staff' && 'text-primary font-semibold'}`}>Staff accounts</li>
                        <li onClick={() => setActive('payments')} className={`p-3 cursor-pointer hover:text-primary border-b-2 ${active === 'payments' && 'text-primary font-semibold'}`}>Payments</li>
                        <li onClick={() => setActive('shipping')} className={`p-3 cursor-pointer hover:text-primary border-b-2 ${active === 'shipping' && 'text-primary font-semibold'}`}>Shipping</li>
                        <li onClick={() => setActive('tax')} className={`p-3 cursor-pointer hover:text-primary border-b-2 ${active === 'tax' && 'text-primary font-semibold'}`}>Tax</li>
                        <li onClick={() => setActive('extra')} className={`p-3 cursor-pointer hover:text-primary border-b-2 ${active === 'extra' && 'text-primary font-semibold'}`}>Extra charges</li>
                        <li onClick={() => setActive('orderfrom')} className={`p-3 cursor-pointer hover:text-primary border-b-2 ${active === 'orderfrom' && 'text-primary font-semibold'}`}>Order form</li>
                        <li onClick={() => setActive('domains')} className={`p-3 cursor-pointer hover:text-primary border-b-2 ${active === 'domains' && 'text-primary font-semibold'}`}>Domains</li>
                        <li onClick={() => setActive('support')} className={`p-3 cursor-pointer hover:text-primary border-b-2 ${active === 'support' && 'text-primary font-semibold'}`}>Support & Social</li>
                        <li onClick={() => setActive('policies')} className={`p-3 cursor-pointer hover:text-primary border-b-2 ${active === 'policies' && 'text-primary font-semibold'}`}>Policies</li>
                        <li onClick={() => setActive('language')} className={`p-3 cursor-pointer hover:text-primary ${active === 'language' && 'text-primary font-semibold'}`}>Language</li>
                    </ul>
                </aside>
                    {active === 'preferences' &&
                        <div className='col-span-3   p-3 rounded-lg flex flex-col gap-5'>
                                <div className='flex flex-col bg-white p-5 rounded-lg space-y-5'>
                                <div className="flex">
                                    <p className='font-semibold'>Orders</p>
                                </div>
                                <div className="flex justify-between">
                                    <p>Auto-accept orders</p>
                                    <p className='flex items-center'>Never <FaAngleRight/></p>
                                </div>
                                <div className="flex justify-between">
                                    <p>Show notes and activities</p>
                                    <p><input type="checkbox" className="toggle"/></p>
                                </div>
                                <div className="flex justify-between">
                                    <p>Announce new orders</p>
                                    <p><input type="checkbox" className="toggle"/></p>
                                </div>
                            </div>
                            <div className='flex flex-col bg-white p-5 rounded-lg  space-y-5'>
                                <div className='flex justify-between items-center'>
                                    <div className="flex flex-col">
                                        <p className='font-semibold'>Notifications</p>
                                        <p>Send email notifications to the customers automatically</p>
                                    </div>
                                    <p><input type="checkbox" className="toggle"/></p>
                                </div>
                                <div className="flex justify-between">
                                    <p>Send email (SMTP)</p>
                                    <p className='flex items-center'>no-reply@mydukaan.io <FaAngleRight/></p>
                                </div> 
                            </div>
                        </div>
                    }
                    {active === 'staff' &&
                        <div className='col-span-3   p-3 rounded-lg flex flex-col gap-5'>
                                <div className='flex flex-col bg-white p-5 rounded-lg space-y-5'>
                                <div className="flex">
                                    <p className='font-semibold'>Staff accounts (2 of 10)</p>
                                </div>
                                <div className="flex flex-col">
                                    <div className="flex justify-between my-5">
                                        <input type="text" className='border-2 rounded-lg p-2' placeholder='Search staff account'/>
                                        <div className="primary-btn">Add staff</div>
                                    </div>
                                    <div className="overflow-x-auto">
                                        <table className="table w-full"> 
                                            <thead>
                                                <tr> 
                                                    <th>Name</th>
                                                    <th>Role</th>
                                                    <th>Contact details</th>
                                                </tr>
                                            </thead>
                                            <tbody> 
                                                <tr> 
                                                    <td>somahar</td>
                                                    <td>Owner</td>
                                                    <td>demo@gmail.com</td>
                                                </tr> 
                                                <tr> 
                                                    <td>demo2</td>
                                                    <td>Admin</td>
                                                    <td>demo@gmail.com</td>
                                                </tr> 
                                                <tr> 
                                                    <td>demo3</td>
                                                    <td>Admin</td>
                                                    <td>demo3@gmail.com</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div> 
                                </div>
                                 
                            </div>
                             
                        </div>
                    }
                    {active === 'payments' &&
                        <div className='col-span-3   p-3 rounded-lg flex flex-col gap-5'>
                                <div className='flex flex-col p-5 rounded-lg space-y-5'>
                                <div className="flex">
                                    <p className='font-semibold'>Payments</p>
                                </div>
                                <div className="flex flex-col bg-white p-5 rounded-lg">
                                    <div className="flex justify-between my-5">
                                        <p>Cash on Delivery</p>    
                                        <input type="checkbox" className="toggle toggle-primary"/>
                                    </div>
                                </div>
                                 
                            </div>
                             
                        </div>
                    }
                    {active === 'shipping' &&
                        <div className='col-span-3   p-3 rounded-lg flex flex-col gap-5'>
                                <div className='flex flex-col p-5 rounded-lg space-y-5'>
                                <div className="flex">
                                    <p className='font-semibold'>Shipping</p>
                                </div>
                                <div className="flex flex-col bg-white p-5 rounded-lg space-y-5">
                                    <p>Delivery time</p>
                                    <p>Delivery happens within</p>
                                    <select className="select select-bordered w-full max-w-xs">
                                        <option disabled selected>3-5 days</option>
                                        <option>5 - 10 days</option>
                                        <option>10+ days</option>
                                    </select>
                                </div>
                                <div className="flex flex-col bg-white p-5 rounded-lg">
                                    <div className="flex justify-between my-5">
                                        <p>Delivery charges</p>    
                                        <input type="checkbox" className="toggle toggle-primary"/>
                                    </div>
                                </div>
                                 
                            </div>
                             
                        </div>
                    }
                    {active === 'tax' &&
                        <div className='col-span-3   p-3 rounded-lg flex flex-col gap-5'>
                                <div className='flex flex-col p-5 rounded-lg space-y-5'>
                                <div className="flex">
                                    <p className='font-semibold'>Tax</p>
                                </div> 
                                <div className="flex flex-col bg-white px-5 py-2 rounded-lg">
                                    <div className="flex justify-between my-5">
                                        <p>Sales tax</p>    
                                        <input type="checkbox" className="toggle toggle-primary"/>
                                    </div>
                                </div>
                                 
                            </div>
                             
                        </div>
                    }
                    {active === 'extra' &&
                        <div className='col-span-3   p-3 rounded-lg flex flex-col gap-5'>
                                <div className='flex flex-col p-5 rounded-lg space-y-5'>
                                <div className="flex">
                                    <p className='font-semibold'>Extra charges</p>
                                </div> 
                                <div className="flex flex-col px-5 py-2 rounded-lg">
                                   <div className="primary-btn">Create extra charges</div>
                                </div>
                                 
                            </div>
                             
                        </div>
                    }
                    {active === 'orderfrom' &&
                        <div className='col-span-3   p-3 rounded-lg flex flex-col gap-5'>
                            <div className='flex flex-col p-5 rounded-lg space-y-5'>
                                <div className="flex">
                                    <p className='font-semibold'>Order from</p>
                                </div>  
                                <div className="flex flex-col gap-5 bg-white rounded-lg p-5">
                                    <p>Guest checkout</p>
                                    <p>Customers will be able to check out as guests without verifying their email address.</p>
 
                                        <div className="flex gap-5">
                                            <div className="flex gap-2"><input type="radio" name="radio-2" className="radio radio-primary" checked />
                                                    Enabled</div>
                                             <div className="flex gap-2">
                                                    <input type="radio" name="radio-2" className="radio radio-primary"   />
                                                    Disabled
                                           </div>
                                        </div> 
                                </div>
                                <div className="flex flex-col gap-5 bg-white rounded-lg p-5">
                                    <p>Primary contact method</p>
                                    <p>All order notifications will be sent to the customer’s primary contact method.</p>
                                    <div className="flex gap-5">
                                        <div className="flex gap-2"><input type="radio" name="radio-2" className="radio radio-primary" />
                                            Email Address
                                        </div>
                                        <div className="flex gap-2">
                                            <input type="radio" name="radio-2" className="radio radio-primary"  defaultChecked={true} />
                                            Mobile number
                                        </div>
                                    </div> 
                                </div>
                                <div className="flex flex-col gap-5 bg-white rounded-lg p-5">
                                    <p>Checkout form</p> 
                                    <div className="grid grid-cols-2 gap-5">
                                        <input type="text" placeholder="Name" className="input input-bordered w-full max-w-xs" />
                                        <input type="text" placeholder="Email Address" className="input input-bordered w-full max-w-xs" />
                                        <input type="text" placeholder="Mobile Number" className="input input-bordered w-full max-w-xs" />
                                        <input type="text" placeholder="Country" className="input input-bordered w-full max-w-xs" />
                                        <input type="text" placeholder="Address" className="input input-bordered w-full max-w-xs" />
                                        <input type="text" placeholder="Zip Code" className="input input-bordered w-full max-w-xs" />
                                        <input type="text" placeholder="City" className="input input-bordered w-full max-w-xs" />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-5 bg-white rounded-lg p-5">
                                    <p>Additional information</p>  
                                    <p>Create additional fields to collect extra information from your customers.</p>  
                                    <div className="flex justify-center">
                                        <div className="primary-btn">Add field</div>
                                    </div>
                                </div>
                            </div>  
                                 
                        </div> 
                }
                 {active === 'domains' &&
                        <div className='col-span-3   p-3 rounded-lg flex flex-col gap-5'>
                                <div className='flex flex-col p-5 rounded-lg space-y-5'>
                                <div className="flex">
                                    <p className='font-semibold text-3xl'>Domains</p>
                                </div>  
                                <div className="flex flex-col bg-white p-5 rounded-lg">
                                    <p className='font-semibold '>Custom Domains</p>
                                    <div className="overflow-x-auto">
                                        <table className="table w-full"> 
                                            <thead>
                                                <tr> 
                                                    <th>Domain Name</th>
                                                    <th>Status</th>
                                                    <th>Expires on</th>
                                                    <th>Provider</th>
                                                </tr>
                                            </thead>
                                            <tbody> 
                                                <tr> 
                                                    <td>samahar.shop</td>
                                                    <td>LIVE</td>
                                                    <td>Jan 3, 2024</td>
                                                    <td>External</td>
                                                </tr> 
                                               
                                            </tbody>
                                        </table>
                                    </div>  
                                </div>  
                                 
                            </div>
                             
                        </div>
                    }
                 {active === 'support' &&
                        <div className='col-span-3   p-3 rounded-lg flex flex-col gap-5'>
                                <div className='flex flex-col p-5 rounded-lg space-y-5'>
                                <div className="flex">
                                    <p className='font-semibold text-3xl'>Support & Social</p>
                                </div>  
                                <div className="flex flex-col bg-white p-5 rounded-lg">
                                    <p className='font-semibold '>Customer support</p>
                                    <div className="form-control w-full max-w-xs">
                                        <label className="label">
                                            <span className="label-text">Email</span> 
                                        </label>
                                        <input type="text" placeholder="demo@gmail.com" className="input input-bordered w-full max-w-xs" />
                                    </div>
                                </div>  
                                <div className="flex flex-col bg-white p-5 rounded-lg">
                                    <p className='font-semibold '>Social profiles</p>
                                    <div className="grid grid-cols-2 gap-3">
                                        
                                        <div className="form-control w-full max-w-xs">
                                            <label className="label">
                                                <span className="label-text">Facebook URL</span> 
                                            </label>
                                            <input type="text" placeholder="facebook.com/username" className="input input-bordered w-full max-w-xs" />
                                        </div>
                                        <div className="form-control w-full max-w-xs">
                                            <label className="label">
                                                <span className="label-text">Twitter URL</span> 
                                            </label>
                                            <input type="text" placeholder="twitter.com/username" className="input input-bordered w-full max-w-xs" />
                                        </div>
                                        <div className="form-control w-full max-w-xs">
                                            <label className="label">
                                                <span className="label-text">Instagram URL</span> 
                                            </label>
                                            <input type="text" placeholder="instagram.com/username" className="input input-bordered w-full max-w-xs" />
                                        </div>
                                        <div className="form-control w-full max-w-xs">
                                            <label className="label">
                                                <span className="label-text">Linkedin URL</span> 
                                            </label>
                                            <input type="text" placeholder="linkedin.com/username" className="input input-bordered w-full max-w-xs" />
                                        </div>
                                        <div className="form-control w-full max-w-xs">
                                            <label className="label">
                                                <span className="label-text">Youtube URL</span> 
                                            </label>
                                            <input type="text" placeholder="youtube.com/username" className="input input-bordered w-full max-w-xs" />
                                         </div>
                                        <div className="form-control w-full max-w-xs">
                                                <label className="label">
                                                    <span className="label-text">Pinterest URL</span> 
                                                </label>
                                                <input type="text" placeholder="pinterest.com/username" className="input input-bordered w-full max-w-xs" />
                                            </div>
                                        </div>
                                </div>  
                                 
                            </div>
                             
                        </div>
                    }
                 {active === 'policies' &&
                        <div className='col-span-3   p-3 rounded-lg flex flex-col gap-5'>
                                <div className='flex flex-col p-5 rounded-lg space-y-5'>
                                    <div className="flex">
                                        <p className='font-semibold text-3xl'>Policies</p>
                                    </div>  
                                    <div className="flex gap-5">
                                        <div onClick={()=> setPolicy(privacy)} className={policy === privacy ? ' primary-btn' : 'btn btn-neutral border-none text-white hover:bg-primary'}>Privacy Policy</div>
                                        <div onClick={()=> setPolicy(refund)} className={policy === refund ? ' primary-btn' : 'btn btn-neutral border-none text-white hover:bg-primary'}>Refund Policy</div>
                                        <div onClick={()=> setPolicy(terms)} className={policy === terms ? 'primary-btn' : 'btn btn-neutral border-none text-white hover:bg-primary'}>Terms & Conditions</div>
                                    </div>
                                    <div className='flex flex-col gap-5'>
                                         {
                                            policy === privacy &&
                                            <textarea className='p-3' name="privacy" id="" cols="60" rows="12" defaultValue={privacy}></textarea>
                                          }   
                                         {
                                            policy === refund &&
                                            <textarea className='p-3' name="refund" id="" cols="60" rows="12" defaultValue={refund}></textarea>
                                          }   
                                         {
                                            policy === terms &&
                                            <textarea className='p-3' name="terms" id="" cols="60" rows="12" defaultValue={terms}></textarea>
                                          }   
                                        <div className="primary-btn">Save</div>
                                    </div>
                                 
                                </div>
                        </div>
                }
                {active === 'language' &&
                        <div className='col-span-3   p-3 rounded-lg flex flex-col gap-5'>
                                <div className='flex flex-col p-5 rounded-lg space-y-5'>
                                <div className="flex">
                                    <p className='font-semibold'>Languages</p>
                                </div>  
                                <div className="flex flex-col bg-white p-5 rounded-lg">
                                    <p>Languages</p>
                                    <p>These will be the languages in which your online store will be translated.</p>
                                    <div className='mt-5'>
                                        <ul>
                                            <li className='flex items-center gap-5 font-semibold'>1. English <p className="btn-sm bg-green-500 flex items-center text-white rounded-lg">Primary</p></li>
                                        </ul>
                                    </div>
                            </div>
                            <div className="flex justify-center">

                                    <div className="primary-btn w-60">Add More Language</div>
                            </div>
                                 
                            </div>
                             
                        </div>
                    }

            </div>
            
        </div>
    );
};

export default StoreSettings;