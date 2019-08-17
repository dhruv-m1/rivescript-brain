
const classifier = require('./classifier');
const RiveScript = require('rivescript');

const EventEmitter = require('events');
const emitter = new EventEmitter();

class engine extends RiveScript {

    constructor(options = {utf8:false}) {
        super(options);
        this.classifier = new classifier();
    }

    async reply(user, text){

        let data = 'Sorry, I am unable to answer your question';

        if(!await this.inDiscussion(user)){
            let classification = classifier.classify(text);
            await super.setUservar(user, 'topic', classification);
            data = await super.reply(user, text);
        } else {
            data = await super.reply(user, text);
        }

        let event = await this.currentEvent(user);

        if(event){
            emitter.emit(event);
        }

        return data;

    }

    async inDiscussion(user){
        let discussion = await super.getUservar(user, 'discussion');
        
        if(discussion == 'true') return true;
        else return false;
    }

    async currentEvent(user){
        let event = await super.getUservar(user, 'event');
        await super.setUservar(user, 'event', null);

        if(event) return event;
        else return null;
    }
      
}

module.exports = engine;