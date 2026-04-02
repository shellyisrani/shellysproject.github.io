# Image Replacement Guide

## Step 1: Add Your Images to the `public/images` Folder

1. Open the `public/images` folder in your project
2. Add your images with these exact names:

```
public/
  └── images/
      ├── hero-background.jpg    (or .png) - Main hero section background
      ├── venue-image.jpg         (or .png) - Wedding venue photo
      ├── join-us-image.jpg       (or .png) - "Join Us" section image
      ├── story-first-meeting.jpg (or .png) - First meeting photo
      ├── story-journey.jpg       (or .png) - Journey/growing together photo
      ├── story-proposal.jpg      (or .png) - Proposal photo
      ├── hotel-1.jpg             (or .png) - First hotel image
      ├── hotel-2.jpg             (or .png) - Second hotel image
      └── hotel-3.jpg             (or .png) - Third hotel image
```

**Note:** You can use `.jpg`, `.jpeg`, or `.png` - just make sure the file extension matches in the code below.

## Step 2: Update the Code Files

### 1. Hero Section Background
**File:** `src/components/wedding/HeroSection.jsx`
**Line 16:** Change from:
```jsx
backgroundImage: "url('https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80')",
```
**To:**
```jsx
backgroundImage: "url('/images/hero-background.jpg')",
```

### 2. Venue Image
**File:** `src/components/wedding/DetailsSection.jsx`
**Line 103:** Change from:
```jsx
src="https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=1200&q=80"
```
**To:**
```jsx
src="/images/venue-image.jpg"
```

### 3. Join Us Section Image
**File:** `src/components/wedding/JoinUsSection.jsx`
**Line 11:** Change from:
```jsx
src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1920&q=80"
```
**To:**
```jsx
src="/images/join-us-image.jpg"
```

### 4. Our Story Images
**File:** `src/pages/OurStory.jsx`

**Line 34** (First Meeting): Change from:
```jsx
src="https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&q=80"
```
**To:**
```jsx
src="/images/story-first-meeting.jpg"
```

**Line 85** (Journey): Change from:
```jsx
src="https://images.unsplash.com/photo-1529634597503-139d3726fed5?w=800&q=80"
```
**To:**
```jsx
src="/images/story-journey.jpg"
```

**Line 96** (Proposal): Change from:
```jsx
src="https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800&q=80"
```
**To:**
```jsx
src="/images/story-proposal.jpg"
```

### 5. Travel & Stay Hotel Images
**File:** `src/pages/TravelAndStay.jsx`

**Lines 10, 17, 24:** Change the `image` property in the hotels array from:
```jsx
image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
```
**To:**
```jsx
image: "/images/hotel-1.jpg",  // For first hotel
image: "/images/hotel-2.jpg",  // For second hotel
image: "/images/hotel-3.jpg",  // For third hotel
```

## Quick Reference: All Image Locations

| Image | File Location | Code File | Line |
|-------|--------------|-----------|------|
| Hero Background | `public/images/hero-background.jpg` | `src/components/wedding/HeroSection.jsx` | 16 |
| Venue Image | `public/images/venue-image.jpg` | `src/components/wedding/DetailsSection.jsx` | 103 |
| Join Us Image | `public/images/join-us-image.jpg` | `src/components/wedding/JoinUsSection.jsx` | 11 |
| First Meeting | `public/images/story-first-meeting.jpg` | `src/pages/OurStory.jsx` | 34 |
| Journey | `public/images/story-journey.jpg` | `src/pages/OurStory.jsx` | 85 |
| Proposal | `public/images/story-proposal.jpg` | `src/pages/OurStory.jsx` | 96 |
| Hotel 1 | `public/images/hotel-1.jpg` | `src/pages/TravelAndStay.jsx` | 10 |
| Hotel 2 | `public/images/hotel-2.jpg` | `src/pages/TravelAndStay.jsx` | 17 |
| Hotel 3 | `public/images/hotel-3.jpg` | `src/pages/TravelAndStay.jsx` | 24 |

## Tips

- **Image Sizes:** For best performance:
  - Hero background: 1920x1080px or larger
  - Other images: 800-1200px wide is usually good
  - Keep file sizes under 500KB when possible

- **File Formats:** 
  - Use `.jpg` for photos
  - Use `.png` if you need transparency
  - Consider `.webp` for smaller file sizes (modern browsers)

- **Important:** Always use `/images/image-name.jpg` (with the leading `/`) when referencing images. This tells the browser to look in the `images` folder at the root of your website.
