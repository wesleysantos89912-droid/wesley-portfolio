# Portfólio Wesley Costa Films

Site de uma página, no ar em **https://www.wesleycostafilms.com.br**.

## Arquivos

- `index.html`: o site inteiro (textos, cores, carrosséis, player de vídeo)
- `videos/`: Reels em MP4, comprimidos para a web
- `capas/`: capa de cada Reel
- `marcas/`: logos das marcas atendidas (PNG branco com fundo transparente)
- `favicon.svg`, `favicon-32.png`, `apple-touch-icon.png`: ícone do site
- `og-image.jpg`: imagem que aparece ao compartilhar o link (1200x630)
- `robots.txt` e `sitemap.xml`: arquivos para o Google

## Como atualizar

- **Reels:** coloque o MP4 em `videos/` e a capa em `capas/`, e adicione uma linha em `makeSlider("f1", ...)` no `index.html`.
- **Vídeos longos (YouTube):** adicione uma linha em `makeSlider("f2", ...)` com `yt: "CODIGO"` (o que vem depois de `watch?v=`).
- **Marcas:** coloque o PNG em `marcas/` e adicione um `<li>` na lista `.logos`.
- **Contatos:** WhatsApp, Instagram e e-mail ficam no bloco `var SITE` no início do script.

Ao enviar para o GitHub (branch `main`), a Vercel publica sozinha em cerca de 1 minuto.

## Hospedagem e domínio

- Hospedagem: Vercel (plano gratuito), conectada ao repositório do GitHub
- Domínio: `wesleycostafilms.com.br` no Registro.br, com vencimento em 19/10/2027
- DNS (Registro.br, modo avançado): `A @ 216.198.79.1` e `CNAME www → a2c681e3bce0aefa.vercel-dns-017.com.`
- Endereço sem www redireciona para `www.wesleycostafilms.com.br`

Para testar no computador: `python -m http.server 5500` nesta pasta e abra http://localhost:5500.
