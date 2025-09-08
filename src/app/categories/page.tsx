'use client'

import { listings, Listing } from '@/lib/data'
import ListingCard from '@/components/ListingCard'

export default function CategoriesPage() {
  const filteredListings = listings

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-primary">All Listings</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredListings.map((listing: Listing) => (
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

      {filteredListings.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl text-neutral-600">No listings found.</p>
        </div>
      )}
    </div>
  )
}
