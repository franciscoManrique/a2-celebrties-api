const createError = require('http-errors');
const mongoose = require('mongoose');
const Celebrity = require('../models/celebrity.model');

module.exports.list = (req, res, next) => {
  Celebrity.find()
    .then(celebrities => {
      res.json(celebrities)
    })
    .catch(error => {
      next(error);
    });
};

module.exports.get = (req, res, next) => {
  const id = req.params.id;

  Celebrity.findById(id)
    .then(celebrity => {
      if (celebrity) {
        res.json(celebrity)
      } else {
        next(createError(404, `Celebrity with id ${id} not found`));
      }
  })
  .catch(error => {
    if (error instanceof mongoose.Error.CastError) {
      next(createError(404, `Celebrity with id ${id} not found`));
    } else {
      next(error);
    }
  });
}

module.exports.doCreate = (req, res, next) => {
  const celebrity = new Celebrity({
    name: req.body.name,
    occupation: req.body.occupation,
    catchPhrase: req.body.catchPhrase,
  });

  celebrity.save()
    .then(() => {
      res.status(201).json(celebrity);
    })
    .catch(error => {
      if (error instanceof mongoose.Error.ValidationError) {
        next(createError(400, error.errors));
      } else {
        next(error);
      }
    });
}


module.exports.doUpdate = (req, res, next) => {
  const id = req.params.id;

  Celebrity.findById(id)
    .then(celebrity => {
      if (celebrity) {
        Object.assign(celebrity, {
          name: req.body.name,
          occupation: req.body.occupation,
          catchPhrase: req.body.catchPhrase,
        });

        celebrity.save()
          .then(() => {
            res.json(celebrity);
          })
          .catch(error => {
            if (error instanceof mongoose.Error.ValidationError) {
              next(createError(400, error.errors));
            } else {
              next(error);
            }
          })
      } else {
        next(createError(404, `Celebrity with id ${id} not found`));
      }
    })
    .catch(error => next(error));
}

module.exports.delete = (req, res, next) => {
  const id = req.params.id;
  
  Celebrity.findByIdAndDelete(id)
    .then(() => {
      res.status(204).json()
    })
    .catch(error => next(error));
}