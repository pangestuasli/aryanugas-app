import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { getCurrentUser } from '../../lib/helpers';

import { AlertContainer, useAlert } from '../../components/Alert';
import { Textarea } from '../../components/Input';
import { PageLoading } from '../../components/Loading';
import { formatDateTime } from '../../lib/helpers';

const FeedbackPage = () => {
  const { alerts, removeAlert, success, error } = useAlert();
  const currentUser = getCurrentUser();

  // Loading states
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Data states
  const [feedbacksData, setFeedbacksData] = useState([]);

  // Form states
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');

  // Fetch data on mount
  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    setIsPageLoading(true);
    try {
      const { data, error: fetchError } = await supabase
        .from('feedbacks')
        .select('*')
        .eq('member_username', currentUser.username)
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;
      setFeedbacksData(data || []);
    } catch (err) {
      console.error(err);
      error('Gagal memuat data', err.message);
    } finally {
      setIsPageLoading(false);
    }
  };

  // Submit feedback
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (rating === 0) {
      error('Rating diperlukan', 'Silakan pilih rating bintang');
      return;
    }

    setIsSubmitting(true);
    try {
      const { data, error: insertError } = await supabase
        .from('feedbacks')
        .insert([{
          member_username: currentUser.username,
          rating,
          comment: comment || null,
        }])
        .select();

      if (insertError) throw insertError;

      if (data) {
        setFeedbacksData([data[0], ...feedbacksData]);
        success('Terima kasih!', 'Feedback Anda telah dikirim');
        // Reset form
        setRating(0);
        setComment('');
      }
    } catch (err) {
      console.error(err);
      error('Gagal mengirim feedback', err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render interactive stars
  const renderStars = (interactive = false) => {
    const currentRating = interactive ? (hoverRating || rating) : rating;
    return Array.from({ length: 5 }, (_, i) => (
      <button
        key={i}
        type={interactive ? 'button' : undefined}
        onClick={() => interactive && setRating(i + 1)}
        onMouseEnter={() => interactive && setHoverRating(i + 1)}
        onMouseLeave={() => interactive && setHoverRating(0)}
        className={`text-3xl transition-transform ${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'}`}
        disabled={!interactive}
      >
        <span className={i < currentRating ? 'text-amber-400' : 'text-slate-200'}>
          ★
        </span>
      </button>
    ));
  };

  // Render read-only stars for display
  const renderDisplayStars = (ratingValue) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`text-lg ${i < ratingValue ? 'text-amber-400' : 'text-slate-200'}`}>
        ★
      </span>
    ));
  };

  if (isPageLoading) {
    return <PageLoading />;
  }

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8">
      <AlertContainer alerts={alerts} onRemove={removeAlert} position="top-right" />

      {/* Header */}
      <div className="mb-8">
        <p className="text-sm text-[#6B6357]">Sampaikan masukan Anda</p>
        <h1
          className="text-2xl font-bold text-[#1F3A2E]"
          style={{ fontFamily: "'Fraunces', Georgia, serif" }}
        >
          Feedback & Rating
        </h1>
      </div>

      {/* Feedback Form */}
      <div className="bg-white rounded-2xl border border-[#1F3A2E]/10 p-6 mb-6">
        <h2 className="font-bold text-[#1F3A2E] mb-4">Beri Rating Pelayanan Kami</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Star Rating */}
          <div className="bg-[#F8F4EC] rounded-xl p-6 text-center">
            <p className="text-sm text-[#6B6357] mb-3">Seberapa puas Anda dengan layanan kami?</p>
            <div className="flex justify-center gap-2">
              {renderStars(true)}
            </div>
            {rating > 0 && (
              <p className="text-sm font-semibold text-[#1F3A2E] mt-3">
                {rating === 1 && 'Sangat Kurang'}
                {rating === 2 && 'Kurang'}
                {rating === 3 && 'Cukup'}
                {rating === 4 && 'Baik'}
                {rating === 5 && 'Sangat Baik!'}
              </p>
            )}
          </div>

          {/* Comment */}
          <Textarea
            label="Komentar (Opsional)"
            name="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Ceritakan pengalaman Anda atau berikan saran..."
            rows={4}
          />

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting || rating === 0}
            className="w-full bg-[#2F6B4C] hover:bg-[#1F3A2E] text-white py-3 rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Mengirim...' : 'Kirim Feedback'}
          </button>
        </form>
      </div>

      {/* User's Feedback History */}
      <div className="bg-white rounded-2xl border border-[#1F3A2E]/10 p-6">
        <h2 className="font-bold text-[#1F3A2E] mb-4">Feedback Anda</h2>

        {feedbacksData.length === 0 ? (
          <div className="bg-[#F8F4EC] rounded-xl p-6 text-center text-sm text-[#6B6357]">
            Anda belum memberikan feedback. Kirimkan ulasan Anda di atas!
          </div>
        ) : (
          <div className="space-y-4">
            {feedbacksData.map((feedback) => (
              <div
                key={feedback.id}
                className="bg-[#F8F4EC] rounded-xl p-4 border border-[#1F3A2E]/5"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex gap-1">
                    {renderDisplayStars(feedback.rating)}
                  </div>
                  <span className="text-xs font-bold text-[#6B6357] bg-white px-2 py-1 rounded-lg">
                    {formatDateTime(feedback.created_at)}
                  </span>
                </div>
                {feedback.comment && (
                  <p className="text-sm text-[#1F3A2E] mt-2">"{feedback.comment}"</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbackPage;
