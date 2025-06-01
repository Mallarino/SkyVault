import 'dotenv/config';

export default {
  expo: {
    name: "SkyVault",
    slug: "SkyVault",
    version: "1.0.0",
    orientation: "portrait",
    icon: "assets/images/SkyVault.png",
    userInterfaceStyle: "light",
    newArchEnabled: true,
    splash: {
      image: "assets/images/SkyVault.png",
      resizeMode: "contain",
      backgroundColor: "#000000"
    },
    ios: {
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "assets/images/SkyVault.png",
        backgroundColor: "#ffffff"
      },
      edgeToEdgeEnabled: true,
      package: "com.mallarino123.SkyVault"
    },
    web: {
      favicon: ""
    },
    extra: {
      eas: {
        projectId: "2200beea-8001-497f-a24d-81bf954907f1"
      },
      API_HOST: process.env.API_HOST,
      API_KEY: process.env.API_KEY
    },
    owner: "mallarino123"
  }
};
