/*
 * Liste des tuiles. Modifiez librement : ordre, noms, couleurs.
 * "id" = identifiant de l'application webOS.
 * Pour connaître les vrais identifiants installés sur votre TV :
 *   ares-install --device tv --list
 * Si la TV autorise la détection automatique, les applications
 * installées non listées ici sont ajoutées en fin de rangée.
 */
window.ACCUEIL_CONFIG = {
  rows: [
    {
      title: "Applications",
      items: [
        { id: "netflix",                    name: "Netflix",      color: "#e50914", fg: "#ffffff" },
        { id: "com.apple.appletv",          name: "Apple TV",     color: "#1c1c1e", fg: "#ffffff" },
        { id: "com.disney.disneyplus-prod", name: "Disney+",      color: "#0e2a5c", fg: "#ffffff" },
        { id: "amazon",                     name: "Prime Video",  color: "#1a98ff", fg: "#ffffff" },
        { id: "youtube.leanback.v4",        name: "YouTube",      color: "#ff0033", fg: "#ffffff" },
        { id: "ui30",                       name: "Rakuten TV",   color: "#bf0000", fg: "#ffffff" },
        { id: "com.canalplus.app",          name: "Canal+",       color: "#111111", fg: "#ffffff" },
        { id: "com.sky.skyshow",            name: "Sky",          color: "#f2f2f7", fg: "#0b4bd8" },
        { id: "de.prosiebensat1digital.joyn", name: "Joyn",       color: "#1f2a37", fg: "#ffffff" }
      ]
    },
    {
      title: "Sources et outils",
      items: [
        { id: "com.webos.app.livetv",     name: "TV en direct", color: "#2c2c2e", fg: "#ffffff" },
        { id: "com.webos.app.hdmi1",      name: "HDMI 1",       color: "#2c2c2e", fg: "#ffffff" },
        { id: "com.webos.app.hdmi2",      name: "HDMI 2",       color: "#2c2c2e", fg: "#ffffff" },
        { id: "com.webos.app.hdmi3",      name: "HDMI 3",       color: "#2c2c2e", fg: "#ffffff" },
        { id: "com.webos.app.photovideo", name: "Photos",       color: "#2c2c2e", fg: "#ffffff" },
        { id: "com.webos.app.music",      name: "Musique",      color: "#2c2c2e", fg: "#ffffff" },
        { id: "com.webos.app.browser",    name: "Navigateur",   color: "#2c2c2e", fg: "#ffffff" },
        { id: "com.palm.app.settings",    name: "Réglages",     color: "#2c2c2e", fg: "#ffffff" }
      ]
    }
  ],
  // Applications système à ne jamais ajouter automatiquement (publicité, magasin LG, etc.)
  hide: [
    "ch.biofacode.accueil",
    "com.webos.app.lgchannels",
    "com.webos.app.discovery",
    "com.webos.app.home",
    "com.webos.app.homeconnect",
    "com.webos.app.membership",
    "com.webos.app.voice",
    "com.webos.app.notificationcenter"
  ]
};
