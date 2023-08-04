---
layout: post
title: WSL Workflow
date: 2023-08-04 02:14 +0200
---

# WSL Workflow

Aquí publicaré el meu flux de treball amb WSL per desar i compartir la millor configuració que he trobat fins ara. Està basat en la configuració compartida en [aquest blog](https://www.nexxel.dev/blog/wsl-workflow).

## Shell: zsh + OhMyZsh

`zsh` (Z shell) és un intèrpret de comandes POSIX més fàcil de personalitzar que el bash. Per gestionar les configuracions, utilitzarem Oh My Zsh.

### Instal·lació

```bash
sudo apt update
sudo apt install -y zsh
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

## Nerd font: Hack

Una `Nerd Font` és una tipografia (font) que inclou una àmplia varietat d'icones, símbols i glifs, sovint dirigida a desenvolupadors, programadors i altres usuaris tècnics. Aquestes fonts estan dissenyades per millorar l'experiència de codificació i terminal permetent als desenvolupadors mostrar diversos símbols i icones relacionats amb la programació directament al seu editor de codi o emulador de terminal.

### Instal·lació

Utilitzaré la font JetBrains Mono, que es pot descarregar aquí. La font s'ha d'instal·lar a la màquina amfitriona (en el meu cas, Windows) i configurar-se per ser utilitzada al Terminal d'Ubuntu.

Personalitzar les fonts/transparència del terminal de WSL és molt fàcil, només cal anar a Configuració (Ctrl + , també funciona) i triar les teves preferències.

## Prompt: Starship

[Starship](https://starship.rs/) és un indicador minimalista, altament personalitzable i molt ràpid. L'aparença per defecte és realment bona, però gairebé tots els petits detalls es poden personalitzar al teu gust.

### Instal·lació

```bash
sudo apt update
curl -sS https://starship.rs/install.sh | sh
```

### Configuració

Crea i obre el fitxer de configuració de [Starship](https://starship.rs/)

```bash
mkdir -p ~/.config && touch ~/.config/starship.toml
nano ~/.config/starship.toml
```

Afegeix les següents línies i desa (els caràcters no es mostren perquè `Chirpy` no està configurat per mostrar una Nerd Font).

```bash
[aws]
symbol = "  "

[conda]
symbol = " "

[dart]
symbol = " "
format = "via [$symbol]($style)"

[directory]
read_only = " "
truncation_length = 1

[docker_context]
symbol = " "

[elixir]
symbol = " "
format = 'via [$symbol]($style)'

[elm]
symbol = " "

[git_branch]
symbol = " "

[golang]
symbol = " "
format = 'via [$symbol]($style)'

[hg_branch]
symbol = " "

[java]
symbol = " "
format = 'via [$symbol]($style)'

[julia]
symbol = " "

[memory_usage]
symbol = " "

[nim]
symbol = " "

[nix_shell]
symbol = " "

[nodejs]
symbol = " "
format = 'via [$symbol]($style)'

[package]
symbol = " "

[perl]
symbol = " "

[php]
symbol = " "

[python]
symbol = " "
format = 'via [$symbol]($style)'

[ruby]
symbol = " "

[rust]
format = 'via [$symbol]($style)'

[scala]
symbol = " "

[shlvl]
symbol = " "

[swift]
symbol = "ﯣ "
format = 'via [$symbol]($style)'

[git_status]
disabled = true
```

## tmux

`tmux` s'instal·la per defecte a WSL. Només cal fer Alt + clic dret a + per afegir un altre terminal a la finestra de WSL. Aquest mètode dividirà la finestra verticalment si és en mode paisatge i horitzontalment si no ho és, però per a un control més gran, podem utilitzar directament el programa tmux.

[Aquest vídeo](https://www.youtube.com/watch?v=Yl7NFenTgIo) explica els usos més comuns que aquesta eina potent ens ofereix.

## exa

Substitueix la funcionalitat de la comanda `ls`. `exa` té una sortida més llegible amb colors i icones, cosa que et permetrà veure i conèixer immediatament els tipus de fitxers diferents. També és més ràpid que `ls`.

### Instal·lació

```bash
sudo apt update
sudo apt install -y unzip
EXA_VERSION=$(curl -s "https://api.github.com/repos/ogham/exa/releases/latest" | grep -Po '"tag_name": "v\K[0-9.]+')
curl -Lo exa.zip "https://github.com/ogham/exa/releases/latest/download/exa-linux-x86_64-v${EXA_VERSION}.zip"
sudo unzip -q exa.zip bin/exa -d /usr/local
exa --version
rm -rf exa.zip
```

### Configuració

Obre el fitxer de configuració de `zsh`

```bash
cd ~
nano .zshrc
```

Afegeix les següents línies i desa

```bash
alias ll="exa -l -g --icons --git"
alias llt="exa -1 --icons --tree --git-ignore"
```

Actualitza la configuració de `zsh`

```bash
source ./zshrc
```
