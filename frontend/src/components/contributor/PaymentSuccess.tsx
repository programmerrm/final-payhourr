import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import type { RootState } from "../../redux/store";
import { useAddOrderCreateMutation } from "../../redux/features/orders/ordersApi";
import { clearOrderData } from "../../redux/features/orders/orderSlice";

export default function PaymentSuccessPage() {
    const { slug } = useParams();
    const orderData = useSelector((state: RootState) => state.order);
    const [addOrderCreate] = useAddOrderCreateMutation();

    const dispatch = useDispatch();
    const hasCalled = useRef(false);

    useEffect(() => {
        if (slug && orderData.title && !hasCalled.current) {
            hasCalled.current = true;
            addOrderCreate(orderData)
                .unwrap()
                .then(() => {
                    toast.success("Order created successfully!");
                    dispatch(clearOrderData());
                })
                .catch((err) => {
                    toast.error(err?.data?.message || "Failed to create order");
                    hasCalled.current = false;
                });
        }
    }, [slug, orderData, addOrderCreate, dispatch]);

    useEffect(() => {
        if (orderData.redirect_url) {
            const timer = setTimeout(() => {
                window.location.href = orderData.redirect_url;
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [orderData.redirect_url]);

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
                        <p className="mt-1 text-center text-sm sm:text-base text-zinc-600 dark:text-zinc-400">Your payment has been accepted. Thank you!</p>
                        <p className="mt-4 text-center text-xs sm:text-sm text-zinc-500">Redirecting to previous page in 3 seconds...</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
