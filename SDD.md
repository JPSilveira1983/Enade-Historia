# Software Design Document — ENADE História

**Versão:** 2.0  
**Data:** 4 de agosto de 2026  
**Responsável:** JP Silveira  
**Contato:** joao.paulo@ueg.br  
**Status:** versão funcional para publicação como site estático

## 1. Visão geral

O ENADE História é uma aplicação web estática voltada à preparação educacional por meio de questões de História disponibilizadas pelo INEP. O sistema organiza questões de 2024 e 2025, permite montar sessões personalizadas, fornece correção imediata, registra estatísticas no navegador e oferece recursos de favoritos e revisão.

O banco preserva 185 registros. Duas questões anuladas no gabarito oficial permanecem documentadas no JSON, mas são excluídas do sorteio das sessões.

A aplicação não exige cadastro ou login, não possui finalidade comercial e não envia dados pessoais a servidores externos. Seu conteúdo pode ser publicado gratuitamente em serviços de hospedagem estática, como GitHub Pages.

## 2. Objetivos

- oferecer uma experiência simples e responsiva para resolução de questões;
- preservar e organizar o conteúdo da versão anterior da aplicação;
- separar apresentação, comportamento, estatísticas e banco de questões;
- permitir manutenção futura sem reconstruir todo o sistema;
- registrar o progresso localmente, sem autenticação ou infraestrutura de servidor;
- manter identidade visual adequada ao Curso de História;
- oferecer acessibilidade básica e suporte aos modos claro e escuro.

## 3. Escopo funcional

### 3.1 Página inicial

A página inicial apresenta:

- logo do Curso de História no canto superior esquerdo;
- navegação para início e estatísticas;
- alternância entre tema claro e escuro;
- apresentação da plataforma e quantidade total de questões;
- filtros por palavra-chave, ano e categoria;
- atalhos para favoritas e questões marcadas para revisão;
- seleção da quantidade de questões;
- botão para iniciar uma sessão.

### 3.2 Categorias

Todas as questões são classificadas em dez conjuntos:

1. Formação docente;
2. História Antiga;
3. História Medieval;
4. História Moderna;
5. História Contemporânea;
6. História do Brasil;
7. História da América;
8. História da África;
9. História da Ásia;
10. Teoria, metodologia e ensino de História.

A classificação é armazenada no campo `categoria` de cada registro do banco JSON.

| Categoria | Registros |
|---|---:|
| Formação docente | 93 |
| História do Brasil | 27 |
| História Contemporânea | 12 |
| Teoria, metodologia e ensino de História | 12 |
| História da África | 10 |
| História da América | 8 |
| História Antiga | 7 |
| História da Ásia | 7 |
| História Moderna | 5 |
| História Medieval | 4 |
| **Total** | **185** |

### 3.3 Sessão de questões

Ao iniciar uma sessão, o sistema:

1. aplica os filtros selecionados;
2. embaralha as questões disponíveis;
3. limita o conjunto à quantidade escolhida;
4. apresenta uma questão por vez;
5. registra a alternativa selecionada;
6. destaca a resposta correta em verde com o símbolo `✓`;
7. destaca uma resposta incorreta em vermelho com o símbolo `×`;
8. bloqueia a resposta após a seleção;
9. permite avançar, retornar ou encerrar a sessão;
10. apresenta o resultado consolidado ao final.

Os enunciados são justificados. Referências bibliográficas, fontes e legendas utilizam fonte menor, peso mais leve e cor secundária.

### 3.4 Favoritos e revisão

Cada questão possui:

- botão de estrela para adicionar ou remover dos favoritos;
- botão de revisão para marcar ou desmarcar “revisar depois”.

As seleções são persistidas no navegador e podem ser usadas como filtros na página inicial.

### 3.5 Estatísticas

O sistema registra localmente:

- número de sessões concluídas;
- quantidade de questões respondidas;
- quantidade e percentual de acertos;
- desempenho por categoria;
- duração da sessão;
- histórico das sessões recentes;
- totais de favoritas e questões para revisão.

