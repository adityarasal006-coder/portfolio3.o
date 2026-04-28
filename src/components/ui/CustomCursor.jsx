import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
  const coreRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const core = coreRef.current;
    const glow = glowRef.current;

    const onMouseMove = (e) => {
      const { clientX, clientY } = e;
      
      // Snappy movement for the core
      gsap.to(core, {
        x: clientX,
        y: clientY,
        duration: 0.1,
        ease: 'power2.out'
      });

      // Slightly delayed movement for the glow (creates a fluid feel)
      gsap.to(glow, {
        x: clientX,
        y: clientY,
        duration: 0.2,
        ease: 'power3.out'
      });
    };

    const onMouseOver = (e) => {
      if (e.target.closest('a, button, .interactive, input, textarea')) {
        gsap.to(core, { scale: 1.8, duration: 0.3 });
        gsap.to(glow, { scale: 1.8, duration: 0.3, opacity: 0.8 });
      }
    };

    const onMouseOut = (e) => {
      if (e.target.closest('a, button, .interactive, input, textarea')) {
        gsap.to(core, { scale: 1, duration: 0.3 });
        gsap.to(glow, { scale: 1, duration: 0.3, opacity: 0.4 });
      }
    };

    const onMouseDown = () => {
      gsap.to(core, { scale: 0.8, duration: 0.1 });
      gsap.to(glow, { scale: 1.2, duration: 0.1 });
    };

    const onMouseUp = () => {
      gsap.to(core, { scale: 1, duration: 0.2 });
      gsap.to(glow, { scale: 1, duration: 0.2 });
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);
    window.addEventListener('mouseout', onMouseOut);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      window.removeEventListener('mouseout', onMouseOut);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  return (
    <>
      <div
        ref={glowRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '60px', /* 24px blur requires a wider container to not clip */
          height: '60px',
          backgroundColor: '#8A2BE2',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9998,
          transform: 'translate(-50%, -50%)',
          filter: 'blur(24px)',
          opacity: 0.4,
        }}
      />
      <div
        ref={coreRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '12px',
          height: '12px',
          backgroundColor: '#EAEAF0', // Soft white core
          boxShadow: '0 0 10px #8A2BE2', // Purple inner glow
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate(-50%, -50%)',
        }}
      />
    </>
  );
};

export default CustomCursor;
