import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import backgroundImage from '../../assets/background-left.png';
import doctorsImage from '../../assets/doctors.png';

const LoginPage = () => {
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const formRef = useRef(null);
  const buttonRef = useRef(null);
  const buttonFillRef = useRef(null);
  const buttonTextRef = useRef(null);
  const buttonRippleRef = useRef(null);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  useEffect(() => {
    // Animate logo entrance
    if (logoRef.current) {
      gsap.from(logoRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 1,
        ease: 'power3.out',
        delay: 0.3
      });
    }

    // Ensure form is always visible (no animation to avoid hiding issues)
    if (formRef.current) {
      gsap.set(formRef.current, { 
        opacity: 1,
        x: 0,
        visibility: 'visible',
        display: 'flex'
      });
    }

    // Setup professional GSAP button animation
    let handleMouseEnter, handleMouseLeave, handleMouseMove, handleClick;
    let xTo, yTo;
    let setupCircleFill;
    
    if (buttonRef.current && buttonFillRef.current && buttonTextRef.current) {
      // Function to calculate and set circle size
      setupCircleFill = () => {
        if (!buttonRef.current || !buttonFillRef.current) return;
        const buttonRect = buttonRef.current.getBoundingClientRect();
        const buttonWidth = buttonRect.width;
        const buttonHeight = buttonRect.height;
        // Calculate diagonal to ensure circle covers entire button
        const maxDimension = Math.sqrt(buttonWidth * buttonWidth + buttonHeight * buttonHeight);
        
        // Set circle size and position at bottom center
        // Position circle so its center point is at the bottom center of the button
        gsap.set(buttonFillRef.current, {
          width: maxDimension,
          height: maxDimension,
          left: '50%',
          top: '100%', // Start at bottom edge
          xPercent: -50, // Center horizontally
          yPercent: -50, // Move up by 50% so center is at bottom edge
          scale: 0,
          transformOrigin: '50% 50%', // Scale from center of circle (which is at bottom center of button)
          force3D: true
        });
      };
      
      // Initial setup
      setupCircleFill();
      
      // Recalculate on window resize
      window.addEventListener('resize', setupCircleFill);

      // Magnetic effect setup
      xTo = gsap.quickTo(buttonRef.current, 'x', { duration: 0.6, ease: 'power3.out' });
      yTo = gsap.quickTo(buttonRef.current, 'y', { duration: 0.6, ease: 'power3.out' });

      // Hover enter animation - professional GSAP template
      handleMouseEnter = () => {
        // Recalculate circle size in case button size changed
        const buttonRect = buttonRef.current.getBoundingClientRect();
        const buttonWidth = buttonRect.width;
        const buttonHeight = buttonRect.height;
        const maxDimension = Math.sqrt(buttonWidth * buttonWidth + buttonHeight * buttonHeight);
        
        gsap.killTweensOf([buttonFillRef.current, buttonTextRef.current, buttonRef.current]);
        
        // Ensure circle is properly sized and positioned at bottom center
        gsap.set(buttonFillRef.current, {
          width: maxDimension,
          height: maxDimension,
          left: '50%',
          top: '100%',
          xPercent: -50,
          yPercent: -50, // Center of circle at bottom edge
          transformOrigin: '50% 50%' // Scale from center of circle
        });
        
        const tl = gsap.timeline();
        
        // Circular fill animation from bottom center
        tl.to(buttonFillRef.current, {
          scale: 1,
          duration: 0.6,
          ease: 'power2.out',
          force3D: true
        }, 0);
        
        // Text color transition (white → brand blue when filled)
        tl.to(
          buttonTextRef.current,
          {
            color: '#4B7AE7',
            duration: 0.4,
            ease: 'power2.out'
          },
          0.2
        );

        // Outline fades out while button is filled
        tl.to(
          buttonRef.current,
          {
            borderColor: 'rgba(255,255,255,0)',
            duration: 0.4,
            ease: 'power2.out'
          },
          0.2
        );
        
        // Subtle scale up
        tl.to(buttonRef.current, {
          scale: 1.02,
          duration: 0.4,
          ease: 'power2.out',
          force3D: true
        }, 0);
      };

      // Hover leave animation
      handleMouseLeave = () => {
        gsap.killTweensOf([buttonFillRef.current, buttonTextRef.current, buttonRef.current]);
        
        const tl = gsap.timeline();
        
        // Reset magnetic position
        xTo(0);
        yTo(0);
        
        // Text color back to white
        tl.to(
          buttonTextRef.current,
          {
            color: '#FFFFFF',
            duration: 0.3,
            ease: 'power2.in'
          },
          0
        );

        // Outline fades back in to white
        tl.to(
          buttonRef.current,
          {
            borderColor: '#FFFFFF',
            duration: 0.3,
            ease: 'power2.in'
          },
          0
        );
        
        // Circular fill retract to bottom center
        tl.to(buttonFillRef.current, {
          scale: 0,
          duration: 0.5,
          ease: 'power2.in',
          force3D: true
        }, 0.1);
        
        // Scale back
        tl.to(buttonRef.current, {
          scale: 1,
          duration: 0.4,
          ease: 'power2.in',
          force3D: true
        }, 0);
      };

      // Magnetic mouse move effect
      handleMouseMove = (e) => {
        if (!buttonRef.current) return;
        const rect = buttonRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        // Magnetic effect (reduced intensity for subtlety)
        xTo(x * 0.15);
        yTo(y * 0.15);
      };

      // Click ripple effect (works on every click)
      handleClick = (e) => {
        if (!buttonRippleRef.current || !buttonRef.current) return;
        
        const rect = buttonRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Stop any in‑progress ripple animation
        gsap.killTweensOf(buttonRippleRef.current);

        // Position ripple at click point and reset state
        gsap.set(buttonRippleRef.current, {
          left: x,
          top: y,
          xPercent: -50,
          yPercent: -50,
          scale: 0,
          opacity: 0.8
        });
        
        // Animate ripple outwards in brand color
        gsap.to(buttonRippleRef.current, {
          scale: 4,
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out'
        });
      };

      buttonRef.current.addEventListener('mouseenter', handleMouseEnter);
      buttonRef.current.addEventListener('mouseleave', handleMouseLeave);
      buttonRef.current.addEventListener('mousemove', handleMouseMove);
      buttonRef.current.addEventListener('click', handleClick);
    }

    // Cleanup function
    return () => {
      if (setupCircleFill) {
        window.removeEventListener('resize', setupCircleFill);
      }
      if (buttonRef.current) {
        if (handleMouseEnter) buttonRef.current.removeEventListener('mouseenter', handleMouseEnter);
        if (handleMouseLeave) buttonRef.current.removeEventListener('mouseleave', handleMouseLeave);
        if (handleMouseMove) buttonRef.current.removeEventListener('mousemove', handleMouseMove);
        if (handleClick) buttonRef.current.removeEventListener('click', handleClick);
      }
      // Kill any ongoing animations
      if (buttonFillRef.current) gsap.killTweensOf(buttonFillRef.current);
      if (buttonTextRef.current) gsap.killTweensOf(buttonTextRef.current);
      if (buttonRef.current) {
        gsap.set(buttonRef.current, { x: 0, y: 0, scale: 1 });
        gsap.killTweensOf(buttonRef.current);
      }
    };
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login attempt:', formData);
  };

  return (
    <div ref={containerRef} className="flex h-screen w-screen overflow-hidden">
      {/* Left Side - RadShare background image at 70% visibility over 4B7AE7 */}
      <div 
        className="relative w-2/3 h-full flex items-center justify-center overflow-hidden"
        style={{
          backgroundColor: '#4B7AE7'
        }}
      >
        {/* RadShare image with 70% opacity */}
        <img
          src={backgroundImage}
          alt="RadShare background"
          className="absolute inset-0 w-full h-full object-cover opacity-90"
        />

        {/* Central Logo */}
        <div 
          ref={logoRef}
          className="relative z-10 flex items-center gap-4"
        >
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
            
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div 
        ref={formRef} 
        className="w-1/3 h-full flex flex-col justify-center relative z-10" 
        style={{ 
          opacity: '1 !important', 
          backgroundColor: '#4B7AE7', 
          paddingLeft: '2rem', 
          paddingRight: '2rem', 
          display: 'flex', 
          visibility: 'visible',
          minWidth: '33.333333%'
        }}
      >
        {/* Doctors circular background image (37% visible, large like Figma) */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div
            className="rounded-full overflow-hidden"
            style={{
              height: '95%',
              aspectRatio: '1 / 1',
              opacity: 0.27,
            }}
          >
            <img
              src={doctorsImage}
              alt="Doctors illustration"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="w-full max-w-sm" style={{ marginLeft: 'auto', marginRight: 'auto', position: 'relative' }}>
          <form onSubmit={handleSubmit} className="space-y-6" style={{ position: 'relative' }}>
            {/* Username Input */}
            <div>
              <label 
                htmlFor="username" 
                className="block text-sm font-normal mb-2"
                style={{ color: '#FFFFFF', fontFamily: 'Poppins, sans-serif' }}
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                onFocus={() => setFocusedField('username')}
                onBlur={() => setFocusedField((prev) => (prev === 'username' ? null : prev))}
                className="w-full px-4 py-3 rounded-lg bg-transparent transition-all focus:outline-none"
                style={{
                  borderColor: '#FFFFFF',
                  color: '#FFFFFF',
                  borderWidth: '2px', // keep constant to avoid layout shift
                  borderStyle: 'solid',
                  fontFamily: 'Poppins, sans-serif',
                  boxShadow:
                    focusedField === 'username'
                      ? '0 0 0 4px rgba(255,255,255,0.35)'
                      : 'none',
                  borderRadius: '0.75rem'
                }}
                placeholder=""
              />
            </div>

            {/* Password Input with eye toggle */}
            <div>
              <label 
                htmlFor="password" 
                className="block text-sm font-normal mb-2"
                style={{ color: '#FFFFFF', fontFamily: 'Poppins, sans-serif' }}
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField((prev) => (prev === 'password' ? null : prev))}
                  className="w-full px-4 py-3 pr-10 rounded-lg bg-transparent transition-all focus:outline-none"
                  style={{
                    borderColor: '#FFFFFF',
                    color: '#FFFFFF',
                    borderWidth: '2px', // keep constant to avoid layout shift
                    borderStyle: 'solid',
                    fontFamily: 'Poppins, sans-serif',
                    boxShadow:
                      focusedField === 'password'
                        ? '0 0 0 4px rgba(255,255,255,0.35)'
                        : 'none',
                    borderRadius: '0.75rem'
                  }}
                  placeholder=""
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-6 flex items-center justify-center text-white/80 hover:text-white focus:outline-none"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  <span className="relative inline-flex items-center justify-center">
                    {/* Simple eye (password hidden) */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 absolute"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      style={{
                        opacity: showPassword ? 0 : 1,
                        transform: showPassword ? 'scale(1)' : 'scale(1.2)',
                        transition: 'opacity 0.18s ease, transform 0.18s ease',
                      }}
                    >
                      <path
                        d="M3 12C4.8 8.8 8.1 7 12 7c3.9 0 7.2 1.8 9 5-1.8 3.2-5.1 5-9 5-3.9 0-7.2-1.8-9-5Z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <circle cx="12" cy="12" r="2.5" fill="currentColor" />
                    </svg>

                    {/* Eye with diagonal slash (password visible) */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 absolute"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      style={{
                        opacity: showPassword ? 1 : 0,
                        transform: showPassword ? 'scale(1.05)' : 'scale(0.9)',
                        transition: 'opacity 0.18s ease, transform 0.18s ease',
                      }}
                    >
                      <path
                        d="M3 12C4.8 8.8 8.1 7 12 7c3.9 0 7.2 1.8 9 5-1.8 3.2-5.1 5-9 5-3.9 0-7.2-1.8-9-5Z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <circle cx="12" cy="12" r="2.5" fill="currentColor" />
                      <line
                        x1="6"
                        y1="6"
                        x2="18"
                        y2="18"
                        stroke="currentColor"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </button>
              </div>
            </div>

            {/* Login Button - Professional GSAP Template */}
            <button
              ref={buttonRef}
              type="submit"
              className="w-full py-3 px-6 border-2 rounded-full font-normal focus:outline-none relative overflow-hidden cursor-pointer"
              style={{ 
                borderColor: '#FFFFFF', 
                backgroundColor: 'transparent',
                fontFamily: 'Poppins, sans-serif',
                position: 'relative',
                transition: 'none',
                transform: 'translate(0, 0) scale(1)',
                willChange: 'transform'
              }}
            >
              {/* Circular fill background element - expands from bottom center */}
              <span
                ref={buttonFillRef}
                className="absolute bg-white"
                style={{
                  borderRadius: '50%',
                  zIndex: 0,
                  willChange: 'transform',
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  pointerEvents: 'none'
                }}
              />
              
              {/* Ripple effect element (click animation in brand blue) */}
              <span
                ref={buttonRippleRef}
                className="absolute rounded-full bg-[#4B7AE7] pointer-events-none"
                style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  zIndex: 1,
                  transform: 'translate(-50%, -50%) scale(0)',
                  opacity: 0,
                  willChange: 'transform, opacity'
                }}
              />
              
              {/* Button text */}
              <span
                ref={buttonTextRef}
                className="relative z-10"
                style={{ 
                  color: '#FFFFFF', 
                  fontFamily: 'Poppins, sans-serif',
                  pointerEvents: 'none',
                  userSelect: 'none'
                }}
              >
                Login
              </span>
            </button>

          {/* Copyright Notice - Below Login Button */}
          <p className="text-sm text-center mt-6" style={{ color: '#FFFFFF', fontFamily: 'Poppins, sans-serif' }}>
            © Copyright Cognizance Health 2024
          </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
