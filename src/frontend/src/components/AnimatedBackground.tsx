import { useEffect, useRef, useState } from 'react';

interface GradientLayer {
  x: number;
  y: number;
  scale: number;
  opacity: number;
  rotation: number;
  color1: string;
  color2: string;
  blur: number;
  speed: number;
  direction: number;
}

// Performance detection
const detectPerformance = () => {
  const cores = navigator.hardwareConcurrency || 4;
  const pixelRatio = window.devicePixelRatio || 1;
  const isLowEnd = cores <= 4 || pixelRatio > 2;
  return {
    isLowEnd,
    targetFPS: isLowEnd ? 30 : 60,
    layerCount: isLowEnd ? 3 : 4,
  };
};

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const layersRef = useRef<GradientLayer[]>([]);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const scrollRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);
  const timeRef = useRef(0);
  const lastFrameTimeRef = useRef(0);
  const frameCountRef = useRef(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const performanceRef = useRef(detectPerformance());

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true });
    if (!ctx) return;

    const performance = performanceRef.current;
    const frameInterval = 1000 / performance.targetFPS;

    // Set canvas size to cover entire viewport
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = Math.max(window.innerHeight, document.documentElement.scrollHeight);
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Resize on scroll to ensure full coverage
    const handleScrollResize = () => {
      const newHeight = Math.max(window.innerHeight, document.documentElement.scrollHeight);
      if (canvas.height !== newHeight) {
        canvas.height = newHeight;
      }
    };

    // Initialize gradient layers with reduced count for performance
    const initLayers = () => {
      const isDark = document.documentElement.classList.contains('dark');
      const layerCount = performance.layerCount;
      
      const baseOpacity = performance.isLowEnd ? 0.7 : 1;
      
      layersRef.current = [
        // Primary orange gradient - main hero layer
        {
          x: 0.2,
          y: 0.3,
          scale: 2.0,
          opacity: (isDark ? 0.18 : 0.28) * baseOpacity,
          rotation: 0,
          color1: isDark ? 'rgba(255, 140, 50, 0.5)' : 'rgba(255, 140, 50, 0.7)',
          color2: isDark ? 'rgba(255, 100, 30, 0.25)' : 'rgba(255, 180, 80, 0.45)',
          blur: performance.isLowEnd ? 100 : 140,
          speed: 0.3,
          direction: 45,
        },
        // Cyan accent - complementary layer
        {
          x: 0.75,
          y: 0.25,
          scale: 1.6,
          opacity: (isDark ? 0.15 : 0.24) * baseOpacity,
          rotation: 60,
          color1: isDark ? 'rgba(100, 200, 255, 0.4)' : 'rgba(100, 200, 255, 0.6)',
          color2: isDark ? 'rgba(50, 150, 255, 0.2)' : 'rgba(150, 220, 255, 0.35)',
          blur: performance.isLowEnd ? 90 : 120,
          speed: 0.4,
          direction: 135,
        },
        // Pink/magenta layer - depth
        {
          x: 0.5,
          y: 0.65,
          scale: 2.2,
          opacity: (isDark ? 0.12 : 0.20) * baseOpacity,
          rotation: 120,
          color1: isDark ? 'rgba(255, 120, 200, 0.3)' : 'rgba(255, 150, 220, 0.5)',
          color2: isDark ? 'rgba(200, 80, 180, 0.15)' : 'rgba(255, 180, 230, 0.3)',
          blur: performance.isLowEnd ? 110 : 160,
          speed: 0.25,
          direction: 225,
        },
      ];

      // Add fourth layer only on higher-end devices
      if (layerCount >= 4) {
        layersRef.current.push({
          x: 0.85,
          y: 0.75,
          scale: 1.7,
          opacity: (isDark ? 0.10 : 0.18) * baseOpacity,
          rotation: 180,
          color1: isDark ? 'rgba(150, 100, 255, 0.25)' : 'rgba(180, 140, 255, 0.4)',
          color2: isDark ? 'rgba(100, 50, 200, 0.12)' : 'rgba(200, 170, 255, 0.25)',
          blur: 130,
          speed: 0.35,
          direction: 315,
        });
      }
    };

    initLayers();

    // Mouse move handler with smooth interpolation
    const handleMouseMove = (e: MouseEvent) => {
      const targetX = e.clientX / window.innerWidth;
      const targetY = e.clientY / window.innerHeight;
      
      // Smooth interpolation
      mouseRef.current.x += (targetX - mouseRef.current.x) * 0.1;
      mouseRef.current.y += (targetY - mouseRef.current.y) * 0.1;
    };
    
    if (!prefersReducedMotion) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    // Enhanced scroll handler with smooth parallax effect across all sections
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      scrollRef.current = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      handleScrollResize();
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Check for modal state
    const checkModalState = () => {
      const hasModal = document.querySelector('[role="dialog"]') !== null;
      setIsModalOpen(hasModal);
    };

    const modalObserver = new MutationObserver(checkModalState);
    modalObserver.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['role', 'data-state'],
    });

    // Theme change observer
    const themeObserver = new MutationObserver(() => {
      initLayers();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    // Enhanced animation loop with throttling for performance
    const animate = (currentTime: number) => {
      if (!ctx || !canvas) return;

      // Throttle frame rate on low-end devices
      const elapsed = currentTime - lastFrameTimeRef.current;
      if (elapsed < frameInterval) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      lastFrameTimeRef.current = currentTime - (elapsed % frameInterval);
      frameCountRef.current++;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const isDark = document.documentElement.classList.contains('dark');
      
      // Reduce animation speed if reduced motion is preferred
      const timeIncrement = prefersReducedMotion ? 0.001 : 0.005;
      timeRef.current += timeIncrement;
      const time = timeRef.current;

      // Calculate fade based on modal state with smooth transition
      const modalFade = isModalOpen ? 0.25 : 1;

      layersRef.current.forEach((layer, index) => {
        ctx.save();

        // Enhanced dynamic position with directional movement and scroll-based parallax
        const mouseInfluence = prefersReducedMotion ? 0 : 0.08 * (index + 1);
        const scrollInfluence = 0.12 * (index + 1);
        const parallaxDepth = (index + 1) * 0.15;

        // Directional movement based on layer direction
        const directionRad = (layer.direction * Math.PI) / 180;
        const directionX = Math.cos(directionRad) * layer.speed * time;
        const directionY = Math.sin(directionRad) * layer.speed * time;

        // Combine all movement influences with enhanced scroll effect
        const dynamicX =
          layer.x +
          (prefersReducedMotion ? 0 : Math.sin(time * 0.5 + index * 0.8) * 0.03) +
          (mouseRef.current.x - 0.5) * mouseInfluence * parallaxDepth +
          scrollRef.current * scrollInfluence * Math.cos(index * 0.5) +
          directionX * 0.01;

        const dynamicY =
          layer.y +
          (prefersReducedMotion ? 0 : Math.cos(time * 0.4 + index * 0.6) * 0.03) +
          (mouseRef.current.y - 0.5) * mouseInfluence * parallaxDepth +
          scrollRef.current * scrollInfluence * 1.2 * Math.sin(index * 0.3) +
          directionY * 0.01;

        const centerX = dynamicX * canvas.width;
        const centerY = dynamicY * canvas.height + (scrollRef.current * canvas.height * 0.3);

        // Apply rotation with smooth animation
        ctx.translate(centerX, centerY);
        const rotationSpeed = prefersReducedMotion ? 0 : 5 + index * 2;
        ctx.rotate((layer.rotation + time * rotationSpeed) * (Math.PI / 180));

        // Dynamic scale with breathing effect
        const breathingScale = prefersReducedMotion ? 1 : 1 + Math.sin(time * 0.8 + index * 0.5) * 0.15;
        const finalScale = layer.scale * breathingScale;
        ctx.scale(finalScale, finalScale);

        // Create multi-stop radial gradient for richer colors
        const gradientRadius = Math.max(canvas.width, canvas.height) * 0.7;
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, gradientRadius);

        gradient.addColorStop(0, layer.color1);
        gradient.addColorStop(0.3, layer.color2);
        gradient.addColorStop(0.6, layer.color2.replace(/[\d.]+\)$/, '0.05)'));
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = gradient;
        ctx.globalAlpha = layer.opacity * modalFade;

        // Apply enhanced blur effect
        ctx.filter = `blur(${layer.blur}px)`;

        // Draw the gradient layer
        ctx.fillRect(-gradientRadius, -gradientRadius, gradientRadius * 2, gradientRadius * 2);

        ctx.restore();
      });

      // Add multi-layered overlay gradients for depth with scroll-aware positioning
      const scrollOffset = scrollRef.current * canvas.height * 0.5;

      // Top-to-bottom gradient
      const overlayGradient1 = ctx.createLinearGradient(0, scrollOffset, 0, canvas.height + scrollOffset);
      overlayGradient1.addColorStop(
        0,
        isDark ? 'rgba(255, 140, 50, 0.03)' : 'rgba(255, 140, 50, 0.04)'
      );
      overlayGradient1.addColorStop(
        0.5,
        'rgba(0, 0, 0, 0)'
      );
      overlayGradient1.addColorStop(
        1,
        isDark ? 'rgba(100, 200, 255, 0.02)' : 'rgba(100, 200, 255, 0.03)'
      );

      ctx.fillStyle = overlayGradient1;
      ctx.globalAlpha = modalFade;
      ctx.filter = 'none';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Diagonal gradient for additional depth
      const overlayGradient2 = ctx.createLinearGradient(0, scrollOffset, canvas.width, canvas.height + scrollOffset);
      overlayGradient2.addColorStop(
        0,
        isDark ? 'rgba(150, 100, 255, 0.015)' : 'rgba(180, 140, 255, 0.025)'
      );
      overlayGradient2.addColorStop(
        0.5,
        'rgba(0, 0, 0, 0)'
      );
      overlayGradient2.addColorStop(
        1,
        isDark ? 'rgba(255, 120, 200, 0.015)' : 'rgba(255, 150, 220, 0.025)'
      );

      ctx.fillStyle = overlayGradient2;
      ctx.globalAlpha = modalFade * 0.7;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (!prefersReducedMotion) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
      window.removeEventListener('scroll', handleScroll);
      modalObserver.disconnect();
      themeObserver.disconnect();
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isModalOpen, prefersReducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-1000 ease-out"
      style={{
        opacity: isModalOpen ? 0.25 : 0.85,
        mixBlendMode: 'screen',
      }}
    />
  );
}
