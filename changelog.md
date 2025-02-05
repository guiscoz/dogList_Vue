# Changelog

Neste arquivo será registrado todas as atualizações neste projeto.

## 2022

Este é o ano em que o projeto foi criado com o objeto de enriquecer meu portfólio.

### 16/11

Foi criado o projeto no Vue Js e dado seu primeiro commit.

### 21/11

Foram criados formulário para da cadastro de cachorro e de usuário, página inicial e de login, uma Navbar e uns códigos de css para estilização. No momento o pacote json-server serviu para fazer uma simulação de banco.

### 22/11

Neste dia começou a ser feito a conexão com a API do Larave, tirando a necessidade do pacote json-serve. Neste momento é possível fazer login no frontend, para isso foi necessário armazenar o JWT em um cookie e mais tarde houve a necessidade criar um arquivo de middleware para verificar se o cookie existe e tem um valor válido.

### 23/11

Foi criado um arquivo na pasta services chamado 'api.js' armazenar a url da api

### 24/11

Agora o cadastro de cachorro funciona junto com o backend. Há uma página de perfil onde podemos ver os cães atrelados ao usuário autenticado e teve a adição de remover um cachorro do banco de dados.

### 25/11

Na página de edição de cachorro foi criado o campo 'current_image' para receber a imagem atual do cão. Caso o usuário quiser trocar de imagem, ela ficará armazenada no campo 'img_path' para ser enviada ao backend. Essa separação ocorreu para evitar conflitos entre a exibição da imagem atual e o manuseio de uma nova imagem.

### 29/11

No perfil de usuário autenticado foi implementado a paginação de cachorros, exibindo 5 deles por página. No momento está tendo problema na página de edição de cachorros, quando tento atualizar seus dados da um erro relacionado ao método PUT.

### 30/11

Foi corrigido o problema com a edição de cachorros. Só houve a necessidade de trocar o 'axis.put' por 'axios.post' e acrescentar o seguinte texto na url de sua função '?_method=PUT'.

### 01/12

O commit desse dia foi focado na estilização. Nos arquivos de componentes teve a criação de vários códigos css para fazer a responsividade do projeto.

### 12/12

Agora é possível excluir a imagem atrelado a seu cachorro na página de edição.

## 2024

Dois anos após sua criação, foi notado a necessidade de fazer alguns ajustes no projeto para melhora-lo.

### 20/02

O arquivo README.md foi alterado para poder descrever o projeto para qualquer um que visualizar seu repositório.

### 12/12

Agora existe o arquivo changelog.md para registrar cada alteração feita no projeto. Também há um arquivo separado somente para definir o valor do token, ele foi gerado porque o código a variável pegar o JWT precisou ser alterado para receber o valor correto. Como será usado em várias views, sua definição foi movida para um novo arquivo e ser importado aonde for preciso.

### 13/12

Na pasta de views foi criada a pasta dog para armazenar a view de criação e edição de cachorro, também surgiu as authentication para receber a view de login, cadastro e perfil de usuário. Somente a view da página inicial (Home.vue) permaneceu no lugar. Além disse, alguns de seus arquivos foram renomeados de DogRegister para Create, DogEdition para Edit e HomeView para Home.
Surgiu um novo componente chamado DogCard que servirá para carregar dados de cada cachorro, ele aparece tanto na página inicial quanto a de perfil.
Antes os códigos de estilização estavam no mesmo arquivo do componente, mas agora foram criado arquivos css separados.
Houve a exclusão da pasta db e a de dogs dentro dos assets porque a função deles eram auxiliar a simulação do backend com o json-server, algo que não será mais usado no projeto.
Um problema que surgiu é durante o login e cadastro de um novo usuário. Ao ser redirecionado à página de perfil após uma dessas ações, a variável que deveria receber o valor do token armazenado no cookie é dada como indefinida. A única solução encontrar é dar refresh na página de perfil 200 milisegundos depois da autenticação. Este é um problema que aparece somente depois de logar ou se cadastrar.

### 16/12

O arquivo 'token.js' foi renomeado para 'getToken.js' e nele há uma função que procura o cookie e espera que a variável token seja definida. Dessa forma resolveu aquele problema no redirecionamento à página de perfil após o login. Esta função passou a retorna uma Promise que espera receber um valor em vez de retornar uma simples string, por isso fazer um pequeno ajuste nos componentes que usam o JWT para as requisições de API. Em vez de só importar o token como era feito anteriormente, foi necessário criar uma variável para receber o getToken com um await na frente.
Também foi criado o componente DogForm que está sendo usando tanto pelo DogCreate quanto pelo o DogEdit porque sua estrutura é identica uma a outra.

### 17/12

Commit de uma mudança no changelog que não foi feito no dia anterior.

## 2025

Neste ano foi adiciona mais features e alguns ajustes também.

## 05/02

Foi criado um arquivo de docker-compose para possibilitar a execução do projeto em um ambiente Docker. O mesmo foi feito no repositório do backend. No componente DogCard foi criada uma função para receber a url da imagem do cachorro devido a um problema encontrado durante a execução do Docker.