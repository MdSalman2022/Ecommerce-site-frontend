import React, { useContext } from "react";
import Marquee from "react-fast-marquee";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { FaRegStar } from "react-icons/fa";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";

const Review = () => {
  const { darkmode } = useContext(AuthContext);

  const reviews = [
    {
      name: "Howard Stark",
      img: "https://i.ibb.co/hfByZJ1/img1.webp",
      review: [
        "BestDeal got all the things i need for my build.",
        "Got the delivery really fast. SUPER EXPERIENCE!!!",
      ],
      rating: "4.6",
      days: "2 days ago",
    },
    {
      name: "Thomas wayne",
      img: "https://i.ibb.co/sbnk2tP/img2.webp",
      review: ["Top quality products", "Great customer service!! Recommended"],
      rating: "5",
      days: "5 days ago",
    },
    {
      name: "Henry Allen",
      img: "https://i.ibb.co/DYq0KVv/img3.webp",
      review: [
        "BestDeal really got the best deal",
        "Unbelievable prices and great customer service",
      ],
      rating: "4.5",
      days: "1 week ago",
    },
    {
      name: "Thomas Curry",
      img: "https://i.ibb.co/9YsJX7t/img4.webp",
      review: ["Best Ecommerce experience", "Really fast website"],
      rating: "4.8",
      days: "2 days ago",
    },
  ];

  return (
    <div className="py-5 lg:py-20">
      <div className="my-5 flex flex-col items-center gap-5 pb-10 text-center">
        <h1 className="text-4xl font-bold dark:text-accent">
          What are people saying about us
        </h1>
        <span className="h-1 w-20 rounded-full bg-primary"></span>
      </div>
      <div className="flex">
        <Marquee
          {...(darkmode ? { gradient: false } : { gradient: true })}
          speed={100}
          pauseOnHover={true}
          style={{ height: "100%", width: "100vw" }}
          className="h-52 w-full md:h-40 "
        >
          {reviews.map((review, index) => (
            <div
              key={index}
              className="container mx-5 flex h-52 w-full max-w-lg flex-col divide-y divide-sky-500 rounded-md border border-primary p-6"
            >
              <div className="flex justify-between p-4">
                <div className="flex space-x-4">
                  <div>
                    <LazyLoadImage
                      src={review.img}
                      alt=""
                      className="h-12 w-12 rounded-full object-cover dark:bg-gray-500"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold dark:text-accent">
                      {review.name}
                    </h4>
                    <span className="text-xs dark:text-gray-400">
                      {review.days}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2 dark:text-yellow-500">
                  <FaRegStar />
                  <span className="text-xl font-bold">{review.rating}</span>
                </div>
              </div>
              <div className="space-y-2 p-4 text-sm dark:text-gray-400">
                <p>{review.review[0]}</p>
                <p>{review.review[1]}</p>
              </div>
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default Review;
