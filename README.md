# LocalTrade
LocalTrade is a community trade app, where users can post perishable items (such as garden-grown vegetables, or excess fruits) they are willing to trade for other local goods.

![Landing Page](https://github.com/deidalopez/LocalTradeApp/local-trade-app-react-native/assets/demo/Landing.png)


## Getting Started
- Fork this repository and clone it to your local machine
- To get all the required dependencies by ```npm install ```
```bash
npm install 
```

## To run the app
### For the client
This will open the app in your browser in development mode, you can either run it in an emulator like Android Studio, or on your phone with the Expo app using the QR code
```bash
npm start 
```

### For the server
Install nodemon ``` npm install -D nodemon```
Add a script to your package.json 
```
"scripts": {
    "dev": "nodemon index.js"
    }
```
Run server with ```npm run dev```


## Tech Stack
### LocalTrade is built using: 
- React Native with Expo for the frontend
- AWS S3 for image storage
- Node.js and Express for the backend
- PostgreSQL for the database
