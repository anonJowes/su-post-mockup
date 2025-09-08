'use client'

import { useForm } from 'react-hook-form'
import { useState } from 'react'

interface FormData {
  name: string
  email: string
  phone?: string
  password: string
  confirmPassword: string
  emailVerified: boolean
  phoneVerified: boolean
}

export default function ProfilePage() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>()
  const [submitted, setSubmitted] = useState(false)

  const onSubmit = (data: FormData) => {
    if (data.password !== data.confirmPassword) {
      alert('Passwords do not match')
      return
    }
    console.log('Registration data:', data)
    setSubmitted(true)
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-primary mb-6">User Registration</h1>

      {submitted && (
        <div className="p-4 bg-green-100 text-green-800 rounded mb-6">
          Registration successful! Please check your email for verification.
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="name" className="block font-semibold mb-1">Name</label>
          <input
            id="name"
            {...register('name', { required: 'Name is required' })}
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.name ? 'border-red-500' : 'border-neutral-300'
            }`}
          />
          {errors.name && <p className="text-red-600 mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block font-semibold mb-1">Email</label>
          <input
            id="email"
            type="email"
            {...register('email', { required: 'Email is required' })}
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.email ? 'border-red-500' : 'border-neutral-300'
            }`}
          />
          {errors.email && <p className="text-red-600 mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="phone" className="block font-semibold mb-1">Phone (optional)</label>
          <input
            id="phone"
            type="tel"
            {...register('phone')}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary border-neutral-300"
          />
        </div>

        <div>
          <label htmlFor="password" className="block font-semibold mb-1">Password</label>
          <input
            id="password"
            type="password"
            {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } })}
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.password ? 'border-red-500' : 'border-neutral-300'
            }`}
          />
          {errors.password && <p className="text-red-600 mt-1">{errors.password.message}</p>}
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block font-semibold mb-1">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            {...register('confirmPassword', { required: 'Please confirm your password' })}
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.confirmPassword ? 'border-red-500' : 'border-neutral-300'
            }`}
          />
          {errors.confirmPassword && <p className="text-red-600 mt-1">{errors.confirmPassword.message}</p>}
        </div>

        <div className="flex items-center space-x-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              {...register('emailVerified')}
              className="form-checkbox h-5 w-5 text-primary"
            />
            <span className="ml-2">Email Verified</span>
          </label>

          <label className="inline-flex items-center">
            <input
              type="checkbox"
              {...register('phoneVerified')}
              className="form-checkbox h-5 w-5 text-primary"
            />
            <span className="ml-2">Phone Verified (optional)</span>
          </label>
        </div>

        <button
          type="submit"
          className="btn-primary w-full py-3 font-semibold text-lg"
        >
          Register
        </button>
      </form>
    </div>
  )
}
