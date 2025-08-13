import React, { useMemo, useState } from 'react'

export type DisplayMode = 'rotate' | 'side-by-side' | 'flip'

export interface Settings {
  /**
   * Rotation of the book, in degrees.
   */
  rotate: number
  /**
   * Rotation of the book on hover, in degrees.
   */
  rotateHover: number
  /**
   * Perspective value. 600 seems to be a realistic value.
   */
  perspective: number
  /**
   * Duration of rotate animation, in milliseconds.
   */
  transitionDuration: number
  /**
   * Radius of right corners, in pixels.
   */
  radius: number
  /**
   * Book thickness, in pixels.
   */
  thickness: number
  /**
   * Color of the inside of back cover.
   */
  bgColor: string
  /**
   * Color of box shadow.
   */
  shadowColor: string
  /**
   * Width of the book, in pixels.
   */
  width: number
  /**
   * Height of the book, in pixels.
   */
  height: number
  /**
   * Offset between the pages and the cover size, in pixels.
   */
  pagesOffset: number
}

export interface Props extends Partial<Settings> {
  children: React.ReactNode
  /**
   * Content for the back cover. If not provided, back cover will show bgColor.
   */
  backCover?: React.ReactNode
  /**
   * Display mode for showing front and back covers.
   * - 'rotate': Allows rotating the book to see the back (default)
   * - 'side-by-side': Shows both covers as separate mockups
   * - 'flip': Interactive flip animation between covers
   */
  displayMode?: DisplayMode
  /**
   * For 'rotate' mode: rotation angle to show the back cover
   */
  backRotate?: number
  /**
   * For 'flip' mode: whether to show controls for flipping
   */
  showFlipControls?: boolean
}

/**
 * `BookCover` is the component you can use to display an animated 3D version of your book cover.
 */
export const BookCover = ({
  children,
  backCover,
  displayMode = 'rotate',
  backRotate = -150,
  showFlipControls = true,
  rotate = 30,
  rotateHover = 5,
  perspective = 600,
  transitionDuration = 1,
  radius = 2,
  thickness = 50,
  bgColor = '#01060f',
  shadowColor = '#aaaaaa',
  width = 200,
  height = 300,
  pagesOffset = 3,
}: Props) => {
  const [isFlipped, setIsFlipped] = useState(false)
  const [isShowingBack, setIsShowingBack] = useState(false)
  
  const uniqueId = useMemo(
    () =>
      Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1),
    [],
  )
  
  const settings = {
    rotate,
    rotateHover,
    perspective,
    transitionDuration,
    radius,
    thickness,
    bgColor,
    shadowColor,
    width,
    height,
    pagesOffset,
  }
  
  const css = getCssForSettings(uniqueId, settings, displayMode, backRotate, backCover !== undefined)

  if (displayMode === 'side-by-side') {
    return (
      <>
        <style>{css}</style>
        <div className={`book-container-side-by-side-${uniqueId}`}>
          <div className={`book-container-${uniqueId}`}>
            <div className="book">
              <div className="book-front">{children}</div>
              {backCover && <div className="book-back">{backCover}</div>}
            </div>
          </div>
          {backCover && (
            <div className={`book-container-${uniqueId} book-back-container`}>
              <div className="book book-back-view">
                <div className="book-front">{backCover}</div>
              </div>
            </div>
          )}
        </div>
      </>
    )
  }

  if (displayMode === 'flip') {
    return (
      <>
        <style>{css}</style>
        <div className={`book-flip-wrapper-${uniqueId}`}>
          {showFlipControls && (
            <div className="flip-controls">
              <button 
                onClick={() => setIsFlipped(!isFlipped)}
                className="flip-button"
              >
                {isFlipped ? 'Show Front Cover' : 'Show Back Cover'}
              </button>
            </div>
          )}
          <div className={`book-container-${uniqueId}`}>
            <div className={`book ${isFlipped ? 'flipped' : ''}`}>
              <div className="book-front">{children}</div>
              {backCover && <div className="book-back">{backCover}</div>}
            </div>
          </div>
        </div>
      </>
    )
  }

  // Default 'rotate' mode
  return (
    <>
      <style>{css}</style>
      <div className={`book-rotate-wrapper-${uniqueId}`}>
        {backCover && (
          <div className="rotate-controls">
            <button 
              onClick={() => setIsShowingBack(!isShowingBack)}
              className="rotate-button"
            >
              {isShowingBack ? 'Show Front' : 'Show Back'}
            </button>
          </div>
        )}
        <div className={`book-container-${uniqueId}`}>
          <div className={`book ${isShowingBack ? 'show-back' : ''}`}>
            <div className="book-front">{children}</div>
            {backCover && <div className="book-back">{backCover}</div>}
          </div>
        </div>
      </div>
    </>
  )
}

