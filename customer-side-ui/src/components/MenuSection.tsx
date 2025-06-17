import React from 'react';
import { Plus } from 'lucide-react';
import { MenuItem } from '@/types/order';

interface MenuSectionProps {
  title: string;
  items: MenuItem[];
  onAddToCart: (item: MenuItem) => void;
}

// Renders grid of drink items with images, prices, and add buttons
