/**
 * ListController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


module.exports = {

    addTask: async function (req, res) {
        try {
            console.log("Creating task ", req.body.name);
            response = await Task.create({name: req.body.name}).fetch();
            return res.send(response);
          } catch (err) {
              return res.badRequest(err);
           }
    },

    toggleChecked: async function(req, res){

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

    deleteTask: async function(req, res){
        try{
            await Task.destroy({id: req.body.id});
            console.log("Task destroyed ", req.body.id)
            return res.send("ok");
        }
        catch(err){
            return res.badRequest(err);
        }
    }

  };
  
  