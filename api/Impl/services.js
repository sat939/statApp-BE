import dbService from './dbService';

let totalCount = (req, res) => {

    return dbService.getTotalCount(req, res);

}

module.exports = {
    'totalCount': totalCount
};
