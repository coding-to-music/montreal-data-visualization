function getAccessToken() {
  let accessToken = null;
  if (typeof window !== "undefined" && window.location) {
    const match = window.location.search.match(/access_token=([^&]*)/);
    accessToken = match && match[1];
  }
  if (!accessToken && typeof process !== "undefined") {
    // Note: This depends on bundler plugins (e.g. webpack) importing environment correctly
    accessToken =
      accessToken ||
      process.env.MapboxAccessToken ||
      process.env.REACT_APP_MAPBOX_ACCESS_TOKEN; // eslint-disable-line
  }
  // Prevents mapbox from throwing
  return accessToken || "no-token";
}

module.exports = getAccessToken;
