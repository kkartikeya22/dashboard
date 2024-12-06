import { formatDistanceToNow, format, parseISO, differenceInSeconds, differenceInMinutes, differenceInHours, differenceInDays, differenceInYears } from 'date-fns';

export type TimeFormat = 'relative' | 'absolute';

export const formatTimestamp = (timestamp: string, type: TimeFormat = 'absolute'): string => {
  try {
    // Try to parse different date formats
    let date: Date;
    
    // Check if it's already a valid ISO string
    if (timestamp.includes('T') || timestamp.includes('Z')) {
      date = parseISO(timestamp);
    } else {
      // Handle format like "Mar 15, 14:30" or "2024-03-15 14:30"
      date = new Date(timestamp);
    }

    // Validate if we got a valid date
    if (isNaN(date.getTime())) {
      return timestamp;
    }
    
    if (type === 'relative') {
      const now = new Date();
      const diffSeconds = differenceInSeconds(now, date);
      const diffMinutes = differenceInMinutes(now, date);
      const diffHours = differenceInHours(now, date);
      const diffDays = differenceInDays(now, date);
      const diffYears = differenceInYears(now, date);

      if (diffSeconds < 60) return 'now';

      let value: number;
      let unit: string;

      if (diffMinutes < 60) {
        value = diffMinutes;
        unit = 'm';
      } else if (diffHours < 24) {
        value = diffHours;
        unit = 'h';
      } else if (diffDays < 365) {
        value = diffDays;
        unit = 'd';
      } else {
        value = diffYears;
        unit = 'y';
      }

      return `${value}${unit} ago`;
    }
    
    return format(date, 'MMM d, HH:mm');
  } catch (error) {
    // If parsing fails, return original timestamp
    return timestamp;
  }
}; 