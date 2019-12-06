/**
 * NotebookController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
    addNotebook: async function (req, res) {
        try {
            console.log("Creating notebook ", req.body.name);
            response = await Notebook.create({name: req.body.name}).fetch();
            return res.send(response);
          } catch (err) {
              return res.badRequest(err);
           }
    },

    getNotebooks: async function(req, res){
        try{
            var notebooks = await Notebook.find().sort('id');
            return res.send(notebooks);
        }
        catch(err){
            return res.badRequest(err);
        }
    },

    deleteNotebook: async function(req, res){
        try{
            await Notebook.destroy({id: req.params.id});
            console.log("Notebook destroyed ", req.params.id)
            return res.send("ok");
        }
        catch(err){
            return res.badRequest(err);
        }
    },


};

