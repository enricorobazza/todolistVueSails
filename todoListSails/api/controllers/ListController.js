/**
 * ListController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
    /**
     * `ListaAxiosController.teste()`
     */
    teste: async function (req, res) {
      sails.log(req.body); 
      /*sails.log('taskInfo:{name: '+req.body.name+', checked: '+req.body.checked+'}');*/
      var x = {name: req.body.name, checked: req.body.checked};
      return res.send(x);
    }
  
  };
  
  