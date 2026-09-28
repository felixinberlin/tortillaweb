import React from "react";

interface AbuelaAvatarSvgProps {
  size?: number | string;
  isSpeaking?: boolean;
  isListening?: boolean;
  className?: string;
  title?: string;
}

export const AbuelaAvatarSvg: React.FC<AbuelaAvatarSvgProps> = ({
  size = 56,
  isSpeaking = false,
  isListening = false,
  className = "",
  title = "Abuela María"
}) => {
  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      className={`select-none shrink-0 ${className}`}
      fill="none"
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{title}</title>
      <defs>
        {/* Soft Parchment / Gold Gradient Background */}
        <radialGradient id="abuelaBgGrad" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#FFF9E6" />
          <stop offset="65%" stopColor="#F5E6BE" />
          <stop offset="100%" stopColor="#E6CF9B" />
        </radialGradient>

        {/* Rosy Cheek Gradient */}
        <radialGradient id="cheekBlush" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F43F5E" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#F43F5E" stopOpacity="0" />
        </radialGradient>

        {/* Apron Texture */}
        <linearGradient id="apronGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#F1E5C9" />
        </linearGradient>

        <filter id="softShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#78350F" floodOpacity="0.18" />
        </filter>
      </defs>

      <style>{`
        /* Eye Blinking Animation */
        @keyframes abuelaBlink {
          0%, 92%, 100% {
            transform: scaleY(1);
          }
          95% {
            transform: scaleY(0.08);
          }
        }

        /* Mouth Talking Animation */
        @keyframes abuelaTalkMouth {
          0% {
            transform: scaleY(0.35) scaleX(0.9);
          }
          20% {
            transform: scaleY(1.3) scaleX(1.15) translateY(2px);
          }
          45% {
            transform: scaleY(0.6) scaleX(1.0);
          }
          70% {
            transform: scaleY(1.5) scaleX(1.1) translateY(2.5px);
          }
          100% {
            transform: scaleY(0.35) scaleX(0.9);
          }
        }

        /* Gentle Idle Smile Animation */
        @keyframes abuelaIdleSmile {
          0%, 100% {
            transform: scaleY(1) translateY(0);
          }
          50% {
            transform: scaleY(1.15) translateY(-0.5px);
          }
        }

        /* Head Breathing Sway */
        @keyframes abuelaBreathing {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-1.5px) rotate(${isSpeaking ? "0.8deg" : "0.3deg"});
          }
        }

        .abuela-head-group {
          transform-origin: 100px 140px;
          animation: abuelaBreathing ${isSpeaking ? "1.6s" : "3.5s"} infinite ease-in-out;
        }

        .abuela-eye {
          transform-origin: center;
          animation: abuelaBlink 4.2s infinite ease-in-out;
        }

        .abuela-mouth-open {
          transform-origin: 100px 124px;
          animation: abuelaTalkMouth 0.32s infinite ease-in-out;
        }

        .abuela-mouth-idle {
          transform-origin: 100px 124px;
          animation: abuelaIdleSmile 3.5s infinite ease-in-out;
        }
      `}</style>

      {/* Outer Border / Background Circle */}
      <circle cx="100" cy="100" r="95" fill="url(#abuelaBgGrad)" stroke="#FFB800" strokeWidth="4" />
      <circle cx="100" cy="100" r="90" fill="none" stroke="#EADBB6" strokeWidth="1.5" strokeDasharray="3 3" />

      {/* HEAD & BODY WRAPPER */}
      <g className="abuela-head-group">
        {/* Dress / Body */}
        <path
          d="M 44 200 C 44 158 66 150 100 150 C 134 150 156 158 156 200 Z"
          fill="#3E2C22"
        />

        {/* Traditional Kitchen Apron (Delantal del Baztán) */}
        <path
          d="M 66 156 L 134 156 L 144 200 L 56 200 Z"
          fill="url(#apronGrad)"
          stroke="#8D6E63"
          strokeWidth="1.5"
        />

        {/* Apron Straps & Collar Lace */}
        <path
          d="M 80 150 L 72 170 M 120 150 L 128 170"
          stroke="#8D6E63"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M 84 150 Q 100 162 116 150"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        {/* Heart Brooch on Apron */}
        <path
          d="M 100 167 C 98 163 93 163 93 166 C 93 170 100 174 100 174 C 100 174 107 170 107 166 C 107 163 102 163 100 167 Z"
          fill="#E11D48"
        />

        {/* Neck */}
        <rect x="91" y="130" width="18" height="25" rx="5" fill="#FBD5B5" />

        {/* HAIR BUN (Moño alto tradicional) */}
        <circle cx="100" cy="42" r="24" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="2.5" />
        {/* Bun Texture Strands */}
        <path
          d="M 87 40 Q 100 30 113 40 M 89 48 Q 100 38 111 48 M 94 34 Q 100 28 106 34"
          fill="none"
          stroke="#94A3B8"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        {/* Traditional Tortoiseshell Hairpin (Horquilla de madera/carey) */}
        <path
          d="M 78 36 L 122 36"
          stroke="#B45309"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <circle cx="78" cy="36" r="3" fill="#D97706" />

        {/* EARS WITH PEARL EARRINGS */}
        {/* Left Ear */}
        <ellipse cx="61" cy="98" rx="6" ry="10" fill="#FBD5B5" stroke="#F6AD7B" strokeWidth="1" />
        <circle cx="61" cy="104" r="2.8" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="0.8" />
        {/* Right Ear */}
        <ellipse cx="139" cy="98" rx="6" ry="10" fill="#FBD5B5" stroke="#F6AD7B" strokeWidth="1" />
        <circle cx="139" cy="104" r="2.8" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="0.8" />

        {/* FACE BASE */}
        <ellipse cx="100" cy="98" rx="40" ry="43" fill="#FDE1C9" />

        {/* ROSY SMILING CHEEKS */}
        <ellipse cx="76" cy="109" rx="11" ry="8" fill="url(#cheekBlush)" />
        <ellipse cx="124" cy="109" rx="11" ry="8" fill="url(#cheekBlush)" />

        {/* HAIR FRONT & SIDES (Soft wavy bangs parting in middle) */}
        <path
          d="M 61 88 C 61 58 76 50 100 50 C 124 50 139 58 139 88 C 133 70 120 62 100 66 C 80 62 67 70 61 88 Z"
          fill="#E2E8F0"
          stroke="#CBD5E1"
          strokeWidth="1.5"
        />
        <path
          d="M 100 66 C 96 74 88 80 80 84 M 100 66 C 104 74 112 80 120 84"
          fill="none"
          stroke="#CBD5E1"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* WARM ARCHED SILVER EYEBROWS */}
        <path
          d="M 72 82 Q 83 75 92 80"
          fill="none"
          stroke="#94A3B8"
          strokeWidth="2.8"
          strokeLinecap="round"
        />
        <path
          d="M 108 80 Q 117 75 128 82"
          fill="none"
          stroke="#94A3B8"
          strokeWidth="2.8"
          strokeLinecap="round"
        />

        {/* GLASSES (Gafitas redondas doradas) */}
        {/* Bridge */}
        <path d="M 94 94 Q 100 90 106 94" fill="none" stroke="#D97706" strokeWidth="2.2" />
        {/* Left Frame */}
        <circle cx="83" cy="95" r="14" fill="#FFFFFF" fillOpacity="0.3" stroke="#D97706" strokeWidth="2.2" />
        <path d="M 76 88 Q 80 86 86 87" fill="none" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
        {/* Right Frame */}
        <circle cx="117" cy="95" r="14" fill="#FFFFFF" fillOpacity="0.3" stroke="#D97706" strokeWidth="2.2" />
        <path d="M 110 88 Q 114 86 120 87" fill="none" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />

        {/* EYES WITH BLINK ANIMATION */}
        {/* Left Eye */}
        <g className="abuela-eye" style={{ transformOrigin: "83px 95px" }}>
          {isListening ? (
            /* Wide interested grandmother eye */
            <>
              <circle cx="83" cy="95" r="5" fill="#3E2723" />
              <circle cx="84.5" cy="93.5" r="2" fill="#FFFFFF" />
            </>
          ) : (
            /* Warm smiling eye */
            <>
              <circle cx="83" cy="95" r="4.2" fill="#3E2723" />
              <circle cx="84.5" cy="93.5" r="1.6" fill="#FFFFFF" />
              {/* Smile wrinkle */}
              <path d="M 70 94 Q 72 96 74 98" fill="none" stroke="#F6AD7B" strokeWidth="1.2" strokeLinecap="round" />
            </>
          )}
        </g>

        {/* Right Eye */}
        <g className="abuela-eye" style={{ transformOrigin: "117px 95px" }}>
          {isListening ? (
            /* Wide interested grandmother eye */
            <>
              <circle cx="117" cy="95" r="5" fill="#3E2723" />
              <circle cx="118.5" cy="93.5" r="2" fill="#FFFFFF" />
            </>
          ) : (
            /* Warm smiling eye */
            <>
              <circle cx="117" cy="95" r="4.2" fill="#3E2723" />
              <circle cx="118.5" cy="93.5" r="1.6" fill="#FFFFFF" />
              {/* Smile wrinkle */}
              <path d="M 130 94 Q 128 96 126 98" fill="none" stroke="#F6AD7B" strokeWidth="1.2" strokeLinecap="round" />
            </>
          )}
        </g>

        {/* CUTE ROUND GRANDMOTHER NOSE */}
        <path
          d="M 97 97 Q 100 107 104 105"
          fill="none"
          stroke="#E08B5D"
          strokeWidth="2.2"
          strokeLinecap="round"
        />

        {/* MOUTH (Moves when speaking or smiles gently) */}
        {isSpeaking ? (
          /* Talking Mouth Animation */
          <g className="abuela-mouth-open">
            {/* Open Mouth with teeth and tongue */}
            <path
              d="M 88 121 Q 100 134 112 121 Q 100 126 88 121 Z"
              fill="#9F1239"
              stroke="#881337"
              strokeWidth="1.5"
            />
            {/* Top teeth */}
            <path
              d="M 92 122 Q 100 125 108 122"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeLinecap="round"
            />
            {/* Tongue */}
            <ellipse cx="100" cy="127" rx="5" ry="3" fill="#FB7185" />
            {/* Smile dimples */}
            <path d="M 86 119 Q 87 122 89 124" fill="none" stroke="#E08B5D" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M 114 119 Q 113 122 111 124" fill="none" stroke="#E08B5D" strokeWidth="1.5" strokeLinecap="round" />
          </g>
        ) : (
          /* Smiling Mouth (Subtle idle animation) */
          <g className="abuela-mouth-idle">
            <path
              d="M 88 122 Q 100 130 112 122"
              fill="none"
              stroke="#BE123C"
              strokeWidth="2.8"
              strokeLinecap="round"
            />
            {/* Smile dimples */}
            <path d="M 86 120 Q 87 123 89 124" fill="none" stroke="#E08B5D" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M 114 120 Q 113 123 111 124" fill="none" stroke="#E08B5D" strokeWidth="1.5" strokeLinecap="round" />
            {/* Lip shadow */}
            <path d="M 96 129 Q 100 131 104 129" fill="none" stroke="#F6AD7B" strokeWidth="1.2" strokeLinecap="round" />
          </g>
        )}
      </g>
    </svg>
  );
};
