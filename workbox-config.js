module.exports = {
  "globDirectory": "www/",
  "globPatterns": [
    "**/*.{eot,scss,svg,ttf,woff,woff2,ico,png,css,js,html}"
  ],
  "swDest": "www/service-worker.js",
  "swSrc": "src/service-worker.js",
  "maximumFileSizeToCacheInBytes": "10485760"
};
