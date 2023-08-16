module.exports = function override(config, env) {
  console.log("React app rewired works!")
  config.resolve.fallback = {
    "buffer": require.resolve('buffer'),
    "stream": require.resolve("stream-browserify"),
    "os": false,
    "assert": false,
    "url": false,
    'http': false,
    'https': false,
    'path': false,
    'crypto': false
  };
  return config;
};