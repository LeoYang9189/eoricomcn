import React from 'react';

export default function HeroImage() {
  return (
    <svg 
      className="w-full h-full" 
      viewBox="0 0 400 300" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="400" height="300" fill="#F3F4F6"/>
      <path 
        d="M150 100h100v100h-100z" 
        fill="#60A5FA"
        opacity="0.8"
      />
      <path 
        d="M180 130h40v40h-40z" 
        fill="#2563EB"
      />
      <circle 
        cx="200" 
        cy="150" 
        r="60" 
        stroke="#1E40AF"
        strokeWidth="4"
        fill="none"
      />
    </svg>
  );
} 