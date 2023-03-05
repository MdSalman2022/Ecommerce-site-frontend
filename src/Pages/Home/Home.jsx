import React, { useContext } from 'react';
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
import MostSold from '../../components/MostSold/MostSold';
import BackInStore from '../../components/BackInStore/BackInStore';
import HotProduct from '../../components/HotProduct/HotProduct';
import DiscountCode from '../../components/DiscountCode/DiscountCode';
import GridDiscount from '../../components/GridDiscount/GridDiscount';
import { LazyLoadComponent } from 'react-lazy-load-image-component';

const Home = () => {
 
    
    return (
        <div className={`overflow-x-hidden dark:bg-neutral`}>
            <Banner></Banner>
            <OurService/>
            <AdvertisedProducts></AdvertisedProducts>
            <LazyLoadComponent><Featured /></LazyLoadComponent>           
            <LazyLoadComponent><FeaturedCategory /></LazyLoadComponent>      
            <LazyLoadComponent><Brand /> </LazyLoadComponent>
            <LazyLoadComponent><ProductGrid /></LazyLoadComponent>
            <LazyLoadComponent><MostSold /></LazyLoadComponent>
            <LazyLoadComponent><BackInStore /></LazyLoadComponent>
            <LazyLoadComponent><PopulerProducts /></LazyLoadComponent>            
            <LazyLoadComponent><DiscountCode /></LazyLoadComponent>
            <LazyLoadComponent><HotProduct /></LazyLoadComponent>
            <LazyLoadComponent><OfferBanner /></LazyLoadComponent>
            <LazyLoadComponent><LimitedOffer /></LazyLoadComponent>
            <LazyLoadComponent><DealOfTheDay /></LazyLoadComponent>
            <LazyLoadComponent><GridDiscount /></LazyLoadComponent>
            <LazyLoadComponent><Review/></LazyLoadComponent>
            
        </div>
    );
};

export default Home;