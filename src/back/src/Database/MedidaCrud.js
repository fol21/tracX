const Medida = require('../Domain/Models/Medida.js');

class MedidaCrud{
    
    create(obj){
        return Medida.create(obj);
    }

}

module.exports = new MedidaCrud();