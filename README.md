# rivescript-brain

## Installation

```javascript
npm i rivescript-brain
```

## Usage

`rivescript-brain` offers all the same functionality as rivescript with added featues.

### Getting Started

```javascript
const rs = require('rivescript-brain');

const bot = new engine({utf8:true});

bot.loadDirectory("./eng/").then(async() => {
    bot.sortReplies();
    // Classifier Setup
    bot.classifier.add('Hello, how are you?', 'casual');
    bot.classifier.train();
    // Getting Reply
    console.log(await bot.reply('dhruv','Hello'));

}).catch((e) => {
    console.trace("[ENG] Could not load Rive files.", e);
});
```
### The Classifier
Documentation comming soon

#### Saving Image
#### Restoring Image
#### Training
#### Retraining
#### Classifying

### Managing Discussions
Documenation Comming Soon.

### Middleware
Documenation Comming Soon.

