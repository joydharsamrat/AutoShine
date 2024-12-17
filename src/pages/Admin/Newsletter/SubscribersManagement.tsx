/* eslint-disable @typescript-eslint/no-explicit-any */
import toast from "react-hot-toast";
import {
  useCancelSubscriptionMutation,
  useGetSubscribersQuery,
} from "../../../redux/features/newsletter/newsletter.api";
import { TSubscriber } from "../../../types";
import Loader from "../../../components/Shared/Loaders/Loader";

const SubscribersManagement = () => {
  const { data, isLoading } = useGetSubscribersQuery(undefined);
  const subscribers: TSubscriber[] = data?.data || [];

  const [cancelSubscription] = useCancelSubscriptionMutation();

  const handleCancelSubscription = async (email: string) => {
    const loadingToast = toast.loading("Loading...");
    try {
      const res = await cancelSubscription(email);
      if (res.error) {
        throw new Error("Failed to cancel subscription");
      }
      toast.success(`Canceled subscription successfully!`, {
        id: loadingToast,
      });
    } catch (error: any) {
      toast.error(
        error.message || error?.data?.message || "Failed. Please try again.",
        {
          id: loadingToast,
        }
      );
      console.log(error);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="p-4  mb-5">
      <h2 className="text-xl font-bold mb-4">Subscriber Management</h2>

      {/* User List Section */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Subscriber List</h3>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white shadow-md rounded-md">
            <thead>
              <tr className="bg-primary-700 text-white ">
                <th className=" p-2 text-sm sm:text-base min-w-[200px] text-left whitespace-nowrap">
                  Email
                </th>
                <th className=" p-2 text-sm sm:text-base min-w-[100px ] text-left whitespace-nowrap">
                  Status
                </th>
                <th className=" p-2 text-sm sm:text-base min-w-[300px] text-left whitespace-nowrap">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map((subscriber: TSubscriber) => (
                <tr key={subscriber._id}>
                  <td className="border-b p-2 text-sm sm:text-base min-w-[200px]">
                    {subscriber.email}
                  </td>
                  <td className="border-b p-2 text-sm sm:text-base min-w-[200px]">
                    {subscriber.status}
                  </td>

                  <td className="px-4 py-3 text-start">
                    {subscriber.status === "active" ? (
                      <button
                        onClick={() =>
                          handleCancelSubscription(subscriber.email)
                        }
                        className="bg-primary-700 text-white px-2 py-1 text-sm rounded hover:bg-primary-900"
                      >
                        Cancel Subscription
                      </button>
                    ) : (
                      <span className="text-gray-500 italic">
                        No actions available
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SubscribersManagement;
