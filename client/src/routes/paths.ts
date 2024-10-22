function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = "/auth";
const ROOTS_DASHBOARD = "/dashboard";

export const AUTH_PATH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, "/signin"),
  register: path(ROOTS_AUTH, "/signup"),
};

export const DASHBOARD_PATH = {
  root: ROOTS_DASHBOARD,
  home: path(ROOTS_DASHBOARD, "/home"),
};
