'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { categories, additionalCategories } from '@/lib/data'

const Sidebar = () => {
  const pathname = usePathname()
  const selectedCategory = pathname?.split('/')[2] || ''

  return (
    <aside className="hidden lg:block w-full h-full overflow-y-auto bg-white p-6 border-r border-gray-200 shadow-sm">
      <h2 className="text-xl font-bold mb-4 text-primary">Categories</h2>
      <ul className="space-y-2">
        {categories.map((category) => {
          const isSelected = category.toLowerCase() === selectedCategory.toLowerCase()
          return (
            <li key={category}>
              <Link
                href={`/categories/${category.toLowerCase().replace(/\s+/g, '-')}`}
                className={`block px-3 py-2 rounded-md font-medium transition-colors ${
                  isSelected
                    ? 'bg-primary text-white'
                    : 'text-[#525151] hover:bg-primary hover:text-white'
                }`}
              >
                {category}
              </Link>
            </li>
          )
        })}
      </ul>

      <hr className="my-6 border-gray-300" />

      <ul className="space-y-2">
        {additionalCategories.map((category) => {
          const href = category === 'Community' ? '/community' : `/categories/${category.toLowerCase().replace(/\s+/g, '-')}`
          const isSelected = category === 'Community'
            ? pathname === '/community'
            : category.toLowerCase() === selectedCategory.toLowerCase()
          return (
            <li key={category}>
              <Link
                href={href}
                className={`block px-3 py-2 rounded-md font-medium transition-colors ${
                  isSelected
                    ? 'bg-primary text-white'
                    : 'text-[#525151] hover:bg-primary hover:text-white'
                }`}
              >
                {category}
              </Link>
            </li>
          )
        })}
      </ul>
    </aside>
  )
}

export default Sidebar
