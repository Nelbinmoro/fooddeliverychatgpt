import React from 'react';
export default function Footer() {
  return (
    <footer className="bg-gray-50 py-6 mt-8">
      <div className="container text-center text-sm text-gray-600">© {new Date().getFullYear()} MealDash — Food delivery</div>
    </footer>
  );
}