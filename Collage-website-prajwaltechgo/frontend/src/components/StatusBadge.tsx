import React from 'react';
import { ApplicationStatus } from '../types/index.js';

interface StatusBadgeProps {
  status: ApplicationStatus | string;
  size?: 'sm' | 'md' | 'lg';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const getStyles = () => {
    switch (status) {
      case 'APPROVED':
        return 'bg-emerald-950 text-emerald-300 border-emerald-800';
      case 'UNDER_REVIEW':
        return 'bg-blue-950 text-blue-300 border-blue-800';
      case 'REJECTED':
        return 'bg-rose-950 text-rose-300 border-rose-800';
      case 'PENDING':
      default:
        return 'bg-amber-950 text-amber-300 border-amber-800';
    }
  };

  const getLabel = () => {
    switch (status) {
      case 'UNDER_REVIEW':
        return 'Under Review';
      case 'APPROVED':
        return 'Approved';
      case 'REJECTED':
        return 'Rejected';
      case 'PENDING':
      default:
        return 'Pending Review';
    }
  };

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider',
    md: 'px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider',
    lg: 'px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 border ${getStyles()} ${sizeClasses[size]}`}
    >
      <span className="h-1.5 w-1.5 bg-current" />
      <span className="whitespace-nowrap">{getLabel()}</span>
    </span>
  );
};

export default StatusBadge;
