// Classification Toolkit
const brain = require('brain.js');
const net = new brain.NeuralNetwork({ hiddenLayers: [3] });

class classifier {

    constructor() {
        this.trainingData = [];
    }


    add(txt, label) {
        trainingData.push({ input: {[[txt]]: 1}, output: {[[label]]: 1}});
    }

    train(options = { iterations: 1000, erroThresh: 0.000 }) {
        net.train(trainingData, options);
    }

    classify(txt) {
        let category = net.run({[[txt]]: 1});

        let highest = {}
        highest.val = category[Object.keys(category)[0]];
        highest.name = Object.keys(category)[0];
        for (key in category) {
            if(category[key] > highest.val) {
                highest.val = category[key];
                highest.name = key;
            }
        }
        
        return highest.name;
    }

    save(path) {
        const json = net.toJSON();
        fs.writeFile(path, json, (err) => {
            if(err) return err;
            else return null;
        }); 
    }

    restore(path) {
        fs.readFile(path,'utf-8', (err, data) => {
            if (err) return err;
            else {
                net.fromJSON(data);
                return null;
            }
        });
    }
}

module.exports = classifier;