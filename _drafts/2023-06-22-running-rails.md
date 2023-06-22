---
layout: post
title: Running Rails
date: 2023-06-22 00:22 +0200
---

## Summary

En aquest post es recopilaran les comandes per crear una aplicació base en `Ruby on Rails`, la qual tindrà servirà com a plantilla per les diferents aplicacions que es vulguin crear en un futur. 

## Objectius

- [x] Crear aplicació
- [x] Iniciar repositori git
- [x] `Figaro` pel pas de credencials
- [x] Connexió amb base de dades MySQL
- [x] Bootstrap, js i css
- [ ] Hotwire: Turbo & Stimulus
- [ ] Autenticació usuaris amb `Devise`
- [ ] Desplegament a servidor amb `Capistrano`
- [ ] Execució tasques en segon pla amb `DelayJob`
- [ ] Avaluar codi amb `Rubocop`
- [ ] Sistema de testing amb `?`

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

## Crear aplicació

`rails new _APPNAME_ -j esbuild --css bootstrap -d mysql && cd _APPNAME_`

## Iniciar repositori git

`git init`

## `Figaro` pel pas de credencials

`bundle add figaro`

## Connexió amb base de dades MySQL

- Creem fitxer application.yml
- Vinculem variables d'entorn a database.yml

`rails db:create`


`./bin/dev`

## Personalitzar vistes js and scss
