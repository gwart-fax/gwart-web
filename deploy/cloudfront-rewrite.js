/**
 * Viewer-request function: turn a directory-style URL into an object key.
 *
 * The site is a multi-page build, so /privacy exists in the bucket as
 * privacy/index.html. With a REST S3 origin there is no index-document
 * behaviour to fall back on - DefaultRootObject only covers "/" - so without
 * this, every page but the home page returns an access-denied XML document.
 *
 * Three cases:
 *   /                -> handled by DefaultRootObject, left alone here
 *   /privacy         -> /privacy/index.html
 *   /privacy/        -> /privacy/index.html
 *   /assets/x.js     -> untouched, because it has a dot in the last segment
 *
 * The dot test is what keeps real files out of it. It would misfire on a path
 * segment containing a dot that is not a file, which this site has none of.
 *
 * This runs on every request, so it stays small and allocation-free. Deployed
 * as a CloudFront Function (not Lambda@Edge) on the default behaviour.
 */
function handler(event) {
  var request = event.request;
  var uri = request.uri;

  if (uri.endsWith('/')) {
    request.uri = uri + 'index.html';
  } else if (uri.lastIndexOf('.') < uri.lastIndexOf('/')) {
    request.uri = uri + '/index.html';
  }

  return request;
}
