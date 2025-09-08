'use client'

import Link from 'next/link'
import { useState } from 'react'
import { listings, Listing } from '@/lib/data'

const communityFilters = [
  'all',
  'about 1 hour',
  'activities',
  'childcare',
  'classes',
  'lost+found',
  'news+views',
  'rideshare',
  'volunteers',
  'general'
]

export default function CommunityPage() {
  const [activeFilter, setActiveFilter] = useState('all')

  const communityListings = listings.filter(
    (listing) => listing.category === 'Community'
  )

  return (
    <div className="space-y-6 pr-3">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-primary mb-2">Community</h1>
        <p className="text-[#525151] mb-4">Connect with your SU community</p>

        {/* Floating Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 w-full mb-6">
          {communityFilters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors shadow-lg ${
                activeFilter === filter
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              aria-label={`Filter by ${filter.replace('+', ' & ')}`}
            >
              {filter.replace('+', ' & ')}
            </button>
          ))}
        </div>
      </div>

      {/* Wall Layout */}
      <div className="flex flex-wrap gap-6 justify-center">
        {communityListings
          .filter((listing) =>
            activeFilter === 'all'
              ? true
              : listing.tags?.includes(activeFilter)
          )
          .map((listing: Listing) => (
            <div
              key={listing.id}
              className="w-full sm:w-[48%] md:w-[31%] lg:w-[23%] bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-primary line-clamp-2">
                    {listing.title}
                  </h3>
                  {listing.verified && (
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                      Verified
                    </span>
                  )}
                </div>
                <p className="text-[#525151] text-sm mb-3 line-clamp-3">
                  {listing.description}
                </p>
                <div className="flex items-center justify-between text-sm text-[#525151] mb-3">
                  <span>{listing.location}</span>
                  <span>${listing.price}</span>
                </div>

                {/* Tags Display */}
                {listing.tags && listing.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {listing.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                      >
                        {tag.replace('+', ' & ')}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex text-yellow-400">
                      {'★'.repeat(Math.floor(listing.rating))}
                      {'☆'.repeat(5 - Math.floor(listing.rating))}
                    </div>
                    <span className="ml-1 text-sm text-[#525151]">
                      {listing.rating}
                    </span>
                  </div>
                  <Link
                    href={`/listing/${listing.id}`}
                    className="text-primary hover:text-secondary text-sm font-medium"
                  >
                    View →
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </div>

      {communityListings.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl text-[#525151]">No community posts found.</p>
        </div>
      )}
    </div>
  )
}
