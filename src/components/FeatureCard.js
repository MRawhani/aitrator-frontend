import Link from 'next/link'

export default function FeatureCard({ title, description, link }) {
  return (
    <Link href={link} className="block">
      <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
        <h2 className="text-2xl font-semibold mb-4">{title}</h2>
        <p className="text-gray-600">{description}</p>
      </div>
    </Link>
  )
} 