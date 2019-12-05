
Vue.component('taskadd', {  
    template: `  
        <div class="addTask">
            <input placeholder="Minha tarefa..." v-model="name" onchange = "this.value = null"/>
            <a href="#" class="btn btn-warning" v-on:click="addToTasksList">Adicionar tarefa</a>
        </div>
`,
    data() {
        return { 
            name: null,
            checked: false
        }       
    },
    
    methods: {
        addToTasksList() {
            let taskInfo = {
                name: this.name,
                checked: this.checked
            }
            this.$emit('add-to-tasks-list', taskInfo)
            this.name = null
        }
     
    }
}) 

Vue.component('task',{
    // props: {task:{
    //     type: Object
    // }},
    props: {task:{type:Object}},
    template: `<li>{{task.name}} <span v-on:click="removeFromList(task.id)" class="close">x</span></li>`,
    data() {
        return { 
            name: null,
            checked: false
        }       
    },
    
    methods: {
        removeFromList(id){
            this.$emit('remove-from-list', id);
        },
        addToTasksList() {
            let taskInfo = {
                name: this.name,
                checked: this.checked
            }
            this.$emit('add-to-tasks-list', taskInfo)
            this.name = null
        }
    }
})

Vue.component('list', {
    template: `<div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Alo</h5>

                        <ul class="list" v-if="this.tasks.length">
                            <task @remove-from-list="removeFromList" :task="task" v-for="task in this.tasks">
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
    beforeMount(){
        axios.get('http://localhost:1337').then(response => {
                tasks = [];
                response.data.forEach(task => {
                    tasks.push(task);
                });
                this.tasks = tasks;
            }).catch(error => {
                console.log(error)
                this.errored = true
            });
    },
    methods:{
        removeFromList(id){
            alert(id);
            // delete tasks[0];
            this.$emit('remove-from-list', id);
        }
    }
})


var app = new Vue({
    el: '#app', 
    data(){
        return {tasks: []};
    },
	
    methods: {
        updateTasksList(taskInfo) {
			axios
				.post('http://localhost:1337', taskInfo)
				.then(response => {
					
					this.tasks.push(response.data);
					
					console.log(response.data);
				})
				.catch(error => {
					console.log(error)
					this.errored = true
				})
        },

        getTasks(){
            axios.get('http://localhost:1337').then(response => {
                response.data.forEach(task => {
                    this.tasks.push(task);
                })
            }).catch(error => {
                console.log(error)
                this.errored = true
            });
        },
        removeFromList(id){
            // alert('alou');
            this.tasks = this.tasks.filter(element => {
                return element.id != id;
            })
            // console.log(this.tasks.find(e => e.id === id));
            // delete this.tasks.find(e => e.id === id);
        },

        removeTask() {
            var old = this.tasks;
            this.tasks = [];
            var toRemove = [];
            for (var i = 0; i < old.length; i++) {
                if (!old[i].checked){
                    this.tasks.push(old[i]);
                }
                else{
                    toRemove.push(old[i]);
                }            
            }
            axios.delete('http://localhost:1337', {data: toRemove}).then(response => {
                console.log(response.data);
            }).catch(err => {
                console.log(err);
                this.errored = true
            })
        }
    }
        
})
