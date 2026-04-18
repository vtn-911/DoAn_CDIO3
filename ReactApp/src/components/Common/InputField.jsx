import { useState } from 'react'

/**
 * InputField Component - Reusable text/email/password input
 * @param {string} type - Input type: 'text', 'email', 'password'
 * @param {string} label - Label text
 * @param {string} placeholder - Placeholder text
 * @param {string} value - Input value
 * @param {function} onChange - Change handler
 * @param {boolean} required - Mark as required
 * @param {string} error - Error message
 */
export default function InputField({
  type = 'text',
  label,
  placeholder,
  value,
  onChange,
  required = false,
  error = '',
  icon = null,
  className = ''
}) {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <div className={`flex flex-col ${className}`}>
      {/* Label */}
      {label && (
        <label className="block text-sm font-medium text-on-surface mb-2">
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </label>
      )}

      {/* Input Container */}
      <div className={`
        relative flex items-center rounded-lg border-2 transition-all duration-200
        ${isFocused ? 'border-primary bg-surface-container-lowest' : 'border-outline-variant bg-surface-container-highest'}
        ${error ? 'border-error bg-error-container' : ''}
      `}>
        {/* Icon */}
        {icon && (
          <span className="absolute left-3 text-on-surface-variant">
            {icon}
          </span>
        )}

        {/* Input */}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`
            flex-1 bg-transparent px-4 py-3 outline-none text-on-surface placeholder-on-surface-variant
            ${icon ? 'pl-10' : ''}
          `}
        />
      </div>

      {/* Error message */}
      {error && (
        <p className="text-error text-xs mt-2">{error}</p>
      )}
    </div>
  )
}
