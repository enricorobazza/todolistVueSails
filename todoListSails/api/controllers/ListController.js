/**
 * ListController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


module.exports = {

    addTask: async function (req, res) {
        try {
            if(req.params.id){
                console.log("Creating task ", req.body.name);
                response = await Task.create({name: req.body.name, list: req.params.id}).fetch();
                return res.send(response);
            }
            return res.status(404).send("Not found.");
          } catch (err) {
              return res.badRequest(err);
           }
    },

    toggleChecked: async function(req, res){
        try{
            console.log("Toggling task ", req.body.name, req.body.id , "to",req.body.checked);
            await Task.updateOne({id:req.body.id}).set({checked: req.body.checked});
            return res.send("ok");
        }catch(err){
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
  
  