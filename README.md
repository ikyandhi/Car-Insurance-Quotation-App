# Car Insurance Quotation App (React JS)

This simple app allow you to generate or eventual purchase of Car Insurance Policy by estimating the cost based on Personal and Car factor. The mock data of formula and factors point is currently being used.

## How to Setup / Run

Clone this project to your local dir using download or `git clone`. Go to your favourite console / terminal, and `cd` to project path. After that, you can run below commands:

* `npm install` is to install necessary dependency.
* `npm start` is to spawn development server than can be accessible via [http://localhost:3000](http://localhost:3000) or port 3001

For the project to run smoothly, **these files must exist with exact filenames**:

* `quotes_summary.json` or `quotes_summary_7d.json` is the mock data for dashboard chart;
* `src/index.js` is the JavaScript entry point.

## Access Dashboard

This App comes with Dashboard that can be access through route `dash`. It will require authentication using `Auth0`. Use below detail to login.
```
Email: demo@website.com
Password: demo
```

## Additional

As this App accessible via [http://car-insurance-quote.surge.sh](http://car-insurance-quote.surge.sh), it comes with `deploy.sh`. To push build project to surge.sh.

![alt Car Insurance Quotation App](https://user-images.githubusercontent.com/2010789/35000983-be80f930-fb20-11e7-9e0b-b90b8fbeb51c.png)
