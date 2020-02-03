import { registerApplication, start } from "single-spa";

function pathPrefix(prefix) {
  return function(location) {
    return location.pathname.startsWith(prefix);
  };
}

registerApplication(
  "home",
  /**
   * loading function
   * must return a promise that resolves with the application code
   * receives no arguments when first called
   **/
  () => import("./src/home/home.app.js"),
  /**
   * function that returns boolean representing activity of the application
   **/
  location => {
    return (
      location.pathname === "" ||
      location.pathname === "/" ||
      pathPrefix("/home")(location)
    );
  }
);

registerApplication(
  "angularJS",
  () => import("./src/angularJS/angularJS.app.js"),
  pathPrefix("/angularJS")
);

registerApplication(
  "navBar",
  () => import("./src/navBar/navBar.app.js").then(module => module.navBar),
  // navBar is always active
  () => true
);

start();
