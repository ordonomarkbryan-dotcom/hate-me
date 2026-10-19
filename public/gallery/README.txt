Place your photos in this directory.

Supported formats: .jpg, .jpeg, .png, .webp

After adding photos, update src/lib/data.js to reference them:

  export const galleryImages = [
    {
      src: '/gallery/photo1.jpg',
      caption: 'Our first adventure together',
      date: 'March 2024',
    },
    {
      src: '/gallery/photo2.jpg',
      caption: 'That sunset we watched',
      date: 'June 2024',
    },
  ];
