# Projet Morpion

## Introduction

Le but de ce projet est de prendre en main les outils du travail en équipe.

Le morpion est un jeu de réflexion se pratiquant à deux joueurs au tour par tour et dont le but est de créer le premier un alignement sur une grille. Le jeu se joue généralement avec papier et crayon.

En premier lieu, le jeu se déroulera sur un seul PC.

## Déroulement du jeu

Chacun son tour, les joueurs cocheront une case. Après chaque case cochée, un test sera effectué pour vérifier sur une ligne est faite. Si oui, le dernier joueur a avoir joué a gagné, sinon le jeu continue. Si plus aucune case n'est libre, le jeu se termine sur une égalité.

## Evolutions possibles

### Puissance 4

Le principe est exactement le même si ce n'est que la grille est plus grande. Si le code est bien fait, en changeant quelques valeurs, le morpion verait être capable de devenir un puissance 4.

### Jouer à distance

A l'aide de socket.io et d'un back, il serait possible de mettre en place la possibilité de jouer à distance, à partir de 2 pcs. 
