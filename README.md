# Melodic
A casual music player written in Vue.js.

## Prerequisites
1. SQL Server
2. Vue 2.6
3. python 3.8
4. Node.js

## Project setup
1. Inside the `backend` folder create a `db.ini` file and format it like this
```
[DEFAULT]
ServerName = <your SQL server name>
```
2. To populate the db with songs create a `songs` folder inside the `backend` folder and place .mp3 files
  The .mp3 files must have the following name format: `<artist> - <song-name>.mp3`
3. Run the `seeddata.py` script to create and populate the database
4. Inside the `frontend` folder run `npm i` to install the packages
4. Run `npm run serve` to start the app
