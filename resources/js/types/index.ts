export type * from './auth';

export type PlatformType = 'all' | 'whatsapp' | 'telegram';

export type ActivityLevel = 'Sangat Aktif' | 'Aktif' | 'Santai';

export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  color: string;
  bgLight: string;
}

export interface GroupItem {
  id: string;
  name: string;
  platform: 'whatsapp' | 'telegram';
  link: string;
  categoryId: string;
  categoryName?: string; // Nama kategori dari database
  imageUrl?: string;
  description: string;
  membersCount: number;
  isVerified: boolean;
  tags: string[];
  rules?: string[];
  activity: ActivityLevel;
  language: string;
  addedAt: string;
  clicks: number;
  isCustom?: boolean;
  reportedBroken?: boolean;
  contactAdmin?: string;
}

export type SortOption = 'popular' | 'members' | 'newest' | 'verified';