O usuário pode apagar o histórico pela tela de estatísticas.

## 4. Arquitetura

A aplicação utiliza HTML, CSS e JavaScript nativos, sem necessidade de compilação, framework ou servidor de aplicação.

```text
index.html
style.css
app.js
quiz.js
stats.js
questoes.json
logo-historia.png
logo-historia-transparente.png
[demais imagens .jpg utilizadas pelo banco]
```

Estrutura plana (sem subpastas), para simplificar o upload e a publicação via GitHub Pages.

### 4.1 Responsabilidades

| Arquivo | Responsabilidade |
|---|---|
| `index.html` | Estrutura principal, metadados, cabeçalho, rodapé e carregamento da aplicação. |
| `style.css` | Identidade visual, temas, responsividade, estados de acerto e erro e tipografia. |
| `app.js` | Renderização das telas, eventos, navegação e controle das sessões. |
| `quiz.js` | Normalização do banco, filtros, valores únicos e embaralhamento. |
| `stats.js` | Persistência e cálculo das estatísticas locais. |
| `questoes.json` | Conteúdo estruturado das questões. |
| `*.jpg` / `*.png` | Logo e imagens associadas às questões. |

## 5. Modelo de dados

O arquivo `questoes.json` contém metadados e uma lista no campo `questoes`.

```json
{
  "versao": 2,
  "atualizadoEm": "2026-08-04",
  "questoes": [
    {
      "id": 101,
      "year": 2025,
      "area": "Área original da questão",
      "categoria": "Formação docente",
      "origem": "Identificação da prova",
      "enunciado": "Texto da questão",
      "alternativas": ["A", "B", "C", "D"],
      "correta": 3,
      "explicacao": "Justificativa ou referência ao gabarito",
      "imagem": "imagem.jpg",
      "imagemCredito": "Fonte da imagem"
    }
  ]
}
```

O campo `correta` utiliza índice iniciado em zero: `0` representa a alternativa A, `1` representa B e assim sucessivamente. Os campos de imagem são opcionais.

### 5.1 Banco atual

- total de questões: 185;
- anos: 2024 e 2025;
- questões com imagens: 37;
- referências de imagens ausentes: 0;
- caracteres corrompidos de substituição: 0.

## 6. Persistência local

O sistema utiliza `localStorage` com as seguintes chaves:

| Chave | Conteúdo |
|---|---|
| `enade.sessions.v2` | Até 50 sessões recentes. |
| `enade.favorites.v2` | Identificadores das questões favoritas. |
| `enade.review.v2` | Identificadores das questões marcadas para revisão. |
| `enade.theme` | Preferência pelo tema claro ou escuro. |

Os dados permanecem somente no navegador utilizado. A limpeza dos dados do site pelo navegador também remove essas informações.

## 7. Design e identidade visual

### 7.1 Diretrizes

- estética acadêmica, limpa e contemporânea;
- verde como cor principal;
- cartões com bordas suaves e sombras discretas;
- hierarquia tipográfica clara;
- botão principal visualmente destacado;
- feedback de resposta por cor e símbolo;
- adaptação automática ao tema escuro;
- logo transparente, sem a linha institucional inferior.

### 7.2 Responsividade

Em telas menores:

- a navegação textual superior é ocultada;
- filtros são reorganizados em duas colunas;
- cartões usam espaçamento reduzido;
- métricas são exibidas em duas colunas;
- controles de sessão são reorganizados para preservar legibilidade.

## 8. Acessibilidade

Recursos implementados:

- idioma do documento definido como português do Brasil;
- link para pular diretamente ao conteúdo;
- textos alternativos nas imagens;
- rótulos associados aos campos de formulário;
- navegação principal identificada;
- estados de resposta comunicados por cor e símbolo;
- respeito à preferência de redução de movimento;
- contraste adaptado nos temas claro e escuro.

