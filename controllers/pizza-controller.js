const {Pizza} = require('../models');

const pizzaController = {
    // get all pizzas
    getAllPizza(req, res) {
        Pizza.find({})
            .populate({
                path: 'comments',
                select: '-__v' // don't want this returned because we don't care about the __v field
            })
            .select('-__v')
            .sort({_id: -1}) // sort by newest first
            .then(dbPizzaData => res.json(dbPizzaData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    //get one pizza by id
    getPizzaById({params}, res) {
        Pizza.findOne({_id: params.id})
        .populate({
            path: 'comments',
            select: '-__v'
        })
        .select('-__v')
        .then(dbPizzaData => {
            // if no pizza, 404 error
            if(!dbPizzaData) {
                res.status(404).json({message: 'No pizza found with this id'});
                return;
            }
            res.json(dbPizzaData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    // create a pizza
    createPizza({body}, res) {
        Pizza.create(body)
            .then(dbPizzaData => res.json(dbPizzaData))
            .catch(err => res.status(400).json(err));
    },

    // update pizza by id
    updatePizza({params, body}, res) {
        Pizza.findOneAndUpdate({_id: params.id}, body, {new: true}) // with new: true, Mongoose will return new version of document
            .then(dbPizzaData => {
                if(!dbPizzaData) {
                    res.status(404).json({message: 'No pizza found with this id'});
                    return;
                }
                res.json(dbPizzaData);
            })
            .catch(err => res.status(400).json(err));
    },

    // delete pizza
    deletePizza({params}, res) {
        Pizza.findOneAndDelete({_id: params.id})
            .then(dbPizzaData => {
                if(!dbPizzaData) {
                    res.status(404).json({message: 'No pizza found with this id'});
                    return;
                }
                res.json(dbPizzaData);
            })
            .catch(err => res.status(400).json(err));
    }
};

module.exports = pizzaController;