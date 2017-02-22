function redirect(requestDetails) {
  var originalUrl = requestDetails.url;
  
  // do not redirect oldformat and the search
  if (originalUrl.indexOf("?oldformat=true") !== -1 || originalUrl.indexOf("?search=") !== -1) {
    return;
  }

  var article = /[^/]*$/.exec(originalUrl)[0];
  var wikipediaRegExp = new RegExp("^https?://([a-zA-Z0-9\\-_]+)\\.(?:m\\.)?wikipedia\\.org", "i");
  var lang = originalUrl.match(wikipediaRegExp)[1];
  return {
    redirectUrl: "https://www.wikiwand.com/" + lang + "/" + article
  };
}

// replace "chrome" with "browser" to make it work in Edge
chrome.webRequest.onBeforeRequest.addListener(
  redirect,
  {urls:["https://*.wikipedia.org/wiki/*"], types:["main_frame"]},
  ["blocking"]
);