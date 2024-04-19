# LocalTrade
LocalTrade is a community trade app, where users can post perishable items (such as garden-grown vegetables, or excess fruits) they are willing to trade for other local goods.


> <img src="https://github.com/deidalopez/LocalTradeApp/blob/main/localtrade-app-react-native/assets/demo/Landing.png" width="350" height="700">     
> 
> <img src="https://github.com/deidalopez/LocalTradeApp/blob/main/localtrade-app-react-native/assets/demo/Register.png" width="350" height="700">
> 
> <img src="https://github.com/deidalopez/LocalTradeApp/blob/main/localtrade-app-react-native/assets/demo/Post.png" width="350" height="700">
> 
> <img src="https://github.com/deidalopez/LocalTradeApp/blob/main/localtrade-app-react-native/assets/demo/Feed.png" width="350" height="700">



## Getting Started
- Fork this repository and clone it to your local machine

```

## To run the app
### For the client

``` cd localtrade-app-react-native```

To get all the required dependencies by ```npm install ```
```bash
npm install 
This will open the app in your browser in development mode, you can either run it in an emulator like Android Studio, or on your phone with the Expo app using the QR code
```bash
npm start 
```

### For the server
Open a new terminal

``` cd server```

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
