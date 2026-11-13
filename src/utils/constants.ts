import type { Column } from "../types/candidate";

export const STATUS_CLEAR = "CLEAR";
export const STATUS_CONSIDER = "CONSIDER";

export const STATUS = {
  CLEAR: STATUS_CLEAR,
  CONSIDER: STATUS_CONSIDER,
} as const;

export const DEFAULT_COLUMNS: Column[] = [
  { id: "name", label: "NAME", width: "24%" },
  { id: "adjudication", label: "ADJUDICATION", width: "16%" },
  { id: "status", label: "STATUS", width: "14%" },
  { id: "location", label: "LOCATION", width: "28%" },
  { id: "date", label: "DATE", width: "18%" },
];

export const DEFAULT_USER_NAME = "James Rodriguez";
export const DEFAULT_USER_COMPANY = "James.co";
export const DEFAULT_USER_AVATAR_SRC = "https://i.pravatar.cc/40";
export const DEFAULT_USER_AVATAR_LETTER = "J";

export const DEFAULT_PAGE = 1;
export const DEFAULT_PER_PAGE = 10;
export const DEFAULT_PER_PAGE_OPTIONS = [10, 20, 50];
export const DEFAULT_MAX_VISIBLE_PAGES = 3;

export const NAV_LABELS = {
  HOME: "Home",
  CANDIDATES: "Candidates",
  ADVERSE_ACTIONS: "Adverse Actions",
  LOGS: "Logs",
  ANALYTICS: "Analytics",
  ACCOUNT: "Account",
  SCREENINGS: "Screenings",
} as const;

export const DEFAULT_ACTIVE_NAV = NAV_LABELS.CANDIDATES;
export const DEFAULT_PAGE_TITLE = "Candidates";
export const DEFAULT_TABLE_TITLE = "Candidate Information";
export const DEFAULT_SEARCH_PLACEHOLDER = "Search any candidate";
export const APP_LOGO_TEXT = "RECRUIT";

export const BUTTON_TEXT = {
  EXPORT: "Export",
  MANUAL_ORDER: "Manual Order",
  FILTER: "Filter",
} as const;

export const ARIA_LABELS = {
  PREVIOUS_PAGE: "Previous page",
  NEXT_PAGE: "Next page",
  MORE_OPTIONS: "More options",
} as const;

export const PER_PAGE_SUFFIX = "per page";
export const RESULTS_SUFFIX = "results";
