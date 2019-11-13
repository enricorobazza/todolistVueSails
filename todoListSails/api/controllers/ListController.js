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


    addTask: async function (req, res) {
        sails.log(req.body); 
        /*sails.log('taskInfo:{name: '+req.body.name+', checked: '+req.body.checked+'}');*/
        var x = {name: req.body.name, checked: req.body.checked};

        try {
            response = await Task.create({name: req.body.name});
            return res.send(x);
          } catch (err) {
            switch (err.name) {
              case 'UsageError': return res.badRequest(err);
              default: throw err;
            }
          }

        // return res.send(x);
    }
  
  };
  
  