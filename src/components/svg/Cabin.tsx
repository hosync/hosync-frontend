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
    data-component="SVG.Cabin"
    onClick={onClick}
    title={label}
    className={className}
    style={onClick ? { cursor: 'pointer' } : {}}
    {...svgProps}
  >
    <svg
      fill={alternativeColor || color}
      width={size || width}
      height={size || height}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M19,3a1,1,0,0,0-2,0V6L12,2,2,10H4V22h6V18a2,2,0,0,1,4,0v4h6V10h2L19,7.6ZM8,18H6V16H8Zm0-4H6V12H8Zm6,0H10V12h4Zm4,4H16V16h2Zm0-4H16V12h2Z" />
    </svg>
  </div>
)

export default SVG
