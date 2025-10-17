'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Item } from '@/lib/types';
import Footer from '@/components/Footer';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/lib/auth';

function DashboardContent() {
  const [items, setItems] = useState<Item[]>([]);
  const { authLevel } = useAuth();

  const companyName = process.env.NEXT_PUBLIC_COMPANY_NAME;
  const dashboardTitle = companyName ? `${companyName} Dashboard` : 'Intranet Dashboard';

  useEffect(() => {
    fetch('/api/items')
      .then(res => res.json())
      .then(setItems);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            {dashboardTitle}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your centralized hub for all internal tools and applications
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
          {items.map(item => (
            <div
              key={item.id}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 overflow-hidden"
            >
              <div className="p-6">
                {item.image && (
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <h3 className="text-xl font-bold text-gray-900 mb-2 text-center group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>
                {item.subtitle && (
                  <p className="text-gray-600 text-center mb-4 text-sm leading-relaxed">
                    {item.subtitle}
                  </p>
                )}
                <div className="text-center">
                  <Link
                    href={item.link}
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>Launch App</span>
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {items.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No tools added yet</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Get started by adding your first internal tool or application to the dashboard.
            </p>
          </div>
        )}

        {/* Admin Link - Only show for admin users */}
        {authLevel === 'admin' && (
          <div className="text-center">
            <Link
              href="/admin"
              className="inline-flex items-center px-8 py-4 bg-white text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl border border-gray-200"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Admin Panel
            </Link>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}
