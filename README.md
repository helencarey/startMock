**HOSTED**  
Visual model: https://helencarey.github.io/startMock/#/

-----------
**LOCAL**
```
$ git clone git@github.com:helencarey/startMock.git
$ cd startMock && npm install
```

THEN:  
- go to docs/states/partials/nav/nav.html  
- comment out line #10  
- uncomment line #13  

```
$ npm start
```

Build Notes:
No build, really. All the src code is in 'docs.'
Dev server scripts are in package.json.
 - lite-server handles Browser-sync stuff
 - nodemon watches and rebuilds the sass

----
**IMAGE REPO**

As a reference, I can put the graphics as png and svg in 'graphics-src'
