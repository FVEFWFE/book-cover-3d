import React from 'react'
import { BookCover } from '../components/BookCover'

export default function Home() {
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
      fontFamily: 'system-ui, -apple-system, sans-serif',
    }}>
      <h2 style={{ fontSize: '24px', margin: '0 0 10px 0', fontWeight: 'bold' }}>The Great Book</h2>
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
      fontFamily: 'system-ui, -apple-system, sans-serif',
      boxSizing: 'border-box',
    }}>
      <div>
        <h3 style={{ fontSize: '16px', margin: '0 0 10px 0', fontWeight: 'bold' }}>About the Book</h3>
        <p style={{ fontSize: '11px', lineHeight: '1.4' }}>
          An extraordinary journey through time and space, exploring the depths of human emotion
          and the mysteries of the universe. This compelling narrative weaves together themes of
          love, loss, and redemption in a story that will captivate readers from the first page
          to the last.
        </p>
      </div>
      <div>
        <p style={{ fontSize: '10px', margin: '5px 0' }}>⭐⭐⭐⭐⭐ "A masterpiece!" - Book Review</p>
        <p style={{ fontSize: '10px', margin: '5px 0' }}>ISBN: 978-1-234-56789-0</p>
        <p style={{ fontSize: '12px', margin: '5px 0', fontWeight: 'bold' }}>$24.99</p>
      </div>
    </div>
  )

  const imageFrontCover = (
    <div style={{
      width: '100%',
      height: '100%',
      background: 'url(https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop) center/cover',
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'center',
      position: 'relative',
    }}>
      <div style={{
        background: 'rgba(0,0,0,0.7)',
        color: 'white',
        padding: '20px',
        width: '100%',
        textAlign: 'center',
        fontFamily: 'Georgia, serif',
      }}>
        <h3 style={{ margin: '0 0 5px 0', fontSize: '18px' }}>Classic Literature</h3>
        <p style={{ margin: 0, fontSize: '12px' }}>Timeless Stories</p>
      </div>
    </div>
  )

  const imageBackCover = (
    <div style={{
      width: '100%',
      height: '100%',
      background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px',
      color: 'white',
      fontFamily: 'Georgia, serif',
      boxSizing: 'border-box',
      textAlign: 'center',
    }}>
      <p style={{ fontSize: '12px', lineHeight: '1.6', fontStyle: 'italic' }}>
        "A collection that brings together the greatest works of literature,
        beautifully presented for the modern reader."
      </p>
      <p style={{ fontSize: '10px', marginTop: '20px' }}>www.classic-books.com</p>
    </div>
  )

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(to bottom, #f8f9fa, #e9ecef)',
      padding: '40px 20px',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <header style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h1 style={{ 
            fontSize: '48px', 
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '10px',
          }}>
            3D Book Cover Demo
          </h1>
          <p style={{ fontSize: '18px', color: '#6c757d' }}>
            Interactive 3D book covers with front and back support
          </p>
        </header>

        {/* Rotate Mode */}
        <section style={{ marginBottom: '80px' }}>
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <h2 style={{ fontSize: '32px', marginBottom: '10px', color: '#212529' }}>
              📚 Rotate Mode
            </h2>
            <p style={{ color: '#6c757d', maxWidth: '600px', margin: '0 auto' }}>
              Click the button to smoothly rotate the book and reveal the back cover. 
              Perfect for showcasing both sides with an elegant transition.
            </p>
          </div>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            padding: '60px 40px',
            background: 'white',
            borderRadius: '16px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
          }}>
            <BookCover
              backCover={backCover}
              displayMode="rotate"
              rotate={30}
              backRotate={-150}
              width={200}
              height={300}
            >
              {frontCover}
            </BookCover>
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
          }}>
            <BookCover
              backCover={backCover}
              displayMode="side-by-side"
              rotate={30}
              width={200}
              height={300}
            >
              {frontCover}
            </BookCover>
          </div>
        </section>

        {/* Flip Mode */}
        <section style={{ marginBottom: '80px' }}>
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <h2 style={{ fontSize: '32px', marginBottom: '10px', color: '#212529' }}>
              🔄 Flip Mode
            </h2>
            <p style={{ color: '#6c757d', maxWidth: '600px', margin: '0 auto' }}>
              Interactive flip animation that creates a realistic page-turning effect. 
              Engaging and smooth transition between covers.
            </p>
          </div>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            padding: '60px 40px',
            background: 'white',
            borderRadius: '16px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
          }}>
            <BookCover
              backCover={backCover}
              displayMode="flip"
              rotate={30}
              showFlipControls={true}
              width={200}
              height={300}
            >
              {frontCover}
            </BookCover>
          </div>
        </section>

        {/* With Images */}
        <section style={{ marginBottom: '80px' }}>
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <h2 style={{ fontSize: '32px', marginBottom: '10px', color: '#212529' }}>
              🖼️ With Image Covers
            </h2>
            <p style={{ color: '#6c757d', maxWidth: '600px', margin: '0 auto' }}>
              Use images or any React content for your covers. 
              Mix and match different styles for creative presentations.
            </p>
          </div>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            padding: '60px 40px',
            background: 'white',
            borderRadius: '16px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
          }}>
            <BookCover
              backCover={imageBackCover}
              displayMode="side-by-side"
              rotate={25}
              width={220}
              height={320}
              thickness={55}
            >
              {imageFrontCover}
            </BookCover>
          </div>
        </section>

        {/* Custom Styling */}
        <section style={{ marginBottom: '80px' }}>
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <h2 style={{ fontSize: '32px', marginBottom: '10px', color: '#212529' }}>
              🎨 Fully Customizable
            </h2>
            <p style={{ color: '#6c757d', maxWidth: '600px', margin: '0 auto' }}>
              Adjust dimensions, colors, thickness, rotation angles, and more. 
              Create the perfect 3D book mockup for your needs.
            </p>
          </div>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            padding: '60px 40px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '16px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
          }}>
            <BookCover
              backCover={backCover}
              displayMode="flip"
              width={250}
              height={350}
              thickness={70}
              rotate={45}
              rotateHover={15}
              bgColor="#2a2a2a"
              shadowColor="rgba(0,0,0,0.5)"
              radius={5}
              pagesOffset={5}
              transitionDuration={1.5}
            >
              {frontCover}
            </BookCover>
          </div>
        </section>

        {/* Code Example */}
        <section style={{ marginBottom: '40px' }}>
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <h2 style={{ fontSize: '32px', marginBottom: '10px', color: '#212529' }}>
              💻 Easy to Use
            </h2>
          </div>
          <div style={{ 
            background: '#1e293b',
            color: '#e2e8f0',
            padding: '30px',
            borderRadius: '16px',
            fontFamily: 'monospace',
            fontSize: '14px',
            overflow: 'auto',
          }}>
            <pre style={{ margin: 0 }}>
{`import { BookCover } from 'book-cover-3d'

// Basic usage with back cover
<BookCover backCover={backContent}>
  {frontContent}
</BookCover>

// Side-by-side display
<BookCover 
  backCover={backContent}
  displayMode="side-by-side"
>
  {frontContent}
</BookCover>

// Interactive flip mode
<BookCover 
  backCover={backContent}
  displayMode="flip"
  showFlipControls={true}
>
  {frontContent}
</BookCover>`}
            </pre>
          </div>
        </section>

        <footer style={{ 
          textAlign: 'center', 
          padding: '40px 0',
          borderTop: '1px solid #dee2e6',
          marginTop: '80px',
          color: '#6c757d',
        }}>
          <p>Created with ❤️ using React and CSS3 transforms</p>
          <p style={{ marginTop: '10px' }}>
            <a 
              href="https://github.com/scastiel/book-cover-3d" 
              style={{ color: '#667eea', textDecoration: 'none' }}
            >
              View on GitHub
            </a>
          </p>
        </footer>
      </div>
    </div>
  )
}