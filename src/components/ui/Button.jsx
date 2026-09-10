import Icon from './Icon.jsx';

const VARIANTS = {
  primary:
    'bg-primary-container text-on-primary shadow-[0_8px_24px_-2px_rgba(232,146,124,0.38)] hover:-translate-y-0.5 hover:bg-primary',
  soft:
    'bg-surface-container-low hover:bg-surface-container text-on-surface shadow-sm hover:-translate-y-0.5',
  light:
    'bg-surface-container-lowest text-primary shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:-translate-y-1 hover:bg-surface font-bold',
};

/**
 * Pill-shaped call to action link.
 */
export default function Button({
  href = '#',
  children,
  variant = 'primary',
  icon,
  iconPosition = 'left',
  iconSize = 20,
  className = '',
}) {
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center gap-space-xs rounded-full px-space-xl py-space-sm font-label-lg text-label-lg transition-all duration-200 ${VARIANTS[variant]} ${className}`}
    >
      {icon && iconPosition === 'left' && <Icon name={icon} size={iconSize} />}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <Icon name={icon} size={iconSize} />}
    </a>
  );
}
