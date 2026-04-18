/**
 * Card Component - Display data in a styled container
 * Supports KPI card with accent bar, data card, and info card
 */
export default function Card({
  title,
  value,
  trend,
  accentColor = 'primary',
  children,
  className = '',
  variant = 'kpi' // 'kpi', 'data', 'info'
}) {
  return (
    <div className={`
      bg-surface-container-lowest rounded-lg p-6 overflow-hidden
      ${className}
    `}>
      {/* Accent bar for KPI cards */}
      {variant === 'kpi' && (
        <div className={`
          absolute left-0 top-0 bottom-0 w-1
          bg-${accentColor === 'primary' ? 'primary' : accentColor === 'secondary' ? 'secondary' : 'primary'}
        `} />
      )}

      {/* Content */}
      <div className={variant === 'kpi' ? 'ml-2' : ''}>
        {/* Title */}
        {title && (
          <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-3">
            {title}
          </p>
        )}

        {/* Value (for KPI) */}
        {value && (
          <p className="text-3xl font-bold text-on-surface mb-2">
            {value}
          </p>
        )}

        {/* Trend (for KPI) */}
        {trend && (
          <p className="text-xs text-on-surface-variant">
            {trend}
          </p>
        )}

        {/* Custom children */}
        {children && (
          <div>
            {children}
          </div>
        )}
      </div>
    </div>
  )
}
