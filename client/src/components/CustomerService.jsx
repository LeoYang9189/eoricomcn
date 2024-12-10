import React, { useRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function CustomerService() {
  const { t } = useTranslation();
  const [position, setPosition] = useState({ x: 'right-8', y: 'bottom-8' });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  // 处理拖拽开始
  const handleMouseDown = (e) => {
    if (e.target.closest('button')) return;
    setIsDragging(true);
    const rect = containerRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  // 处理拖拽过程
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;

      const x = e.clientX - dragOffset.x;
      const y = e.clientY - dragOffset.y;
      
      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      const maxX = window.innerWidth - rect.width;
      const maxY = window.innerHeight - rect.height;
      
      const boundedX = Math.max(0, Math.min(x, maxX));
      const boundedY = Math.max(0, Math.min(y, maxY));

      container.style.left = `${boundedX}px`;
      container.style.top = `${boundedY}px`;
      container.style.right = 'auto';
      container.style.bottom = 'auto';
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  return (
    <div
      ref={containerRef}
      className={`fixed ${position.y} ${position.x} z-50 bg-white rounded-[36px] shadow-xl p-4 cursor-move select-none animate-fade-in`}
      onMouseDown={handleMouseDown}
      style={{ touchAction: 'none' }}
    >
      <div className="flex flex-col items-center">
        <div className="flex flex-col space-y-4">
          {/* Email */}
          <div className="relative group">
            <button
              className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-md hover:bg-blue-700 transition-colors cursor-pointer animate-fade-in"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </button>
            <div className="absolute right-full mr-2 top-1/2 -translate-y-1/2 bg-white px-3 py-1 rounded-lg shadow-lg whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <a 
                href="mailto:gm@leotech.site" 
                className="text-blue-600 text-sm hover:text-blue-700 hover:underline transition-colors"
              >
                gm@leotech.site
              </a>
              <div className="absolute right-0 top-1/2 -translate-x-[-4px] -translate-y-1/2 border-4 border-transparent border-l-white" />
            </div>
          </div>

          {/* Phone */}
          <div className="relative group">
            <button
              className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-md hover:bg-blue-700 transition-colors cursor-pointer animate-fade-in delay-100"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </button>
            <div className="absolute right-full mr-2 top-1/2 -translate-y-1/2 bg-white px-3 py-1 rounded-lg shadow-lg whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <p className="text-gray-700 text-sm">+86 13482360085</p>
              <div className="absolute right-0 top-1/2 -translate-x-[-4px] -translate-y-1/2 border-4 border-transparent border-l-white" />
            </div>
          </div>

          {/* WeChat */}
          <div className="relative group">
            <button
              className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-md hover:bg-blue-700 transition-colors cursor-pointer animate-fade-in delay-200"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8.2 13.3c-.5 0-.9-.4-.9-.9s.4-.9.9-.9.9.4.9.9-.4.9-.9.9m4.1 0c-.5 0-.9-.4-.9-.9s.4-.9.9-.9.9.4.9.9-.4.9-.9.9m3.9 5.3c-.8 0-1.5-.2-2.2-.5-.2-.1-.5-.1-.7 0l-1.5.8c-.9-.7-1.7-1.5-2.3-2.4l.8-1.5c.1-.2.1-.5 0-.7-.3-.7-.5-1.4-.5-2.2 0-3 2.5-5.5 5.5-5.5s5.5 2.5 5.5 5.5-2.5 5.5-5.5 5.5m0-12.5c-3.9 0-7 3.1-7 7 0 1.1.2 2.1.7 3l-1.1 2.1c-.1.2-.1.5.1.7.1.1.3.2.4.2.1 0 .2 0 .3-.1l2.1-1.1c.9.5 2 .7 3 .7 3.9 0 7-3.1 7-7s-3.1-7-7-7" />
              </svg>
            </button>
            <div className="absolute right-full mr-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <img 
                src="/images/wechat-qr.png" 
                alt="WeChat QR Code" 
                className="w-32 h-32 object-contain"
              />
              <div className="absolute right-0 top-1/2 -translate-x-[-4px] -translate-y-1/2 border-4 border-transparent border-l-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 