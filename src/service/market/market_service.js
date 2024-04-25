const dao = require("../../database/market/market_dao");
const views = {
    coin_insert: async () => {
        let data = await dao.views.coin_insert();
        return data;
    }
}
module.exports = {views};