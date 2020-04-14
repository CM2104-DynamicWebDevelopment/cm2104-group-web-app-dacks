var express = require('express'); // sudo npm install express -g
var app = express();

var Twitter = require('twitter'); // sudo npm install twitter

// Create a Twitter client
var client = new Twitter({
  consumer_key: 'tOBOpXRWxDvqc6Dbvv8MLmnYQ',
  consumer_secret: 'YPuSU6rKETHEtdVTqusE209Cl7DHHjop3JYXg3cATQAbMJC16x',
  access_token_key: '1580455674-XGoXPCP7CzLFgYascjJONsJP2pAFZDHuVjUlOUa',
  access_token_secret: '8WtYDRYCAuTieokrMc47yvz5YwBsvAjfaKzNiYlEloodl'
});

// Route to get JSON from tweets
app.get('/covidtweets', function(req, res)
{
    var params = {screen_name: 'nodejs'};
    client.get('https://api.twitter.com/1.1/search/tweets.json?q=corona%20virus%20updates&result_type=recent', params, function(error, tweets, response)
    {
        if (!error) 
        {
            res.send(tweets);
        }
    });
});

// Include all the files for the final folder
app.use(express.static('final'))

// Listen on port 8080
app.listen(8080);
