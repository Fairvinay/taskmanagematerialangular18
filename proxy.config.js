module.exports = {
    "/api": {
      "target": "http://localhost:8080", // Your Spring Boot backend URL
      "secure": false,
      "changeOrigin": true,
      "logLevel": "debug",
      "pathRewrite": {
        "^/api": "" // Removes '/api' prefix when forwarding to Spring Boot
      }
    }
  };
  