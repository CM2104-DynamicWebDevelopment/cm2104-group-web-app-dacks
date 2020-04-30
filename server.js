/*
    The following steps will walk you through setting up the server and relevant npm packages
    to the project.
    
    Within the project structure there should be a file called 'package.json' in the root. If
    that file isn't there follow these steps to install everything otherwise skip to the next 
    set of steps.
    
    -- STEPS TO INSTALL IF THERE'S NO PACKAGE.JSON FILE --
    1. Open the folder location of 'cm2104-group-web-app-dacks' on your codio terminal.
    2. Enter 'npm init' into the terminal.
       Set the description to 'COVID-19 Tracker' and the author to 'DACKS'.
    3. Enter 'npm install mongodb@2.2.33' into the terminal.
    4. Enter 'npm install express' into the terminal. 
    5. Enter 'npm install ejs' into the terminal.
    6. Enter 'npm install twitter' into the terminal.
    7. Enter 'npm start' into the terminal to start the server.
    
    -- STEPS TO INSTALL IF THERE IS PACKAGE.JSON FILE --
    1. Open the folder location of 'cm2104-group-web-app-dacks' on your codio terminal.
    2. Enter 'npm init' into the terminal.
       Keep pressing enter and the packages.json info will be inserted.
    3. Enter 'npm install' into the terminal.
       This will install all the packages listed in the 'packages.json' file.
    4. Enter 'npm start' into the terminal to start the server.
    
    If any errors occur, try installing the packages through the Install Software section in 'Tools'.
*/

const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/";
const express = require("express");
const app = express();

// set the view engine to ejs
app.set("view engine", "ejs");

var db;
var Twitter = require("twitter"); // npm install twitter

// Create a Twitter client
var client = new Twitter({
    consumer_key: "tOBOpXRWxDvqc6Dbvv8MLmnYQ",
    consumer_secret: "YPuSU6rKETHEtdVTqusE209Cl7DHHjop3JYXg3cATQAbMJC16x",
    access_token_key: "1580455674-XGoXPCP7CzLFgYascjJONsJP2pAFZDHuVjUlOUa",
    access_token_secret: "8WtYDRYCAuTieokrMc47yvz5YwBsvAjfaKzNiYlEloodl",
});



// Connect to the MongoDB
MongoClient.connect(url, function (err, database) 
{
    // If the db cant connect throw an error
    if (err) throw err;

    db = database;

    // Drop the current timeline collection
    db.collection("timeline").drop();

    // Timeline data to be added to the collection
    var timelineData = [
        {date: "31ST DECEMBER 2019", text: "FIRST CASES OF A FLU LIKE ILLNESS HAVE BEEN REPORTED IN WUHAN."},
        {date: "1ST JANUARY 2020", text: "MORE FLU LIKE CASES ARE REPORTED, AND THE SOURCE OF THE ILLNESS IS THOUGHT TO BE A FOOD MARKET IN THE CENTRE OF WUHAN."},
        {date: "5TH JANUARY 2020", text: "THE WORLD HEALTH ORGANISATION ADVISES ON A COMPLETE TRAVEL BAN SURROUNDING WUHAN."},
        {date: "7TH JANUARY 2020", text: "VIRUS IS GIVEN ITS OFFICIAL NAME CORONAVIRUS AS BIRD FLU AND SARS ARE RULED OUT."},
        {date: "11TH JANUARY 2020", text: "THE FIRST DEATH CAUSED BY THE VIRUS HAS BEEN CONFIRMED."},
        {date: "17TH JANUARY 2020", text: "JAPAN CONFIRM MULTIPLE INFECTED FROM RECENT TRAVELLERS TO WUHAN."},
        {date: "20TH JANUARY 2020", text: "A CURE TO SPECIFICALLY TREAT CORONAVIRUS BEGINS DEVELOPMENT."},
        {date: "23RD JANUARY 2020", text: "CHINESE GOVERNMENT CANCELS ALL CHINESE NEW YEAR CELEBRATIONS TO HELP CONTAIN THE VIRUS."},
        {date: "31ST JANUARY 2020", text: "UNITED STATES OF AMERICA SAY THEY WILL DENY ENTRY TO ALL PEOPLE WHO HAVE TRAVELLED TO CHINA IN THE LAST 14 DAYS."},
        {date: "2ND FEBUARY 2020", text: "10 PEOPLE ON BOARD A CRUISE SHIP IN JAPAN TEST POSITIVE FOR THE VIRUS. THE SHIP HOLDS ALMSOT 4000 PEOPLE."},
        {date: "7TH FEBUARY 2020", text: "LI WENLIANG, THE CHINESE DOCTOR WHO WARNED PEOPLE ABOUT THE VIRUS A MONTH BEFORE THE FIRST CONFIRMED CASE, DIES FROM THE VIRUS."},
        {date: "14TH FEBUARY 2020", text: "FIRST DEATH IN EUROPE IS A CHINESE TRAVELLER WHO WAS STAYING IN FRANCE."},
        {date: "25TH FEBRUARY 2020", text: "THE CDC IN THE USA WARN AMERICAN CITEZENS TO PREPARE FOR DISRUPTION AS A RESULT OF THE VIRUS."}
    ];
    

    // Insert the timeline data into the collection
    db.collection("timeline").insertMany(timelineData, function (err, res) 
    {
        if (err) throw err;
    });
});

