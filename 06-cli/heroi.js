class Heroi {
    //Do que for passado, pega apenas o nome e o poder, descartando o resto
    constructor({nome, poder, id}) {
        this.nome = nome
        this.poder = poder
        this.id = id
    }
}

//Sem new, porque quem for usar passará a informação que precisa
module.exports = Heroi