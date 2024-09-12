const { createProxyMiddleware } = require("http-proxy-middleware");
const API_BASE_URL = "http://36.255.68.135:7000";
const px = createProxyMiddleware({ target: API_BASE_URL, changeOrigin: true });

module.exports = (app) => {
  // app.use("/users/*", px);
  app.use("/api/v1/*", px);
  // app.use("/posts/*", px);
};
