/**
 * ListController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


module.exports = {

    deleteList: async function(req, res){
        try{
            await List.destroy({id: req.params.id});
            console.log("List destroyed ", req.params.id)
            return res.send("ok");
        }
        catch(err){
            return res.badRequest(err);
        }
    },

    getLists: async function(req, res){
        try{
            if(req.params.id)
            {
                var lists = await List.find({notebook: req.params.id}).sort('id');
                return res.send(lists);
            }
            return res.status(404).send("Not found.");
        }
        catch(err){
            return res.badRequest(err);
        }
    },

    addList: async function (req, res) {
        try {
            if(req.params.id){
                console.log("Creating list ", req.body.name, "on notebook", req.params.id);
                response = await List.create({name: req.body.name, notebook:req.params.id}).fetch();
                return res.send(response);
            }
            return res.status(404).send("Not found.");
          } catch (err) {
              return res.badRequest(err);
           }
    },

    getTasks: async function(req, res){
        try{
            if(req.params.id)
            {
                var tasks = await Task.find({list: req.params.id}).sort('id');
                return res.send(tasks);
            }
            return res.status(404).send("Not found.");
        }
        catch(err){
            return res.badRequest(err);
        }
    }
  };
  
  