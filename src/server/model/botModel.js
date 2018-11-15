const { bot } = require('../entity');

const botModel = (function () {
  return {
    create: async function(data) {
      return await bot.create(data);
    },
    update: async function(options) {
      const { data, where } = options;
      return await bot.update(data, {
          where: where
      });
    },
    find: async function(options) {
      return await bot.findAll(options);
    },
    delete: async function(options) {
        return await bot.destroy(options);
    }
  }
})();

module.exports = botModel;
