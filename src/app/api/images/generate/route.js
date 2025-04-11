import { NextResponse } from 'next/server'

// Mock image generation function
const generateMockImages = (prompt) => {
  // In a real application, this would call an actual image generation API
  return [
    {
      _id: Math.random().toString(36).substr(2, 9),
      prompt,
      imageUrl: `https://picsum.photos/800/600?random=${Math.random()}`,
      createdAt: new Date().toISOString()
    },
    {
      _id: Math.random().toString(36).substr(2, 9),
      prompt,
      imageUrl: `https://picsum.photos/800/600?random=${Math.random()}`,
      createdAt: new Date().toISOString()
    },
    {
      _id: Math.random().toString(36).substr(2, 9),
      prompt,
      imageUrl: `https://picsum.photos/800/600?random=${Math.random()}`,
      createdAt: new Date().toISOString()
    }
  ]
}

export async function POST(request) {
  try {
    const { productId, prompt } = await request.json()

    if (!productId || !prompt) {
      return NextResponse.json(
        { error: 'Product ID and prompt are required' },
        { status: 400 }
      )
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Generate mock images
    const images = generateMockImages(prompt)

    return NextResponse.json(images)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to generate images' },
      { status: 500 }
    )
  }
} 