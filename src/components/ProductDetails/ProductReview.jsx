import React, { useContext, useEffect, useState } from "react";
import { BiDislike, BiLike } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";
import { MdStars } from "react-icons/md";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import { MdOutlineCompareArrows } from "react-icons/md";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";
import { toast } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import PaginationSection from "./PaginationSection";
import { HiOutlineStar } from "react-icons/hi";

function countAndPercentages(reviews) {
  let starCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

  // Count the number of reviews for each star rating
  reviews.forEach(review => {
    starCounts[review.rating]++;
  });

  // Calculate the percentages for each star rating
  let totalReviews = reviews.length;
  let starPercentages = {};

  Object.keys(starCounts).forEach(key => {
    let count = starCounts[key];
    let percentage = (count / totalReviews) * 100;

    starPercentages[key] = percentage;
  });

  return starPercentages;
}

const ProductReview = ({
  productId,
  stars,
  setStars,
  reviewLength,
  setReviewLength,
}) => {
  const { user, allUsers } = useContext(AuthContext);
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);
  const [writeReview, setWriteReview] = useState(false);
  const [rating, setRating] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { data: allReviews = [], isLoading } = useQuery(
    {
      queryKey: ["getreviews"],
      queryFn: () =>
        fetch(`${import.meta.env.VITE_SERVER_URL}/get-review`).then(res =>
          res.json()
        ),
    },
    []
  );

  console.log(isLoading);
  console.log(allUsers);

  // filter review by product id
  let reviews = allReviews
    .map(review => {
      const reviewer = allUsers.find(u => u.email === review.email);
      return {
        ...review,
        reviewer,
      };
    })
    .filter(review => review.productId === productId);

  setReviewLength(reviews.length);

  let starPercentages = countAndPercentages(reviews);
  console.log(starPercentages);

  const averageRating =
    reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  console.log(averageRating);

  const handleRating = newRating => {
    if (newRating === rating) {
      // if the user clicks the same star, clear the rating
      setRating(0);
    } else {
      setRating(newRating);
    }
  };

  const handleReview = data => {
    const review = {
      name: user.displayName,
      email: user.email,
      rating: rating,
      review: data.comment,
      productId: productId,
      date: new Date().toDateString(),
    };

    fetch(`${import.meta.env.VITE_SERVER_URL}/post-review`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(review),
    })
      .then(res => res.json())
      .then(data => {
        console.log("review:", data);
        toast.success("Review Posted");
        setWriteReview(!writeReview);
      });
  };

  const [currentPage, setCurrentPage] = React.useState(1);
  let pageSize = 3;
  const totalReviews = reviews.length;
  const totalPages = Math.ceil(totalReviews / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedReviews = reviews.slice(startIndex, endIndex);

  const handlePageChange = pageNumber => {
    setCurrentPage(pageNumber);
  };

  console.log(stars);
  useEffect(() => {
    const fullStars = Math.floor(averageRating);
    const hasHalfStar = averageRating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    const starsArr = [];

    for (let i = 0; i < fullStars; i++) {
      starsArr.push(<FaStar key={i} className="text-yellow-400" />);
    }

    if (hasHalfStar) {
      starsArr.push(
        <FaStarHalfAlt key={fullStars} className="text-yellow-400" />
      );
    }

    for (let i = 0; i < emptyStars; i++) {
      starsArr.push(
        <HiOutlineStar
          key={fullStars + (hasHalfStar ? 1 : 0) + i}
          className="text-gray-400"
        />
      );
    }

    setStars(starsArr);
  }, [averageRating]);

  return (
    <div className="mb-5 text-neutral dark:text-base-100">
      <p className="mb-5 text-center text-3xl font-bold lg:text-left">
        Reviews
      </p>
      <div className="flex grid-cols-4 flex-col gap-5 p-5 lg:grid lg:gap-0 lg:p-0">
        <div className="col-span-1 lg:w-80 ">
          <div className="rounded-lg border">
            <div className="grid grid-cols-2 p-5">
              <div className="flex flex-col items-start">
                <p className="text-5xl font-bold">{averageRating}</p>
                <span className="flex text-warning">
                  <span className="flex items-center text-xl">{stars}</span>
                </span>
                <p>{reviewLength} reviews</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-5">
                  5{" "}
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={starPercentages["5"]}
                    className="range range-warning range-xs"
                  />
                </div>
                <div className="flex items-center gap-5">
                  4{" "}
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={starPercentages["4"]}
                    className="range range-warning range-xs"
                  />
                </div>
                <div className="flex items-center gap-5">
                  3{" "}
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={starPercentages["3"]}
                    className="range range-warning range-xs"
                  />
                </div>
                <div className="flex items-center gap-5">
                  2{" "}
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={starPercentages["2"]}
                    className="range range-warning range-xs"
                  />
                </div>
                <div className="flex items-center gap-5">
                  1{" "}
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={starPercentages["1"]}
                    className="range range-warning range-xs"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-3">
          {/* review start selection */}
          <div className="flex flex-col justify-between gap-5 lg:flex-row">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center ">
              <div className="flex gap-3">
                <span className="flex items-center gap-2 rounded-lg border py-1 px-3 hover:border-primary">
                  <FaStar className="text-warning" /> 5
                </span>
                <span className="flex items-center gap-2 rounded-lg border py-1 px-3 hover:border-primary">
                  <FaStar className="text-warning" /> 4
                </span>
                <span className="flex items-center gap-2 rounded-lg border py-1 px-3 hover:border-primary">
                  <FaStar className="text-warning" /> 3
                </span>
                <span className="flex items-center gap-2 rounded-lg border py-1 px-3 hover:border-primary">
                  <FaStar className="text-warning" /> 2
                </span>
                <span className="flex items-center gap-2 rounded-lg border py-1 px-3 hover:border-primary">
                  <FaStar className="text-warning" /> 1
                </span>
              </div>
            </div>
            <span
              onClick={() => setWriteReview(!writeReview)}
              className="flex cursor-pointer items-center justify-center gap-1 rounded-lg border p-2 hover:border-primary hover:text-primary "
            >
              <AiOutlineEdit /> Write a review
            </span>
          </div>

          <div className="reviews py-5">
            {/* write review */}

            {writeReview && (
              <div className=" my-5">
                <div className="mb-3">
                  <div className="flex items-center gap-5">
                    <div className="flex gap-2">
                      {[...Array(5)].map((_, i) => {
                        const ratingValue = i + 1;
                        let star;
                        if (ratingValue <= rating) {
                          star = (
                            <FaStar
                              size={30}
                              color="#FFD700"
                              className="cursor-pointer"
                            />
                          );
                        } else {
                          star = (
                            <FaStar
                              size={30}
                              color="gray"
                              className="cursor-pointer"
                            />
                          );
                        }
                        return (
                          <button
                            key={i}
                            onClick={() => handleRating(ratingValue)}
                            className="focus:outline-none"
                          >
                            {star}
                          </button>
                        );
                      })}
                    </div>
                    <span className="text-xl font-bold">
                      {rating === 1
                        ? "Very bad"
                        : rating === 2
                        ? "Bad"
                        : rating === 3
                        ? "Average"
                        : rating === 4
                        ? "Good"
                        : rating === 5 && "Superb"}
                    </span>
                  </div>
                </div>
                {rating === 0 && (
                  <p className="my-4 text-xs font-normal text-error">
                    Rating is required
                  </p>
                )}
                <form onSubmit={handleSubmit(handleReview)}>
                  <p>Review detail</p>
                  <input
                    className="hidden"
                    type="number"
                    value={rating}
                    name="rating"
                    {...register("rating", {
                      required: "Rating is required",
                      min: 1,
                      max: 5,
                    })}
                  />
                  {errors.rating && (
                    <p className="decoration-red-5 text-blue-100 underline">
                      {errors.rating.message}
                    </p>
                  )}
                  <textarea
                    name="comment"
                    className="h-32 w-full rounded-lg border p-3 focus:border-primary"
                    {...register("comment", { required: "Review is required" })}
                  />
                  <div className="flex justify-end gap-2">
                    <div
                      onClick={() => setWriteReview(!writeReview)}
                      className="btn-outline btn-error btn"
                    >
                      Cancel
                    </div>
                    <button
                      type="submit"
                      className="btn-primary btn text-white"
                    >
                      Post
                    </button>
                  </div>
                </form>
              </div>
            )}
            <div className="flex flex-col gap-5">
              {paginatedReviews.map(r => (
                <div className="review flex flex-col gap-3 rounded-lg border p-5">
                  <div className="flex justify-between">
                    <span className="flex items-center gap-2">
                      <img
                        className="w-10 rounded-full"
                        src={r.reviewer.photoURL}
                        alt=""
                      />
                      <span>{r.reviewer.name}</span>
                    </span>
                    <span>{r.date ? r.date : "19 Feb, 2023"}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="flex items-center text-warning">
                      {r.rating === 1 ? (
                        <FaStar />
                      ) : r.rating === 2 ? (
                        <>
                          <FaStar />
                          <FaStar />
                        </>
                      ) : r.rating === 3 ? (
                        <>
                          <FaStar />
                          <FaStar />
                          <FaStar />
                        </>
                      ) : r.rating === 4 ? (
                        <>
                          <FaStar />
                          <FaStar />
                          <FaStar />
                          <FaStar />
                        </>
                      ) : (
                        r.rating === 5 && (
                          <>
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                          </>
                        )
                      )}
                    </span>
                    <span>{r.review}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="cursor-pointer rounded-full p-2 hover:bg-accent hover:text-primary">
                      <BiLike />
                    </span>
                    <span className="cursor-pointer rounded-full p-2 hover:bg-accent hover:text-primary">
                      <BiDislike />
                    </span>
                  </div>
                </div>
              ))}
              <PaginationSection
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductReview;
