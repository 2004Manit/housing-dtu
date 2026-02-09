/**
 * Utility to retry failed dynamic imports with exponential backoff.
 * Helps handle network issues during lazy loading, especially on mobile.
 */
export function lazyWithRetry<T extends React.ComponentType<unknown>>(
  importFn: () => Promise<{ default: T }>,
  retries = 3,
  delay = 1000
): React.LazyExoticComponent<T> {
  return React.lazy(() => retryImport(importFn, retries, delay));
}

async function retryImport<T>(
  importFn: () => Promise<T>,
  retries: number,
  delay: number
): Promise<T> {
  try {
    return await importFn();
  } catch (error) {
    if (retries <= 0) {
      // All retries exhausted, throw the error
      throw error;
    }
    
    // Wait before retrying (exponential backoff)
    await new Promise(resolve => setTimeout(resolve, delay));
    
    // Retry with one less attempt and doubled delay
    return retryImport(importFn, retries - 1, delay * 2);
  }
}

// Re-export React for convenience
import React from 'react';
