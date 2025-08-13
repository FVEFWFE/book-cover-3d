import React, { useState, useRef, useEffect } from 'react'
import { BookCover } from '../components/BookCover'

export default function Home() {
  const [rotation, setRotation] = useState(30)
  const [isDragging, setIsDragging] = useState(false)
  const dragStartX = useRef(0)
  const startRotation = useRef(30)
  const containerRef = useRef<HTMLDivElement>(null)

  // Book dimensions matching 1563x2500 aspect ratio
  const bookWidth = 250
  const bookHeight = 400  // Maintains the 0.625 aspect ratio
  const bookThickness = 60

  // Front cover with image (update path when image is available)
  const frontCover = (
    <div style={{
      width: '100%',
      height: '100%',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Try to load the actual book cover image */}
      <img 
        src="/images/front-cover-only-final.png" 
        alt="Book Cover" 
        style={{ 
          width: '100%', 
          height: '100%', 
          objectFit: 'cover',
          display: 'block',
        }}
        onError={(e) => {
          // Hide image if it fails to load and show fallback
          (e.target as HTMLImageElement).style.display = 'none';
        }}
      />
      {/* Fallback gradient design */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}>
        <h2 style={{ fontSize: '28px', margin: '0 0 10px 0', fontWeight: 'bold' }}>The Great Book</h2>
        <p style={{ fontSize: '16px', margin: '0' }}>A Novel</p>
        <p style={{ fontSize: '14px', position: 'absolute', bottom: '30px' }}>John Doe</p>
        <p style={{ 
          fontSize: '12px', 
          position: 'absolute', 
          top: '20px',
          padding: '5px 10px',
          background: 'rgba(0,0,0,0.3)',
          borderRadius: '4px',
        }}>
          Add your image: /demo/public/images/front-cover-only-final.png
        </p>
      </div>
    </div>
  )

  const backCover = (
    <div style={{
      width: '100%',
      height: '100%',
      background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '25px',
      color: 'white',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      boxSizing: 'border-box',
    }}>
      <div>
        <h3 style={{ fontSize: '18px', margin: '0 0 15px 0', fontWeight: 'bold' }}>About the Book</h3>
        <p style={{ fontSize: '13px', lineHeight: '1.5' }}>
          An extraordinary journey through time and space, exploring the depths of human emotion
          and the mysteries of the universe. This compelling narrative weaves together themes of
          love, loss, and redemption in a story that will captivate readers from the first page
          to the last.
        </p>
      </div>
      <div>
        <p style={{ fontSize: '12px', margin: '8px 0' }}>⭐⭐⭐⭐⭐ "A masterpiece!" - Book Review</p>
        <p style={{ fontSize: '12px', margin: '8px 0' }}>ISBN: 978-1-234-56789-0</p>
        <p style={{ fontSize: '14px', margin: '8px 0', fontWeight: 'bold' }}>$24.99</p>
      </div>
    </div>
  )

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    dragStartX.current = e.clientX
    startRotation.current = rotation
    e.preventDefault()
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return
    
    const deltaX = e.clientX - dragStartX.current
    const newRotation = startRotation.current - (deltaX * 0.5) // Negative for natural drag direction
    setRotation(newRotation)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      document.body.style.cursor = 'grabbing'
      document.body.style.userSelect = 'none'
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
        document.body.style.cursor = 'auto'
        document.body.style.userSelect = 'auto'
      }
    }
  }, [isDragging])

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(to bottom, #f8f9fa, #e9ecef)',
      padding: '40px 20px',
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <header style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h1 style={{ 
            fontSize: '48px', 
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '10px',
          }}>
            Interactive 3D Book Cover
          </h1>
          <p style={{ fontSize: '18px', color: '#6c757d' }}>
            Drag to rotate • Flip between covers • View side-by-side
          </p>
          <p style={{ fontSize: '14px', color: '#868e96', marginTop: '10px' }}>
            Book dimensions: {bookWidth}×{bookHeight}px (matching 1563×2500 aspect ratio)
          </p>
        </header>

        {/* Flip Mode with Draggable Rotation */}
        <section style={{ marginBottom: '80px' }}>
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <h2 style={{ fontSize: '32px', marginBottom: '10px', color: '#212529' }}>
              🔄 Flip Mode with Drag Rotation
            </h2>
            <p style={{ color: '#6c757d', maxWidth: '600px', margin: '0 auto' }}>
              Click and drag to rotate the book horizontally. Use the flip button to see the back cover.
            </p>
          </div>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            padding: '60px 40px',
            background: 'white',
            borderRadius: '16px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
            position: 'relative',
            minHeight: `${bookHeight + 120}px`,
          }}>
            <div 
              ref={containerRef}
              onMouseDown={handleMouseDown}
              style={{ 
                cursor: isDragging ? 'grabbing' : 'grab',
                userSelect: 'none',
              }}
            >
              <BookCover
                backCover={backCover}
                displayMode="flip"
                rotate={rotation}
                showFlipControls={true}
                width={bookWidth}
                height={bookHeight}
                thickness={bookThickness}
                rotateHover={rotation} // Keep the same rotation on hover
                transitionDuration={isDragging ? 0 : 1} // No transition while dragging
              >
                {frontCover}
              </BookCover>
            </div>
          </div>
          
          <div style={{ 
            textAlign: 'center', 
            marginTop: '30px',
            color: '#6c757d',
          }}>
            <p style={{ fontSize: '14px', marginBottom: '10px' }}>
              Current rotation: {rotation.toFixed(0)}°
            </p>
            <button
              onClick={() => setRotation(30)}
              style={{
                padding: '8px 16px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.15)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}
            >
              Reset Rotation
            </button>
          </div>
        </section>

        {/* Side-by-Side Mode */}
        <section style={{ marginBottom: '80px' }}>
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <h2 style={{ fontSize: '32px', marginBottom: '10px', color: '#212529' }}>
              👥 Side-by-Side Mode
            </h2>
            <p style={{ color: '#6c757d', maxWidth: '600px', margin: '0 auto' }}>
              Display both covers simultaneously as separate 3D mockups. 
              Ideal for comparing front and back designs at a glance.
            </p>
          </div>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            padding: '60px 40px',
            background: 'white',
            borderRadius: '16px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
            minHeight: `${bookHeight + 120}px`,
          }}>
            <BookCover
              backCover={backCover}
              displayMode="side-by-side"
              rotate={30}
              width={bookWidth}
              height={bookHeight}
              thickness={bookThickness}
            >
              {frontCover}
            </BookCover>
          </div>
        </section>

        <footer style={{ 
          textAlign: 'center', 
          padding: '40px 0',
          borderTop: '1px solid #dee2e6',
          marginTop: '80px',
          color: '#6c757d',
        }}>
          <p>Interactive 3D Book Cover with Multiple Display Modes</p>
        </footer>
      </div>
    </div>
  )
}