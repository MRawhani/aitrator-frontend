import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const FeatureCard = dynamic(() => import('../components/FeatureCard'), {
  loading: () => <div className="p-6 bg-gray-100 rounded-lg animate-pulse h-40" />
})

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8">Welcome to Aitrator</h1>
      <p className="text-xl mb-4">Your AI Image Generation Platform</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Suspense fallback={<div className="p-6 bg-gray-100 rounded-lg animate-pulse h-40" />}>
          <FeatureCard
            title="Generate Images"
            description="Create stunning AI-generated images with our advanced tools."
            link="/generate"
          />
        </Suspense>
        <Suspense fallback={<div className="p-6 bg-gray-100 rounded-lg animate-pulse h-40" />}>
          <FeatureCard
            title="Image Library"
            description="Browse and manage your generated images."
            link="/library"
          />
        </Suspense>
        <Suspense fallback={<div className="p-6 bg-gray-100 rounded-lg animate-pulse h-40" />}>
          <FeatureCard
            title="Cart"
            description="Manage your selected images and purchases."
            link="/cart"
          />
        </Suspense>
      </div>
    </main>
  )
} 