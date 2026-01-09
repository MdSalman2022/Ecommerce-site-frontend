'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { BiDislike, BiLike } from 'react-icons/bi';
import { AiOutlineEdit } from 'react-icons/ai';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { HiOutlineStar } from 'react-icons/hi';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { useAuth } from '@/contexts/AuthProvider';
import { useShop } from '@/contexts/ShopProvider';
import { Button } from '@/components/ui/button';
import { BadgeCheck } from 'lucide-react';
import { useSiteSettings } from '@/hooks/useSiteSettings';

interface ReviewData {
  _id: string;
  name: string;
  email: string;
  rating: number;
  review: string;
  productId: string;
  date: string;
  reviewer?: {
    name: string;
    photoURL: string;
  };
  isVerified?: boolean;
}

interface ProductReviewProps {
  productId: string;
  stars: React.ReactNode[];
  setStars: (stars: React.ReactNode[]) => void;
  reviewLength: number;
  setReviewLength: (length: number) => void;
}

function countAndPercentages(reviews: ReviewData[]) {
  const starCounts: { [key: number]: number } = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

  reviews.forEach((review) => {
    if (starCounts[review.rating] !== undefined) {
      starCounts[review.rating]++;
    }
  });

  const totalReviews = reviews.length || 1;
  const starPercentages: { [key: number]: number } = {};

  Object.keys(starCounts).forEach((key) => {
    const numKey = Number(key);
    starPercentages[numKey] = (starCounts[numKey] / totalReviews) * 100;
  });

  return starPercentages;
}

