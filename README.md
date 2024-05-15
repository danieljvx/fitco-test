# FitCo by @danieljvx

### `1 - .env: El archivo .env.example contiene las variables con valores a efectos de la prueba`
```bash
copy .env.example .env
```
### `2 - GPT_KEY .env: En la variable GPT_KEY agregar la key de ChatGPT para la integración`
```bash
nano .env
GPT_KEY ""
APP_PORT 3000
DB_HOST db
DB_PORT 3306
DB_USER root
DB_PASS 123qwe
DB_NAME fitco_chat
```