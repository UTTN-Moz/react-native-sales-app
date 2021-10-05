module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            app: "./",
            "@actions": "./src/actions",
            "@api": "./src/api",
            "@assets": "./assets",
            "@components": "./src/components",
            "@config": "./src/config",
            "@models": "./src/models",
            "@navigation": "./src/navigation",
            "@reducers": "./src/reducers",
            "@sagas": "./src/sagas",
            "@screens": "./src/screens",
            "@selectors": "./src/selectors",
            "@services": "./src/services",
            "@store": "./src/store",
            "@utils": "./src/utils",
            "@data": "./src/data",
            "@selectors": "./src/selectors",
            "@navigation": "./src/navigation",
          },
        },
      ],
    ],
  };
};
