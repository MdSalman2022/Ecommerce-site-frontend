import React from 'react';
import Marquee from 'react-fast-marquee';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import {FaRegStar} from 'react-icons/fa';

const Review = () => {
    return (
        <div className='py-5 lg:py-20'>
             <div className="text-center my-5 flex flex-col items-center gap-5 pb-10">
                <h1 className="text-4xl font-bold">What are people saying about us</h1>
                <span className="h-1 w-20 bg-primary rounded-full"></span>
            </div>
            <Marquee
                speed={100}
                pauseOnHover={true} 
                style={{height: '100%', width: '100vw'}}
                className="w-screen h-20 md:h-40 "
            >
                <div className="container flex flex-col w-full max-w-lg p-6 mx-auto divide-y rounded-md divide-sky-500 border-primary border">
                    <div className="flex justify-between p-4">
                        <div className="flex space-x-4">
                            <div>
                                <LazyLoadImage src="https://source.unsplash.com/100x100/?portrait" alt="" className="object-cover w-12 h-12 rounded-full dark:bg-gray-500" />
                            </div>
                            <div>
                                <h4 className="font-bold">Leroy Jenkins</h4>
                                <span className="text-xs dark:text-gray-400">2 days ago</span>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2 dark:text-yellow-500">
                            <FaRegStar/>
                            <span className="text-xl font-bold">4.5</span>
                        </div>
                    </div>
                    <div className="p-4 space-y-2 text-sm dark:text-gray-400">
                        <p>Vivamus sit amet turpis leo. Praesent varius eleifend elit, eu dictum lectus consequat vitae. Etiam ut dolor id justo fringilla finibus.</p>
                        <p>Donec eget ultricies diam, eu molestie arcu. Etiam nec lacus eu mauris cursus venenatis. Maecenas gravida urna vitae accumsan feugiat. Vestibulum commodo, ante sit urna purus rutrum sem.</p>
                    </div>
                </div>
                <div className="container flex flex-col w-full max-w-lg p-6 mx-auto divide-y rounded-md divide-sky-500 border-primary border">
                    <div className="flex justify-between p-4">
                        <div className="flex space-x-4">
                            <div>
                                <LazyLoadImage src="https://source.unsplash.com/100x100/?portrait" alt="" className="object-cover w-12 h-12 rounded-full dark:bg-gray-500" />
                            </div>
                            <div>
                                <h4 className="font-bold">Leroy Jenkins</h4>
                                <span className="text-xs dark:text-gray-400">2 days ago</span>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2 dark:text-yellow-500">
                            <FaRegStar/>
                            <span className="text-xl font-bold">4.5</span>
                        </div>
                    </div>
                    <div className="p-4 space-y-2 text-sm dark:text-gray-400">
                        <p>Vivamus sit amet turpis leo. Praesent varius eleifend elit, eu dictum lectus consequat vitae. Etiam ut dolor id justo fringilla finibus.</p>
                        <p>Donec eget ultricies diam, eu molestie arcu. Etiam nec lacus eu mauris cursus venenatis. Maecenas gravida urna vitae accumsan feugiat. Vestibulum commodo, ante sit urna purus rutrum sem.</p>
                    </div>
                </div>
                <div className="container flex flex-col w-full max-w-lg p-6 mx-auto divide-y rounded-md divide-sky-500 border-primary border">
                    <div className="flex justify-between p-4">
                        <div className="flex space-x-4">
                            <div>
                                <LazyLoadImage src="https://source.unsplash.com/100x100/?portrait" alt="" className="object-cover w-12 h-12 rounded-full dark:bg-gray-500" />
                            </div>
                            <div>
                                <h4 className="font-bold">Leroy Jenkins</h4>
                                <span className="text-xs dark:text-gray-400">2 days ago</span>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2 dark:text-yellow-500">
                            <FaRegStar/>
                            <span className="text-xl font-bold">4.5</span>
                        </div>
                    </div>
                    <div className="p-4 space-y-2 text-sm dark:text-gray-400">
                        <p>Vivamus sit amet turpis leo. Praesent varius eleifend elit, eu dictum lectus consequat vitae. Etiam ut dolor id justo fringilla finibus.</p>
                        <p>Donec eget ultricies diam, eu molestie arcu. Etiam nec lacus eu mauris cursus venenatis. Maecenas gravida urna vitae accumsan feugiat. Vestibulum commodo, ante sit urna purus rutrum sem.</p>
                    </div>
                </div>
            </Marquee>
        </div>
    );
};

export default Review;