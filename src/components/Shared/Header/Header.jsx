import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { AuthContext } from "../../../contexts/AuthProvider/AuthProvider";
import { BsPerson, BsBag } from "react-icons/bs";
import { IoClose, IoNotificationsOutline } from "react-icons/io5";
import { FaAngleRight, FaExchangeAlt } from "react-icons/fa";
import { MdFavoriteBorder } from "react-icons/md";
import { BiHomeAlt, BiMessageMinus } from "react-icons/bi";
import { BsFillPersonFill, BsMenuButtonWideFill } from "react-icons/bs";
import { FaQuestion } from "react-icons/fa";
import { IoLanguage } from "react-icons/io5";
import { TbTruckDelivery } from "react-icons/tb";
import { RxDashboard } from "react-icons/rx";
import { FaAngleDown } from "react-icons/fa";

import Fuse from "fuse.js";
import { allcategories } from "./NavbarItems";

const Header = () => {
  const navigate = useNavigate();
  const { user, logOut, cart } = useContext(AuthContext);
  let {
    searchText,
    setSearchText,
    searchResult,
    setSearchResult,
    products,
    darkmode,
    setDarkMode,
  } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    navigate(`/search/${data.name}`);
    setSearchText(data.name);
  };
  const handleSearch = (event) => {
    let search = event.target.value;
    console.log(search);
    // navigate(`/search/${data.name}`)
    setSearchText(search);
  };

  useEffect(() => {
    if (searchText === "") {
      setSearchResult([]);
    } else {
      const fuse = new Fuse(products, {
        keys: ["name", "brand", "subcat", "cat"],
        threshold: 0.1,
        includeScore: true,
        location: 0,
        distance: 100,
        minMatchCharLength: 1,
        shouldSort: true,
        tokenize: true,
        matchAllTokens: true,
        findAllMatches: true,
      });
      const searchResults = fuse
        .search(searchText)
        .sort((a, b) => b.score - a.score);
      const formattedResults = searchResults.map((result) => result.item);
      setSearchResult(formattedResults);
    }
  }, [searchText]);

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.error(error));
  };

  const [options, setOptions] = useState(0);
  const [subOptions, setSubOptions] = useState(0);

  const handleOptions = (id) => {
    setOptions(id);
  };
  const handleSubOptions = (id) => {
    setSubOptions(id);
  };

  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 150) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClear = () => {
    setSearchText("");
    navigate("/");
  };

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (searchResult.length > 0) {
      setIsOpen(true);
    } else setIsOpen(false);
  }, [searchResult]);

  return (
    <div className="bg-base-100 dark:bg-neutral ">
      {/* top header  */}
      <div
        className={`container mx-auto hidden h-8 grid-cols-3 place-items-center text-sm text-neutral dark:text-base-100 md:grid lg:gap-80`}
      >
        <div className="flex gap-5">
          <Link to="/" className="flex items-center gap-2">
            <BiHomeAlt /> Home
          </Link>
          <p className="flex items-center gap-2">
            <BsFillPersonFill /> About Us
          </p>
          <p className="flex items-center gap-2">
            <BiMessageMinus /> Contact
          </p>
          {/* <p><FaQuestion/> FAQ</p> */}
        </div>

        <div className="flex gap-5 ">
          <p className="flex items-center gap-2">
            <IoLanguage /> English
          </p>
          <p>$ US Dollar</p>
        </div>

        <div className="flex gap-5 border-l pl-3 ">
          <Link
            to="/dashboard"
            className="flex items-center gap-2 transition-all duration-300 hover:text-primary"
          >
            <RxDashboard /> Dashboard
          </Link>
          <p className="flex items-center gap-2">
            <TbTruckDelivery /> Delivery
          </p>
        </div>
      </div>

      {/* Primary Header  */}
      <div className={`hidden border-t dark:border-gray-600 md:flex `}>
        <div className="container mx-auto grid grid-cols-4 gap-10 py-5 md:justify-items-center lg:grid-cols-5  lg:justify-items-stretch">
          <div className=" logo col-span-1 hidden items-center md:flex">
            <Link to="/" className=" ">
              {/* <LazyLoadImage src="https://i.ibb.co/vd3xm6V/boipaben-final.png" className='w-16' alt="logo" border="0" /> */}
              <h1 className="flex items-center gap-1 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-xl font-semibold text-transparent md:text-2xl lg:text-4xl">
                <img
                  className="w-10"
                  src="https://i.ibb.co/xSLpY24/logo-colored.webp"
                  alt="logo"
                  width={50}
                  height={50}
                />
                BestDeal
              </h1>
            </Link>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="search col-span-3 w-full pl-3 lg:pl-0"
          >
            {" "}
            {isOpen && (
              <div
                onClick={() => setIsOpen(!isOpen)}
                className="absolute top-20 left-0 h-full w-full"
              ></div>
            )}
            <div onChange={handleSearch} className="input-group join w-full">
              <input
                value={searchText}
                type="text"
                autoComplete="off"
                placeholder="Search..."
                className="input-bordered input w-full rounded-r-none border-r-0 border-primary dark:bg-neutral dark:text-accent "
                {...register("name", { required: true, maxLength: 80 })}
              />
              {/* {searchResult.length > <button className='bg-white text-neutral border-primary border-y font-bold px-3 text-2xl'><IoClose /></button>} */}
              {searchText.length > 0 && (
                <span
                  onClick={handleClear}
                  className="flex h-12 items-center border-y border-primary bg-white px-3 text-2xl font-bold text-neutral dark:bg-neutral dark:text-accent"
                >
                  <IoClose />
                </span>
              )}
              <button
                type="submit"
                className="rounded-lg rounded-l-none bg-primary px-3 text-2xl font-bold text-base-100"
              >
                <AiOutlineSearch />
              </button>
            </div>
            <ul className="absolute z-50 w-full max-w-3xl rounded-lg bg-white shadow-xl dark:border dark:border-gray-600 dark:bg-neutral lg:max-w-4xl">
              {isOpen &&
                searchResult.slice(0, 4).map((item, index) => (
                  <li
                    className="group flex cursor-pointer items-center gap-2 p-1 text-neutral transition-all duration-300 ease-in-out hover:bg-accent dark:border-b dark:border-gray-600"
                    key={index}
                  >
                    <img src={item.image} alt="" className="w-20" />
                    <div className="flex flex-col ">
                      <Link
                        onClick={() => setIsOpen(!isOpen)}
                        to={`/productDetails/${item._id}/${encodeURIComponent(
                          item.name
                        ).replace(/%20/g, "-")}`}
                        className="text-primary"
                      >
                        {item.name}
                      </Link>
                      <p className="dark:text-accent dark:group-hover:text-neutral">
                        ${item.price}
                      </p>
                    </div>
                  </li>
                ))}
              {isOpen && (
                <Link
                  onClick={() => setIsOpen(!isOpen)}
                  to={`/search/${searchText}`}
                  className="flex items-center justify-center rounded-b-lg bg-secondary p-2 text-white"
                >
                  See all results
                </Link>
              )}
            </ul>
          </form>
          <div className="col-span-1 flex items-center gap-5 md:text-2xl lg:justify-end lg:text-3xl">
            {/* <p className='cursor-pointer rounded-full border p-1 hover:bg-primary hover:text-base-100 transition-all duration-300 ease-in-out'><BsPerson  className='p-1'/></p>  */}

            {user ? (
              <div className="flex items-center gap-4">
                {user.photoURL ? (
                  <div className="dropdown-end dropdown">
                    <label
                      tabIndex={0}
                      className="btn-ghost btn btn-sm mb-1 h-10 w-10 cursor-pointer rounded-full border border-gray-200 p-0  "
                    >
                      <img
                        src={
                          user?.photoURL
                            ? user?.photoURL
                            : "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
                        }
                        alt=""
                        className="w-10 rounded-full"
                      />
                    </label>
                    <ul
                      tabIndex={0}
                      className="dropdown-content menu w-52 gap-1 rounded-box bg-base-100 p-2 text-sm shadow"
                    >
                      <li>
                        <span className="flex items-center justify-between">
                          Dark Mode{" "}
                          <input
                            onClick={() => setDarkMode(!darkmode)}
                            type="checkbox"
                            className="toggle-primary toggle"
                          />
                        </span>
                      </li>
                      <li>
                        <Link to="/orderhistory">Order History</Link>
                      </li>
                      <li onClick={handleLogOut}>
                        <a href="#">Logout</a>
                      </li>
                    </ul>
                  </div>
                ) : (
                  <div className="dropdown-end dropdown">
                    <label
                      tabIndex={0}
                      className="btn-ghost btn btn-sm mb-1 h-10 w-10 cursor-pointer rounded-full border border-gray-200 p-0 text-2xl transition-all duration-300 ease-in-out hover:border-none hover:bg-primary hover:text-base-100"
                    >
                      <BsPerson />
                    </label>
                    <ul
                      tabIndex={0}
                      className="dropdown-content menu z-[100] w-52 gap-1 rounded-box bg-base-100 p-2 text-sm shadow"
                    >
                      <li>
                        <Link to="/orderhistory">Order History</Link>
                      </li>
                      <li onClick={handleLogOut}>
                        <a>Logout</a>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <div className="dropdown-end dropdown">
                <label
                  tabIndex={0}
                  className="btn-ghost btn btn-sm mb-1 h-10 w-10 cursor-pointer rounded-full border border-gray-200 p-0 text-2xl transition-all duration-300 ease-in-out hover:border-none hover:bg-primary hover:text-base-100"
                >
                  <BsPerson />
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu w-52 gap-1 rounded-box bg-base-100 p-2 text-sm shadow"
                >
                  <li>
                    <Link to="/login">Login</Link>
                  </li>
                  <li>
                    <Link to="/register">Signup</Link>
                  </li>
                </ul>
              </div>
            )}

            <div className="dropdown-end dropdown">
              <label
                tabIndex={0}
                className="btn-ghost btn btn-sm mb-1 h-10 w-10 cursor-pointer rounded-full border border-gray-200 p-0 text-2xl transition-all duration-300 ease-in-out hover:border-none hover:bg-primary hover:text-base-100 dark:text-base-100"
              >
                <IoNotificationsOutline />
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu z-[100] w-52 gap-1 rounded-box bg-base-100 p-2 text-sm shadow dark:bg-neutral"
              >
                <li>
                  <Link
                    to="/laptop"
                    className="bg-accent text-sm dark:bg-opacity-10 dark:text-base-100"
                  >
                    <div className="flex flex-col">
                      <p>
                        <span className="text-red-500">30% </span> discount on{" "}
                        <span className="p-0 font-bold text-secondary dark:text-accent">
                          Laptops
                        </span>{" "}
                      </p>
                      <span className="text-xs ">1 hour</span>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/laptop"
                    className="bg-accent  text-sm dark:bg-opacity-10 dark:text-base-100"
                  >
                    <div className="flex flex-col">
                      <p>
                        <span className="text-red-500">50% </span> discount on{" "}
                        <span className="p-0 font-bold text-secondary dark:text-accent">
                          border-gray-600 Accessories
                        </span>{" "}
                      </p>
                      <span className="text-xs ">2 hour</span>
                    </div>
                  </Link>
                </li>
              </ul>
            </div>
            <Link to="/cart">
              <div className="relative rounded-full border p-1 transition-all duration-300 ease-in-out hover:bg-primary hover:text-base-100 dark:text-base-100">
                <BsBag className="cursor-pointer  p-1" />
                {cart && (
                  <div
                    className={`absolute -top-1 -right-2  text-sm  ${
                      cart.length === 0
                        ? "border-error bg-red-500"
                        : "border-primary bg-green-500"
                    } flex h-5 w-5  items-center justify-center rounded-full border text-base-100`}
                  >
                    {cart.length}
                  </div>
                )}
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Category Header  */}

      <div
        className={`dark: hidden w-full border-y  bg-base-100 py-4 md:flex md:flex-wrap  ${
          isFixed
            ? "fixed top-0 z-50 rounded-md bg-opacity-80 bg-clip-padding backdrop-blur-sm backdrop-filter transition-all duration-300 dark:bg-opacity-30"
            : "dark:bg-neutral"
        }`}
      >
        <div className="container mx-auto">
          <div className="flex justify-between md:gap-2 lg:gap-0">
            <div className="group relative">
              <p className="flex items-center justify-center gap-2 rounded-full bg-primary p-3 text-base-100 lg:w-44 ">
                All Categories <FaAngleDown />{" "}
              </p>
              <div className="absolute top-12 z-50 hidden h-full  py-5 group-hover:flex  group-hover:flex-col lg:w-56 ">
                <ul className="z-40  bg-base-100 shadow">
                  {allcategories.map((category, index) => (
                    <li
                      key={index}
                      onMouseEnter={() => handleOptions(category.id)}
                      onMouseLeave={() => handleOptions(0)}
                      className="relative flex cursor-pointer items-start  border-b p-2 font-semibold transition-all duration-300 hover:bg-primary hover:text-base-100"
                    >
                      <Link to={`/${category.cat}`}>
                        <span className="flex items-center">
                          {category.name} &nbsp; <FaAngleRight />
                        </span>
                      </Link>
                      <div
                        className={`absolute -right-[172px] top-0 w-48 px-5  py-0 drop-shadow-lg  ${
                          options === category.id ? "" : "hidden"
                        }`}
                      >
                        <div className=" bg-base-100 text-neutral transition-all duration-300 hover:text-primary">
                          {category.subcategories.map((subcategory, index) => (
                            <Link
                              key={index}
                              onMouseEnter={() =>
                                handleSubOptions(subcategory.id)
                              }
                              onMouseLeave={() => handleSubOptions(0)}
                              className="relative flex items-start  border-b p-2 pl-2  text-neutral transition-all duration-300 hover:bg-primary hover:text-base-100"
                              to={`/${category.cat}/${
                                subcategory.subcat
                                  ? subcategory.subcat
                                  : subcategory.brand
                                  ? subcategory.brand
                                  : subcategory.type
                              }`}
                            >
                              <span className="flex items-center">
                                {subcategory.name} &nbsp; <FaAngleRight />
                              </span>

                              {subcategory.subcategories && (
                                <div
                                  className={`absolute -right-[172px] top-0 w-48  px-5 py-0 ${
                                    subOptions === subcategory.id
                                      ? ""
                                      : "hidden"
                                  }`}
                                >
                                  <ul className="space-y-5  bg-base-100">
                                    {subcategory?.subcategories?.map(
                                      (s, index) => (
                                        <Link
                                          key={index}
                                          className=""
                                          to={`/${category.cat}/${
                                            subcategory.subcat
                                              ? subcategory.subcat
                                              : subcategory.type
                                          }/${s.brand ? s.brand : s.type}`}
                                        >
                                          <li className=" border-b py-2 pr-5 pl-2 text-neutral transition-all duration-300 hover:bg-primary hover:text-base-100">
                                            {s.name}
                                          </li>
                                        </Link>
                                      )
                                    )}
                                  </ul>
                                </div>
                              )}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <div
                className={`group relative flex w-32 cursor-pointer items-center justify-center gap-1 rounded-full bg-accent text-sm font-semibold text-primary  transition-all duration-300 hover:text-primary dark:border dark:bg-neutral ${
                  isFixed && "border border-primary"
                }`}
              >
                <Link to="/monitor" className="flex items-center gap-2 p-2">
                  Monitor <FaAngleDown />
                </Link>

                <div className="absolute top-12 left-0 z-50 hidden h-full  w-40   rounded-lg bg-base-100 text-neutral group-hover:flex group-hover:flex-col">
                  <ul className="space-y-2 rounded-lg  bg-base-100 shadow">
                    {allcategories[2].subcategories.map(
                      (subcategory, index) => (
                        <Link key={index} to={`/monitor/${subcategory.brand}`}>
                          <li className="cursor-pointer p-3 font-semibold transition-all duration-300 hover:text-primary ">
                            {subcategory.name}
                          </li>
                        </Link>
                      )
                    )}
                  </ul>
                </div>
              </div>
              <div className="group relative flex w-32 cursor-pointer items-center justify-center gap-1 rounded-full text-sm  font-semibold text-neutral transition-all duration-300 hover:bg-accent hover:text-primary dark:text-base-100 dark:hover:bg-neutral dark:hover:text-primary">
                <Link to="/laptop" className="flex items-center gap-2 p-2">
                  Laptops <FaAngleDown />
                </Link>

                <div className="absolute top-12 left-0 z-50 hidden h-full  w-40   rounded-lg bg-base-100 text-neutral group-hover:flex group-hover:flex-col">
                  <ul className="space-y-2 rounded-lg  bg-base-100 shadow">
                    {allcategories[1].subcategories.map(
                      (subcategory, index) => (
                        <Link key={index} to={`/laptop/${subcategory.brand}`}>
                          <li className="cursor-pointer p-3 font-semibold transition-all duration-300 hover:text-primary ">
                            {subcategory.name}
                          </li>
                        </Link>
                      )
                    )}
                  </ul>
                </div>
              </div>
              <div className="group relative flex w-32 cursor-pointer items-center justify-center gap-1 rounded-full text-sm  font-semibold text-neutral transition-all duration-300 hover:bg-accent hover:text-primary dark:text-base-100 dark:hover:bg-neutral dark:hover:text-primary">
                <Link to="/smartphone" className="flex items-center gap-2 p-2">
                  Smartphone <FaAngleDown />
                </Link>

                <div className="absolute top-12 left-0 z-50 hidden h-full  w-40   rounded-lg bg-base-100 text-neutral group-hover:flex group-hover:flex-col">
                  <ul className="space-y-2 rounded-lg  bg-base-100 shadow">
                    {allcategories[3].subcategories.map(
                      (subcategory, index) => (
                        <Link
                          key={index}
                          to={`/smartphone/${subcategory.brand}`}
                        >
                          <li className="cursor-pointer p-3 font-semibold transition-all duration-300 hover:text-primary ">
                            {subcategory.name}
                          </li>
                        </Link>
                      )
                    )}
                  </ul>
                </div>
              </div>
              <div className="group relative flex w-32 cursor-pointer items-center justify-center gap-1 rounded-full text-sm  font-semibold text-neutral transition-all duration-300 hover:bg-accent hover:text-primary dark:text-base-100 dark:hover:bg-neutral dark:hover:text-primary">
                <Link to="/tablet" className="flex items-center gap-2 p-2">
                  Tablet <FaAngleDown />
                </Link>

                <div className="absolute top-12 left-0 z-50 hidden h-full  w-40   rounded-lg bg-base-100 text-neutral group-hover:flex group-hover:flex-col">
                  <ul className="space-y-2 rounded-lg  bg-base-100 shadow">
                    {allcategories[4].subcategories.map(
                      (subcategory, index) => (
                        <Link key={index} to={`/tablet/${subcategory.brand}`}>
                          <li className="cursor-pointer p-3 font-semibold transition-all duration-300 hover:text-primary ">
                            {subcategory.name}
                          </li>
                        </Link>
                      )
                    )}
                  </ul>
                </div>
              </div>
              <div className="group relative flex w-32 cursor-pointer items-center justify-center gap-1 rounded-full text-sm  font-semibold text-neutral transition-all duration-300 hover:bg-accent hover:text-primary dark:text-base-100 dark:hover:bg-neutral dark:hover:text-primary">
                <Link to="/camera" className="flex items-center gap-2 p-2">
                  Camera <FaAngleDown />
                </Link>

                <div className="absolute top-12 left-0 z-50 hidden h-full  w-40   rounded-lg bg-base-100 text-neutral group-hover:flex group-hover:flex-col">
                  <ul className="space-y-2 rounded-lg  bg-base-100 shadow">
                    {allcategories[5].subcategories.map(
                      (subcategory, index) => (
                        <Link key={index} to={`/camera/${subcategory.brand}`}>
                          <li className="cursor-pointer p-3 font-semibold transition-all duration-300 hover:text-primary ">
                            {subcategory.name}
                          </li>
                        </Link>
                      )
                    )}
                  </ul>
                </div>
              </div>
              <div className="group relative flex w-32 cursor-pointer items-center justify-center gap-1 rounded-full text-sm  font-semibold text-neutral transition-all duration-300 hover:bg-accent hover:text-primary dark:text-base-100 dark:hover:bg-neutral dark:hover:text-primary">
                <Link to="/accessories" className="flex items-center gap-2 p-2">
                  Accessories <FaAngleDown />
                </Link>

                <div className="absolute top-12 left-0 z-50 hidden h-full  w-40   rounded-lg bg-base-100 text-neutral group-hover:flex group-hover:flex-col">
                  <ul className="space-y-2 rounded-lg  bg-base-100 shadow">
                    {allcategories[8].subcategories.map(
                      (subcategory, index) => (
                        <Link
                          key={index}
                          to={`/accessories/${subcategory.type}`}
                        >
                          <li className="cursor-pointer p-3 font-semibold transition-all duration-300 hover:text-primary ">
                            {subcategory.name}
                          </li>
                        </Link>
                      )
                    )}
                  </ul>
                </div>
              </div>
              <div className="group relative flex w-32 cursor-pointer items-center justify-center gap-1 rounded-full text-sm  font-semibold text-neutral transition-all duration-300 hover:bg-accent hover:text-primary dark:text-base-100 dark:hover:bg-neutral dark:hover:text-primary">
                <Link to="/tv" className="flex items-center gap-2 p-2">
                  TV <FaAngleDown />
                </Link>

                <div className="absolute top-12 left-0 z-50 hidden h-full  w-40   rounded-lg bg-base-100 text-neutral group-hover:flex group-hover:flex-col">
                  <ul className="space-y-2 rounded-lg  bg-base-100 shadow">
                    {allcategories[7].subcategories.map(
                      (subcategory, index) => (
                        <Link key={index} to={`/tv/${subcategory.brand}`}>
                          <li className="cursor-pointer p-3 font-semibold transition-all duration-300 hover:text-primary ">
                            {subcategory.name}
                          </li>
                        </Link>
                      )
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
