Vue.component('task',{
    props: {task:{type:Object}},
    template: `<li v-on:click="toggleChecked(task)" :class="task.checked ? 'checked' : ''">{{task.name}} <span v-on:click="removeFromList(task.id)" class="close">x</span></li>`,
    methods: {
        removeFromList(id){
            this.$emit('remove-from-list', id);
        },
        toggleChecked(task){
            task.checked = !task.checked;
            this.$emit('toggle-task', task)
        }
    }
})

Vue.component('list', {
    template: `<div class="card">

                    <div class="title-container">
                        <h5 class="card-title">{{name}}</h5>
                        <span v-on:click="removeList()" class="close">x</span>
                    </div>

                    <div class="card-body">

                        <ul class="list" v-if="this.tasks.length">
                            <task @toggle-task="toggleTask" @remove-from-list="removeFromList" :task="task" v-for="task in this.tasks">
                            </task>
                        </ul>

                        <div class="addTask">
                            <input placeholder="Minha tarefa..." v-model="taskname" onchange = "this.value = null"/>
                            <a href="#" class="btn btn-warning" v-on:click="addTask">Adicionar tarefa</a>
                        </div>

                    </div>
                </div>`,
    props:{id:{type: Number}, name:{type:String}},
    data(){
        return{
            taskname: null,
            tasks: []
        }
    },
    async beforeMount() {
        let id = this.$props.id;
        response = await axios.get('http://localhost:1337/list/'+id);
        this.tasks = [];
        response.data.forEach(task => {
            this.tasks.push(task);
        })
    },
    watch:{
        id: async function(){
            let id = this.$props.id;
            response = await axios.get('http://localhost:1337/list/'+id);
            this.tasks = [];
            response.data.forEach(task => {
                this.tasks.push(task);
            })
        }
    },

    methods:{
        async addTask(){
            // cadastrar no banco
            response = await axios.post('http://localhost:1337/task/'+this.$props.id, {name: this.taskname})
            let task = {id: response.data.id, name:this.taskname, checked: false};
            this.taskname = null;
            this.tasks.push(task);
        },
        removeFromList(id){
            // deletar do banco
            axios.delete('http://localhost:1337/task/'+id);
            this.tasks = this.tasks.filter(task=>{
                return task.id != id;
            })
        },
        toggleTask(task){
            axios.put('http://localhost:1337/task/', task);
            this.tasks = this.tasks.map(ntask => {
                if(ntask.id == task.id) return task;
                else return ntask;
            })
        },
        removeList(){
            this.$emit('remove-list', this.$props.id);
        }
    }
})

Vue.component('notebook',{
    props:{id:{type:Number}},
    template: `
        <div class="content">
            <list @remove-list="removeList" :id="list.id" :name="list.name" v-for="list in this.lists"></list>
        </div>
    `,
    async beforeMount(){
        let response = await axios.get('http://localhost:1337/notebook/'+this.$props.id);
        this.lists = [];
        response.data.forEach(list=>{
            this.lists.push(list);
        });
    },
    data(){
        return{
            lists:[]
        }
    },
    watch: { 
        id: async function(newId, oldId) { 
            let response = await axios.get('http://localhost:1337/notebook/'+newId);
            this.lists = [];
            response.data.forEach(list=>{
                this.lists.push(list);
            });
      }
    },
    methods:{
        async addList(name){
            let response = await axios.post('http://localhost:1337/list/'+this.$props.id, {name});
            this.lists.push(response.data);
        },
        async removeList(id){
            axios.delete('http://localhost:1337/list/'+id);
            this.lists = this.lists.filter(list => {
                return list.id != id;
            })
        }
    }
})


var app = new Vue({
    el: '#app', 

    methods: {
        async addNotebook(){
            let response = await axios.post('http://localhost:1337/notebook/', {name: this.notebookname})
            this.notebooks.push(response.data);
            this.selectNotebook(response.data.id);
            this.notebookname = null;
        },
        addList(){
            this.$refs.notebook.addList(this.listname);
            this.listname = null;
        },
        selectNotebook(id){
            this.notebooks = this.notebooks.map(notebook => {
                notebook.selected = notebook.id == id;
                return notebook;
            })
            this.selectedNotebook = id;
        },
        async deleteNotebook(id){
            await axios.delete('http://localhost:1337/notebook/'+id);
            this.notebooks = this.notebooks.filter(notebook => {
                return notebook.id != id;
            });
            if(this.selectedNotebook == id){
                if(this.notebooks.length > 0)
                this.selectNotebook(this.notebooks[0].id)
            }
        }
    },
    async beforeMount(){
        let response = await axios.get('http://localhost:1337/notebook/');
        this.notebooks = [];
        this.selectedNotebook = response.data[0].id;
        response.data.forEach((notebook, index)=>{
            notebook.selected = index == 0;
            this.notebooks.push(notebook);
        });
    },
    data(){
        return{
            notebookname: null,
            listname: null,
            notebooks: [{name:'Caderno1'}, {name: 'Caderno2'}],
            selectedNotebook: -1
        }
    },
        
})
