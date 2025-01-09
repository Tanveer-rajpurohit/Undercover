import { ChevronRight } from 'lucide-react';

interface ListItemProps {
  icon?: React.ReactNode;
  title: string;
  subtitle?: string;
  rightElement?: React.ReactNode;
  onClick?: () => void;
}

export function ListItem({ icon, title, subtitle, rightElement, onClick }: ListItemProps) {
  return (
    <button 
      className="w-full bg-white flex items-center justify-between p-4 border-b border-gray-100"
      onClick={onClick}
    >
      <div className="flex items-center gap-4">
        {icon && (
          <div className="w-8 h-8 flex items-center justify-center">
            {icon}
          </div>
        )}
        <div className="text-left">
          <div className="font-medium">{title}</div>
          {subtitle && <div className="text-sm text-gray-500">{subtitle}</div>}
        </div>
      </div>
      {rightElement || <ChevronRight className="w-5 h-5 text-gray-400" />}
    </button>
  );
}

