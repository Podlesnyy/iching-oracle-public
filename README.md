# I Ching Dialogue legacy redirects

Этот публичный репозиторий сохраняет совместимость старых GitHub Pages URL после переноса
потребительского сайта в Cloudflare Pages.

- Корень, Privacy Policy и любой неизвестный путь перенаправляются на тот же путь на
  `https://ichingdialogue.app`.
- Query string и fragment сохраняются через `public/redirect.js`.
- Meta refresh остается запасным переходом для браузеров без JavaScript.
- Публиковать этот пакет можно только после успешного readback нового сайта и Privacy Policy.

Канонический исходный код сайта и приложения остается в приватном репозитории
`Podlesnyy/iching-oracle`.
