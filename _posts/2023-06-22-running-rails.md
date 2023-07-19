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
| ruby   | `3.0.2`                   |
| rails  | `7.0.5.1`                 |
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

```js
//= link_tree ../images
//= link_tree ../builds
//= link_tree ../fonts
//= link_tree ../../javascript .js
//= link_tree ../../javascript .js
```



> Important! Tots els fitxers que 
{: .prompt-info }

Executem el fitxer `./bin/dev`

## Web server

Per securitzar la connexió utilitzarem el servidor web `Apache` i el certificat gratuït de `Let's Encrypt`. Arribats aquest punt necessitem un servidor (pot ser local o remot, jo he utilitzat AWS) i un nom de domini que redirigeixi al nostre servidor (en el meu cas, `adriatp.com`).

Primer instalem l'Apache:

```bash
sudo apt update
sudo apt install apache2
sudo ufw app list
sudo ufw allow 'Apache'
sudo ufw status
sudo systemctl status apache2
```

I configurem el lloc web:

```bash
sudo mkdir /var/www/adriatp.com
sudo chown -R $USER:$USER /var/www/adriatp.com
sudo chmod -R 755 /var/www/adriatp.com
sudo nano /var/www/adriatp.com/index.html
```

A index hi posem alguna cosa random (dp ho canviarem don't worry):

```bash
<html>
    <head>
        <title>Welcome to adriatp.com!</title>
    </head>
    <body>
        <h1>Success!  The your_domain virtual host is working!</h1>
    </body>
</html>
```

I configurem l'Apache:

```bash
sudo nano /etc/apache2/sites-available/adriatp.com.conf
```

Amb les últimes línies fem que sempre redirigeixi al lloc configurat amb `https`.

```bash
<VirtualHost *:80>
    ServerName adriatp.com
    ServerAlias www.adriatp.com
    DocumentRoot /var/www/adriatp.com
    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined
    RewriteEngine on
    RewriteCond %{SERVER_NAME} =adriatp.com [OR]
    RewriteCond %{SERVER_NAME} =www.adriatp.com
    RewriteRule ^ https://www.%{SERVER_NAME}%{REQUEST_URI} [END,NE,R=permanent]
</VirtualHost>
```

Habilitem el fitxer generat i deshabilitem el fitxer per defecte:

```bash
sudo a2ensite adriatp.com.conf
sudo a2dissite 000-default.conf
```

Comprovem que la sintaxis és correcte i reiniciem l'Apache per aplicar els canvis:

```bash
sudo apache2ctl configtest
sudo systemctl restart apache2
```

## SSL amb Let's Encrypt

Primer instal·lem certbot:

```bash
sudo apt install certbot python3-certbot-apache
```

```bash
sudo ufw status
sudo ufw allow 'Apache Full'
sudo ufw delete allow 'Apache'
sudo ufw status
```

```bash
sudo certbot --apache
```

```bash
sudo nano adriatp.com-le-ssl.conf
```

```bash
  <IfModule mod_ssl.c>
  <VirtualHost *:443>
      ServerName streex.tv
      ServerAlias www.streex.tv
      DocumentRoot /var/www/streex.tv
      ErrorLog ${APACHE_LOG_DIR}/error.log
      CustomLog ${APACHE_LOG_DIR}/access.log combined

      # Redirect non-www to www
      RewriteEngine on
      RewriteCond %{HTTP_HOST} !^www\. [NC]
      RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [R=301,L]

      SSLCertificateFile /etc/letsencrypt/live/streex.tv/fullchain.pem
      SSLCertificateKeyFile /etc/letsencrypt/live/streex.tv/privkey.pem
      Include /etc/letsencrypt/options-ssl-apache.conf
  </VirtualHost>
  </IfModule>
```

## Deploy

Cal instalar les llibreries de mysql:

```bash
sudo apt-get update
sudo apt-get install libmysqlclient-dev
```

< pendent entrada a part pq ocupa varis fitxers i multiples configs >