---
layout: post
title: El cervell de les màquines
date: 2023-06-05 01:55 +0200
categories: [Computer, Finite-state machine]
math: true
tags: [moore, mealy, flip-flop, jk, latche, digitalworks, vending, machine] 
---

## Presentació

Vull començar el blog amb un problema del que en guardo un molt bon record. Es correspon a l'últim exercici de l'assignatura `Estructura i Tecnologia de Computadors`, que vaig cursar durant el primer semestre com a estudiant d'enginyeria informàtica a l'Universitat de Girona.

- Pendent descriure el tipus de problema, automàt que es capaç de resoldre'l i llenguatge al que s'associa la seva implementació.

- Explicar perquè és important, ja que permet detallar les parts més fonamentals del raonament autòmata i permet entendre com funciona la implementació d'algoritmes en una màquina electrònica.

- Evitar detallar excessivament les parts: flux d'informació dirigida a la comprensió d'algoritme -> màquina estats -> circuit seqüencial

## Introducció

## Abstracte

## Bloc seqüèncial

### Esquema de processos

### Entrades i sortides

### Diagrama d'estats

### Taules

## Bloc aritmètic

### RAM 16x8

### 8 Bit Register

### 8 Bit Binary Adder-Substractor

### Comparador de 8 bits

## Motors

### Registres de desplaçament

### Decodificador Bin to Dec 4x16

## Altres elements del circuit

### Macro 4+4

### Codificador d'entrada

### Codificador Dec-Bin amb prioritat 16x4

## Consideracions

- Podria donar-se el cas de que l’usuari seleccionés un producte mentre la màquina està fent el procés de comparació i seria un error fatal que es combinessin les adreces. Per tal de que el bus d’adreces provinent del registre sigui el correcte ens hem d’assegurar que només una adreça serà llegida a la vegada. Connectant la NOR a l’enable del codificador d’entrades ens assegurem que el bus d’adreces provinent del sistema seqüencial prevaldrà davant el bus del codiicador, garantitzant llegir-ne una sola a la vegada.

- Es podria donar el cas de que l’usuari introduís un import que desbordés el rang del registre del bloc aritmètic ($$ [ 0, 2^8-1] \to [ 0$$ €$$, 25'5$$ €$$] $$) provocant overflow, lu que comportaria una pèrdua de diners a l’usuari. Per evitar aquesta situació s'ha ideat la següent solució a través d’una palanca gobernada per un motor regit per la senyal `Limit de Diners`, la qual correspon al bit de més pes del registre aritmètic. D’aquesta manera assegurem no processar les monedes que puguin causar overflow en el registre d’import acumulat. Si l'usuari ha aportat un valor igual o superior a `10000000` $$ \to 2^7 \to 12'8 $$ €, s'activa la palanca i no es processen més monedes.
