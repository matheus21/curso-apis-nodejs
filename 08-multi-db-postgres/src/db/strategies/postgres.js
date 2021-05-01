const ICrud = require('./interfaces/interfaceCrud')
const Sequelize = require('sequelize')


//Strategy para o Postgres
class PostgresDB extends ICrud {
    constructor() {
        super();
        this._driver = null
        this._herois = null
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

    async create(item) {
        //console.log('O item foi salvo em Postgres')
        const {dataValues} = await this._herois.create(item)
        return dataValues
    }

    async defineModel() {
        this._herois = this._driver.define('herois', {
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
        await this._herois.sync()
    }

    //Underline na frente = Método privado
    async connect() {
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
        await this.defineModel()
    }
}

module.exports = PostgresDB