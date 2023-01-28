import React, { useState } from "react";
import { HexColorPicker } from "react-colorful";


const Appearance = () => {
  const [active, setActive] = useState("header");
  const [PrimaryColor, setPrimaryColor] = useState("");
  const [SecondaryColor, setSecondaryColor] = useState("");

  const [PrimaryColorHover, setPrimaryColorHover] = useState(false);
  const [SecondaryColorHover, setSecondaryColorHover] = useState(false);

  console.log(PrimaryColor, SecondaryColor);
  console.log(PrimaryColorHover, SecondaryColorHover);
 


  return (
    <div>
      <div className="container mx-auto">
        <div className="mt-5 grid grid-cols-4 gap-5">
          <div className="col-span-1">
            <div className="h-72 rounded-xl bg-white pb-5">
              <p className="p-3 py-5 font-semibold">Leo</p>
              <ul className="space-y-2">
                <li
                  onClick={() => setActive("header")}
                  className={`p-2  ${
                    active === "header"
                      ? "border-r-4 border-primary bg-gradient-to-l from-blue-50 font-semibold text-primary transition-all duration-300"
                      : "text-neutral"
                  } `}
                >
                  Header
                </li>
                <li
                  onClick={() => setActive("colors")}
                  className={`p-2  ${
                    active === "colors"
                      ? "border-r-4 border-primary bg-gradient-to-l from-blue-50 font-semibold text-primary transition-all duration-300"
                      : "text-neutral"
                  } `}
                >
                  Fonts & Colors
                </li>
                <li
                  onClick={() => setActive("favicon")}
                  className={`p-2  ${
                    active === "favicon"
                      ? "border-r-4 border-primary bg-gradient-to-l from-blue-50 font-semibold text-primary transition-all duration-300"
                      : "text-neutral"
                  } `}
                >
                  Favicon
                </li>
                <li
                  onClick={() => setActive("advance")}
                  className={`p-2  ${
                    active === "advance"
                      ? "border-r-4 border-primary bg-gradient-to-l from-blue-50 font-semibold text-primary transition-all duration-300"
                      : "text-neutral"
                  } `}
                >
                  Advance
                </li>
              </ul>
            </div>
          </div>
          {
            active === "header" &&
            <div className="col-span-3 flex flex-col gap-5">
            <div className="flex h-52 w-full flex-col justify-center gap-10 rounded-lg bg-white p-5">
              <p className="font-semibold">Store logo</p>
              <div className="flex items-center gap-10">
                <div className="avatar">
                  <div className="w-24 rounded-lg">
                    <img src="https://placeimg.com/192/192/people" />
                  </div>
                </div>

                <div className="btn border-none bg-[#ccc] text-black">
                  Update Image
                </div>
              </div>
            </div>
            <div className="flex justify-between rounded-lg bg-white p-5">
              <div className="flex flex-col">
                <p className="font-semibold">Show store name</p>
                <p>
                  Show store name alongside the store logo in the navigation bar
                </p>
              </div>
              <input type="checkbox" className="toggle" />
            </div>
            <div className="flex justify-between rounded-lg bg-white p-5">
              <div className="flex flex-col">
                <p className="font-semibold">Show Images</p>
                <p>
                  Upload photos of your business, products, or offerings for
                  customers to see (upto 10).
                </p>
              </div>
              <input type="checkbox" className="toggle" />
            </div>

            <div className="flex flex-col rounded-lg bg-white p-5">
              <div className="flex flex-col">
                <p className="font-semibold">Promo Banners</p>
                <p>
                  Display catchy promo banners and draw attention to your
                  business.
                </p>
              </div>
              <div className="flex items-center gap-10">
                <div className="flex h-44 flex-col items-center justify-center border bg-white p-5">
                  <h5 className="font-semibold">
                    Choose from template gallery
                  </h5>
                  <p>Hundreds of customizable banners</p>
                </div>

                <div className="flex h-56 flex-col items-center justify-center bg-white">
                  <input
                    type="file"
                    className="file-input-bordered file-input w-full max-w-xs"
                  />
                </div>
              </div>
            </div>
          </div>
          }

          {
            active === "colors" &&
            <div className="col-span-3 flex flex-col gap-5 bg-white p-5"> 
              <p className="text-lg">Colors</p>
              <p>Set your main colors according to your branding.</p>

                {/* <div className="flex justify-start gap-5">
                  
                  <div>
                    <div className="flex w-72 justify-between items-center gap-5 mb-5 group">
                      <p>Primary Color: </p>
                      <div onClick={()=>setPrimaryColorHover(!PrimaryColorHover)} className="color w-32 flex gap-1 border h-10 justify-center items-center group-hover:bg-accent">
                        <p>{PrimaryColor}</p>
                        <div className={`bg-[${PrimaryColor}]  w-5 h-5 border p-1`} ></div>
                      </div>
                    </div>  
                    <div className="flex w-72 justify-between items-center gap-5 group">
                      <p>Secondary Color: </p>
                      <div onClick={()=>setSecondaryColorHover(!SecondaryColorHover)} className="color w-32 flex gap-1 border h-10 justify-center items-center group-hover:bg-accent">
                        <p>{SecondaryColor}</p>
                        <div className={`bg-[${SecondaryColor}] w-5 h-5 border p-1`}></div>
                      </div>
                    </div>  
                  </div>
                  <div className={PrimaryColorHover === true || SecondaryColorHover === true ? 'flex' : 'hidden'} >
                    
                    {
                      PrimaryColorHover === true && 
                        <HexColorPicker color={PrimaryColor} onChange={setPrimaryColor} />
                    }
                    {
                      SecondaryColorHover === true && 
                      <HexColorPicker color={SecondaryColor} onChange={setSecondaryColor} />
                    }
                  </div>
 

                </div> */}
                
                <p>Color Palatte Presets</p>
                <div className="grid grid-cols-6">
                  <div className="flex items-center gap-5">
                    <input type="radio" name="radio-2" className="radio radio-primary" defaultChecked={true} /> 
                    <div className="flex gap-2 border p-2 rounded-lg">
                    <div className={`bg-primary  w-8 h-8 border p-1`} ></div>
                    <div className={`bg-accent  w-8 h-8 border p-1`} ></div>
                    </div>
                  </div>
                  <div className="flex items-center gap-5">
                    <input type="radio" name="radio-2" className="radio radio-primary"  /> 
                    <div className="flex gap-2 border p-2 rounded-lg">
                    <div className={`bg-violet-500  w-8 h-8 border p-1`} ></div>
                    <div className={`bg-yellow-200  w-8 h-8 border p-1`} ></div>
                    </div>
                  </div>
                  <div className="flex items-center gap-5">
                    <input type="radio" name="radio-2" className="radio radio-primary"  /> 
                    <div className="flex gap-2 border p-2 rounded-lg">
                    <div className={`bg-black  w-8 h-8 border p-1`} ></div>
                    <div className={`bg-white  w-8 h-8 border p-1`} ></div>
                    </div>
                  </div>
                  <div className="flex items-center gap-5">
                    <input type="radio" name="radio-2" className="radio radio-primary"  /> 
                    <div className="flex gap-2 border p-2 rounded-lg">
                    <div className={`bg-blue-700  w-8 h-8 border p-1`} ></div>
                    <div className={`bg-blue-100  w-8 h-8 border p-1`} ></div>
                    </div>
                  </div>
                  <div className="flex items-center gap-5">
                    <input type="radio" name="radio-2" className="radio radio-primary"  /> 
                    <div className="flex gap-2 border p-2 rounded-lg">
                    <div className={`bg-orange-600  w-8 h-8 border p-1`} ></div>
                    <div className={`bg-orange-100  w-8 h-8 border p-1`} ></div>
                    </div>
                  </div>
                  <div className="flex items-center gap-5">
                    <input type="radio" name="radio-2" className="radio radio-primary"  /> 
                    <div className="flex gap-2 border p-2 rounded-lg">
                    <div className={`bg-green-800  w-8 h-8 border p-1`} ></div>
                    <div className={`bg-lime-500  w-8 h-8 border p-1`} ></div>
                    </div>
                    <img src="/vite.svg" alt="" />
                  </div>


                </div>

         

            </div>
          }
          {
            active === "favicon" &&
            <div className="col-span-3 flex flex-col gap-5">
            <div className="flex h-52 w-full flex-col justify-center gap-10 rounded-lg bg-white p-5">
              <p className="font-semibold">Favicon</p>
              <div className="flex items-center gap-10">
                <div className="avatar">
                  <div className="w-24 rounded-lg">
                        <img src="/vite.svg" alt="" />
                  </div>
                </div>

                <div className="btn border-none bg-[#ccc] text-black">
                  Update Image
                </div>
              </div>
            </div>               
          </div>
          }
        </div>
        <div className="my-5 flex justify-end">
          <div className="btn-primary btn">Update</div>
        </div>
      </div>
    </div>
  );
};

export default Appearance;
