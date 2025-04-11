import { NextResponse } from 'next/server'

// Mock cart items data
const mockCartItems = [
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
  }
]

export async function GET() {
  try {
    // In a real application, this would fetch from your backend
    return NextResponse.json(mockCartItems)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch cart items' },
      { status: 500 }
    )
  }
} 