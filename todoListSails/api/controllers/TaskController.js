/**
 * TaskController
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


    deleteTask: async function(req, res){
        try{
            await Task.destroy({id: req.params.id});
            console.log("Task destroyed ", req.params.id)
            return res.send("ok");
        }
        catch(err){
            return res.badRequest(err);
        }
    },

};

