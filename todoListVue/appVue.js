
Vue.component('taskadd', {  
    template: `  
        <div class="addTask">
            <input placeholder="Minha tarefa..." v-model="name" onchange = "this.value = null"/>
            <a href="#" class="btn btn-warning" v-on:click="addToTasksList">Adicionar tarefa</a>
        </div>
`,
    data() {
        return { 
            name: null
        }       
    },
    
    methods: {
        addToTasksList() {
            this.$emit('add-to-tasks-list', this.name)
            this.name = null
        }
     
    }
}) 

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
                        <h5 class="card-title">Alo</h5>

                        <ul class="list" v-if="this.tasks.length">
                            <task @toggle-task="toggleTask" @remove-from-list="removeFromList" :task="task" v-for="task in this.tasks">
                            </task>
                        </ul>

                        <taskadd @add-to-tasks-list="updateTasksList"> </taskadd> 
                    </div>
                </div>`,
    data(){
        return{
            name: null,
            tasks: []
        }
    },
    async beforeMount() {
        response = await axios.get('http://localhost:1337');
        this.tasks = [];
        response.data.forEach(task => {
            this.tasks.push(task);
        })
    },

    methods:{
        async updateTasksList(name){
            // cadastrar no banco
            response = await axios.post('http://localhost:1337', {name})
            let task = {id: response.data.id, name:name, checked: false};
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


var app = new Vue({
    el: '#app', 

    methods: {

    }
        
})
