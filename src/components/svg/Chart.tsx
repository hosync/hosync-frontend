import React, { FC } from 'react'

type Props = {
  alternativeColor?: string
  color?: string
  height?: string
  label?: string
  onClick?: any
  size?: string
  width?: string
  className?: string
}

const SVG: FC<Props> = ({
  alternativeColor = '',
  color = '#666',
  height = '24px',
  label = undefined,
  onClick = undefined,
  size = '',
  width = '24px',
  className = undefined,
  ...svgProps
}) => (
  <div
    data-component="SVG.Chart"
    onClick={onClick}
    title={label}
    className={className}
    style={onClick ? { cursor: 'pointer' } : {}}
    {...svgProps}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0.00 0.00 537.00 464.00"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width={size || width}
      height={size || height}
    >
      <path
        fill={alternativeColor || color}
        d="
  M 225.57 104.86
  L 311.74 124.39
  A 1.18 1.16 27.0 0 0 312.85 124.04
  Q 319.70 116.61 328.53 121.87
  Q 328.97 122.13 329.42 121.88
  L 417.97 72.38
  Q 418.55 72.05 418.52 71.39
  Q 418.22 64.64 423.73 61.10
  C 432.18 55.67 442.76 63.36 440.76 72.88
  C 439.03 81.10 430.07 84.33 423.17 79.89
  A 1.24 1.23 -43.0 0 0 421.90 79.85
  L 333.63 129.21
  Q 333.09 129.51 333.07 130.13
  C 332.83 136.27 330.07 140.88 323.76 142.10
  C 318.45 143.12 313.73 140.23 311.38 135.43
  C 310.86 134.38 311.12 132.87 309.71 132.55
  Q 266.92 122.92 224.22 113.19
  Q 223.56 113.04 222.99 113.38
  C 222.10 113.92 221.54 114.97 220.65 115.58
  Q 213.82 120.21 206.80 115.41
  Q 206.43 115.15 206.02 115.36
  L 117.61 161.41
  A 0.86 0.86 0.0 0 0 117.15 162.17
  Q 117.01 171.39 108.49 173.74
  C 103.25 175.18 97.64 172.14 95.59 167.24
  C 91.08 156.48 103.25 147.00 112.71 153.78
  A 1.10 1.08 -40.5 0 0 113.85 153.86
  L 201.80 108.05
  A 1.45 1.43 -13.0 0 0 202.57 106.83
  Q 202.87 98.67 209.97 95.99
  C 216.36 93.57 223.36 97.37 224.83 104.12
  Q 224.97 104.72 225.57 104.86
  Z"
      />
      <rect fill={color} x="384.76" y="119.08" width="89.94" height="243.56" rx="0.26" />
      <rect fill={color} x="168.80" y="156.49" width="90.10" height="206.14" rx="0.74" />
      <rect fill={color} x="276.76" y="180.85" width="89.98" height="181.78" rx="0.74" />
      <rect fill={color} x="60.86" y="212.55" width="90.04" height="150.10" rx="0.41" />
      <rect fill={color} x="60.84" y="376.78" width="413.92" height="15.74" rx="0.66" />
    </svg>
  </div>
)

export default SVG
