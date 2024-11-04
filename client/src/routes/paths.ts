function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = "/auth";
const ROOTS_DASHBOARD = "/dashboard";
const ROOTS_RESET_PASSWORD = "/reset-password";

export const AUTH_PATH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, "/login"),
  register: path(ROOTS_AUTH, "/register"),
};

export const RESET_PASSWORD_PATH = {
  root: ROOTS_RESET_PASSWORD,
  reset: path(ROOTS_RESET_PASSWORD, "/:token"),
};

export const DASHBOARD_PATH = {
  root: ROOTS_DASHBOARD,
  home: path(ROOTS_DASHBOARD, "/home"),
  incidentReporting: path(ROOTS_DASHBOARD, "/incident-reporting"),
  map: path(ROOTS_DASHBOARD, "/map"),
  communityEngagement: path(ROOTS_DASHBOARD, "/community-engagement"),
};
