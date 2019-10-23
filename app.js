require('dotenv').config();
const Snoowrap = require('snoowrap');
const Snoostorm = require('snoostorm');
const { SubmissionStream } = require("snoostorm");
const downloader = require("./download-image");
const tweet = require("./tweet");

const client = new Snoowrap({
    userAgent: 'programmer-memes-bot',
    clientId: process.env.REDDIT_CLIENT_ID,
    clientSecret: process.env.REDDIT_CLIENT_SECRET,
    username: process.env.REDDIT_USERNAME,
    password: process.env.REDDIT_PASSWORD
});

const streamOpts = {
    subreddit: 'ProgrammerHumor',
    results: 25,
    limit: 1
};

const submissions = new SubmissionStream(client, streamOpts);
submissions.on("item", (item) => {
    var url = item.url;
    if(url.includes(".jpg") || url.includes(".png")){
        var nameArr = url.split('/');
        var imagePath = 'assets/' + nameArr[nameArr.length-1];
        var source = "https://www.reddit.com" + item.permalink;
        var title = item.title;
        downloader.download(item.url, imagePath, function(){
            console.log('New meme downloaded@' + new Date().toLocaleString());
            tweet.post(imagePath, title, source);
          });
    }
});