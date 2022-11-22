<template>
  <div class="container">
    <div id="dog-table" >
      <h1>Cachorros da galera</h1>
      <div id="dog-table-rows" v-if="dogs">
        <div class="dog-table-row" v-for="dog in dogs" :key="dog.id" >
          <div class="dog-table-column">
            <img v-if="dog.img_path" :src="`http://127.0.0.1:8000/storage/${dog.img_path}`" :alt="dog.name" class="dog-picture">
            <img v-else src="@/assets/imgs/noImage.jpg" :alt="dog.name" class="dog-picture">
          </div>
          <div class="dog-table-column">
            <div class="dog-data">
              <p><b>Nome:</b> {{dog.name}}</p>
              <p><b>Raça:</b> {{dog.breed}}</p>
              <p><b>Sexo:</b> {{dog.gender == "M" ? "Masculino" : "Feminino"}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  /* eslint-disable */
  name: 'HomeView',
  data() {
    return {
      dogs: null,
      dog_id: null
    }
  },
  methods: {
    async getDogs() {
      // link do backend do Vue: http://localhost:3000/dogs
      await axios.get('http://127.0.0.1:8000/api/dog_list', {})
      .then(response => {this.dogs = response.data.data})
      .catch(error => {console.log(error)})
    }
  },
  mounted() {
    this.getDogs()
  }
}
</script>

<style scoped>
  #dog-table {
    max-width: 1200px;
    margin: 3% auto 0;
  }

  .dog-table-row {
    display: flex;
    justify-content: space-around;
    width: 100%;
    height: 450px;
    margin-bottom: 3%;
    border: 1px solid #333;
  }

  .dog-table-column {
    margin: auto 0;
  }

  .dog-picture {
    max-height: 400px;
    max-width: 400px;
  }

  .dog-data {
    font-size: 25px;
  }

  .dog-data b {
    font-size: 20px;
  }
</style>