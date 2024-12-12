# Changelog

Neste arquivo será registrado todas as atualizações neste projeto

## 16/11/2022

Foi criado o projeto no Vue Js e dado seu primeiro commit.

## 21/11/2022

Foram criados formulário para da cadastro de cachorro e de usuário, página inicial e de login, uma Navbar e uns códigos de css para estilização. No momento o pacote json-server serviu para fazer uma simulação de banco.

## 22/11/2022

Neste dia começou a ser feito a conexão com a API do Larave, tirando a necessidade do pacote json-serve. Neste momento é possível fazer login no frontend, para isso foi necessário armazenar o JWT em um cookie e mais tarde houve a necessidade criar um arquivo de middleware para verificar se o cookie existe e tem um valor válido.

## 23/11/2022

Foi criado um arquivo na pasta services chamado 'api.js' armazenar a url da api

## 24/11/2022

Agora o cadastro de cachorro funciona junto com o backend. Há uma página de perfil onde podemos ver os cães atrelados ao usuário autenticado e teve a adição de remover um cachorro do banco de dados.

## 25/11/2022

Na página de edição de cachorro foi criado o campo 'current_image' para receber a imagem atual do cão. Caso o usuário quiser trocar de imagem, ela ficará armazenada no campo 'img_path' para ser enviada ao backend. Essa separação ocorreu para evitar conflitos entre a exibição da imagem atual e o manuseio de uma nova imagem.

## 29/11/2022

No perfil de usuário autenticado foi implementado a paginação de cachorros, exibindo 5 deles por página. No momento está tendo problema na página de edição de cachorros, quando tento atualizar seus dados da um erro relacionado ao método PUT.

## 30/11/2022

Foi corrigido o problema com a edição de cachorros. Só houve a necessidade de trocar o 'axis.put' por 'axios.post' e acrescentar o seguinte texto na url de sua função '?_method=PUT'.

# 01/12/2022

O commit desse dia foi focado na estilização. Nos arquivos de componentes teve a criação de vários códigos css para fazer a responsividade do projeto.

# 12/12/2022

Agora é possível excluir a imagem atrelado a seu cachorro na página de edição.

# 20/02/2024

O arquivo README.md foi alterado para poder descrever o projeto para qualquer um que visualizar seu repositório.

# 12/12/2025

Agora existe o arquivo changelog.md para registrar cada alteração feita no projeto. Também há um arquivo separado somente para definir o valor do token, ele foi gerado porque o código a variável pegar o JWT precisou ser alterado para receber o valor correto. Como será usado em várias views, sua definição foi movida para um novo arquivo e ser importado aonde for preciso.
