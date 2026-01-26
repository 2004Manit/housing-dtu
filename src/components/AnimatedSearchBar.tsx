import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Checkbox } from './ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface AnimatedSearchBarProps {
  onSearchChange: (value: string) => void;
  onTypeChange: (types: string[]) => void;
  onSortChange: (value: string) => void;
  searchValue: string;
  selectedTypes: string[];
  sortBy: string;
}

export const AnimatedSearchBar = ({
  onSearchChange,
  onTypeChange,
  onSortChange,
  searchValue,
  selectedTypes,
  sortBy,
}: AnimatedSearchBarProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleTypeToggle = (type: string) => {
    if (selectedTypes.includes(type)) {
      onTypeChange(selectedTypes.filter(t => t !== type));
    } else {
      onTypeChange([...selectedTypes, type]);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="relative max-w-5xl mx-auto"
    >
      {/* Main Container */}
      <motion.div
        animate={{
          scale: isFocused ? 1.01 : 1,
        }}
        transition={{ duration: 0.3 }}
        className="relative"
      >
        {/* Animated Border - Top */}
        <motion.div
          className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent rounded-t-xl sm:rounded-t-2xl"
          initial={{ width: 0, opacity: 0 }}
          animate={isFocused ? { width: '100%', opacity: 1 } : { width: 0, opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          style={{ zIndex: 10 }}
        />

        {/* Animated Border - Right */}
        <motion.div
          className="absolute top-0 right-0 w-[2px] bg-gradient-to-b from-transparent via-cyan-400 to-transparent rounded-r-xl sm:rounded-r-2xl"
          initial={{ height: 0, opacity: 0 }}
          animate={isFocused ? { height: '100%', opacity: 1 } : { height: 0, opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut', delay: 0.15 }}
          style={{ zIndex: 10 }}
        />

        {/* Animated Border - Bottom */}
        <motion.div
          className="absolute bottom-0 right-0 h-[2px] bg-gradient-to-l from-transparent via-cyan-400 to-transparent rounded-b-xl sm:rounded-b-2xl"
          initial={{ width: 0, opacity: 0 }}
          animate={isFocused ? { width: '100%', opacity: 1 } : { width: 0, opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut', delay: 0.3 }}
          style={{ zIndex: 10 }}
        />

        {/* Animated Border - Left */}
        <motion.div
          className="absolute bottom-0 left-0 w-[2px] bg-gradient-to-t from-transparent via-cyan-400 to-transparent rounded-l-xl sm:rounded-l-2xl"
          initial={{ height: 0, opacity: 0 }}
          animate={isFocused ? { height: '100%', opacity: 1 } : { height: 0, opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut', delay: 0.45 }}
          style={{ zIndex: 10 }}
        />

        {/* Breathing Glow Effect */}
        {isFocused && (
          <motion.div
            className="absolute inset-0 rounded-xl sm:rounded-2xl pointer-events-none"
            style={{
              boxShadow: '0 0 20px rgba(34, 211, 238, 0.4), inset 0 0 20px rgba(34, 211, 238, 0.1)',
              zIndex: 9,
            }}
            animate={{
              boxShadow: [
                '0 0 20px rgba(34, 211, 238, 0.4), inset 0 0 20px rgba(34, 211, 238, 0.1)',
                '0 0 30px rgba(34, 211, 238, 0.6), inset 0 0 30px rgba(34, 211, 238, 0.2)',
                '0 0 20px rgba(34, 211, 238, 0.4), inset 0 0 20px rgba(34, 211, 238, 0.1)',
              ],
            }}
            transition={{ duration: 2.5, repeat: Infinity }}
          />
        )}

        {/* Glow effect when focused */}
        <motion.div
          animate={{
            opacity: isFocused ? 1 : 0,
            scale: isFocused ? 1 : 0.8,
          }}
          transition={{ duration: 0.3 }}
          className="absolute -inset-1 bg-gradient-primary rounded-xl sm:rounded-2xl blur-lg"
          style={{ zIndex: -1 }}
        />

        {/* Main Container */}
        <div className="relative glass-effect rounded-xl sm:rounded-2xl overflow-hidden">
          <div className="p-4 sm:p-5 md:p-6 space-y-3 sm:space-y-4">
            
            {/* Search Input Row */}
            <div className="flex items-center gap-3 sm:gap-4">
              {/* Search icon */}
              <motion.div
                animate={{
                  rotate: isFocused ? 360 : 0,
                  scale: isFocused ? 1.1 : 1,
                }}
                transition={{ duration: 0.5 }}
                className="text-muted-foreground flex-shrink-0"
              >
                <Search className="w-5 h-5 sm:w-6 sm:h-6" />
              </motion.div>

              {/* Input field */}
              <input
                type="text"
                value={searchValue}
                onChange={(e) => onSearchChange(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Search properties..."
                className="flex-1 min-w-0 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground text-sm sm:text-base font-light"
              />
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

            {/* Filters Row */}
            <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-4 sm:gap-6">
              
              {/* Property Type Checkboxes */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <SlidersHorizontal className="w-4 h-4" />
                  <span className="text-xs sm:text-sm font-medium">Type:</span>
                </div>
                
                <div className="flex items-center gap-3 sm:gap-4 ml-6 sm:ml-0">
                  {/* PG Checkbox */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 cursor-pointer group"
                    onClick={() => handleTypeToggle('PG')}
                  >
                    <Checkbox
                      id="type-pg"
                      checked={selectedTypes.includes('PG')}
                      onCheckedChange={() => handleTypeToggle('PG')}
                      className="border-cyan-500/50 data-[state=checked]:bg-cyan-500 data-[state=checked]:border-cyan-500"
                    />
                    <label
                      htmlFor="type-pg"
                      className="text-xs sm:text-sm font-medium cursor-pointer group-hover:text-cyan-400 transition-colors"
                    >
                      PG
                    </label>
                  </motion.div>

                  {/* Flat Checkbox */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 cursor-pointer group"
                    onClick={() => handleTypeToggle('Flat')}
                  >
                    <Checkbox
                      id="type-flat"
                      checked={selectedTypes.includes('Flat')}
                      onCheckedChange={() => handleTypeToggle('Flat')}
                      className="border-cyan-500/50 data-[state=checked]:bg-cyan-500 data-[state=checked]:border-cyan-500"
                    />
                    <label
                      htmlFor="type-flat"
                      className="text-xs sm:text-sm font-medium cursor-pointer group-hover:text-cyan-400 transition-colors"
                    >
                      Flat
                    </label>
                  </motion.div>
                </div>
              </div>

              {/* Vertical divider - hidden on mobile */}
              <div className="h-px w-full sm:h-6 sm:w-px bg-border sm:block" />

              {/* Sort By Dropdown */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 w-full sm:w-auto">
                <span className="text-xs sm:text-sm font-medium text-muted-foreground">Sort by:</span>
                <Select value={sortBy} onValueChange={onSortChange}>
                  <SelectTrigger className="w-full sm:w-[180px] border-border/50 bg-card/50 hover:bg-card transition-colors text-xs sm:text-sm h-9 sm:h-10">
                    <SelectValue placeholder="Last Listed" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    <SelectItem value="last-listed" className="text-xs sm:text-sm">Last Listed</SelectItem>
                    <SelectItem value="nearest-dtu" className="text-xs sm:text-sm">Nearest to DTU</SelectItem>
                    <SelectItem value="price-high-low" className="text-xs sm:text-sm">Price: High to Low</SelectItem>
                    <SelectItem value="price-low-high" className="text-xs sm:text-sm">Price: Low to High</SelectItem>
                  </SelectContent>
                </Select>
              </div>

            </div>
          </div>

          {/* Animated border bottom */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isFocused ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-primary origin-left"
          />
        </div>
      </motion.div>

      {/* Floating particles around search bar */}
      {isFocused && (
        <>
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 0.6, 0],
                scale: [0, 1, 0],
                x: [0, Math.random() * 60 - 30],
                y: [0, Math.random() * 60 - 30],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
              }}
              className="absolute w-1 h-1 sm:w-1.5 sm:h-1.5 bg-cyan-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </>
      )}
    </motion.div>
  );
};

export default AnimatedSearchBar;