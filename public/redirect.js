(() => {
  "use strict";

  const legacyPrefix = "/iching-oracle-public";
  const pathname = window.location.pathname.startsWith(legacyPrefix)
    ? window.location.pathname.slice(legacyPrefix.length) || "/"
    : window.location.pathname || "/";
  const safePathname = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const destination = `https://ichingdialogue.app${safePathname}${window.location.search}${window.location.hash}`;

  window.location.replace(destination);
})();
