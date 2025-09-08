import { motion } from 'framer-motion'
import { Star, Shield } from 'lucide-react'
import Image from 'next/image'

interface ListingCardProps {
  id: string
  title: string
  image: string
  description: string
  price: number
  rating: number
  verified: boolean
}

const ListingCard = ({ title, image, description, price, rating, verified }: ListingCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      style={{ cursor: 'pointer' }}
    >
      <Image
        src={image}
        alt={title}
        width={400}
        height={300}
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-primary">{title}</h3>
          {verified && (
            <div className="flex items-center text-secondary">
              <Shield size={16} />
              <span className="ml-1 text-sm">Verified</span>
            </div>
          )}
        </div>
        <p className="text-neutral-600 text-sm mb-3 line-clamp-2">{description}</p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-secondary">${price}</span>
          <div className="flex items-center">
            <Star size={16} className="text-yellow-400 fill-current" />
            <span className="ml-1 text-sm text-neutral-600">{rating}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ListingCard