Recomenda-se, antes de uma publicação institucional, uma auditoria complementar com teclado, leitor de tela e verificador de contraste WCAG.

## 9. Segurança e privacidade

- não há cadastro, autenticação ou banco de dados remoto;
- nenhum resultado é transmitido pela aplicação;
- não há coleta de informações pessoais;
- links externos utilizam `noopener noreferrer`;
- o conteúdo importável pelo público foi removido da interface;
- questões novas devem ser adicionadas administrativamente ao JSON.

## 10. Publicação

A aplicação precisa ser servida por HTTP porque navegadores normalmente bloqueiam a leitura de JSON quando o arquivo HTML é aberto diretamente.

Para desenvolvimento local:

```text
python -m http.server 8000
```

Depois, acessar `http://localhost:8000`.

No GitHub Pages, o conteúdo da pasta deve ser colocado na raiz da ramificação publicada. Como o projeto usa somente caminhos relativos, não são necessárias alterações específicas para o domínio.

## 11. Manutenção

### 11.1 Alterações estéticas

Devem ser feitas principalmente em `style.css`. É possível alterar cores, tipografia, espaçamentos, dimensões, responsividade e componentes sem modificar o banco de questões.

### 11.2 Atualização das questões

Novas questões devem ser adicionadas em `questoes.json`, respeitando o modelo de dados. Cada questão deve possuir identificador único e uma das dez categorias permitidas.

### 11.3 Alterações funcionais

Fluxos de tela e comportamento ficam em `app.js`. Regras de filtro ficam em `quiz.js`, e persistência local em `stats.js`.

## 12. Limitações atuais

- estatísticas não são sincronizadas entre dispositivos;
- a limpeza do navegador apaga o histórico local;
- não existe painel administrativo;
- atualização do banco exige edição do JSON;
- não há testes automatizados de interface;
- a classificação por categoria foi revisada para a versão atual e pode receber refinamento pedagógico futuro;
- referências e enunciados dependem da qualidade do material de origem.

## 13. Evoluções recomendadas

1. revisar pedagogicamente a classificação das 185 questões;
2. adicionar testes automatizados para filtros, respostas e estatísticas;
3. criar validação administrativa do esquema JSON;
4. revisar acessibilidade segundo WCAG 2.2;
5. adicionar manifesto de aplicação e ícones para instalação como PWA;
6. implementar exportação opcional das estatísticas;
7. preparar uma camada administrativa separada, caso a manutenção do banco se torne frequente;
8. eliminar código legado não utilizado antes de uma versão 3.0.

## 14. Critérios de aceitação da versão atual

- o site carrega como aplicação estática por HTTP;
- as 185 questões são carregadas sem caracteres corrompidos;
- os filtros retornam resultados coerentes;
- somente as dez categorias definidas são apresentadas;
- uma resposta selecionada fica bloqueada;
- a correta recebe `✓` verde e a incorreta selecionada recebe `×` vermelho;
- favoritos, revisão, tema visual e estatísticas persistem após recarregar a página;
- imagens e referências são exibidas sem recorte;
- a logo não apresenta fundo branco nem a linha institucional inferior;
- a interface funciona em telas móveis e de computador;
- o rodapé apresenta créditos, finalidade educacional, contato e link oficial do INEP.

## 15. Créditos e origem

Aplicativo desenvolvido com a assistência do ChatGPT e do Claude. Desenvolvido a partir das questões disponibilizadas na [página de provas e gabaritos do ENADE — INEP](https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enade/provas-e-gabaritos), exclusivamente para fins educacionais e sem finalidade comercial.

O código-fonte é protegido por Copyright © 2026 JP Silveira — Todos os direitos reservados. A documentação e o conteúdo autoral original são licenciados sob CC BY-NC-SA 4.0. Questões, gabaritos, textos, imagens e logo de terceiros permanecem sob os direitos e créditos de suas fontes originais e não são abrangidos por essas licenças.

**JP Silveira (2026)**  
**Contato:** joao.paulo@ueg.br
