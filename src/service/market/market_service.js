const dao = require("../../database/market/market_dao");
const views = {
    coin_insert: async () => {
        let data = await dao.views.coin_insert();
        return data;
    },
    coin_info: async (coin_name) => {
        let data = await dao.views.coin_info(coin_name);
        return data;
    }
}
module.exports = {views};