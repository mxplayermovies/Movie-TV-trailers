import React from 'react'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative h-[80vh] bg-gradient-to-r from-blue-900 to-purple-900 text-white">
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to Movie & TV trailers</h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl">
          Stream the latest movies, TV shows, sports, and more – all in one place.
        </p>
        <Link
          href="/movies"
          className="px-8 py-3 bg-red-600 hover:bg-red-700 rounded-full font-bold text-lg transition"
        >
          Browse Now
        </Link>
      </div>
    </section>
  )
}