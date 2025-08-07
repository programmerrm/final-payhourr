import { useState } from "react";
import { useGetPaymentMethodQuery } from "../../redux/features/payments/paymentsApi";
import { ReactIcons } from "../../utils/ReactIcons";
import { ManualPaymentReleaseOptionForm } from "../forms/ManualPaymentReleaseOptionForm";
import { PaymentMethodModal } from "../modals/PaymentMethodModal";

export default function ManualPaymentReleaseOption() {
    const { data, isLoading, isError, refetch } = useGetPaymentMethodQuery(undefined, {
        refetchOnMountOrArgChange: true,
    });
    const { IoMdAdd } = ReactIcons;
    const [showForm, setShowForm] = useState(false);
    const [selectedMethod, setSelectedMethod] = useState<any | null>(null);

    const toggleForm = () => setShowForm(prev => !prev);
    const closeForm = () => setShowForm(false);
    const closeModal = () => setSelectedMethod(null);

    if (isLoading) return <p className="text-center">Loading...</p>;
    if (isError) return <p className="text-center text-red-500">Failed to load payment methods.</p>;

    return (
        <div className="space-y-5">
            {/* Toggle Button */}
            <button
                onClick={toggleForm}
                className="flex items-center gap-x-2.5 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
                type="button"
            >
                <IoMdAdd size={20} />
                <span>Add Payment Method</span>
            </button>

            {/* Add Form Popup */}
            {showForm && <ManualPaymentReleaseOptionForm closeForm={closeForm} refetch={refetch} />}

            {/* Payment Method List */}
            <div className="tab-content flex-grow overflow-auto flex flex-col lg:flex-row gap-6">
                <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 content-start">
                    {data?.results?.map((method: any) => (
                        <div
                            key={method.id}
                            onClick={() => setSelectedMethod(method)}
                            className="cursor-pointer bg-white p-2.5 md:p-6 border border-gray-300 rounded-2xl shadow-md text-center hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-center"
                        >
                            <h2 className="text-base xl:text-xl font-semibold text-gray-800">{method.name}</h2>
                            <p className="mt-2 text-base xl:text-2xl font-extrabold text-blue-600">{method.number}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Details Modal */}
            {selectedMethod && (
                <PaymentMethodModal method={selectedMethod} onClose={closeModal} refetch={refetch} />
            )}
        </div>
    );
}
