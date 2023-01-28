import React from 'react';
import AdvertisedProducts from '../AdvertisedProducts/AdvertisedProducts'; 
import Banner from '../Banner/Banner';
import OurService from '../../components/OurService/OurService';
import Featured from '../../components/Featured/Featured';
import FeaturedCategory from '../../components/FeaturedCategory/FeaturedCategory';
import Brand from '../../components/Brand/Brand';
import LimitedOffer from '../../components/LimitedOffer/LimitedOffer';
import DealOfTheDay from '../../components/DealOfTheDay/DealOfTheDay';
import OfferBanner from '../../components/OfferBanner/OfferBanner';
import PopulerProducts from '../../components/PopulerProducts/PopulerProducts'; 
import ProductGrid from '../../components/ProductGrid/ProductGrid';
import Review from '../../components/Review/Review';
import FromBlog from '../../components/FromBlog/FromBlog';
import MostSold from '../../components/MostSold/MostSold';
import BackInStore from '../../components/BackInStore/BackInStore';
import HotProduct from '../../components/HotProduct/HotProduct';

const Home = () => {
    return (
        <div className="">
            <Banner></Banner>
            <OurService/>
            <AdvertisedProducts></AdvertisedProducts>
            <Featured />
            <FeaturedCategory />
            <Brand /> 
            <ProductGrid />
            <MostSold/>
            <BackInStore/>
            <PopulerProducts/>
            <HotProduct/>
            <OfferBanner/>
            <LimitedOffer />
            <DealOfTheDay />
            {/* <FromBlog/> */}
            <Review/>
        </div>
    );
};

export default Home;