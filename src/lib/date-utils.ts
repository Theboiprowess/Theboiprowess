/**
 * Centralized date utility functions for dynamic date handling
 * All dates are derived from the current server date
 */

/**
 * Get the current year
 */
export function getCurrentYear(): number {
  return new Date().getFullYear();
}

/**
 * Get the next academic year
 * Admissions are always for the NEXT academic year
 * Example: In 2026, admissions are for 2027
 */
export function getNextAcademicYear(): number {
  return getCurrentYear() + 1;
}

/**
 * Get the current academic session
 * Returns the current year as the academic session
 */
export function getCurrentAcademicSession(): number {
  return getCurrentYear();
}

/**
 * Format a year as a string
 */
export function formatYear(year: number): string {
  return year.toString();
}

/**
 * Get copyright year range
 * Example: "2020-2026" or just "2026" if single year
 */
export function getCopyrightYear(startYear?: number): string {
  const currentYear = getCurrentYear();
  if (startYear && startYear < currentYear) {
    return `${startYear}-${currentYear}`;
  }
  return currentYear.toString();
}

/**
 * Check if a date is in the past
 */
export function isPastDate(date: Date | string): boolean {
  const checkDate = typeof date === 'string' ? new Date(date) : date;
  return checkDate < new Date();
}

/**
 * Check if a date is in the future
 */
export function isFutureDate(date: Date | string): boolean {
  const checkDate = typeof date === 'string' ? new Date(date) : date;
  return checkDate > new Date();
}

/**
 * Check if a date is today
 */
export function isToday(date: Date | string): boolean {
  const checkDate = typeof date === 'string' ? new Date(date) : date;
  const today = new Date();
  return checkDate.toDateString() === today.toDateString();
}

/**
 * Format date for display
 */
export function formatDate(date: Date | string, format: 'short' | 'long' = 'long'): string {
  const checkDate = typeof date === 'string' ? new Date(date) : date;
  
  if (format === 'short') {
    return checkDate.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  }
  
  return checkDate.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

/**
 * Get admission deadline based on current date
 * Default: December 31st of current year
 */
export function getAdmissionDeadline(): Date {
  const currentYear = getCurrentYear();
  return new Date(currentYear, 11, 31); // December 31st
}

/**
 * Check if admissions are currently open
 */
export function areAdmissionsOpen(): boolean {
  const deadline = getAdmissionDeadline();
  return new Date() <= deadline;
}

/**
 * Get admission status message
 */
export function getAdmissionStatus(): {
  isOpen: boolean;
  message: string;
  year: number;
} {
  const isOpen = areAdmissionsOpen();
  const year = getNextAcademicYear();
  
  return {
    isOpen,
    message: isOpen ? 'Admissions Open' : 'Admissions Closed',
    year
  };
}
