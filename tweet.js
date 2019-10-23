require('dotenv').config();
const Twit = require('twit');
const fs = require('fs');

var Twitter = new Twit({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

function post(imagePath, title, source){
    base64convertedImage = fs.readFileSync(imagePath, { encoding: 'base64' });
    console.log('Uploading a meme...');
  
    Twitter.post('media/upload', { media_data: base64convertedImage }, function (err, data, response) {
      if (err){
        console.log('ERROR:');
        console.log(err);
      }
      else{
        console.log('Meme uploaded!');
        console.log('Now tweeting it...');
  
        Twitter.post('statuses/update', {
          media_ids: new Array(data.media_id_string),
          status: title + "\n\n" + "Source: " + source
        },
          function(err, data, response) {
            if (err){
              console.log('ERROR:');
              console.log(err);
            }
            else{
              console.log('Posted meme successfully!');
            }
          }
        );
      }
    });
}

module.exports = {
    post
};