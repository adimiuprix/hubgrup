import React from 'react';
import {
  LayoutGrid,
  Code2,
  Briefcase,
  GraduationCap,
  TrendingUp,
  Gamepad2,
  Palette,
  Film,
  MapPin,
  HeartHandshake,
  HelpCircle
} from 'lucide-react';

interface CategoryIconProps {
  name: string;
  size?: number;
  className?: string;
  strokeWidth?: number;
}

export const CategoryIcon: React.FC<CategoryIconProps> = ({ name, ...props }) => {
  switch (name) {
    case 'LayoutGrid':
      return <LayoutGrid {...props} />;
    case 'Code2':
      return <Code2 {...props} />;
    case 'Briefcase':
      return <Briefcase {...props} />;
    case 'GraduationCap':
      return <GraduationCap {...props} />;
    case 'TrendingUp':
      return <TrendingUp {...props} />;
    case 'Gamepad2':
      return <Gamepad2 {...props} />;
    case 'Palette':
      return <Palette {...props} />;
    case 'Film':
      return <Film {...props} />;
    case 'MapPin':
      return <MapPin {...props} />;
    case 'HeartHandshake':
      return <HeartHandshake {...props} />;
    default:
      return <HelpCircle {...props} />;
  }
};
