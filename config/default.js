module.exports = {
    port: 5000,
    db: {
        name: 'techTrial',
        user: 'root',
        password: 'gogo',
        config: {
            host: 'localhost',
            dialect: 'mysql',
            pool: {
                max: 5,
                min: 0,
                idle: 10000
            },
            logging: false
        }
    },
    user: {
        initialCoin: 1000,
        initialItems: [
            {
                code: 1,
                quantity: 30
            },
            {
                code: 2,
                quantity: 18
            },
            {
                code: 3,
                quantity: 1
            }
        ]
    },
    job: {
        totalIterarion: 90,
        tick: 1000,
    }
};