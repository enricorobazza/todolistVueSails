
//'task'-> nome do meu componente.
Vue.component('task', {  
    //Ao inves de fazer a conexao pelo DOM como � feito na instancia do Vue (Line 38). A atributo Template especifica a estrutura do componente
    template: `  
           <form v-on:submit ="addToTasksList" action="#">
                <label for="task">Tarefa:<br /></label>
                <input  v-model="name"  onchange = "this.value = null ">   <!-- v-model ->  criando two-way data bindings no input do form -->     
                <input type="submit" value="Adicionar"> 
           </form>
`,
    data() {
        return { //Returns a fresh data object for each component. Ou seja, v�rias copias do mesmo componente ir� compartilhar os mesmos dados. 
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
}) //Componentes tamb�m podem utilizar o atributo 'props', para passar dados de um elemento para outro. 



//Criando uma nova inst�ncia do Vue. The Root da aplica��o Vue.js
var app = new Vue({
    el: '#app', //conectando com a div id = "app" 
    data: { // Vue is Reactive. Se modificarmos os dados nessa inst�ncia, ir� modificar os dados em cada lugar que est� sendo referenciado 
        tasks: [] 
    },
	
    methods: {
        updateTasksList(taskInfo) {
            this.tasks.push(taskInfo);
			axios/*usando axios (3rd-party library) e promisses -> podeira usar fetch (padr�o EC6.0)*/
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

        removeTask() {
            var old = this.tasks;
            this.tasks = [];
            for (var i = 0; i < old.length; i++) {
                if (!old[i].checked) 
                    this.tasks.push(old[i]);            
            }
        }
    }
    
})
