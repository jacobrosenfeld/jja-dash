'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Item } from '@/lib/types';

export default function Dashboard() {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    fetch('/api/items')
      .then(res => res.json())
      .then(setItems);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">Intranet Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map(item => (
            <div key={item.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              {item.image && (
                <Image
                  src={item.image}
                  alt={item.title}
                  width={64}
                  height={64}
                  className="w-16 h-16 mb-4 rounded"
                />
              )}
              <h2 className="text-xl font-semibold mb-2 text-gray-900">{item.title}</h2>
              <p className="text-gray-600 mb-4">{item.subtitle}</p>
              <Link
                href={item.link}
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Access
              </Link>
            </div>
          ))}
        </div>
        {items.length === 0 && (
          <p className="text-center text-gray-500 mt-8">No items yet. Add some from the admin panel.</p>
        )}
        <div className="text-center mt-8">
          <Link
            href="/admin"
            className="inline-block bg-gray-800 text-white px-6 py-3 rounded hover:bg-gray-900 transition-colors"
          >
            Admin Panel
          </Link>
        </div>
      </div>
    </div>
  );
}
