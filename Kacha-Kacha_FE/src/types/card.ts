export interface CardProps {
    iconClass: string; // Font Awesome icon class
    title: string; // Title of the card
    value: string | number; // Main value to display
    description?: string; // Optional description
    percentageChange?: string; // Optional percentage change info
    isIncrease?: boolean; // Indicates if the change is positive or negative
}