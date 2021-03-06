/*
Until react-snap implements an exclude option, I can use this flag to check if the website
is being visited by the crawler at build time. If it is a crawler, then I can skip pre-rendering
some parts of the website such as progressive images.
 */

export const isPrerendering = () => {
  return navigator.userAgent === "ReactSnap";
};
