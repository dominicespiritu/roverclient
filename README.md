
# Mars Rover Client

This project uses NASA API for Mars Rover

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Download Node.js [here](https://nodejs.org/en/download/)
<br />
Install after download
<br />
After Installing node.js, test if the installation is successful on your terminal.

```
$ node -v
$ npm -v
```

##### Install npm libraries required

```
$ npm i -g @angular/cli
```

If you are running on Windows, double click the file "script.bat" for the installation of libraries and to start the application automatically.

Or on Mac or Linux:

Go inside "client folder" and execute the command :

```
$ npm i
```

Go inside "server folder" and execute the command :

```
$ npm i
```

## Run the Application

Go inside "client folder" and execute the command :

```
$ npm start
```

open your browser on [http://localhost:4200/](http://localhost:4200/)

## Docker Image

```
$ docker pull dominicespiritu/marsrover
$ docker run -p 3000:3000 dominicespiritu/marsrover
```
