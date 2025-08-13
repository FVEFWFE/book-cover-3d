import React, { useState, useRef, useEffect, useCallback } from 'react'
import { BookCover } from '../components/BookCover'

export default function Home() {
  const [rotation, setRotation] = useState(30)
  const [isDragging, setIsDragging] = useState(false)
  const [isDraggingFile, setIsDraggingFile] = useState(false)
  const [dragTarget, setDragTarget] = useState<'front' | 'back' | null>(null)
  const [frontCoverImage, setFrontCoverImage] = useState<string | null>(null)
  const [backCoverImage, setBackCoverImage] = useState<string | null>(null)
  const dragStartX = useRef(0)
  const startRotation = useRef(30)
  const containerRef = useRef<HTMLDivElement>(null)
  const frontFileInputRef = useRef<HTMLInputElement>(null)
  const backFileInputRef = useRef<HTMLInputElement>(null)

  // Book dimensions matching 1563x2500 aspect ratio
  const bookWidth = 250
  const bookHeight = 400  // Maintains the 0.625 aspect ratio
  const bookThickness = 60

  // Preset rotation angles
  const presetAngles = [
    { label: 'Front', angle: 0, icon: '⬅️' },
    { label: 'Quarter', angle: 30, icon: '↖️' },
    { label: 'Side', angle: 90, icon: '⬆️' },
    { label: 'Back Quarter', angle: 150, icon: '↗️' },
    { label: 'Back', angle: 180, icon: '➡️' },
  ]

  // Handle file upload for covers
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, coverType: 'front' | 'back') => {
    const file = event.target.files?.[0]
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string
        if (coverType === 'front') {
          setFrontCoverImage(dataUrl)
        } else {
          setBackCoverImage(dataUrl)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  // Handle drag and drop
  const handleDragOver = (e: React.DragEvent, coverType: 'front' | 'back') => {
    e.preventDefault()
    e.stopPropagation()
    setIsDraggingFile(true)
    setDragTarget(coverType)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDraggingFile(false)
    setDragTarget(null)
  }

  const handleDrop = (e: React.DragEvent, coverType: 'front' | 'back') => {
    e.preventDefault()
    e.stopPropagation()
    setIsDraggingFile(false)
    setDragTarget(null)

    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string
        if (coverType === 'front') {
          setFrontCoverImage(dataUrl)
        } else {
          setBackCoverImage(dataUrl)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
      
      switch(e.key) {
        case 'ArrowLeft':
          e.preventDefault()
          setRotation(r => r + 5)
          break
        case 'ArrowRight':
          e.preventDefault()
          setRotation(r => r - 5)
          break
        case 'r':
        case 'R':
          setRotation(30)
          break
        case '1':
          setRotation(0)
          break
        case '2':
          setRotation(30)
          break
        case '3':
          setRotation(90)
          break
        case '4':
          setRotation(150)
          break
        case '5':
          setRotation(180)
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [])

  // Default front cover design
  const defaultFrontCover = (
    <div style={{
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
      <div style={{ fontSize: '48px', marginBottom: '20px', opacity: 0.8 }}>📚</div>
      <h2 style={{ fontSize: '28px', margin: '0 0 10px 0', fontWeight: 'bold' }}>Your Book Title</h2>
      <p style={{ fontSize: '16px', margin: '0', opacity: 0.9 }}>Drop or upload your cover</p>
      <p style={{ fontSize: '14px', position: 'absolute', bottom: '30px', opacity: 0.8 }}>Author Name</p>
    </div>
  )

  // Default back cover design
  const defaultBackCover = (
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
        <p style={{ fontSize: '13px', lineHeight: '1.5', opacity: 0.9 }}>
          Drop your back cover image here or click to upload. 
          Perfect for book descriptions, reviews, ISBN, and pricing.
        </p>
      </div>
      <div style={{ opacity: 0.8 }}>
        <p style={{ fontSize: '12px', margin: '8px 0' }}>⭐⭐⭐⭐⭐ "Add your reviews!"</p>
        <p style={{ fontSize: '12px', margin: '8px 0' }}>ISBN: XXX-X-XXX-XXXXX-X</p>
        <p style={{ fontSize: '14px', margin: '8px 0', fontWeight: 'bold' }}>$XX.99</p>
      </div>
    </div>
  )

  // Front cover with uploaded image or default
  const frontCover = frontCoverImage ? (
    <img 
      src={frontCoverImage} 
      alt="Front Cover" 
      style={{ 
        width: '100%', 
        height: '100%', 
        objectFit: 'cover',
        display: 'block',
      }}
    />
  ) : defaultFrontCover

  // Back cover with uploaded image or default
  const backCover = backCoverImage ? (
    <img 
      src={backCoverImage} 
      alt="Back Cover" 
      style={{ 
        width: '100%', 
        height: '100%', 
        objectFit: 'cover',
        display: 'block',
      }}
    />
  ) : defaultBackCover

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    dragStartX.current = e.clientX
    startRotation.current = rotation
    e.preventDefault()
  }

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return
    
    const deltaX = e.clientX - dragStartX.current
    const newRotation = startRotation.current - (deltaX * 0.5)
    setRotation(newRotation)
  }, [isDragging])

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

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
  }, [isDragging, handleMouseMove, handleMouseUp])

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(to bottom, #f8f9fa, #e9ecef)',
      padding: '40px 20px',
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <header style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ 
            fontSize: 'clamp(32px, 5vw, 48px)', 
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '10px',
          }}>
            Interactive 3D Book Cover
          </h1>
          <p style={{ fontSize: 'clamp(14px, 2vw, 18px)', color: '#6c757d' }}>
            Drag & drop your covers • Rotate with mouse or keyboard • View in 3D
          </p>
          <p style={{ fontSize: 'clamp(12px, 1.5vw, 14px)', color: '#868e96', marginTop: '10px' }}>
            Book dimensions: {bookWidth}×{bookHeight}px • Use ← → arrow keys or 1-5 number keys
          </p>
        </header>

        {/* Upload Controls with Drag & Drop */}
        <section style={{ marginBottom: '40px' }}>
          <div style={{ 
            maxWidth: '800px',
            margin: '0 auto',
            padding: '30px',
            background: 'white',
            borderRadius: '16px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          }}>
            <h2 style={{ 
              fontSize: '24px', 
              marginBottom: '20px', 
              color: '#212529',
              textAlign: 'center',
            }}>
              📚 Upload Your Book Covers
            </h2>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '20px',
              marginBottom: '20px',
            }}>
              {/* Front Cover Upload with Drag & Drop */}
              <div
                onDragOver={(e) => handleDragOver(e, 'front')}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, 'front')}
                style={{
                  border: `2px dashed ${isDraggingFile && dragTarget === 'front' ? '#667eea' : '#cbd5e0'}`,
                  borderRadius: '12px',
                  padding: '20px',
                  transition: 'all 0.3s ease',
                  background: isDraggingFile && dragTarget === 'front' ? 'rgba(102, 126, 234, 0.05)' : 'transparent',
                }}
              >
                <input
                  ref={frontFileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, 'front')}
                  style={{ display: 'none' }}
                />
                
                {frontCoverImage && (
                  <div style={{ marginBottom: '15px', textAlign: 'center' }}>
                    <img 
                      src={frontCoverImage} 
                      alt="Front preview"
                      style={{
                        width: '80px',
                        height: '128px',
                        objectFit: 'cover',
                        borderRadius: '4px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                      }}
                    />
                  </div>
                )}
                
                <button
                  onClick={() => frontFileInputRef.current?.click()}
                  style={{
                    width: '100%',
                    padding: '12px',
                    background: frontCoverImage 
                      ? 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)'
                      : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <span style={{ fontSize: '20px' }}>📖</span>
                  <span>{frontCoverImage ? '✓ Front Cover' : 'Front Cover'}</span>
                  <span style={{ fontSize: '11px', opacity: 0.9 }}>Click or drop image</span>
                </button>
                
                {frontCoverImage && (
                  <button
                    onClick={() => setFrontCoverImage(null)}
                    style={{
                      width: '100%',
                      marginTop: '8px',
                      padding: '8px',
                      background: 'transparent',
                      color: '#e53e3e',
                      border: '1px solid #e53e3e',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '12px',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    Remove
                  </button>
                )}
              </div>

              {/* Back Cover Upload with Drag & Drop */}
              <div
                onDragOver={(e) => handleDragOver(e, 'back')}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, 'back')}
                style={{
                  border: `2px dashed ${isDraggingFile && dragTarget === 'back' ? '#764ba2' : '#cbd5e0'}`,
                  borderRadius: '12px',
                  padding: '20px',
                  transition: 'all 0.3s ease',
                  background: isDraggingFile && dragTarget === 'back' ? 'rgba(118, 75, 162, 0.05)' : 'transparent',
                }}
              >
                <input
                  ref={backFileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, 'back')}
                  style={{ display: 'none' }}
                />
                
                {backCoverImage && (
                  <div style={{ marginBottom: '15px', textAlign: 'center' }}>
                    <img 
                      src={backCoverImage} 
                      alt="Back preview"
                      style={{
                        width: '80px',
                        height: '128px',
                        objectFit: 'cover',
                        borderRadius: '4px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                      }}
                    />
                  </div>
                )}
                
                <button
                  onClick={() => backFileInputRef.current?.click()}
                  style={{
                    width: '100%',
                    padding: '12px',
                    background: backCoverImage 
                      ? 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)'
                      : 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <span style={{ fontSize: '20px' }}>📘</span>
                  <span>{backCoverImage ? '✓ Back Cover' : 'Back Cover'}</span>
                  <span style={{ fontSize: '11px', opacity: 0.9 }}>Click or drop image</span>
                </button>
                
                {backCoverImage && (
                  <button
                    onClick={() => setBackCoverImage(null)}
                    style={{
                      width: '100%',
                      marginTop: '8px',
                      padding: '8px',
                      background: 'transparent',
                      color: '#e53e3e',
                      border: '1px solid #e53e3e',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '12px',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>

            <p style={{ 
              textAlign: 'center', 
              color: '#6c757d',
              fontSize: '13px',
              margin: '0',
            }}>
              Supported: JPG, PNG, WebP, GIF • Recommended: 1563×2500px • Max: 10MB
            </p>
          </div>
        </section>

        {/* Rotation Controls */}
        <section style={{ marginBottom: '30px' }}>
          <div style={{ 
            maxWidth: '800px',
            margin: '0 auto',
            padding: '20px',
            background: 'white',
            borderRadius: '12px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
          }}>
            <div style={{ 
              display: 'flex', 
              flexWrap: 'wrap',
              gap: '10px',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <span style={{ 
                color: '#6c757d', 
                fontSize: '14px',
                marginRight: '10px',
              }}>
                Quick angles:
              </span>
              {presetAngles.map((preset) => (
                <button
                  key={preset.angle}
                  onClick={() => setRotation(preset.angle)}
                  style={{
                    padding: '8px 12px',
                    background: rotation === preset.angle 
                      ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                      : 'white',
                    color: rotation === preset.angle ? 'white' : '#495057',
                    border: rotation === preset.angle ? 'none' : '1px solid #dee2e6',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: '500',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <span>{preset.icon}</span>
                  <span>{preset.label}</span>
                </button>
              ))}
              
              <div style={{ 
                marginLeft: '20px',
                padding: '8px 12px',
                background: '#f8f9fa',
                borderRadius: '6px',
                fontSize: '13px',
                color: '#495057',
                fontWeight: '500',
              }}>
                {rotation.toFixed(0)}°
              </div>
            </div>
          </div>
        </section>

        {/* Side-by-Side Mode (Primary View) */}
        <section style={{ marginBottom: '60px' }}>
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <h2 style={{ fontSize: 'clamp(24px, 3vw, 32px)', marginBottom: '10px', color: '#212529' }}>
              👥 Side-by-Side 3D View
            </h2>
            <p style={{ color: '#6c757d', maxWidth: '600px', margin: '0 auto' }}>
              Both covers displayed as realistic 3D books • Drag to rotate manually
            </p>
          </div>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            padding: 'clamp(30px, 5vw, 60px) clamp(20px, 3vw, 40px)',
            background: 'white',
            borderRadius: '16px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
            minHeight: `${bookHeight + 120}px`,
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div 
              onMouseDown={handleMouseDown}
              style={{ 
                cursor: isDragging ? 'grabbing' : 'grab',
                userSelect: 'none',
              }}
            >
              <BookCover
                backCover={backCover}
                displayMode="side-by-side"
                rotate={rotation}
                width={bookWidth}
                height={bookHeight}
                thickness={bookThickness}
                rotateHover={rotation}
                transitionDuration={isDragging ? 0 : 0.3}
              >
                {frontCover}
              </BookCover>
            </div>
            
            {/* Rotation indicator */}
            <div style={{
              position: 'absolute',
              bottom: '20px',
              right: '20px',
              padding: '8px 12px',
              background: 'rgba(0,0,0,0.7)',
              color: 'white',
              borderRadius: '6px',
              fontSize: '12px',
              fontFamily: 'monospace',
            }}>
              Rotation: {rotation.toFixed(0)}°
            </div>
          </div>
        </section>

        {/* Flip Mode */}
        <section style={{ marginBottom: '60px' }}>
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <h2 style={{ fontSize: 'clamp(24px, 3vw, 32px)', marginBottom: '10px', color: '#212529' }}>
              🔄 Flip Animation Mode
            </h2>
            <p style={{ color: '#6c757d', maxWidth: '600px', margin: '0 auto' }}>
              Interactive page-turning effect between covers
            </p>
          </div>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            padding: 'clamp(30px, 5vw, 60px) clamp(20px, 3vw, 40px)',
            background: 'white',
            borderRadius: '16px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
            minHeight: `${bookHeight + 120}px`,
          }}>
            <BookCover
              backCover={backCover}
              displayMode="flip"
              rotate={30}
              showFlipControls={true}
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
          <p style={{ marginBottom: '10px' }}>Interactive 3D Book Cover Viewer</p>
          <p style={{ fontSize: '12px', opacity: 0.8 }}>
            Keyboard shortcuts: Arrow keys to rotate • 1-5 for presets • R to reset
          </p>
        </footer>
      </div>
    </div>
  )
}