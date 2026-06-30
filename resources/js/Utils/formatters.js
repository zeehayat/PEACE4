/**
 * Formatting utilities for application views
 */

export const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Invalid Date';
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

export const formatCurrency = (value) => {
    if (value === null || value === undefined || value === '') return 'N/A';
    const num = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(num)) return 'N/A';
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'PKR', minimumFractionDigits: 2 }).format(num);
};

export const formatDecimal = (value, digits = 2) => {
    if (value === null || value === undefined || value === '') return 'N/A';
    const num = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(num)) return 'N/A';
    return num.toFixed(digits);
};
