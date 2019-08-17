# rivescript-brain

## Installation

```javascript
npm i rivescript-brain
```

## Usage

`rivescript-brain` offers all the same functionality as rivescript with added classifiaction and middleware functionality.

Language(s) Supported: English.

### Getting Started

```javascript
const rs = require('rivescript-brain');

const bot = new rs({utf8:true});

bot.loadDirectory("./dir/").then(async() => {
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

In rivescript-brain, a Feed-forward Neural Network is used to classify phrases.

#### Expected Structure of Rive Files
For the classifier to work as intended, it is expected that all conversations in the RiveScript files, are sorted by topic. These topics must be the same as the classifications used to train the classifier. To learn more about topics in RiveScript, please click <a href="https://www.rivescript.com/docs/tutorial#labeled-sections">here</a>.<br/>

#### Saving Image
To save a JSON image of a trained classifier:
```javascript
// Assuming 'bot' is already trained
bot.classifier.save('./myFilePath/image.json');
```
#### Restoring Image
To restore trained classifier from a saved JSON image:
```javascript
bot.classifier.restore('./myFilePath/image.json');
```
#### Training
To train a classifier, data must be added first.
```javascript
bot.classifier.add('Hello, how do you do?', 'casual');
```

Classifier training can be initiated as follows:
```javascript
bot.classifier.train();
```
#### Retraining
This feature will be added once <a href="https://github.com/BrainJS/brain.js/issues/427">issue #427</a> is resolved with the brain.js package. Until then, the training function would need to be used with the entire dataset (Note: This will result in downtime in case of a web application).

#### Classifying
```javascript
let result = bot.classifier.classify('Hello, how do you do?');
```
### Managing Discussions
To prevent rivescript-brain's classifier from interfering in <a href = "https://www.rivescript.com/docs/tutorial#short-discussions">short discussions</a>, it is important that there start and end points are marked as folows:
```
+ Hello
- Hi, how are you? <set discussion=true>

+ *
% Hi, how are you?
- May I know your name please?

+ *
% May I know your name please?
- Thanks! How can I help you today? <set name=<star>> <set discussion=false>
```
### The Reply Function
rivescript-brain modifies the stock rivescript reply function to incoperate classifcation and middleware functionality. There is no need to classify and set the convsersation topic seperately. <br/>
Simply use:
```javascript
await bot.reply('username','Hello');
```

### Middleware
To be updated shortly...

