const checkValidation = require('../utils/CheckValidation');
const domainService = require('../services/DomainService');
const { successMessage, failMessage } = require('../utils/ApiMessage');
const { MESSAGE } = require('../constants');

const create = async (req, res) => {
  try {
    const { name } = req.body;
    const validationErrors = checkValidation(req);
    if (validationErrors.length > 0) {
      return res.status(400).json(failMessage(validationErrors));
    }
    const domain = await domainService.create(name);
    return res.json(successMessage(domain));
  } catch (err) {
    return res.status(400).json(failMessage([MESSAGE.UNEXPECTED_ERROR]));
  }
};

const edit = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const validationErrors = checkValidation(req);
    if (validationErrors.length > 0) {
      return res.status(400).json(failMessage(validationErrors));
    }

    const updateDomain = await domainService.update(id, name);
    if (!updateDomain) {
      return res.status(400).json(failMessage([MESSAGE.UNEXPECTED_ERROR]));
    }
    return res.json(successMessage(updateDomain));
  } catch (err) {
    return res.status(400).json(failMessage([MESSAGE.UNEXPECTED_ERROR]));
  }
};

const getAll = async (req, res) => {
  const domains = await domainService.get();
  return res.json(successMessage(domains));
};

const getOne = async (req, res) => {
  const { id } = req.params;
  const domains = await domainService.get(id);
  return res.json(successMessage(domains));
};

const deleteDomain = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.json(failMessage([MESSAGE.DOMAIN_REQUIRED]));
  }
  await domainService.remove(id);
  return res.json(successMessage());
};

module.exports = {
  create,
  edit,
  getAll,
  getOne,
  deleteDomain,
};
