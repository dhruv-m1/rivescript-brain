const brain = require('brain.js');
const fs = require('fs');
const pos = require('pos');

const net = new brain.NeuralNetwork({ hiddenLayers: [3] });
class classifier {

    constructor() {
        this.trainingData = [];
    }


    add(txt, label) {
        txt = processText(txt);
        this.trainingData.push({ input: {[[txt]]: 1}, output: {[[label]]: 1}});
    }

    train(options = { iterations: 1000, erroThresh: 0.000 }) {
        net.train(this.trainingData, options);
    }

    classify(txt) {
        txt = processText(txt);
        let category = net.run({[[txt]]: 1});

        let highest = {}
        highest.val = category[Object.keys(category)[0]];
        highest.name = Object.keys(category)[0];

        for (let key in category) {
            if(category[key] > highest.val) {
                highest.val = category[key];
                highest.name = key;
            }
        }
        
        return highest.name;
    }

    save(path) {
        return new Promise((resolve, reject) => {
            const json = net.toJSON();
            fs.writeFile(path, JSON.stringify(json), (err) => {
                if(err) reject(err);
                else resolve();
            }); 
        })
    }

    restore(path) {
        return new Promise((resolve, reject) => {
            fs.readFile(path,'utf-8', (err, data) => {
                if (err) reject(err);
                else {
                    net.fromJSON(JSON.parse(data));
                    resolve();
                }
            });
        })
    }
}

const processText = (txt) => {
    let processedtext = [];
    const tagger = new pos.Tagger();
    const tokens = txt.replace(/[^\w\s]|_/g, "").replace(/ {2,}/g, ' ').trim().toLowerCase().split(' ');

    tokens.forEach(token => {
        let tag = tagger.tag([token])[0][1];

        if(tag != 'IN' & tag != 'PRP$') {
            processedtext.push(token);
        }
    });
    return processedtext.join(' ');
}

module.exports = classifier;