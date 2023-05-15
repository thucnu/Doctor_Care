import locationHelperBuilder from "redux-auth-wrapper/history4/locationHelper";
import { connectedRouterRedirect } from "redux-auth-wrapper/history4/redirect";

const locationHelper = locationHelperBuilder({});

export const userIsAuthenticated = connectedRouterRedirect({
  authenticatedSelector: (state) => state.user.isLoggedIn,
  wrapperDisplayName: "UserIsAuthenticated",
  redirectPath: "/login",
});

export const userIsNotAuthenticated = connectedRouterRedirect({
  // Want to redirect the user when they are authenticated
  authenticatedSelector: (state) => !state.user.isLoggedIn,
  wrapperDisplayName: "UserIsNotAuthenticated",
  redirectPath: (state, ownProps) =>
    locationHelper.getRedirectQueryParam(ownProps) || "/",
  allowRedirectBack: false,
});
export const userHomeIsAuthenticated = connectedRouterRedirect({
  authenticatedSelector: (state) => state.userHome.isLoggedHomeIn,
  wrapperDisplayName: "UserHomeIsAuthenticated",
  redirectPath: "/login-user",
});

export const userHomeIsNotAuthenticated = connectedRouterRedirect({
  // Want to redirect the user when they are authenticated
  authenticatedSelector: (state) => !state.userHome.isLoggedHomeIn,
  wrapperDisplayName: "UserHomeIsNotAuthenticated",
  redirectPath: (state, ownProps) =>
    locationHelper.getRedirectQueryParam(ownProps) || "/homeChat",
  allowRedirectBack: false,
});
