import { useParams, useLocation } from "react-router-dom";

export default function PaymentSuccessPage() {
    const { slug } = useParams();
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const amount = query.get("amount");
    const receiverId = query.get("receiver_id");

    return (
        <section className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex items-center justify-center p-4 sm:p-6">
            <div className="w-full max-w-lg">
                <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">
                    <div className="p-6 sm:p-8">
                        <div className="mx-auto mb-5 flex w-16 h-16 sm:w-20 sm:h-20 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/40">
                            <svg viewBox="0 0 24 24" aria-hidden="true" className="w-8 h-8 sm:w-10 sm:h-10">
                                <circle cx="12" cy="12" r="10" fill="none" className="stroke-emerald-400" strokeWidth="2" />
                                <path d="M7 12l3 3 7-8" fill="none" className="stroke-emerald-600 dark:stroke-emerald-400" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <h2 className="text-center text-xl sm:text-2xl font-semibold tracking-tight">Payment successful</h2>
                        <p className="mt-1 text-center text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
                            Your payment has been accepted. Thank you!
                        </p>
                        <p className="mt-4 text-center text-xs sm:text-sm text-zinc-500">
                            Transaction ID: {slug} <br />
                            Amount: {amount} <br />
                            Receiver ID: {receiverId}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
