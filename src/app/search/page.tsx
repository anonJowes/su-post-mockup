'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import ListingCard from '@/components/ListingCard'
import SearchBar from '@/components/SearchBar'
import { listings as allListings, Listing } from '@/lib/data'

interface SearchFilters {
  category?: string
  location?: string
  priceRange?: string
}

function SearchContent() {
  const searchParams = useSearchParams()
  const [listings, setListings] = useState<Listing[]>(allListings)

  useEffect(() => {
    const category = searchParams.get('category')
    if (category) {
      const filtered = allListings.filter((listing) => listing.category === category)
      setListings(filtered)
    }
  }, [searchParams])

  const handleSearch = (query: string, filters: SearchFilters) => {
    let filtered = allListings

    if (query) {
      filtered = filtered.filter((listing) =>
        listing.title.toLowerCase().includes(query.toLowerCase()) ||
        listing.description.toLowerCase().includes(query.toLowerCase())
      )
    }

    if (filters.category) {
      filtered = filtered.filter((listing) => listing.category === filters.category)
    }

    if (filters.location) {
      filtered = filtered.filter((listing) => listing.location === filters.location)
    }

    if (filters.priceRange) {
      switch (filters.priceRange) {
        case 'Under $50':
          filtered = filtered.filter((listing) => listing.price < 50)
          break
        case '$50-$100':
          filtered = filtered.filter((listing) => listing.price >= 50 && listing.price <= 100)
          break
        case '$100-$500':
          filtered = filtered.filter((listing) => listing.price >= 100 && listing.price <= 500)
          break
        case '$500-$1000':
          filtered = filtered.filter((listing) => listing.price >= 500 && listing.price <= 1000)
          break
        case 'Over $1000':
          filtered = filtered.filter((listing) => listing.price > 1000)
          break
      }
    }

    setListings(filtered)
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-primary mb-8">Search Listings</h1>
      <SearchBar onSearch={handleSearch} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {listings.map((listing: Listing) => (
          <ListingCard
            key={listing.id}
            id={listing.id}
            title={listing.title}
            image={listing.image}
            description={listing.description}
            price={listing.price}
            rating={listing.rating}
            verified={listing.verified}
          />
        ))}
      </div>

      {listings.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl text-neutral-600">No listings found.</p>
        </div>
      )}
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchContent />
    </Suspense>
  )
}
