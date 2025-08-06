import { useState } from "react";
import { useAddRatingMutation } from "../../redux/features/rating/ratingApi";
import { toast } from "react-toastify";

interface RatingFormProps {
    onClose: () => void;
    receiverUsername: string;
}

export const RatingForm = ({ onClose, receiverUsername }: RatingFormProps) => {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [description, setDescription] = useState("");
    const [addRating] = useAddRatingMutation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await addRating({
                username: receiverUsername,
                rate: rating,
                description,
            });
            onClose();
            toast.success('Rating added successfully');
        } catch (error) {
            console.error("Rating failed", error);
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">
            <div className="bg-white rounded-xl w-full max-w-lg p-6 relative shadow-lg">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center"
                >
                    ✕
                </button>
                <h2 className="text-2xl font-bold text-center mb-4">Rate This User</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <textarea
                        className="w-full p-2 border rounded"
                        rows={3}
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <div className="flex justify-center gap-2 text-4xl">
                        {[1, 2, 3, 4, 5].map((value) => (
                            <button
                                type="button"
                                key={value}
                                onClick={() => setRating(value)}
                                onMouseEnter={() => setHoverRating(value)}
                                onMouseLeave={() => setHoverRating(0)}
                                className={`transition-all ${(hoverRating || rating) >= value
                                    ? "text-yellow-400 scale-110"
                                    : "text-gray-300"
                                    }`}
                            >
                                ★
                            </button>
                        ))}
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};
