//Exemplo com tudo junto, antes da separação
//Classe customizada de erro para quando um metodo não for implementado
class NotImplementedException extends Error {
    constructor() {
        super("Not Implemented Exception");
    }
}

//Interface de crud
class ICrud {
    create(item) {
        throw new NotImplementedException()
    }

    read(query) {
        throw new NotImplementedException()
    }

    update(id, item) {
        throw new NotImplementedException()
    }

    delete(id) {
        throw new NotImplementedException()
    }
}

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

//Strategy para o Postgres
class PostgresDB extends ICrud {
    constructor() {
        super();
    }

    create(item) {
        console.log('O item foi salvo em Postgres')
    }
}

// Classe abstrata
// As strategies que passar para o construtor, tem que implementar esses métodos
class ContextStrategy {
    constructor(strategy) {
        this._database = strategy
    }

    create(item) {
        return this._database.create(item)
    }

    read(item) {
        return this._database.read(item)
    }

    update(id, item) {
        return this._database.update(id, item)
    }

    delete(id) {
        return this._database.delete(id)
    }
}

const contextMongo = new ContextStrategy(new MongoDB())
contextMongo.create()

const contextPostgres = new ContextStrategy(new PostgresDB())
contextPostgres.create()

//contextMongo.read()
