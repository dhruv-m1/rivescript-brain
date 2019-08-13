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
    console.log(await bot.reply('username','Hello'));

}).catch((e) => {
    console.trace("Could not load Rive files.", e);
});
```
### The Classifier
Documenation Coming Soon.

#### Expected Structure of Rive Files
Documenation Coming Soon.
#### Saving Image
Documenation Coming Soon.
#### Restoring Image
Documenation Coming Soon.
#### Training
Documenation Coming Soon.
#### Retraining
Documenation Coming Soon.
#### Classifying
Documenation Coming Soon.

### Managing Discussions
Documenation Coming Soon.

### Middleware
Documenation Coming Soon.

