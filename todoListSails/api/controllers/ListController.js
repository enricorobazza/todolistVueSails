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
        try {
            response = await Task.create({name: req.body.name}).fetch();
            return res.send(response);
          } catch (err) {
              return res.badRequest(err);
           }
    },

    getTasks: async function(req, res){
        try{
            var tasks = await Task.find();
            return res.send(tasks);
        }
        catch(err){
            return res.badRequest(err);
        }
    },

    deleteTasks: async function(req, res){
        sails.log(req.body);
        
        try{
            let tasks = req.body;
            tasks.forEach(async (element) => {
                sails.log(element.name)
                var removedTasks = await Task.destroy({name: element.name});
            }).fetch();
            res.send(removedTasks);
        }
        catch(err){
            return res.badRequest(err);
        }
    }
  };
  
  