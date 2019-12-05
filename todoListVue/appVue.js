
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
    props: ["name"],
    template: `${name} <span class="close">x</span>`,
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


var app = new Vue({
    el: '#app', 
    data(){
        return {tasks: []};
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
