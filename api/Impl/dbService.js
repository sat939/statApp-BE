import mongodb from 'mongodb';

let mongoClient = mongodb.MongoClient;
let url = 'mongodb://localhost:27017/stats';
let options = { useNewUrlParser: true };

let getTotalCount = (req, res) => {

    const team1 = req.query.team1;
    const team2 = req.query.team2;
    mongoClient.connect(url, options, (err, client) => {
        if (err) {
            console.log('Hello, error here', err);
        }
        var db = client.db('stats');

        /**
        * aggregating based on countries
        */
        let pipeline = [
            { $match: { $and: [{ "team": team1 }, { "team2": team2 }] } },
            {
                $group: {
                    _id: "$Match_Id",
                    winner: {
                        $first: "$winner"
                    }
                }
            }
        ];
        db.collection('records').aggregate(pipeline).toArray((err, matches) => {
            if (err) {
                console.log('ERROR HERE ', err);
            }
            let team1Wins = matches.filter(data => data['winner'] === team1)
            res.json({
                'total': matches.length,
                'won': team1Wins.length,
                'lost': (matches.length - team1Wins.length)

            })
        });

    });


}

module.exports = {
    'getTotalCount': getTotalCount
}