export const getCssForSettings = (
  uniqueId: string, 
  settings: Settings, 
  displayMode: DisplayMode = 'rotate',
  backRotate: number = -150,
  hasBackCover: boolean = false
) => {
  const baseStyles = `
    .book-container-${uniqueId} {
      display: flex;
      align-items: center;
      justify-content: center;
      perspective: ${settings.perspective}px;
    }
    
    @keyframes initAnimation-${uniqueId} {
      0% {
        transform: rotateY(${-settings.rotateHover}deg);
      }
      100% {
        transform: rotateY(${-settings.rotate}deg);
      }
    }
    
    .book-container-${uniqueId} .book {
      width: ${settings.width}px;
      height: ${settings.height}px;
      position: relative;
      transform-style: preserve-3d;
      transform: rotateY(${-settings.rotate}deg);
      transition: transform ${settings.transitionDuration}s ease;
      animation: 1s ease 0s 1 initAnimation-${uniqueId};
    }
    
    .book-container-${uniqueId} .book:hover {
      transform: rotateY(${-settings.rotateHover}deg);
    }
    
    .book-container-${uniqueId} .book .book-front,
    .book-container-${uniqueId} .book > :first-child:not(.book-front):not(.book-back) {
      position: absolute;
      top: 0;
      left: 0;
      width: ${settings.width}px;
      height: ${settings.height}px;
      transform: translateZ(${settings.thickness / 2}px);
      background-color: ${settings.bgColor};
      border-radius: 0 ${settings.radius}px ${settings.radius}px 0;
      box-shadow: 5px 5px 20px ${settings.shadowColor};
      backface-visibility: hidden;
    }
    
    .book-container-${uniqueId} .book::before {
      position: absolute;
      content: ' ';
      left: 0;
      top: ${settings.pagesOffset}px;
      width: ${settings.thickness - 2}px;
      height: ${settings.height - 2 * settings.pagesOffset}px;
      transform: translateX(${settings.width -
        settings.thickness / 2 -
        settings.pagesOffset}px) rotateY(90deg);
      background: linear-gradient(90deg, 
        #fff 0%,
        #f9f9f9 5%,
        #fff 10%,
        #f9f9f9 15%,
        #fff 20%,
        #f9f9f9 25%,
        #fff 30%,
        #f9f9f9 35%,
        #fff 40%,
        #f9f9f9 45%,
        #fff 50%,
        #f9f9f9 55%,
        #fff 60%,
        #f9f9f9 65%,
        #fff 70%,
        #f9f9f9 75%,
        #fff 80%,
        #f9f9f9 85%,
        #fff 90%,
        #f9f9f9 95%,
        #fff 100%
        );
    }
    
    .book-container-${uniqueId} .book::after {
      position: absolute;
      top: 0;
      left: 0;
      content: ' ';
      width: ${settings.width}px;
      height: ${settings.height}px;
      transform: translateZ(${-settings.thickness / 2}px);
      background-color: ${settings.bgColor};
      border-radius: 0 ${settings.radius}px ${settings.radius}px 0;
      box-shadow: -10px 0 50px 10px ${settings.shadowColor};
    }
  `

  // Styles for back cover (common to all modes)
  const backCoverStyles = hasBackCover ? `
    .book-container-${uniqueId} .book .book-back {
      position: absolute;
      top: 0;
      left: 0;
      width: ${settings.width}px;
      height: ${settings.height}px;
      transform: translateZ(${-settings.thickness / 2}px) rotateY(180deg);
      background-color: ${settings.bgColor};
      border-radius: ${settings.radius}px 0 0 ${settings.radius}px;
      backface-visibility: hidden;
    }
  ` : ''

  // Mode-specific styles
  let modeStyles = ''
  
  if (displayMode === 'rotate') {
    modeStyles = `
      .book-rotate-wrapper-${uniqueId} {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
      }
      
      .book-rotate-wrapper-${uniqueId} .rotate-controls {
        display: flex;
        gap: 10px;
      }
      
      .book-rotate-wrapper-${uniqueId} .rotate-button {
        padding: 8px 16px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-size: 14px;
        font-weight: 500;
        transition: all 0.3s ease;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      }
      
      .book-rotate-wrapper-${uniqueId} .rotate-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
      }
      
      .book-container-${uniqueId} .book.show-back {
        transform: rotateY(${backRotate}deg);
      }
      
      .book-container-${uniqueId} .book.show-back:hover {
        transform: rotateY(${backRotate - 5}deg);
      }
    `
  } else if (displayMode === 'side-by-side') {
    modeStyles = `
      .book-container-side-by-side-${uniqueId} {
        display: flex;
        gap: 40px;
        align-items: center;
        justify-content: center;
      }
      
      .book-container-${uniqueId}.book-back-container .book {
        transform: rotateY(-180deg);
      }
      
      .book-container-${uniqueId}.book-back-container .book:hover {
        transform: rotateY(-175deg);
      }
    `
  } else if (displayMode === 'flip') {
    modeStyles = `
      .book-flip-wrapper-${uniqueId} {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
      }
      
      .book-flip-wrapper-${uniqueId} .flip-controls {
        display: flex;
        gap: 10px;
      }
      
      .book-flip-wrapper-${uniqueId} .flip-button {
        padding: 8px 16px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-size: 14px;
        font-weight: 500;
        transition: all 0.3s ease;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      }
      
      .book-flip-wrapper-${uniqueId} .flip-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
      }
      
      .book-container-${uniqueId} .book {
        transition: transform ${settings.transitionDuration * 1.5}s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      .book-container-${uniqueId} .book.flipped {
        transform: rotateY(-180deg);
      }
      
      .book-container-${uniqueId} .book.flipped:hover {
        transform: rotateY(-175deg);
      }
      
      .book-container-${uniqueId} .book.flipped .book-front {
        display: none;
      }
      
      .book-container-${uniqueId} .book.flipped .book-back {
        display: block;
        backface-visibility: visible;
        transform: translateZ(${settings.thickness / 2}px) rotateY(0deg);
      }
    `
  }

  return baseStyles + backCoverStyles + modeStyles
}
