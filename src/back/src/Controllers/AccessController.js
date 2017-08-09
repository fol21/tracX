const express = require('express');
const bodyParser = require('body-parser')
const uuidv4 = require('uuid/v4');
const moment = require('moment');

const config = require('../../resources/config.json');
const MedidaReq = require('../Domain/MedidaReq.js')
const MedidaCrud = require('../Database/MedidaCrud.js')

const app = express();


/**
 * Controller Associated to a RESTfull method
 * 
 * @class Controller
 */
class AccessController {

    /**
     * Begin Application 
     * 
     * @param {any} router 
     * @returns 
     * 
     * @memberOf Controller
     */
    init(router) {
        router.post(config.access.route, bodyParser.json(), this.gatherMiddle, this.dataBaseMiddle, this.sender);
        return router;
    }


    /**
     * Middleware for porecessing income data
     * It can be repplicated for more steps
     * @param {any} req 
     * @param {any} res 
     * @param {any} next 
     * 
     * @memberOf Controller
     */
    gatherMiddle(req, res, next) {
        // Process data
        req.medida = new MedidaReq(req.body);
        req.medida.id = uuidv4();
        req.medida.desempenho.fim = "";
        next(); // pass to next middleware
    }

    dataBaseMiddle(req, res, next) {
        console.log(req.medida);
        req.promise = MedidaCrud.create(req.medida);
        next();
    }

    /**
     * Callback to send the response
     * 
     * @param {any} req 
     * @param {any} res 
     * 
     * @memberOf Controller
     */
    sender(req, res) {
        //Send response
        req.promise.then((medida) => {
            res.json(medida);
        }).catch((err) => {
            console.log(err)
        });
    }

}

//Returns a singleton when call for require
module.exports = new AccessController();