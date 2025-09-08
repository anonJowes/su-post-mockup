'use client'

import { useState, useEffect } from 'react'
import { Search, Filter } from 'lucide-react'

interface SearchBarProps {
  onSearch: (query: string, filters: SearchFilters) => void
}

interface SearchFilters {
  category: string
  priceRange: string
  location: string
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState('')
  const [filters, setFilters] = useState<SearchFilters>({
    category: '',
    priceRange: '',
    location: '',
  })
  const [showFilters, setShowFilters] = useState(false)

  // Real-time search - trigger search whenever query or filters change
  useEffect(() => {
    onSearch(query, filters)
  }, [query, filters, onSearch])

  const categories = ['Electronics', 'Clothing', 'Books', 'Home & Garden', 'Vehicles', 'Services', 'Campus Job', 'Community']
  const priceRanges = ['Under $50', '$50-$100', '$100-$500', '$500-$1000', 'Over $1000']
  const locations = ['Stanford', 'Palo Alto', 'Berkeley', 'San Francisco', 'San Jose', 'Mountain View', 'Sunnyvale', 'Menlo Park', 'Oakland', 'Los Angeles', 'New York', 'Chicago']

  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search for items..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-4 py-3 pl-12 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <Search className="absolute left-3 top-3.5 text-neutral-400" size={20} />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="btn-primary flex items-center gap-2"
        >
          <Filter size={20} />
          Filters
        </button>
        <button className="btn-secondary opacity-50 cursor-not-allowed" disabled>
          Search
        </button>
      </div>

      {showFilters && (
        <div className="mt-4 p-4 bg-white border border-neutral-300 rounded-lg shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Category
              </label>
              <select
                value={filters.category}
                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Price Range
              </label>
              <select
                value={filters.priceRange}
                onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
                className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Any Price</option>
                {priceRanges.map((range) => (
                  <option key={range} value={range}>
                    {range}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Location
              </label>
              <select
                value={filters.location}
                onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Any Location</option>
                {locations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SearchBar
