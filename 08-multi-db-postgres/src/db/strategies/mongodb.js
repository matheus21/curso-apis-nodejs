const ICrud = require('./interfaces/interfaceCrud')

//Implementa (implements) o ICrud - Strategy
//Se não implementar todos os metodos, pegará da classe mãe, onde terá o B.O
class MongoDB extends ICrud {
    constructor() {
        super();
    }

    create(item) {
        console.log('O item foi salvo em MongoDB')
    }
}

module.exports = MongoDB