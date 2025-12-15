import { Link } from "react-router-dom";

export default function OrderSuccess() {
  return (
    <div className="max-w-lg mx-auto text-center py-20">
      <h1 className="text-3xl font-bold text-green-600 mb-4">
        Order Placed Successfully!
      </h1>
      <p className="text-gray-700 mb-6">
        Your meal is being prepared. Thank you for ordering!
      </p>

      <Link
        to="/"
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Back to Home
      </Link>
    </div>
  );
}
