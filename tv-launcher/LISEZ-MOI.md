# TV LG sans pub + accueil style Apple TV

Trois niveaux, du plus simple au plus poussé. Faites le 1, puis le 2 si vous voulez l'interface.

---

## 1. Enlever la pub depuis les réglages (5 min, sans rien installer)

Les noms exacts varient selon la version de webOS ; cherchez l'équivalent.

**a) Bannière et recommandations de l'accueil**
`Réglages (⚙) → Général → Système → Paramètres supplémentaires → Paramètres de l'écran d'accueil`
- **Promotion de l'accueil** → Désactivé (c'est la grande pub Frey)
- **Recommandation de contenu** → Désactivé (rangée « Tendances actuelles »)
- **Démarrage automatique de l'accueil** → Désactivé (la TV ne s'ouvre plus sur l'accueil LG)

**b) Accords d'utilisation (coupe la pub ciblée et le suivi)**
`Réglages → Support → Confidentialité et conditions → Accords d'utilisation`
Décochez : *Informations de visionnage*, *Publicité basée sur les intérêts*,
*Publicités ciblées*, *Reconnaissance vocale* (si vous ne l'utilisez pas).
Gardez seulement le *Contrat d'utilisation* (sinon les applis ne marchent plus).

**c) Live Plus / suivi de ce qui passe à l'écran**
`Réglages → Général → Système → Paramètres supplémentaires → Live Plus` → Désactivé.

**d) Publicité LG Channels**
Sur la tuile **LG Channels** : appui long sur OK → **Supprimer** (ou déplacez-la en fin de liste).

Résultat : la grande bannière et la plupart des tuiles « Sponsored » disparaissent.

---

## 2. L'accueil style Apple TV (mode développeur, sans root)

L'application `ch.biofacode.accueil` est un écran d'accueil sombre façon Apple TV :
grand titre de l'appli sélectionnée, rangée **Applications**, rangée **Sources et outils**
(TV, HDMI 1-3, Photos, Musique, Navigateur, Réglages), horloge, zéro pub.

### Installer
1. Sur la TV : **LG Content Store** → installez **Developer Mode**.
   Ouvrez-le, connectez-vous avec un compte gratuit sur
   https://webostv.developer.lge.com (même compte), activez **Dev Mode Status**
   (la TV redémarre) puis activez **Key Server**. Notez l'adresse IP affichée.
2. Sur votre ordinateur (même Wi-Fi), le plus simple : installez
   **webOS Dev Manager** (https://github.com/webosbrew/dev-manager-desktop),
   ajoutez la TV (IP + passphrase affichée dans l'appli Developer Mode),
   puis glissez le fichier `ch.biofacode.accueil_1.0.0_all.ipk`.

   Ou en ligne de commande :
   ```
   npm i -g @webos-tools/cli
   ares-setup-device            # ajouter "tv" avec l'IP de la TV
   ares-novacom --device tv --getkey   # saisir la passphrase
   ares-install --device tv ch.biofacode.accueil_1.0.0_all.ipk
   ```
3. L'appli **Accueil** apparaît dans la liste des applis.

### L'ouvrir d'un seul bouton
- Déplacez **Accueil** en **première position** de la barre d'applis.
- **Accès rapide** : appui long sur la touche **1** de la télécommande → choisissez **Accueil**.
  Ensuite, un appui long sur 1 ouvre l'accueil Apple TV.
- Avec *Démarrage automatique de l'accueil* désactivé (point 1a), la TV se rallume
  sur la dernière appli/source utilisée.

> Limite honnête : sans root, le bouton **Maison** de la télécommande ouvre toujours
> l'accueil LG ; il n'est pas possible de le remplacer.

### Important : le mode développeur expire
La session dure 50 h ; l'appli est désinstallée si elle expire. Rouvrez l'appli
**Developer Mode** et cliquez **Extend** de temps en temps, ou laissez
*webOS Dev Manager* le faire automatiquement (option de renouvellement).

### Personnaliser
Modifiez `app/apps.js` (ordre, noms, couleurs, identifiants), puis recréez le paquet :
```
ares-package app
```
Si une tuile affiche « Impossible d'ouvrir … », l'identifiant de l'appli n'est pas le bon
pour votre TV. Liste des vrais identifiants :
```
ares-install --device tv --list
```
Si la TV l'autorise, l'accueil détecte aussi les applis installées et les ajoute seul.

---

## 3. Bloquer la pub pour tout le réseau (facultatif)

Si votre box/routeur ou un Pi-hole / AdGuard Home / NextDNS accepte une liste de blocage,
ajoutez les domaines de `blocklist-pubs-lg.txt`. Cela bloque les bannières même si
LG les réactive après une mise à jour.

## 4. Aller plus loin : root (avancé, à vos risques)

Avec le **Homebrew Channel** (projet webosbrew, nécessite de rooter la TV avec une faille
compatible avec votre version de firmware), on peut : garder les applis sans expiration,
bloquer la pub directement sur la TV et lancer l'accueil au démarrage. Vérifiez d'abord
sur https://www.webosbrew.org si votre modèle et votre firmware sont compatibles.
Ne mettez pas à jour le firmware si vous comptez rooter.
