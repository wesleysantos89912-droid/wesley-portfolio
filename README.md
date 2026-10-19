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
- `googleae32f6aaeaa3e272.html`: verificação do Google Search Console. **Não apague**, senão o site perde a verificação.

## Como atualizar

- **Reels:** coloque o MP4 em `videos/` (máximo 25 MB por arquivo) e a capa em `capas/`, e adicione uma linha em `makeSlider("f1", ...)` no `index.html`.
- **Vídeos longos (YouTube):** adicione uma linha em `makeSlider("f2", ...)` com `yt: "CODIGO"` (o que vem depois de `watch?v=`).
- **Marcas:** coloque o PNG em `marcas/` e adicione um `<li>` na lista `.logos`.
- **Perguntas frequentes:** edite os blocos `<details>` da seção `#faq` e mantenha o JSON `FAQPage` no `<head>` com o mesmo texto.
- **Contatos:** WhatsApp, Instagram e e-mail ficam no bloco `var SITE` no início do script.

Ao enviar para o GitHub (branch `main`), a Cloudflare Pages publica sozinha em cerca de 1 minuto.

## Hospedagem e domínio

- Hospedagem: **Cloudflare Pages** (plano gratuito, uso comercial permitido), projeto `wesley-portfolio`, conectado ao GitHub
- `functions/videos/[[path]].js`: entrega os vídeos em partes (HTTP 206), exigido pelo Safari/iPhone. Não apague.
- `404.html`: página de "não encontrada"
- Domínio: `wesleycostafilms.com.br` no Registro.br, com vencimento em 19/10/2027
- DNS: na Cloudflare (servidores `nataly.ns.cloudflare.com` e `west.ns.cloudflare.com`, definidos no Registro.br)
- `www.wesleycostafilms.com.br` é o endereço principal; uma regra de redirecionamento da Cloudflare leva o endereço sem www para ele (301)
- Visitas: Cloudflare → Workers & Pages → wesley-portfolio → Metrics (Web Analytics gratuito, sem cookies)
- Google: Search Console com a propriedade `https://www.wesleycostafilms.com.br/`, verificada por arquivo HTML e por meta tag

Para testar no computador: `python -m http.server 5500` nesta pasta e abra http://localhost:5500 (a função dos vídeos só roda na Cloudflare).
