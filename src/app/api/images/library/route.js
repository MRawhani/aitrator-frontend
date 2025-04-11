import { NextResponse } from 'next/server'

// Mock data for demonstration
const mockImages = [
  {
    _id: '1',
    prompt: 'A beautiful sunset over mountains',
    imageUrl: 'https://picsum.photos/800/600?random=1',
    product: {
      name: 'Phone Case',
      price: 29.99
    }
  },
  {
    _id: '2',
    prompt: 'Abstract geometric patterns',
    imageUrl: 'https://picsum.photos/800/600?random=2',
    product: {
      name: 'T-Shirt',
      price: 24.99
    }
  },
  {
    _id: '3',
    prompt: 'Ocean waves at sunset',
    imageUrl: 'https://picsum.photos/800/600?random=3',
    product: {
      name: 'Mug',
      price: 19.99
    }
  },
  {
    _id: '4',
    prompt: 'City skyline at night',
    imageUrl: 'https://picsum.photos/800/600?random=4',
    product: {
      name: 'Poster',
      price: 39.99
    }
  }
]

export async function GET() {
  try {
    // In a real application, this would fetch from your backend
    return NextResponse.json(mockImages)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch images' },
      { status: 500 }
    )
  }
} 