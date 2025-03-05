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
    data-component="SVG.BarberShop"
    onClick={onClick}
    title={label}
    className={className}
    style={onClick ? { cursor: 'pointer' } : {}}
    {...svgProps}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      width={size || width}
      height={size || height}
      preserveAspectRatio="xMidYMid meet"
    >
      <path
        d="M45 19.449c1.104 0 2-.824 2-1.84v-1.943c0-1.018-.896-1.842-2-1.842c0-15.766-26-15.766-26 0c-1.104 0-2 .824-2 1.842v1.943c0 1.016.896 1.84 2 1.84h.281v36.926H19c-1.104 0-2 .824-2 1.84v1.943c0 1.016.896 1.842 2 1.842h26c1.104 0 2-.826 2-1.842v-1.943c0-1.016-.896-1.84-2-1.84h-.281V19.449H45M20.914 40.781v-5.898c7.391-1.809 14.781-8.826 22.172-10.635v5.896c-7.391 1.809-14.781 8.827-22.172 10.637m22.172-5.361v5.896c-7.391 1.809-14.781 8.826-22.172 10.635v-5.896c7.391-1.811 14.781-8.828 22.172-10.635M23.709 56.375c6.459-2.584 12.918-8.126 19.377-9.705v5.896c-3.299.808-5.967 2.272-8.566 3.809H23.709m-2.795-26.844v-5.898c3.058-.748 6.115-2.39 9.172-4.184h11.191c-6.788 2.377-13.576 8.419-20.363 10.082"
        fill={alternativeColor || color}
      ></path>
    </svg>
  </div>
)

export default SVG
