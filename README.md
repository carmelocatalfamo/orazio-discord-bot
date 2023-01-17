# Orazio

## Development setup

Clone repo
```bash
git clone git@github.com:carmelocatalfamo/orazio-discord-bot.git
```

Install dependencies
```bash
cd orazio-discord-bot && npm install
```

Copy env file
```bash
cp .example.env .env
```

Start development server
```bash
npm run dev
```

Generate URL to invite bot on your server. This command will print the invite URL.
```bash
npm run invite
```

---

## Commands

Start development

```bash
npm run dev
```

Start production

```bash
npm start
```

Build application (transform .ts files into .js)

```bash
npm run build
```

Start typescript watching mode

```bash
npm run tsc -w
```

Print to console the url to invite discord bot

```bash
npm run invite
```
