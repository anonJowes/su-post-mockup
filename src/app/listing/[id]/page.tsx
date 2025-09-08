import { notFound } from 'next/navigation'
import Image from 'next/image'
import { MapPin, Clock, Shield } from 'lucide-react'
import { listings } from '@/lib/data'

interface PageProps {
  params: Promise<{
    id: string
  }>
}

export default async function ListingDetailPage({ params }: PageProps) {
  const resolvedParams = await params
  const listing = listings.find(l => l.id === resolvedParams.id)

  if (!listing) {
    notFound()
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-primary mb-2">{listing.title}</h1>
        <div className="flex items-center justify-center gap-4 text-[#525151]">
          <div className="flex items-center">
            <MapPin size={16} className="mr-1" />
            <span>{listing.location}</span>
          </div>
          <div className="flex items-center">
            <Clock size={16} className="mr-1" />
            <span>Posted {formatDate(listing.postedAt)}</span>
          </div>
        </div>
      </div>

      {/* Image and Details Side by Side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Image */}
        <div className="relative w-full h-80 lg:h-[400px] rounded-lg overflow-hidden shadow-lg">
          <Image
            src={listing.image}
            alt={listing.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Right Column - Details */}
        <div className="space-y-6">
          {/* Price Card */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary mb-2">
                ${listing.price}
              </div>
              <div className="text-sm text-[#525151] mb-4">
                {listing.category}
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center justify-center mb-4">
              <div className="flex text-yellow-400 mr-2">
                {'★'.repeat(Math.floor(listing.rating))}
                {'☆'.repeat(5 - Math.floor(listing.rating))}
              </div>
              <span className="text-lg font-semibold text-primary">
                {listing.rating}
              </span>
            </div>

            {/* Verified Badge */}
            {listing.verified && (
              <div className="flex items-center justify-center text-green-600 mb-4">
                <Shield size={20} className="mr-2" />
                <span className="font-medium">Verified Seller</span>
              </div>
            )}

            {/* Contact Button */}
            <button className="w-full bg-primary text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
              Contact Seller
            </button>
          </div>

          {/* Additional Info */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-primary mb-3">Listing Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-[#525151]">Category:</span>
                <span className="font-medium">{listing.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#525151]">Location:</span>
                <span className="font-medium">{listing.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#525151]">Posted:</span>
                <span className="font-medium">{formatDate(listing.postedAt)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#525151]">Rating:</span>
                <span className="font-medium">{listing.rating}/5</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Description and Tags Below */}
      <div className="space-y-6">
        {/* Description */}
        <div>
          <h2 className="text-2xl font-semibold text-primary mb-4">Description</h2>
          <p className="text-[#525151] leading-relaxed">{listing.description}</p>
        </div>

        {/* Tags */}
        {listing.tags && listing.tags.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold text-primary mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {listing.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                >
                  {tag.replace('+', ' & ')}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
