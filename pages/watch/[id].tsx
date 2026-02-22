import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import VideoPlayer from '../../components/VideoPlayer'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { getDetails } from '../../services/tmdb'
import { ContentDetails } from '../../types'

export default function WatchPage() {
  const router = useRouter()
  const { id, type, season, episode } = router.query
  const [item, setItem] = useState<ContentDetails | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id || !type) return
    const fetchItem = async () => {
      try {
        const data = await getDetails(type as string, id as string)
        setItem(data)
      } catch (error) {
        console.error('Failed to load item', error)
      } finally {
        setLoading(false)
      }
    }
    fetchItem()
  }, [id, type])

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#0f172a] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#0f172a] flex items-center justify-center">
        Content not found
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>{item.title || item.name} - Watching</title>
      </Head>
      {/* Background handled by parent, no fixed color */}
      <div className="min-h-screen bg-white dark:bg-[#0f172a]">
        <Header minimal />
        <main className="container mx-auto px-4 py-4">
          <VideoPlayer
            tmdbId={id as string}
            type={type as any}
            season={season ? parseInt(season as string) : 1}
            episode={episode ? parseInt(episode as string) : 1}
            title={item.title || item.name}
            customStreams={item.streams}
          />
        </main>
        <Footer />
      </div>
    </>
  )
}