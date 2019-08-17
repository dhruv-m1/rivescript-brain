
const classifier = require('./classifier');
const RiveScript = require('rivescript');

class engine extends RiveScript {

    constructor(options = {utf8:false}) {
        super(options);
        this.classifier = new classifier();
        this.middleware = {};
    }

    async reply(user, text){

        if(!await this.inDiscussion(user)){
            let classification = classifier.classify(text);
            await super.setUservar(user, 'topic', classification);
            
        }

        let data = await super.reply(user, text);

        data = await this.processMiddleware(user, text, data);

        return data;

    }

    async inDiscussion(user){
        let discussion = await super.getUservar(user, 'discussion');
        
        if(discussion == 'true') return true;
        else return false;
    }

    async processMiddleware(user, input, output){
        let event = await super.getUservar(user, 'event');
        await super.setUservar(user, 'event', null);

        if(event){
            output = await this.middleware[event](input, output);
        }
        
        return output;
    }
      
}

module.exports = engine;