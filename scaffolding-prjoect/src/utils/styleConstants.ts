/**
 * Centralized style constants to eliminate hardcoded/repeated values
 * across atoms, molecules, and organisms.
 *
 * Use these tokens instead of inline magic numbers so that
 * changes propagate from a single source of truth.
 */

// ─── Border Radii ────────────────────────────────────────────
export const BORDER_RADIUS = {
  XS: '6px',
  SM: '8px',
  MD: '12px',
  LG: '16px',
  PILL: '20px',
} as const;

// ─── Icon Sizes ──────────────────────────────────────────────
export const ICON_SIZE = {
  XS: 15,
  SM: 18,
  MD: 20,
  LG: 22,
  XL: 24,
} as const;

// ─── Layout Dimensions ──────────────────────────────────────
export const LAYOUT = {
  SIDEBAR_WIDTH: 250,
  SIDEBAR_Z_INDEX: 1200,
  STICKY_HEADER_Z_INDEX: 10,
  TABLE_MIN_WIDTH: 650,
  MODAL_TABLE_MAX_HEIGHT: '260px',
  POPOVER_WIDTH: '220px',
} as const;

// ─── Component Sizes ────────────────────────────────────────
export const COMPONENT_SIZE = {
  AVATAR: 36,
  CHIP_HEIGHT: '26px',
  LOGO_ICON_DEFAULT: 28,
  LOGO_FONT_DEFAULT: '1.5rem',
} as const;

// ─── Transitions ─────────────────────────────────────────────
export const TRANSITION = {
  DEFAULT: 'all 0.2s ease',
  BG_ONLY: 'background-color 0.2s ease',
  COLOR_ONLY: 'color 0.2s ease',
  TRANSFORM: 'transform 0.2s ease',
  EASE_IN_OUT: 'all 0.2s ease-in-out',
} as const;

// ─── Shadows ─────────────────────────────────────────────────
export const SHADOW = {
  POPOVER: '0px 10px 30px rgba(0, 0, 0, 0.5)',
  NONE: 'none',
} as const;

// ─── Opacity Overlays ────────────────────────────────────────
export const OVERLAY = {
  HOVER_LIGHT: 'rgba(255, 255, 255, 0.05)',
  HOVER_SUBTLE: 'rgba(255, 255, 255, 0.02)',
} as const;

// ─── Font Weights ────────────────────────────────────────────
export const FONT_WEIGHT = {
  REGULAR: 400,
  MEDIUM: 500,
  SEMI_BOLD: 600,
  BOLD: 700,
} as const;

// ─── Business Constants ──────────────────────────────────────
export const BUSINESS = {
  INTEREST_RATE: 12.0,
  SYNC_DELAY_MS: 600,
} as const;

// ─── Default Hook Values ─────────────────────────────────────
export const DEFAULT_SUMMARY = {
  TERM_CAP: '12 months',
  AVAILABLE_CREDIT: '$0.0k',
  MAX_INTEREST_RATE: '12.00%',
  TOTAL_AVAILABLE_ADVANCE: '$0.00',
} as const;

export const DEFAULT_METRIC_SUMMARY = {
  termCap: '12 months',
  availableCredit: '$0.0k',
  maxInterestRate: '12.00%',
  totalAvailableAdvance: '$0.00',
} as const;
