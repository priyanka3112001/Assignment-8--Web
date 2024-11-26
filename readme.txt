npm init -y

npm i express mongoose ejs
ejs - 3rd party library

create a index.js
create a database folder 
           -- db.js
create a viwes folder 
           -- adduser.ejs
           -- showuser.ejs
           -- menu.ejs

use userdetails

 db.createCollection('nnewusers')

  db.nnewusers.insert([
    { 
        "name": "John", 
        "email": "john@gmail.com",
        "mobile": 56564564644
        },
        {
       "name": "Praduny", 
        "email": "pradunyspatil@gmail.com",
        "mobile": 7028228712
        },
        {
       "name": "Harish", 
        "email": "harish@gmail.com",
        "mobile": 45644654545
        },
         {
       "name": "Samrat", 
        "email": "samrat@gmail.com",
        "mobile": 7028228713
        }
        ]);









      enail login
      two step verification 
           enter app name 
         google account password
                - vxrt pqvo xhzt ekjy

=====================================================

nodemailer
https://www.nodemailer.com/

install=
npm install nodemailer     -3rd party

=========================================================

twilio 
https://www.twilio.com/en-us


 db.createCollection('products')

db.products.insertMany([
    {
        productName: "Laptop",
        productPrice: 799.99,
        productImg: "http://example.com/laptop.jpg"
        
    },
    {
        productName: "Smartphone",
        productPrice: 499.99,
        productImg: "http://example.com/smartphone.jpg"
       
    },
    {
        productName: "Tablet",
        productPrice: 299.99,
        productImg: "http://example.com/tablet.jpg"
     
    }
])