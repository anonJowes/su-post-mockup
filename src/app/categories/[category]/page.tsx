'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { listings, Listing, categories, additionalCategories } from '@/lib/data'
import ListingCard from '@/components/ListingCard'

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

export default function CategoryPage() {
  const params = useParams()
  const categoryParamRaw = params?.category || ''
  const categoryParam = Array.isArray(categoryParamRaw) ? categoryParamRaw[0] : categoryParamRaw
  // URL decode first, then replace hyphens with spaces
  const decodedParam = decodeURIComponent(categoryParam)
  const selectedCategorySlug = decodedParam.replace(/-/g, ' ').toLowerCase()
  const [activeFilter, setActiveFilter] = useState('all')
  const [priceFilter, setPriceFilter] = useState('all')
  const [verifiedFilter, setVerifiedFilter] = useState('all')

  // Find the actual category name from the categories array
  const selectedCategory = [...categories, ...additionalCategories].find(
    cat => cat.toLowerCase() === selectedCategorySlug
  ) || selectedCategorySlug

  const filteredListings = selectedCategorySlug
    ? listings.filter(
        (listing) => listing.category.toLowerCase() === selectedCategorySlug
      )
    : listings

  const isCommunity = selectedCategory === 'community'



  // Filter listings by price range
  const filterByPrice = (listing: Listing) => {
    if (priceFilter === 'all') return true
    if (priceFilter === 'under 100') return listing.price < 100
    if (priceFilter === '100-500') return listing.price >= 100 && listing.price <= 500
    if (priceFilter === '500-1000') return listing.price > 500 && listing.price <= 1000
    if (priceFilter === '1000+') return listing.price > 1000
    return true
  }

  // Filter listings by verified status
  const filterByVerified = (listing: Listing) => {
    if (verifiedFilter === 'all') return true
    if (verifiedFilter === 'verified') return listing.verified === true
    if (verifiedFilter === 'not verified') return listing.verified === false
    return true
  }

  if (isCommunity) {
    return (
      <div className="space-y-6 pr-3">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary mb-2">Community</h1>
          <p className="text-[#525151]">Connect with your SU community</p>
        </div>

        {/* Floating Filter Buttons */}
        <div className="fixed top-20 right-6 z-50 flex flex-col space-y-2 max-w-xs">
          {communityFilters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors shadow-lg ${
                activeFilter === filter
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              aria-pressed={activeFilter === filter ? 'true' : 'false'}
              aria-label={`Filter by ${filter.replace('+', ' & ')}`}
            >
              {filter.replace('+', ' & ')}
            </button>
          ))}
        </div>

        {/* Wall Layout */}
        <div className="flex flex-wrap gap-6 justify-center">
          {filteredListings
            .filter((listing) =>
              activeFilter === 'all'
                ? true
                : listing.tags?.includes(activeFilter)
            )
            .filter(filterByPrice)
            .filter(filterByVerified)
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

        {filteredListings.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-[#525151]">No community posts found.</p>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-primary">
        {selectedCategory
          ? `${selectedCategory} Listings`
          : 'All Listings'}
      </h1>

      {/* Common Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        {/* Price Filter */}
        <div>
          <label htmlFor="priceFilter" className="block text-sm font-medium text-gray-700 mb-1">
            Price
          </label>
          <select
            id="priceFilter"
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
            className="rounded-md border border-gray-300 p-2"
          >
            <option value="all">All</option>
            <option value="under 100">Under $100</option>
            <option value="100-500">$100 - $500</option>
            <option value="500-1000">$500 - $1000</option>
            <option value="1000+">Over $1000</option>
          </select>
        </div>

        {/* Verified Filter */}
        <div>
          <label htmlFor="verifiedFilter" className="block text-sm font-medium text-gray-700 mb-1">
            Verified
          </label>
          <select
            id="verifiedFilter"
            value={verifiedFilter}
            onChange={(e) => setVerifiedFilter(e.target.value)}
            className="rounded-md border border-gray-300 p-2"
          >
            <option value="all">All</option>
            <option value="verified">Verified</option>
            <option value="not verified">Not Verified</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredListings
          .filter(filterByPrice)
          .filter(filterByVerified)
          .map((listing: Listing) => (
            <Link
              key={listing.id}
              href={`/listing/${listing.id}`}
              className="block"
            >
              <ListingCard
                id={listing.id}
                title={listing.title}
                image={listing.image}
                description={listing.description}
                price={listing.price}
                rating={listing.rating}
                verified={listing.verified}
              />
            </Link>
          ))}
      </div>

      {filteredListings.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl text-[#525151]">No listings found in this category.</p>
        </div>
      )}
    </div>
  )
}
