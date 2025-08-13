import React from 'react'
import { BookCover } from './index'

/**
 * Example usage of the enhanced BookCover component with back cover support
 */

export const BookCoverExamples = () => {
  // Example book cover content
  const frontCover = (
    <div style={{
      width: '100%',
      height: '100%',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white',
      fontFamily: 'Arial, sans-serif',
    }}>
      <h2 style={{ fontSize: '24px', margin: '0 0 10px 0' }}>The Great Book</h2>
      <p style={{ fontSize: '14px', margin: '0' }}>A Novel</p>
      <p style={{ fontSize: '12px', position: 'absolute', bottom: '20px' }}>John Doe</p>
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
      padding: '20px',
      color: 'white',
      fontFamily: 'Arial, sans-serif',
      boxSizing: 'border-box',
    }}>
      <div>
        <h3 style={{ fontSize: '16px', margin: '0 0 10px 0' }}>About the Book</h3>
        <p style={{ fontSize: '11px', lineHeight: '1.4' }}>
          An extraordinary journey through time and space, exploring the depths of human emotion
          and the mysteries of the universe.
        </p>
      </div>
      <div>
        <p style={{ fontSize: '10px', margin: '5px 0' }}>ISBN: 978-1-234-56789-0</p>
        <p style={{ fontSize: '10px', margin: '5px 0' }}>$24.99</p>
      </div>
    </div>
  )

  return (
    <div style={{ padding: '40px' }}>
      <h1>Book Cover 3D - Front & Back Cover Examples</h1>
      
      {/* Example 1: Rotate Mode (Default) */}
      <section style={{ marginBottom: '60px' }}>
        <h2>1. Rotate Mode</h2>
        <p>Click the button to rotate the book and see the back cover. The book rotates 180 degrees to reveal the back.</p>
        <div style={{ display: 'flex', justifyContent: 'center', padding: '40px', background: '#f5f5f5' }}>
          <BookCover
            backCover={backCover}
            displayMode="rotate"
            rotate={30}
            backRotate={-150}
          >
            {frontCover}
          </BookCover>
        </div>
      </section>

      {/* Example 2: Side-by-Side Mode */}
      <section style={{ marginBottom: '60px' }}>
        <h2>2. Side-by-Side Mode</h2>
        <p>Both covers are displayed as separate 3D mockups side by side.</p>
        <div style={{ display: 'flex', justifyContent: 'center', padding: '40px', background: '#f5f5f5' }}>
          <BookCover
            backCover={backCover}
            displayMode="side-by-side"
            rotate={30}
          >
            {frontCover}
          </BookCover>
        </div>
      </section>

      {/* Example 3: Flip Mode */}
      <section style={{ marginBottom: '60px' }}>
        <h2>3. Flip Mode</h2>
        <p>Interactive flip animation between front and back covers.</p>
        <div style={{ display: 'flex', justifyContent: 'center', padding: '40px', background: '#f5f5f5' }}>
          <BookCover
            backCover={backCover}
            displayMode="flip"
            rotate={30}
            showFlipControls={true}
          >
            {frontCover}
          </BookCover>
        </div>
      </section>

      {/* Example 4: Using Images */}
      <section style={{ marginBottom: '60px' }}>
        <h2>4. With Image Covers</h2>
        <p>You can also use images for both front and back covers.</p>
        <div style={{ display: 'flex', justifyContent: 'center', padding: '40px', background: '#f5f5f5' }}>
          <BookCover
            backCover={
              <img 
                src="https://via.placeholder.com/200x300/764ba2/ffffff?text=Back+Cover" 
                alt="Back Cover"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            }
            displayMode="side-by-side"
            rotate={30}
          >
            <img 
              src="https://via.placeholder.com/200x300/667eea/ffffff?text=Front+Cover" 
              alt="Front Cover"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </BookCover>
        </div>
      </section>

      {/* Example 5: Custom Settings */}
      <section style={{ marginBottom: '60px' }}>
        <h2>5. Custom Settings with Back Cover</h2>
        <p>Fully customized book with different dimensions and colors.</p>
        <div style={{ display: 'flex', justifyContent: 'center', padding: '40px', background: '#f5f5f5' }}>
          <BookCover
            backCover={backCover}
            displayMode="flip"
            width={250}
            height={350}
            thickness={60}
            rotate={45}
            rotateHover={20}
            bgColor="#2a2a2a"
            shadowColor="#666666"
            radius={5}
            pagesOffset={5}
          >
            {frontCover}
          </BookCover>
        </div>
      </section>

      {/* Usage Examples Code */}
      <section>
        <h2>Usage Examples</h2>
        <pre style={{ background: '#f5f5f5', padding: '20px', borderRadius: '8px', overflow: 'auto' }}>
{`// Rotate Mode (Default)
<BookCover
  backCover={backCoverContent}
  displayMode="rotate"
  backRotate={-150}
>
  {frontCoverContent}
</BookCover>

// Side-by-Side Mode
<BookCover
  backCover={backCoverContent}
  displayMode="side-by-side"
>
  {frontCoverContent}
</BookCover>

// Flip Mode
<BookCover
  backCover={backCoverContent}
  displayMode="flip"
  showFlipControls={true}
>
  {frontCoverContent}
</BookCover>

// Without Back Cover (works like before)
<BookCover>
  {frontCoverContent}
</BookCover>`}
        </pre>
      </section>
    </div>
  )
}

export default BookCoverExamples