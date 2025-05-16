// app/unauthorized/page.tsx
import Link from 'next/link';

export default function Unauthorized() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="text-center p-8 bg-white ">
        <h1 className="text-4xl font-bold mb-4 ">403 - Access Denied</h1>
        <p className="text-lg mb-6 text-gray-700">
          You don’t have permission to view this page.
        </p>
        <Link
          href="/" // Replace with your actual login route
          className="inline-block px-6 py-3 text-blue-500  font-medium rounded-lg hover:text-blue-600 underline transition-colors duration-200"
        >
          Click here to login
        </Link>
      </div>
    </div>
  );
}