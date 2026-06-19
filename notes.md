
npm install 
npm install expo-asset expo-constants expo-linking expo-modules-core

npx expo start

rm -rf node_modules package-lock.json

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash


chmod 644 package.json


npm install babel-preset-expo

npx expo start --clear


open -e babel.config.js

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
  };
};