import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const { imageId } = await request.json()

    if (!imageId) {
      return NextResponse.json(
        { error: 'Image ID is required' },
        { status: 400 }
      )
    }

    // In a real application, this would:
    // 1. Verify the image exists
    // 2. Add it to the user's cart in the database
    // 3. Return the updated cart

    // For now, we'll just return a success message
    return NextResponse.json({ 
      message: 'Item added to cart successfully',
      imageId 
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to add item to cart' },
      { status: 500 }
    )
  }
} 