const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port =  process.env.PORT || 3000; // port for Heroku which e get from Process, process.env is an object that stores all our enviromental variable as key value pairs

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs')


app.use((req, res, next) => { // this is express middle ware that we created
    
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append server.log');
        }
    });
    next();
});

//app.use((req, res, next) => {
//    
//    res.render('maintainance.hbs');
//    
//});

app.use(express.static(__dirname + '/public'));
 


hbs.registerHelper('getCurrentYear', () => {
    
    return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
    
    return text.toUpperCase();
    
});

app.get('/', (req, res) => {
    
   res.render('home.hbs', {
       
      pageTitle: 'Home Page',
      welcomeMessage: 'Welcome to my Website',
       
   });
});

app.get('/about', (req, res) => {
    
    res.render('about.hbs', {
        
        pageTitle: 'About Us',
        para: 'Screaming try on'
    });
    
});

app.get('/bad', (req, res) => {
    
    res.send({
        
       errorMessage: 'Unable to handle request'
        
    });
    
});

app.listen(port, () => {
  
    console.log(`Server is up on port ${port}`);
});






























//function getRecipe() {
//    
//   setTimeout(() => {
//       
//      const recipeId = [1,2,3,4];
//      console.log(recipeId);
//       
//      setTimeout ((id) => {
//          
//          const recipe1 = {title: 'Pizza', publisher: 'smith' };
//          console.log(`${id} and ${recipe1.title}`);
//                      
//                      setTimeout((publisher) => {
//              
//              const recipe2 = {title: 'Italian Pizza', publisher: 'John'};
//              console.log(recipe1);
//          }, 1500, recipe1.publisher);
//          
//      },1500, recipeId[3]);
//       
//   },1500);
//    
//}
//
//console.log('app start');
//getRecipe();
//
//const getId = new Promise((resolve, reject) => {
//    
//    setTimeout( () => {
//        
//        resolve([435, 987, 541, 908]);
//        
//    }, 1500);
//});
//
//getId.then((result) => {
//    
//    console.log(result);
//})














































