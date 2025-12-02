module.exports = {
  rewrites: async () => {
    return [
      {
        source: "/api/:path*",
        destination: "/api/index.js",
      },
      {
        source: "/(.*)",
        destination: "/public/index.html",
      },
    ];
  },
};
