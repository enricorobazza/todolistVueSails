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
              return res.badRequest(err);
           }
        // return res.send(x);
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
        try{
            var tasksIds = req.ids;
            tasksIds.forEach(element => {
                Task.destroy("id = "+element);
            });
            return res.send("ok");
        }
        catch(err){
            return res.badRequest(err);
        }
    }
  
  };
  
  