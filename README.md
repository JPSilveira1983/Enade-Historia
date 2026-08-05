# ENADE História

Aplicação estática para estudo das questões do ENADE de História. Esta versão reorganiza o projeto original em HTML, CSS, JavaScript modular, JSON e imagens externas.

## Como executar

Por segurança, navegadores bloqueiam a leitura de arquivos JSON quando `index.html` é aberto diretamente. Execute a pasta por um servidor estático:

### Opção simples com Python

1. Extraia o ZIP.
2. Abra um terminal dentro da pasta extraída.
3. Execute `python -m http.server 8000`.
4. Acesse `http://localhost:8000`.

Também é possível publicar a pasta diretamente no GitHub Pages, Netlify, Vercel ou outro serviço de hospedagem estática.

## Recursos

- 185 questões preservadas da versão anterior (2024 e 2025), das quais duas anuladas no gabarito oficial ficam fora do sorteio;
- filtros por ano, categoria e palavra-chave;
- simulados com correção e resultado ao final;
- favoritos e lista “revisar depois”;
- progresso, histórico e desempenho por categoria;
- modo claro/escuro e layout responsivo;
- banco JSON atualizável administrativamente;
- dados pessoais armazenados apenas no navegador (`localStorage`).

## Atualizar o banco de questões

Para atualizar o banco administrativamente, edite `questoes.json`. O arquivo deve seguir esta estrutura:

```json
{
  "versao": 2,
  "questoes": [{
    "id": "identificador-unico",
    "year": 2026,
    "area": "História do Brasil — Brasil República",
    "categoria": "História do Brasil",
    "enunciado": "Texto da questão",
    "alternativas": ["A", "B", "C", "D"],
    "correta": 1,
    "explicacao": "Justificativa da resposta"
  }]
}
```

`correta` usa índice iniciado em zero: `0` é A, `1` é B etc. Imagens podem ser referenciadas em `imagem`, usando apenas o nome do arquivo, como `minha-imagem.jpg` (o arquivo deve estar na mesma pasta que o `index.html`).

Questões anuladas no gabarito oficial podem permanecer sem o campo `correta`; a aplicação as preserva no banco, mas não as inclui nas sessões.

As categorias aceitas são: `Formação docente`, `História Antiga`, `História Medieval`, `História Moderna`, `História Contemporânea`, `História do Brasil`, `História da América`, `História da África`, `História da Ásia` e `Teoria, metodologia e ensino de História`.

## Estrutura

Todos os arquivos ficam na mesma pasta (estrutura plana, sem subpastas), o que facilita o upload direto pelo navegador do GitHub:

- `index.html`: documento principal;
- `style.css`: identidade visual e responsividade;
- `app.js`: interface e navegação;
- `quiz.js`: normalização, filtros e sorteio;
- `stats.js`: favoritos, revisão e estatísticas locais;
- `questoes.json`: banco importável;
- demais arquivos `.jpg`/`.png`: imagens usadas pelas questões e logo.

## Privacidade e limpeza

Nenhum dado é enviado pela aplicação. O histórico pode ser apagado em **Estatísticas → Limpar histórico**. Favoritos e revisões permanecem até serem desmarcados ou até a limpeza dos dados do site no navegador.

## Licenças

- código-fonte: [Copyright © 2026 JP Silveira — Todos os direitos reservados](LICENSE);
- interface, documentação e conteúdo autoral original: [CC BY-NC-SA 4.0](LICENSE-CONTENT.md);
- questões, gabaritos, textos, imagens e logo de terceiros: permanecem sob os direitos e créditos de suas fontes originais.
