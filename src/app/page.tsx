'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Clock, MapPin } from 'lucide-react'
import { listings, Listing } from '@/lib/data'

export default function HomePage() {
  const [priceFilter, setPriceFilter] = useState('all')
  const [verifiedFilter, setVerifiedFilter] = useState('all')

  // Filter functions
  const filterByPrice = (listing: Listing) => {
    if (priceFilter === 'all') return true
    if (priceFilter === 'under 100') return listing.price < 100
    if (priceFilter === '100-500') return listing.price >= 100 && listing.price <= 500
    if (priceFilter === '500-1000') return listing.price > 500 && listing.price <= 1000
    if (priceFilter === '1000+') return listing.price > 1000
    return true
  }

  const filterByVerified = (listing: Listing) => {
    if (verifiedFilter === 'all') return true
    if (verifiedFilter === 'verified') return listing.verified === true
    if (verifiedFilter === 'not verified') return listing.verified === false
    return true
  }

  // Apply filters to listings
  const filteredRecentListings = listings
    .filter(filterByPrice)
    .filter(filterByVerified)
    .slice(0, 6)

  const filteredFeaturedJobs = listings
    .filter(l => l.category === 'Services')
    .filter(filterByPrice)
    .filter(filterByVerified)
    .slice(0, 4)

  return (
    <div className="space-y-8">
      {/* Recently Posted Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-primary">Recently Posted</h2>
          <div className="flex items-center gap-4">
            {/* Price Filter */}
            <div className="flex items-center gap-2">
              <label htmlFor="priceFilter" className="text-sm font-medium text-gray-700">
                Price:
              </label>
              <select
                id="priceFilter"
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                className="rounded-md border border-gray-300 px-3 py-1 text-sm"
              >
                <option value="all">All</option>
                <option value="under 100">Under $100</option>
                <option value="100-500">$100 - $500</option>
                <option value="500-1000">$500 - $1000</option>
                <option value="1000+">Over $1000</option>
              </select>
            </div>

            {/* Verified Filter */}
            <div className="flex items-center gap-2">
              <label htmlFor="verifiedFilter" className="text-sm font-medium text-gray-700">
                Verified:
              </label>
              <select
                id="verifiedFilter"
                value={verifiedFilter}
                onChange={(e) => setVerifiedFilter(e.target.value)}
                className="rounded-md border border-gray-300 px-3 py-1 text-sm"
              >
                <option value="all">All</option>
                <option value="verified">Verified</option>
                <option value="not verified">Not Verified</option>
              </select>
            </div>

            <Link href="/search" className="text-primary hover:text-secondary transition-colors">
              View All →
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecentListings.map((listing: Listing) => (
            <Link
              key={listing.id}
              href={`/listing/${listing.id}`}
              className="card hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <Image
                src={listing.image}
                alt={listing.title}
                width={400}
                height={300}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-primary mb-2 line-clamp-2">
                  {listing.title}
                </h3>
                <p className="text-neutral-600 text-sm mb-3 line-clamp-2">
                  {listing.description}
                </p>
                <div className="flex items-center justify-between text-sm text-neutral-500 mb-2">
                  <div className="flex items-center">
                    <MapPin size={14} className="mr-1" />
                    <span>{listing.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock size={14} className="mr-1" />
                    <span>2h ago</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-secondary">${listing.price}</span>
                  {listing.verified && (
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                      Verified
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Job Posts Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-primary">Featured Job Posts</h2>
          <Link href="/categories/services" className="text-primary hover:text-secondary transition-colors">
            View All Jobs →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredFeaturedJobs.map((job: Listing) => (
            <Link
              key={job.id}
              href={`/listing/${job.id}`}
              className="card hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-semibold text-primary">
                    {job.title}
                  </h3>
                  <span className="text-lg font-bold text-secondary">${job.price}</span>
                </div>
                <p className="text-neutral-600 mb-4 line-clamp-2">
                  {job.description}
                </p>
                <div className="flex items-center justify-between text-sm text-neutral-500">
                  <div className="flex items-center">
                    <MapPin size={14} className="mr-1" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock size={14} className="mr-1" />
                    <span>1d ago</span>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-sm bg-primary/10 text-primary px-3 py-1 rounded">
                    {job.category}
                  </span>
                  {job.verified && (
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                      Verified
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-primary text-white rounded-lg p-8 text-center">
        <h3 className="text-2xl font-bold mb-4">Ready to Post Your Listing?</h3>
        <p className="text-lg mb-6 opacity-90">
          Join thousands of Stanford students and community members buying and selling.
        </p>
        <Link
          href="/post"
          className="bg-secondary text-white px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors inline-block"
        >
          Post a Listing
        </Link>
      </section>
    </div>
  )
}
