'use client';

import React, { useState, useEffect } from 'react';
import { Star, User, ThumbsUp, MessageSquare } from 'lucide-react';
import { useAuth } from '@/contexts/AuthProvider';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'react-hot-toast';
import { ReviewSkeleton } from '@/components/Skeletons';

interface Review {
  _id: string;
  name: string;
  email: string;
  rating: number;
  review: string;
  productId: string;
  date: string;
}

interface ProductReviewsProps {
  productId: string;
}

// Star Rating Component
function StarRating({ rating, onRate, interactive = false }: { rating: number; onRate?: (r: number) => void; interactive?: boolean }) {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={!interactive}
          onClick={() => onRate?.(star)}
          onMouseEnter={() => interactive && setHoverRating(star)}
          onMouseLeave={() => interactive && setHoverRating(0)}
          className={interactive ? 'cursor-pointer' : 'cursor-default'}
        >
          <Star
            className={`w-5 h-5 transition-colors ${
              star <= (hoverRating || rating)
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300'
            }`}
          />
        </button>
      ))}
    </div>
  );
}

export default function ProductReviews({ productId }: ProductReviewsProps) {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form state
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const fetchReviews = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/reviews/product/${productId}`
      );
      const data = await res.json();
      setReviews(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!rating) {
      toast.error('Please select a rating');
      return;
    }
    if (!reviewText.trim()) {
      toast.error('Please write a review');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/post-review`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name || user?.name || 'Anonymous',
          email: user?.email || '',
          rating,
          review: reviewText,
          productId,
          date: new Date().toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
          }),
        }),
      });

      if (res.ok) {
        toast.success('Review submitted successfully!');
        setRating(0);
        setReviewText('');
        setName('');
        setShowForm(false);
        fetchReviews();
      } else {
        toast.error('Failed to submit review');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error('Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calculate average rating
  const averageRating = reviews.length > 0
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;

  // Rating distribution
  const ratingDistribution = [5, 4, 3, 2, 1].map(stars => ({
    stars,
    count: reviews.filter(r => r.rating === stars).length,
    percentage: reviews.length > 0 
      ? (reviews.filter(r => r.rating === stars).length / reviews.length) * 100 
      : 0,
  }));

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <MessageSquare className="w-6 h-6 text-primary" />
        Customer Reviews
      </h2>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => <ReviewSkeleton key={i} />)}
        </div>
      ) : (
        <>
          {/* Reviews Summary */}
          <div className="bg-gray-50 rounded-xl p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Average Rating */}
              <div className="text-center md:border-r md:pr-8 border-gray-200">
                <div className="text-5xl font-bold text-gray-900">{averageRating.toFixed(1)}</div>
                <StarRating rating={Math.round(averageRating)} />
                <p className="text-sm text-gray-500 mt-1">{reviews.length} review{reviews.length !== 1 ? 's' : ''}</p>
              </div>

              {/* Distribution */}
              <div className="flex-1 space-y-2">
                {ratingDistribution.map(({ stars, count, percentage }) => (
                  <div key={stars} className="flex items-center gap-3">
                    <span className="text-sm text-gray-600 w-12">{stars} star</span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-yellow-400 rounded-full transition-all"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-500 w-8">{count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Write Review Button */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              {!showForm && (
                <Button 
                  onClick={() => setShowForm(true)}
                  className="bg-primary hover:bg-primary/90"
                >
                  Write a Review
                </Button>
              )}
            </div>
          </div>

          {/* Review Form */}
          {showForm && (
            <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Write Your Review</h3>
              <form onSubmit={handleSubmitReview} className="space-y-4">
                {/* Rating */}
                <div>
                  <Label>Your Rating *</Label>
                  <div className="mt-1">
                    <StarRating rating={rating} onRate={setRating} interactive />
                  </div>
                </div>

                {/* Name */}
                {!user && (
                  <div>
                    <Label htmlFor="reviewer-name">Your Name</Label>
                    <Input
                      id="reviewer-name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name"
                      className="mt-1"
                    />
                  </div>
                )}

                {/* Review */}
                <div>
                  <Label htmlFor="review-text">Your Review *</Label>
                  <Textarea
                    id="review-text"
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Share your experience with this product..."
                    rows={4}
                    className="mt-1"
                  />
                </div>

                <div className="flex gap-3">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-primary hover:bg-primary/90"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Review'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowForm(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* Reviews List */}
          {reviews.length > 0 ? (
            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review._id} className="bg-white border border-gray-200 rounded-xl p-5">
                  <div className="flex items-start gap-4">
                    {/* Avatar */}
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-5 h-5 text-gray-400" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900">{review.name || 'Anonymous'}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <StarRating rating={review.rating} />
                            <span className="text-sm text-gray-500">{review.date}</span>
                          </div>
                        </div>
                      </div>
                      <p className="mt-3 text-gray-600">{review.review}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No reviews yet. Be the first to review this product!</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
