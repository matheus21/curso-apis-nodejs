const ICrud = require('./interfaces/interfaceCrud')

//Strategy para o Postgres
class PostgresDB extends ICrud {
    constructor() {
        super();
    }

    create(item) {
        console.log('O item foi salvo em Postgres')
    }
}

module.exports = PostgresDB