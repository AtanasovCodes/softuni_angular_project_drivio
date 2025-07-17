import { Car, Compass, Vote, Mail, Phone, User } from 'lucide-angular';

export const LUCIDE_ICONS = {
  Compass,
  Car,
  Vote,
  Mail,
  Phone,
  User,
} as const;

export type LucideIconName = keyof typeof LUCIDE_ICONS;
