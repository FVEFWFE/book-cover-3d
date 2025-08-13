# 3D Book Cover

A React component to display a 3D Book Cover in a web page. This component
is used in (and was created for) the application [3dbook.xyz](https://3dbook.xyz),
which offers a service to manage, embed and host your 3D book covers.

## Features

- 🎨 Display 3D book covers with realistic perspective
- 📚 Support for both front and back covers
- 🔄 Multiple display modes: rotate, side-by-side, and flip animations
- 🎯 Fully customizable appearance
- 📱 Responsive and interactive hover effects

## Installation

Using Yarn: `yarn add book-cover-3d`

Using NPM: `npm i --save book-cover-3d`

## Usage

### Basic Usage

```jsx
import { BookCover } from 'book-cover-3d'

export const MyComponent = () => {
  return (
    <BookCover>
      <div>Your cover content</div>
    </BookCover>
  )
}
```

### With Back Cover

```jsx
import { BookCover } from 'book-cover-3d'

export const MyComponent = () => {
  const frontCover = <img src="front-cover.jpg" />
  const backCover = <img src="back-cover.jpg" />
  
  return (
    <BookCover backCover={backCover}>
      {frontCover}
    </BookCover>
  )
}
```

## Display Modes

The component supports three elegant ways to display both front and back covers:

### 1. Rotate Mode (Default)

Allows rotating the book to see the back cover. A button control lets users switch between front and back views.

```jsx
<BookCover
  backCover={backCoverContent}
  displayMode="rotate"
  backRotate={-150}  // Rotation angle for back view
>
  {frontCoverContent}
</BookCover>
```

### 2. Side-by-Side Mode

Shows both covers as separate 3D mockups side by side, perfect for showcasing both covers simultaneously.

```jsx
<BookCover
  backCover={backCoverContent}
  displayMode="side-by-side"
>
  {frontCoverContent}
</BookCover>
```

### 3. Flip Mode

Interactive flip animation between front and back covers with smooth transitions.

```jsx
<BookCover
  backCover={backCoverContent}
  displayMode="flip"
  showFlipControls={true}
>
  {frontCoverContent}
</BookCover>
```

## Examples

### Using an image as the cover

![Book with image as cover](https://github.com/scastiel/book-cover-3d/raw/master/images/book-image.webp)

```jsx
return (
  <BookCover>
    <img src="https://3dbook.xyz/demo-book.png" />
  </BookCover>
)
```

### Using custom content

![Book with custom content](https://github.com/scastiel/book-cover-3d/raw/master/images/book-custom-content.webp)

```jsx
return (
  <BookCover>
    <div style={/*...*/}>
      <span style={/*...*/}>MY BOOK</span>
      <span style={/*...*/}>John Doe</span>
    </div>
  </BookCover>
)
```

### With Front and Back Covers

```jsx
const frontCover = (
  <div style={{ /* your styles */ }}>
    <h2>Book Title</h2>
    <p>Author Name</p>
  </div>
)

const backCover = (
  <div style={{ /* your styles */ }}>
    <p>Book description...</p>
    <p>ISBN: 978-1-234-56789-0</p>
  </div>
)

return (
  <BookCover 
    backCover={backCover}
    displayMode="side-by-side"
  >
    {frontCover}
  </BookCover>
)
```

## Settings

| Name               | Type     | Description                                            | Default   |
| ------------------ | -------- | ------------------------------------------------------ | --------- |
| rotate             | `number` | Rotation of the book, in degrees                       | `30`      |
| rotateHover        | `number` | Rotation of the book on hover, in degrees              | `5`       |
| perspective        | `number` | Perspective value seems to be a realistic value        | `600`     |
| transitionDuration | `number` | Duration of rotate animation, in milliseconds          | `1`       |
| radius             | `number` | Radius of right corners, in pixels                     | `2`       |
| thickness          | `number` | Book thickness, in pixels                              | `50`      |
| bgColor            | `string` | Color of the inside of back cover                      | `#01060f` |
| width              | `number` | Width of the book, in pixels                           | `200`     |
| height             | `number` | Height of the book, in pixels                          | `300`     |
| pagesOffset        | `number` | Offset between the pages and the cover size, in pixels | `3`       |
| **backCover**      | `ReactNode` | Content for the back cover                         | `undefined` |
| **displayMode**    | `'rotate' \| 'side-by-side' \| 'flip'` | Display mode for front/back covers | `'rotate'` |
| **backRotate**     | `number` | Rotation angle for back view (rotate mode)            | `-150`    |
| **showFlipControls** | `boolean` | Show flip control button (flip mode)                | `true`    |

## HTML and CSS for given settings

If you don’t want to use the React component, you can extract the CSS generated for
given 3D settings.

```js
import { getCssForSettings } from 'book-cover-3d'

const settings = {
  rotate: 30,
  // ...
}
const css = getCssForSettings('BOOK_ID', settings)
```

```html
<div class="book-container-BOOK_ID">
  <div class="book">
    <img src="https://3dbook.xyz/demo-book.png" />
  </div>
</div>
```

Note that you can use a unique ID for your book cover (in HTML and when
calling `getCssForSettings`), so you can use different settings for
different books.
