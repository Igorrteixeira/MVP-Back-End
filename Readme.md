# MVP-API

## LINK DEPLOY PARA USO = https://mvp-api-7j59.onrender.com

### Como rodar na sua maquina 

* git clone https://github.com/Igorrteixeira/MVP-Back-End
* cd MVP-Back-End
* docker compose up

* apos inicialização entre com o comando em um novo terminal :
* docker-compose run --rm app npm run migration 
* esse comando ira criar e popular tabelas

* comando para rodar testes = docker-compose run --rm app npm test
* As variáveis de ambiente são para fins de desenvolvimento e testes por isso não estão no gitignore.

---------------------------------------------
O projeto segue essa estrutura:
* Routes onde estão as rotas de consulta.
* Controller onde faz a requisição utilizando de express.
* Businnes onde cuida da regra de negocio.
* Database que faz conexão com banco de dados.
* Todos Ultilizando de models e DTOs.

## Endpoints

## OBS: **Documentação mais detalhada com entrada, saidas e exemplos no link do postman**

LINK POSTMAN = https://documenter.getpostman.com/view/21555253/2s8Z6sav97

### Usuario

* **CRIAR USUARIO**
    * Para criar novo usuario são obrigatorios nome, email, senha, role = (vendedor,gerente,diretor,diretor geral)
    * Vendedores e gerente são obrigados a colocar sua unidade.
    * Diretores são obrigados a colocar sua diretoria.
    * Fazer login

* **lOGIN**
    * O usuario e obrigado a entrar com email e senha validos.

* **BUSCAR VENDEDORES**
    * Não são necessarios parametros pois não retorna nenhum conteudo sensivel.
-----------------------------------------

### Vendas
 
* **CRIAR NOVA VENDA**
    * E entrar com data e hora, latitude e longitude, valor total, e token  o sistemas coloca unidade nome, se esta em roaming automaticamente com token.
* **BUSCAR VENDAS E FILTRAR**
    * E obrigatorio enviar tokem e sera entregue vendas seguindo hierarquia.
    * A hierarquia e controlada pelo login entregando somente o que cada usuario tem permição
    * Gerente pode filtrar por vendedor e por data pois so tera acesso a sua unidade.
    * Diretor pode filtar por vendedor, data e unidade pois so tera acesso a sua diretoria.
    * Diretor geral pode filtrar por vendedor, data, unidade e diretoria.
    * Tambem e possivel ordenar data com Desc e Asc.
* **BUSCAR DETALHES DE VENDA POR ID**
    * E necessario passar somente id tendo em vista que so tera acesso ao id usuario logado.
* **ATUALIZA VENDA**
    * Somente gerente pode alterar venda passando token via headers e id via body demais parametros são opcionais.
    * São eles data e hora, valor total, roaming, lat-long, id da unidade e deretoria.
* **DELETAR VENDA**
    * Somente gerente pode deletar venda passando token via headers e id da venda via params.
-------------------------------------------
### Unidades e diretorias 
* **BUSCAR UNIDADES**
    * Endpoint sem parametros retorna todas unidades e id .
* **BUSCAR DIRETORIAS**
    * Endpoint sem parametros retorna todas diretorias e id .

### LEMBRANDO QUALQUER DUVIDA CONSULTAR DOCUMENTAÇÃO DETALHADA NO POSTMAN

## tecnologias 
    * node.js (typescript)
    * express
    * kenx
    * mysql
    * jsonwebtoken
    * bcryptjs
    * uuid
    * jest







