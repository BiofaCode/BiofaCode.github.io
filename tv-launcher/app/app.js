(function () {
  "use strict";

  var CFG = window.ACCUEIL_CONFIG;
  var rows = [];          // [{title, items:[{id,name,color,fg,icon}]}]
  var pos = { r: 0, c: 0 };
  var lastCol = [];       // colonne mémorisée par rangée
  var STORE_KEY = "accueil.pos";

  // ---------- Appels système webOS ----------
  function luna(uri, params, cb) {
    if (typeof window.PalmServiceBridge === "undefined") {
      cb && cb({ returnValue: false, errorText: "Hors TV (aperçu navigateur)" });
      return;
    }
    var bridge = new window.PalmServiceBridge();
    bridge.onservicecallback = function (msg) {
      var res;
      try { res = JSON.parse(msg); } catch (e) { res = { returnValue: false, errorText: msg }; }
      cb && cb(res);
    };
    bridge.call(uri, JSON.stringify(params || {}));
    luna._keep = (luna._keep || []).concat(bridge); // évite le ramasse-miettes
  }

  function launch(item) {
    luna("luna://com.webos.applicationManager/launch", { id: item.id }, function (res) {
      if (!res || res.returnValue === false) {
        toast("Impossible d'ouvrir " + item.name + (res && res.errorText ? " — " + res.errorText : ""));
      }
    });
  }

  // ---------- Construction ----------
  function cloneRows() {
    return CFG.rows.map(function (r) {
      return { title: r.title, items: r.items.slice() };
    });
  }

  // Tente de lire les applis installées. Si la TV refuse, on garde la config.
  function discover(done) {
    var finished = false;
    var t = setTimeout(function () { if (!finished) { finished = true; done(null); } }, 1500);
    luna("luna://com.webos.applicationManager/listApps", {}, function (res) {
      if (finished) return;
      finished = true; clearTimeout(t);
      done(res && res.returnValue !== false && res.apps ? res.apps : null);
    });
  }

  function mergeInstalled(apps) {
    if (!apps) return;
    var installed = {};
    apps.forEach(function (a) { installed[a.id] = a; });
    var known = {};
    rows.forEach(function (r) { r.items.forEach(function (i) { known[i.id] = true; }); });

    // Retire les applis de la 1re rangée qui ne sont pas installées
    rows[0].items = rows[0].items.filter(function (i) { return installed[i.id]; });

    // Ajoute les applis installées manquantes
    apps.forEach(function (a) {
      if (known[a.id] || CFG.hide.indexOf(a.id) !== -1) return;
      if (a.visible === false || a.systemApp) return;
      var icon = a.largeIcon || a.icon;
      if (icon && a.folderPath && icon.indexOf("/") !== 0 && icon.indexOf("http") !== 0) {
        icon = "file://" + a.folderPath + "/" + icon;
      }
      rows[0].items.push({
        id: a.id, name: a.title || a.id,
        color: a.bgColor || "#2c2c2e", fg: "#ffffff", icon: icon
      });
    });
  }

  function render() {
    var root = document.getElementById("rows");
    root.innerHTML = "";
    rows = rows.filter(function (r) { return r.items.length; });
    rows.forEach(function (row, ri) {
      var el = document.createElement("section");
      el.className = "row";
      el.innerHTML = '<h2 class="row-title"></h2><div class="row-track"></div>';
      el.querySelector(".row-title").textContent = row.title;
      var track = el.querySelector(".row-track");
      row.items.forEach(function (item, ci) {
        var t = document.createElement("div");
        t.className = "tile";
        t.style.background = item.color;
        t.style.color = item.fg;
        if (item.icon) {
          var img = document.createElement("img");
          img.src = item.icon; img.alt = "";
          img.onerror = function () { t.textContent = item.name; };
          t.appendChild(img);
        } else {
          t.textContent = item.name;
        }
        t.addEventListener("click", function () { setFocus(ri, ci); launch(item); });
        t.addEventListener("mouseenter", function () { setFocus(ri, ci); });
        track.appendChild(t);
      });
      root.appendChild(el);
      lastCol[ri] = 0;
    });
  }

  // ---------- Focus et navigation ----------
  function tileAt(r, c) {
    var row = document.querySelectorAll(".row")[r];
    return row ? row.querySelectorAll(".tile")[c] : null;
  }

  function setFocus(r, c) {
    if (!rows.length) return;
    r = Math.max(0, Math.min(rows.length - 1, r));
    c = Math.max(0, Math.min(rows[r].items.length - 1, c));
    var prev = tileAt(pos.r, pos.c);
    if (prev) prev.classList.remove("focus");
    pos = { r: r, c: c };
    lastCol[r] = c;
    var t = tileAt(r, c);
    if (t) t.classList.add("focus");
    scrollRow(r, c);
    updateShelf();
    try { localStorage.setItem(STORE_KEY, JSON.stringify(pos)); } catch (e) {}
  }

  function scrollRow(r, c) {
    var track = document.querySelectorAll(".row-track")[r];
    if (!track) return;
    var step = 300 + 40;
    var visible = Math.floor((1920 - 192) / step);
    var shift = Math.max(0, c - visible + 2) * step;
    track.style.transform = "translateX(" + -shift + "px)";
    // Remonte la page quand on descend de rangée
    var rowsEl = document.getElementById("rows");
    rowsEl.style.transform = "translateY(" + -Math.min(r, 1) * 150 + "px)";
    rowsEl.style.transition = "transform 0.35s cubic-bezier(.2,.8,.2,1)";
  }

  function updateShelf() {
    var item = rows[pos.r].items[pos.c];
    document.getElementById("shelf-title").textContent = item.name;
    var c = item.color && item.color.toLowerCase() !== "#2c2c2e" ? item.color : "#3a3a3c";
    document.documentElement.style.setProperty("--accent", c);
  }

  document.addEventListener("keydown", function (e) {
    switch (e.keyCode) {
      case 37: setFocus(pos.r, pos.c - 1); break;            // gauche
      case 39: setFocus(pos.r, pos.c + 1); break;            // droite
      case 38: setFocus(pos.r - 1, lastCol[pos.r - 1] || 0); break; // haut
      case 40: setFocus(pos.r + 1, lastCol[pos.r + 1] || 0); break; // bas
      case 13: {                                              // OK
        var t = tileAt(pos.r, pos.c);
        if (t) { t.classList.add("pressed"); setTimeout(function () { t.classList.remove("pressed"); }, 150); }
        launch(rows[pos.r].items[pos.c]);
        break;
      }
      case 461: case 8:                                       // Retour : on reste sur l'accueil
        setFocus(0, 0); break;
      default: return;
    }
    e.preventDefault();
  });

  // ---------- Divers ----------
  var toastTimer;
  function toast(msg) {
    var el = document.getElementById("toast");
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.classList.remove("show"); }, 3500);
  }

  function tick() {
    var d = new Date();
    var h = ("0" + d.getHours()).slice(-2), m = ("0" + d.getMinutes()).slice(-2);
    document.getElementById("clock").textContent = h + ":" + m;
  }

  // ---------- Démarrage ----------
  rows = cloneRows();
  tick(); setInterval(tick, 10000);
  discover(function (apps) {
    mergeInstalled(apps);
    render();
    var saved = null;
    try { saved = JSON.parse(localStorage.getItem(STORE_KEY)); } catch (e) {}
    if (saved && rows[saved.r] && rows[saved.r].items[saved.c]) setFocus(saved.r, saved.c);
    else setFocus(0, 0);
  });
})();
