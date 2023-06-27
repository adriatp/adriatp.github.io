---
layout: post
title: Running Rails
date: 2023-06-22 00:22 +0200
---

## Summary

En aquest post es recopilaran les comandes per crear una aplicació base en `Ruby on Rails`, la qual tindrà servirà com a plantilla per les diferents aplicacions que es vulguin crear en un futur. Actualment (27 de juny de 2023) estic creant les webs amb esbuild com a empacador de JavaScript, Bootstrap com a framework de CSS i MySQL com a sistema de gestió de bases de dades.

## Configuració d'entorn

|--------|---------------------------|
| ubuntu | `20.04.6 LTS`             |
| mysql  | `8.0.33-0ubuntu0.20.04.2` |
| rbenv  | `1.2.0-33-ga6cf6ae`       |
| ruby   | `2.7.6p219`               |
| rails  | `7.0.5`                   |
| nvm    | `0.39.3`                  |
| node   | `v18.13.0`                |
| bundle | `2.3.23`                  |
| yarn   | `1.22.19`                 |

## Objectius

- [x] Crear aplicació
- [x] Iniciar repositori
- [x] Gestor de credencials
- [x] Connectar amb la base de dades
- [ ] Development
- [ ] Deploy
- [ ] Hotwire: Turbo & Stimulus
- [ ] Autenticació usuaris amb `Devise`
- [ ] Desplegament a servidor amb `Capistrano`
- [ ] Execució tasques en segon pla amb `DelayJob`
- [ ] Avaluar codi amb `Rubocop`
- [ ] Sistema de testing amb `?`

## Crear aplicació

```bash
rails new _APPNAME_ -j esbuild --css bootstrap -d mysql && cd _APPNAME_
```

## Iniciar repositori git

Creem el repositori des de la web del magatzem i a continuació iniciem el repositori i afegim el repositori remot. També establim `main` com la branca principal ([Master o Main? Aquesta és la qüestió](https://www.google.com)), creem el primer commit i fem el primer push al repositori.

```bash
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin git@github.com:adriatp/adriatp.github.io.git
git push -u origin main
```

## Gestor de credencials

Afegim `figaro` al Gemfile, creem el fitxer `application.yml` i ignorem incloure'l a git.

```bash
bundle add figaro
bundle exec figaro install
```

## Connectar amb la base de dades

Per la instal·lació d'una base de dades MySQL pot ser útil (sobretot en WSL2) seguir el post de [Configuració MySQL a WSL2](https://adriatp.github.io/posts/mysql-wsl/).

Un cop instal·lat i configurat MySQL correctament en l'aplicació de Rails creem les bases de dades dels diferents entorns.

```bash
rails db:create
```

## Development

Amb l'aplicació correctament configurada podrem afegir/modificar fulles d'estil, codi javascript, fonts, imatges i elements de la base de dades i que es reflecteixi en les vistes sense haver de reiniciar el servidor.

- TODO

Executem el fitxer `./bin/dev`

## Deploy
