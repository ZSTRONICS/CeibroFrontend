import React, { ReactNode } from 'react';

interface SvgIconProps {
  width?: number;
  height?: number;
  color?: string;
  children: ReactNode;
}

const SvgIcon: React.FC<SvgIconProps> = ({
  width = 24,
  height = 24,
  color = '#000',
  children,
}) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" fill="white" />
      <g fill={color}>{children}</g>
    </svg>
  );
};

export default SvgIcon;
