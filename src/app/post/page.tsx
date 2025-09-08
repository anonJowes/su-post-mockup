'use client'

import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { categories } from '@/lib/data'

interface FormData {
  title: string
  description: string
  price: number
  category: string
  location: string
  imageUrl: string
}

export default function PostPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>()
  const [submitted, setSubmitted] = useState(false)

  const onSubmit = (data: FormData) => {
    console.log('Form submitted:', data)
    setSubmitted(true)
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-primary mb-6">Post a New Listing</h1>

      {submitted ? (
        <div className="p-4 bg-green-100 text-green-800 rounded mb-6">
          Your listing has been submitted successfully!
        </div>
      ) : null}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="title" className="block font-semibold mb-1">Title</label>
          <input
            id="title"
            {...register('title', { required: 'Title is required' })}
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.title ? 'border-red-500' : 'border-neutral-300'
            }`}
          />
          {errors.title && <p className="text-red-600 mt-1">{errors.title.message}</p>}
        </div>

        <div>
          <label htmlFor="description" className="block font-semibold mb-1">Description</label>
          <textarea
            id="description"
            {...register('description', { required: 'Description is required' })}
            rows={4}
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.description ? 'border-red-500' : 'border-neutral-300'
            }`}
          />
          {errors.description && <p className="text-red-600 mt-1">{errors.description.message}</p>}
        </div>

        <div>
          <label htmlFor="price" className="block font-semibold mb-1">Price ($)</label>
          <input
            id="price"
            type="number"
            step="0.01"
            {...register('price', { required: 'Price is required', min: { value: 0, message: 'Price must be positive' } })}
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.price ? 'border-red-500' : 'border-neutral-300'
            }`}
          />
          {errors.price && <p className="text-red-600 mt-1">{errors.price.message}</p>}
        </div>

        <div>
          <label htmlFor="category" className="block font-semibold mb-1">Category</label>
          <select
            id="category"
            {...register('category', { required: 'Category is required' })}
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.category ? 'border-red-500' : 'border-neutral-300'
            }`}
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          {errors.category && <p className="text-red-600 mt-1">{errors.category.message}</p>}
        </div>

        <div>
          <label htmlFor="location" className="block font-semibold mb-1">Location</label>
          <input
            id="location"
            {...register('location', { required: 'Location is required' })}
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.location ? 'border-red-500' : 'border-neutral-300'
            }`}
          />
          {errors.location && <p className="text-red-600 mt-1">{errors.location.message}</p>}
        </div>

        <div>
          <label htmlFor="imageUrl" className="block font-semibold mb-1">Image URL</label>
          <input
            id="imageUrl"
            {...register('imageUrl', { required: 'Image URL is required' })}
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.imageUrl ? 'border-red-500' : 'border-neutral-300'
            }`}
          />
          {errors.imageUrl && <p className="text-red-600 mt-1">{errors.imageUrl.message}</p>}
        </div>

        <button
          type="submit"
          className="btn-primary w-full py-3 font-semibold text-lg"
        >
          Submit Listing
        </button>
      </form>
    </div>
  )
}
