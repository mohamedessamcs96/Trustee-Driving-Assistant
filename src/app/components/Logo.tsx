interface LogoProps {
  className?: string;
  variant?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg';
}

export function Logo({ className = "", variant = 'dark', size = 'md' }: LogoProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  const textSizeClasses = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-2xl'
  };

  const subtextClasses = {
    sm: 'text-[8px]',
    md: 'text-[10px]',
    lg: 'text-xs'
  };

  const textColor = variant === 'light' ? 'text-white' : 'text-black';
  const subtextColor = variant === 'light' ? 'text-blue-200' : 'text-gray-600';

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <img
        src="/trustee-logo.png"
        alt="Trustee Logo"
        className={`${sizeClasses[size]} object-contain`}
      />
      <div className="flex flex-col">
      
      </div>
    </div>
  );
}
