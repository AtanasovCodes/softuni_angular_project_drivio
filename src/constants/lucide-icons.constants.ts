import { Car, Compass, Vote } from 'lucide-angular';

export const LUCIDE_ICONS = {
  Compass,
  Car,
  Vote,
} as const;

export type LucideIconName = keyof typeof LUCIDE_ICONS;
