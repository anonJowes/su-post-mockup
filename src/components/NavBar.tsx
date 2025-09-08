'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Menu, X, Search, Tag, MapPin } from 'lucide-react'
import { listings as allListings, Listing } from '@/lib/data'

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredListings, setFilteredListings] = useState<Listing[]>([])
  const [showResults, setShowResults] = useState(false)
  const router = useRouter()

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Categories', href: '/categories' },
    { name: 'Community', href: '/categories/community' },
    { name: 'Search', href: '/search' },
    { name: 'Profile', href: '/profile' },
  ]

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredListings([])
      setShowResults(false)
      return
    }
    const filtered = allListings.filter((listing) =>
      listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.description.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 5) // Limit to 5 results for navbar
    setFilteredListings(filtered)
    setShowResults(filtered.length > 0)
  }, [searchQuery])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery('')
      setShowResults(false)
      setIsOpen(false) // Close mobile menu after search
    }
  }

  const handleResultClick = (listingId: string) => {
    router.push(`/listing/${listingId}`)
    setSearchQuery('')
    setShowResults(false)
    setIsOpen(false)
  }

  return (
    <nav className="bg-primary shadow-lg border-b border-neutral-200 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-2 sm:px-10 lg:px-0">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Link href="/" className="flex flex-col leading-none">
              <div className="flex items-center space-x-1">
                <span className="font-extrabold text-4xl text-primary tracking-tight drop-shadow-[0_2px_4px_rgba(255,255,255,0.8)] select-none font-sans" style={{ fontFamily: "'Stencil Std', 'Stencil', 'Arial Black', 'Arial Bold', sans-serif" }}>
                  SU
                </span>
                <span className="font-extrabold p-[-10px] text-2xl text-secondary drop-shadow-[0_2px_4px_rgba(255,255,255,230.8)] select-none">
                  Post
                </span>
              </div>
              <span className="text-xs ml-6 mt-[-5px] text-gray-400 font-semibold select-none">
                Sell your stuff.
              </span>
            </Link>
          </div>

          {/* Centered Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-sm mx-6 relative">
            <form onSubmit={handleSearch} className="relative w-full">
              <input
                type="text"
                placeholder="Search listings..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pl-12 pr-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/20 transition-all duration-300"
              />
              <button type="submit" className="absolute left-4 top-3.5 text-white/70 hover:text-white transition-colors" aria-label="Search">
                <Search size={18} />
              </button>
            </form>

            {/* Real-time Search Results Dropdown */}
            {showResults && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-neutral-200 max-h-80 overflow-y-auto z-50">
                {filteredListings.map((listing) => (
                  <div
                    key={listing.id}
                    onClick={() => handleResultClick(listing.id)}
                    className="px-4 py-3 hover:bg-neutral-50 cursor-pointer border-b border-neutral-100 last:border-b-0"
                  >
                    <div className="flex items-center space-x-3">
            <Image
              src={listing.image}
              alt={listing.title}
              width={48}
              height={48}
              className="w-12 h-12 object-cover rounded-md"
            />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-neutral-900 truncate">
                          {listing.title}
                        </h4>
                        <p className="text-sm text-neutral-500 truncate">
                          {listing.description}
                        </p>
                        <p className="text-sm font-semibold text-primary">
                          ${listing.price}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                {filteredListings.length > 0 && (
                  <div className="px-4 py-2 bg-neutral-50 border-t border-neutral-200">
                    <button
                      onClick={handleSearch}
                      className="w-full text-center text-sm text-primary hover:text-primary/80 font-medium"
                    >
                      View all results →
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Location */}
            <div className="hidden lg:flex items-center text-white">
              <MapPin size={16} className="mr-1" />
              <span className="text-sm font-medium">Stanford, California</span>
            </div>

            {/* Post Button */}
            <Link href="/post" className="bg-secondary hover:bg-red-700 text-white px-4 py-2 rounded-full flex items-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
              <Tag size={18} />
              <span className="hidden sm:inline font-medium">Post</span>
            </Link>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-neutral-600 hover:text-primary"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-neutral-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {/* Mobile Search */}
              <div className="px-3 py-2 relative">
                <form onSubmit={handleSearch} className="relative">
                  <input
                    type="text"
                    placeholder="Search listings..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-3 pl-12 pr-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/20 transition-all duration-300"
                  />
                  <button type="submit" className="absolute left-4 top-3.5 text-white/70 hover:text-white transition-colors" aria-label="Search">
                    <Search size={18} />
                  </button>
                </form>

                {/* Mobile Real-time Search Results */}
                {showResults && (
                  <div className="mt-2 bg-white rounded-lg shadow-lg border border-neutral-200 max-h-60 overflow-y-auto">
                    {filteredListings.map((listing) => (
                      <div
                        key={listing.id}
                        onClick={() => handleResultClick(listing.id)}
                        className="px-4 py-3 hover:bg-neutral-50 cursor-pointer border-b border-neutral-100 last:border-b-0"
                      >
                        <div className="flex items-center space-x-3">
                          <Image
                            src={listing.image}
                            alt={listing.title}
                            width={40}
                            height={40}
                            className="w-10 h-10 object-cover rounded-md"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium text-neutral-900 truncate">
                              {listing.title}
                            </h4>
                            <p className="text-sm text-neutral-500 truncate">
                              ${listing.price}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                    {filteredListings.length > 0 && (
                      <div className="px-4 py-2 bg-neutral-50 border-t border-neutral-200">
                        <button
                          onClick={handleSearch}
                          className="w-full text-center text-sm text-primary hover:text-primary/80 font-medium"
                        >
                          View all results →
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Mobile Location */}
              <div className="px-3 py-2 flex items-center text-white">
                <MapPin size={16} className="mr-2" />
                <span className="text-sm">Stanford, California</span>
              </div>

              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-base font-medium text-white hover:text-neutral-200 hover:bg-primary/80"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default NavBar