// Route to get JSON from tweets
app.get("/covidtweets", function (req, res) 
{
    var params = { screen_name: "nodejs" };
    client.get("https://api.twitter.com/1.1/search/tweets.json?q=corona%20virus%20updates&result_type=recent", params, function (error, tweets, response)
    {
        if (!error) 
        {
            res.send(tweets);
        }
    });
});

// Route to show the timeline returned from MongoDB
app.get("/showtimeline", function (req, res)
{
    var output = "<h1><u><i>Timeline Output From MongoDB</i></u></h1><br>";

    // Find the timeline collection and convert it to an array
    db.collection("timeline").find().toArray(function (err, result) 
    {
        // If it can't find the collection throw an error
        if (err) throw err;
        
        // Loop through the entire collection array and add it to the output
        for (var i = 0; i < result.length; i++)
        {
            var pos = i % 2 == 1 ? "right" : "left";
            output += `<div class='container-t ${pos}'
                           <div class='content-t'>
                               <h2 class='redHeadings'>${result[i].date}</h2>
                               <p>${result[i].text}</p>
                           </div>`;
        }
        res.send(output);
     });
});

// index page
app.get("/", function (req, res) {
    var timeline = "";

    // Find the timeline collection and convert it to an array
    db.collection("timeline").find().toArray(function (err, result) 
    {
        // If it can't find the collection throw an error
        if (err) throw err;
        
        // Loop through the entire collection array and add it to the output
        for (var i = 0; i < result.length; i++)
        {
            var pos = i % 2 == 1 ? "right" : "left";
            timeline += `<div class='container-t ${pos}'
                           <div class='content-t'>
                               <h2 class='redHeadings'>${result[i].date}</h2>
                               <p>${result[i].text}</p>
                           </div>`;
        }
        
        // Render the index and pass the timeline from the db and various pieces of info to the index
        res.render("pages/index", 
        {
            videoText: {heading: "Coronavirus live map",
                        subheading: "THE UNOFFICIAL VIRUS TRACKER"},
            
            navBarHeadings: {home: "HOME",
                             timeline: "TIMELINE",
                             staysafe: "STAY SAFE"},
            
            timeline: timeline,
            
            infectedTotal: "INFECTED TOTAL: ",
            
            aboutNcov: {heading: "Novel coronavirus (2019-nCoV)",
                        about: "Coronaviruses are a large family of viruses that can cause respiratory illnesses such as the common cold, according to the Centers for Disease Control and Prevention (CDC). Most people get infected with coronaviruses at one point in their lives, but symptoms are typically mild to moderate. In some cases, the viruses can cause lower-respiratory tract illnesses<span><p>such as pneumonia and bronchitis. - https://www.livescience.com"},
            
            twitter: {heading: "LIVE News Updates",
                      tweetsby: "Tweets By Corona_Update_"},
            
            googleMaps: "Coronavirus Live Map",
            
            symtpomsData: {heading: "Symtpoms",
                           s1: "Chesty Cough with Pain",
                           s2: "High Temperature and Fever",
                           s3: "Feeling Tired After Short Exercise Such as Walking",
                           s4: "Sneezing",
                           s5: "Headaches"},
            
            preventionData: {heading: "Prevention",
                             p1: "Always Cover Mouth and Nose with Tissue Whilst Sneezing",
                             p2: "Avoid Large Gatherings",
                             p3: "Avoid Travelling To Countries/Regions Where COVID-19 Has Been Found",
                             p4: "Avoid Contact with People Suspected of Infection"},
            
            copyright: "© 2020 Copyright: DACKS",
            
            quiz: {question: "Recommended Distance From Others?",
                  q1: "2 Metres",
                  q2: "No Distance",
                  q3: "1 Metre",
                  q4: "3 Metres"},
            
            pressHere: "HERE",
            
            viewStats: "To view a full list of the statistics click ",
            
            close: "Close",
            
            statistics: "Statistics",
            
            testKnowlegde: "Test your stay safe knowledge by clicking ",

            sendEmail: {heading: "Send Message", name: "Name:", message: "Message:", email: "Email:", send: "Send Email"},
            
            contactUs: "Contact Us"
        });
      });
});

// Include all the files for the final folder
app.use(express.static("final"));

// Listen on port 8080
app.listen(8080);
