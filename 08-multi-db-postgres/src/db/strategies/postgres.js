const ICrud = require('./interfaces/interfaceCrud')
const Sequelize = require('sequelize')


//Strategy para o Postgres
class PostgresDB extends ICrud {
    constructor() {
        super();
        this._driver = null
        this._herois = null
        //Quando a classe for instanciada, conecta com o banco de dados
        this._connect()
    }

    async isConnected() {
        try {
            await this._driver.authenticate()
            return true
        } catch(error) {
            console.log('fail!', error)
            return false;
        }
    }

    create(item) {
        console.log('O item foi salvo em Postgres')
    }

    async defineModel() {
        this._herois = driver.define('herois', {
            id: {
                type: Sequelize.INTEGER,
                required: true,
                primaryKey: true,
                autoIncrement: true
            },
            nome: {
                type: Sequelize.STRING,
                required: true
            },
            poder: {
                type: Sequelize.STRING,
                required: true
            }
        }, {
            tableName: 'TB_HEROIS',
            freezeTableName: false,
            timestamps: false
        })
        await Herois.sync()
    }

    //Underline na frente = Método privado
    _connect() {
         this._driver = new Sequelize(
            'heroes',
            'matheus',
            '12345', {
                host: 'localhost',
                port: 5434,
                dialect: 'postgres',
                quoteIdentifiers: false,
                operatorsAliases: 0
            }
        )
    }
}

module.exports = PostgresDB