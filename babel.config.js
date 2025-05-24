module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"], // supporta React Native + Expo :contentReference[oaicite:5]{index=5}
    plugins: [
      "babel-plugin-styled-components", // plugin do styled-components :contentReference[oaicite:6]{index=6}
    ],
  };
};
