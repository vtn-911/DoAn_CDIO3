/**
 * Button Component - Reusable button with 3 variants
 * @param {string} variant - 'primary', 'secondary', or 'tertiary'
 * @param {string} size - 'sm', 'md', or 'lg'
 * @param {boolean} fullWidth - Make button take full width
 * @param {function} onClick - Click handler
 * @param {string} children - Button text
 */
export default function Button({ 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false,
  onClick,
  children,
  className = '',
  disabled = false
}) {
  // Base styles for all buttons
  const baseStyles = 'font-semibold rounded-lg transition-all duration-200 ease-in-out flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed'

  // Size variants
  const sizeStyles = {
    sm: 'px-4 py-1.5 text-sm',
    md: 'px-6 py-2.5 text-sm',
    lg: 'px-8 py-3 text-base'
  }

  // Color variants
  const variantStyles = {
    primary: 'gradient-primary text-white shadow-md hover:opacity-90 active:scale-95',
    secondary: 'bg-surface-container-highest text-on-surface hover:bg-surface-container-high active:scale-95',
    tertiary: 'text-primary hover:bg-primary-fixed active:scale-95'
  }

  const widthStyle = fullWidth ? 'w-full' : ''

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseStyles}
        ${sizeStyles[size]}
        ${variantStyles[variant]}
        ${widthStyle}
        ${className}
      `}
    >
      {children}
    </button>
  )
}
