const domainModel = require('../models/Domain');

const create = async (name) => domainModel.create({ name });

const update = async (id, name) => domainModel.findByIdAndUpdate(id, { name });

const get = async (id) => {
  if (id) {
    return domainModel.findById(id);
  }
  return domainModel.find();
};

const remove = async (id) => domainModel.findByIdAndRemove(id);

module.exports = {
  create,
  update,
  get,
  remove,
};