const ProductReview: React.FC<ProductReviewProps> = ({
  productId,
  stars,
  setStars,
  reviewLength,
  setReviewLength,
}) => {
  const { user } = useAuth();
  const { allUsers } = useShop();
  const { ecommerce } = useSiteSettings();
  const [writeReview, setWriteReview] = useState(false);
  const [rating, setRating] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3;

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const { data: allReviews = [], refetch } = useQuery({
    queryKey: ['getreviews'],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/get-review`);
      return res.json();
    },
  });

  // Filter reviews by product ID and attach reviewer info
  const reviews: ReviewData[] = allReviews
    .map((review: any) => {
      const reviewer = allUsers.find((u: any) => u.email === review.email);
      return { ...review, reviewer };
    })
    .filter((review: any) => review.productId === productId);

  useEffect(() => {
    setReviewLength(reviews.length);
  }, [reviews.length, setReviewLength]);

  const starPercentages = countAndPercentages(reviews);
  const averageRating = reviews.length > 0
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    : 0;

  // Pagination
  const totalPages = Math.ceil(reviews.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedReviews = reviews.slice(startIndex, startIndex + pageSize);

  const handleRating = (newRating: number) => {
    setRating(newRating === rating ? 0 : newRating);
  };

  const handleReview = async (data: any) => {
    if (!user) {
      toast.error('Please login to post a review');
      return;
    }

    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }

    const review = {
      name: user.name,
      email: user.email,
      rating: rating,
      review: data.comment,
      productId: productId,
      date: new Date().toDateString(),
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/post-review`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(review),
      });

      if (res.ok) {
        toast.success('Review Posted');
        setWriteReview(false);
        setRating(0);
        reset();
        refetch();
      }
    } catch (error) {
      toast.error('Failed to post review');
    }
  };

  // Generate star display for average rating
  useEffect(() => {
    if (isNaN(averageRating)) return;

    const fullStars = Math.floor(averageRating);
    const hasHalfStar = averageRating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    const starsArr: React.ReactNode[] = [];

    for (let i = 0; i < fullStars; i++) {
      starsArr.push(<FaStar key={`full-${i}`} className="text-yellow-400" />);
    }
    if (hasHalfStar) {
      starsArr.push(<FaStarHalfAlt key="half" className="text-yellow-400" />);
    }
    for (let i = 0; i < emptyStars; i++) {
      starsArr.push(<HiOutlineStar key={`empty-${i}`} className="text-gray-400" />);
    }

    setStars(starsArr);
  }, [averageRating, setStars]);

  if (ecommerce.enableReviews === false) return null;

  return (
    <div className="mb-10 text-foreground">
      <h2 className="mb-6 text-center text-3xl font-bold lg:text-left">Reviews</h2>

      <div className="grid gap-8 lg:grid-cols-4">
        {/* Rating Summary */}
        <div className="lg:col-span-1">
          <div className="rounded-xl border border-border p-5 bg-card">
            <div className="flex flex-col items-center lg:items-start gap-2">
              <p className="text-5xl font-bold">{averageRating.toFixed(1)}</p>
              <div className="flex text-xl">{stars}</div>
              <p className="text-muted-foreground">{reviewLength} reviews</p>
            </div>

            <div className="mt-4 space-y-2">
              {[5, 4, 3, 2, 1].map((num) => (
                <div key={num} className="flex items-center gap-3 text-sm">
                  <span className="w-3">{num}</span>
                  <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-yellow-400 rounded-full"
                      style={{ width: `${starPercentages[num] || 0}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews List */}
        <div className="lg:col-span-3">
          {/* Write Review Button */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex gap-2">
              {[5, 4, 3, 2, 1].map((num) => (
                <span
                  key={num}
                  className="flex items-center gap-1 rounded-lg border border-border px-3 py-1 text-sm hover:border-primary cursor-pointer"
                >
                  <FaStar className="text-yellow-400" /> {num}
                </span>
              ))}
            </div>
            <Button
              variant="outline"
              onClick={() => setWriteReview(!writeReview)}
              className="flex items-center gap-2"
            >
              <AiOutlineEdit /> Write a Review
            </Button>
          </div>

          {/* Write Review Form */}
          {writeReview && (
            <div className="mb-6 p-5 border border-border rounded-xl bg-card">
              <div className="mb-4">
                <div className="flex items-center gap-4">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button
                        key={num}
                        onClick={() => handleRating(num)}
                        className="focus:outline-none"
                      >
                        <FaStar
                          size={28}
                          className={num <= rating ? 'text-yellow-400' : 'text-gray-400'}
                        />
                      </button>
                    ))}
                  </div>
                  <span className="font-semibold">
                    {rating === 1 && 'Very bad'}
                    {rating === 2 && 'Bad'}
                    {rating === 3 && 'Average'}
                    {rating === 4 && 'Good'}
                    {rating === 5 && 'Superb'}
                  </span>
                </div>
              </div>

              <form onSubmit={handleSubmit(handleReview)}>
                <p className="mb-2 text-sm font-medium">Your Review</p>
                <textarea
                  className="w-full h-32 rounded-lg border border-border p-3 bg-background focus:border-primary focus:outline-none"
                  placeholder="Share your experience with this product..."
                  {...register('comment', { required: 'Review is required' })}
                />
                {errors.comment && (
                  <p className="text-destructive text-sm mt-1">{errors.comment.message as string}</p>
                )}

                <div className="flex justify-end gap-3 mt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setWriteReview(false);
                      setRating(0);
                      reset();
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Post Review</Button>
                </div>
              </form>
            </div>
          )}

          {/* Reviews */}
          <div className="space-y-4">
            {paginatedReviews.map((r, idx) => (
              <div key={r._id || idx} className="p-5 border border-border rounded-xl bg-card">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    {r.reviewer?.photoURL ? (
                      <Image
                        src={r.reviewer.photoURL}
                        alt={r.reviewer.name || 'User'}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-primary font-bold">
                          {(r.reviewer?.name || r.name || 'U')[0].toUpperCase()}
                        </span>
                      </div>
                    )}
                    <div className="flex flex-col">
                      <span className="font-medium">{r.reviewer?.name || r.name}</span>
                      {r.isVerified && (
                        <div className="flex items-center gap-1 text-[10px] font-bold text-green-600 uppercase tracking-wider">
                          <BadgeCheck size={12} fill="currentColor" className="text-white" />
                          Verified Purchase
                        </div>
                      )}
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground">{r.date}</span>
                </div>

                <div className="flex text-yellow-400 mb-2">
                  {[...Array(r.rating)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>

                <p className="text-foreground">{r.review}</p>

                <div className="flex gap-4 mt-4">
                  <button className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
                    <BiLike /> Helpful
                  </button>
                  <button className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
                    <BiDislike />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              {[...Array(totalPages)].map((_, i) => (
                <Button
                  key={i}
                  variant={currentPage === i + 1 ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductReview;
