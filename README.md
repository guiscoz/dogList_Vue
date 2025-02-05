# dog_list_vue

Dog List é uma plataforma de cadastro de cachorros, ela é dependente de um projeto do Laravel com o mesmo nome.
Seu repositório está disponível neste link:

```
https://github.com/guiscoz/dogList_Laravel
```

Neste projeto é um arquivo chamado 'api.js' dentro das pastas '/src/services'. Nela há uma variável muito importante chamada de 'api' contendo a URL para fazer suas consultas e ela pode ser definidade de duas formas:

```
Laragon
const api = 'http://doglist_laravel.test/api'

php artisan server
const api = 'http://127.0.0.1:8000/api'

Docker
const api = 'http://localhost:8000/api'
```

A primeira linha vai servir se você tiver o Laragon instalado na sua máquina e deixar projeto dentro da pasta 'C:\laragon\www\'.
Já a segunda linha vai servir no caso você rodar o projeto do Laravel através do comando 'php artisan serve'.
Enquanto a terceira servirá caso o backend estiver rodando em um ambiente Docker.


Para executar o frontend também com o Docker basta utilizar estes comandos no terminal:
```
Gera e executa o container
docker-compose up -d

Acessa o container no terminal
docker exec -it doglist-frontend sh

Executa o frontend, ele funcionará tanto com o Docker quanto sem ele caso tiver o npm instalado
npm run serve
```


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
