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
                    <div class="card-body">
                        <h5 class="card-title">{{name}}</h5>

                        <ul class="list" v-if="this.tasks.length">
                            <task @toggle-task="toggleTask" @remove-from-list="removeFromList" :task="task" v-for="task in this.tasks">
                            </task>
                        </ul>

                        <div class="addTask">
                            <input placeholder="Minha tarefa..." v-model="taskname" onchange = "this.value = null"/>
                            <a href="#" class="btn btn-warning" v-on:click="updateTasksList">Adicionar tarefa</a>
                        </div>

                    </div>
                </div>`,
    props:{id:{type: Number}, name:{type:String}},
    data(){
        return{
            taskname: null,
            name: null,
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

    methods:{
        async updateTasksList(){
            // cadastrar no banco
            response = await axios.post('http://localhost:1337', {name: this.taskname})
            let task = {id: response.data.id, name:this.taskname, checked: false};
            this.taskname = null;
            this.tasks.push(task);
        },
        removeFromList(id){
            // deletar do banco
            axios.delete('http://localhost:1337', {data:{id}});
            this.tasks = this.tasks.filter(task=>{
                return task.id != id;
            })
        },
        toggleTask(task){
            axios.put('http://localhost:1337', task);
            this.tasks = this.tasks.map(ntask => {
                if(ntask.id == task.id) return task;
                else return ntask;
            })
        }
    }
})

Vue.component('notebook',{
    props:{id:{type:Number}},
    template: `
        <div class="content">
            <list :id="list.id" :name="list.name" v-for="list in this.lists"></list>
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
    methods:{
        async addList(name){
            let response = await axios.post('http://localhost:1337/notebook/'+this.$props.id, {name});
            this.lists.push(response.data);
        }
    }
})


var app = new Vue({
    el: '#app', 

    methods: {
        addNotebook(){
            alert('Add Notebook');
        },
        addList(){
            this.$refs.notebook.addList(this.listname);
        }
    },
    data(){
        return{
            notebookname: null,
            listname: null,
        }
    },
        
})
