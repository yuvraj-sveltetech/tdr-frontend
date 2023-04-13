module.exports = {
  packagerConfig: {
    // ignore: ["^\\/node_modules$"],
    asar: true,
    icon: "./src/assets/images/tower",
  },
  rebuildConfig: {},
  plugins: [
    {
      name: "@electron-forge/plugin-auto-unpack-natives",
      config: {},
    },
  ],
  makers: [
    {
      name: "@electron-forge/maker-squirrel",
      config: { setupIcon: "./src/assets/images/tower.ico" },
    },
    {
      name: "@electron-forge/maker-zip",
      platforms: ["darwin"],
    },
    {
      name: "@electron-forge/maker-deb",
      config: {
        options: {
          icon: "./src/assets/images/tower.png",
        },
      },
    },
    {
      name: "@electron-forge/maker-dmg",
      config: {
        icon: "./src/assets/images/tower.icns",
      },
    },
    {
      name: "@electron-forge/maker-wix",
      config: {
        icon: "./src/assets/images/tower.ico",
      },
    },
    {
      name: "@electron-forge/maker-rpm",
      config: {},
    },
  ],
};
