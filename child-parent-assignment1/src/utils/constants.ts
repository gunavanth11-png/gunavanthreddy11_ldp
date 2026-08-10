import home from "../assets/icons/home.svg";
import users from "../assets/icons/users.svg";
import gavel from "../assets/icons/gavel.svg";
import document from "../assets/icons/document.svg";
import chart from "../assets/icons/chart.svg";
import account from "../assets/icons/account.svg";
import screening from "../assets/icons/screening.svg";

export const SIDEBAR_MENU_OPTIONS = [
  { text: "Home", icon: home, active: false },
  { text: "Candidates", icon: users, active: true },
  { text: "Adverse Actions", icon: gavel, active: false },
  { text: "Logs", icon: document, active: false },
  { text: "Analytics", icon: chart, active: false },
  { text: "Account", icon: account, active: false },
  { text: "Screenings", icon: screening, active: false },
];
