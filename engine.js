/* =========================
   ENGINE.JS – CORE SYSTEM
   Zoom + Navigation + State
========================= */

class GameEngine {
  constructor(config = {}) {
    this.config = {
      viewportId: config.viewportId || null,
      worldId: config.worldId || null,

      enableZoom: config.enableZoom ?? false,
      enablePan: config.enablePan ?? false,

      minScale: config.minScale ?? 0.5,
      maxScale: config.maxScale ?? 5,

      startScale: config.startScale ?? 1,

      storagePrefix: config.storagePrefix ?? "game_",
    };

    // DOM
    this.viewport = document.getElementById(this.config.viewportId);
    this.world = document.getElementById(this.config.worldId);

    // State
    this.scale = this.config.startScale;
    this.x = 0;
    this.y = 0;
    this._moved = false;
    this.state = this.loadState();

    // intern
    this._dragging = false;
    this._startX = 0;
    this._startY = 0;
    this._touchDragging = false;
    this._lastDist = null;
    this._touchStartX = 0;
    this._touchStartY = 0;
    this.init();
  }
  getTouchDist(touches) {
      const dx = touches[0].clientX - touches[1].clientX;
      const dy = touches[0].clientY - touches[1].clientY;
      return Math.sqrt(dx * dx + dy * dy);
    }
  /* =========================
     INIT
  ========================= */
  init() {
    this.bindInteractions();
    this.applyInitialTransform();
  }

  /* =========================
     STATE SYSTEM
  ========================= */
  saveState() {
    localStorage.setItem(
      this.config.storagePrefix + "state",
      JSON.stringify(this.state)
    );
  }

  loadState() {
    const raw = localStorage.getItem(this.config.storagePrefix + "state");
    return raw ? JSON.parse(raw) : {};
  }

  setState(key, value) {
    this.state[key] = value;
    this.saveState();
  }

  getState(key) {
    return this.state[key];
  }

  unlock(id) {
    this.setState(`chapter${id}`, "unlocked");
  }

  isUnlocked(id) {
    return this.getState(`chapter${id}`) === "unlocked";
  }

  /* =========================
     NAVIGATION
  ========================= */
  goTo(url, delay = 0) {
    setTimeout(() => {
      window.location.href = url;
    }, delay);
  }

  nextChapter(currentId, fallbackUrl) {
    const next = this.getState("nextChapter");
    if (next) {
      this.goTo(next);
    } else {
      this.goTo(fallbackUrl || `riddle${currentId + 1}.html`);
    }
  }

  setNextChapter(url) {
    this.setState("nextChapter", url);
  }

  /* =========================
     ZOOM + PAN SYSTEM
  ========================= */
  bindInteractions() {
    if (!this.viewport || !this.world) return;

    // MOUSE DRAG
    this.viewport.addEventListener("mousedown", (e) => {
      if (!this.config.enablePan) return;

      this._dragging = true;
      this._moved = false;
      this._startX = e.clientX - this.x;
      this._startY = e.clientY - this.y;
    });

    window.addEventListener("mousemove", (e) => {
      if (!this._dragging || !this.config.enablePan) return;
      this._moved = true;
      this.x = e.clientX - this._startX;
      this.y = e.clientY - this._startY;

      this.render();
    });

    window.addEventListener("mouseup", () => {
      this._dragging = false;
    });

    // ZOOM (MOUSE WHEEL)
    this.viewport.addEventListener(
      "wheel",
      (e) => {
        if (!this.config.enableZoom) return;
        e.preventDefault();
        const rect = this.viewport.getBoundingClientRect();
        const mx = e.clientX - rect.left;
        const my = e.clientY - rect.top;
        const worldX = (mx - this.x) / this.scale;
        const worldY = (my - this.y) / this.scale;
        const zoom = e.deltaY < 0 ? 1.1 : 0.9;
        this.scale *= zoom;
        this.scale = Math.max(
          this.config.minScale,
          Math.min(this.scale, this.config.maxScale)
        );
        this.x = mx - worldX * this.scale;
        this.y = my - worldY * this.scale;
        this.render();
      },
      { passive: false }
    );

this.viewport.addEventListener("touchstart", (e) => {
     if (!this.config.enablePan && !this.config.enableZoom) return;
     if (e.touches.length === 1) {
      this._touchDragging = true;
      this._touchStartX = e.touches[0].clientX - this.x;
      this._touchStartY = e.touches[0].clientY - this.y;
     }
    if (e.touches.length === 2) {
    this._lastDist = this.getTouchDist(e.touches);
    }
    }, { passive: false });

this.viewport.addEventListener("touchmove", (e) => {
  if (!this.config.enablePan && !this.config.enableZoom) return;

  e.preventDefault();

  // PAN
  if (e.touches.length === 1 && this._touchDragging) {
    this.x = e.touches[0].clientX - this._touchStartX;
    this.y = e.touches[0].clientY - this._touchStartY;
    this.render();
  }

  // ZOOM
  if (e.touches.length === 2) {
    const dist = this.getTouchDist(e.touches);

    if (this._lastDist && isFinite(dist)) {
      const rect = this.viewport.getBoundingClientRect();

      const cx =
        (e.touches[0].clientX + e.touches[1].clientX) / 2 - rect.left;

      const cy =
        (e.touches[0].clientY + e.touches[1].clientY) / 2 - rect.top;

      const worldX = (cx - this.x) / this.scale;
      const worldY = (cy - this.y) / this.scale;

      const zoom = dist / this._lastDist;

      if (isFinite(zoom)) {
        this.scale *= zoom;
        this.scale = Math.max(
          this.config.minScale,
          Math.min(this.scale, this.config.maxScale)
        );

        this.x = cx - worldX * this.scale;
        this.y = cy - worldY * this.scale;

        this.render();
      }
    }

    this._lastDist = dist;
  }
}, { passive: false });

this.viewport.addEventListener("touchend", () => {
  this._touchDragging = false;
  this._lastDist = null;
});
  //nâchste geschweifte klammer für bindInteractions
  }
render() {

  if (!this.world) return;

  this.clampPosition();

  this.world.style.transform =
    `translate(${this.x}px, ${this.y}px) scale(${this.scale})`;
}
  clampPosition() {

  const vw = this.viewport.clientWidth;
  const vh = this.viewport.clientHeight;

  const worldWidth =
    this.world.offsetWidth * this.scale;

  const worldHeight =
    this.world.offsetHeight * this.scale;

  const minX = vw - worldWidth;
  const minY = vh - worldHeight;

  // X clamp
  if (worldWidth <= vw) {

    this.x = (vw - worldWidth) / 2;

  } else {

    this.x = Math.min(
      0,
      Math.max(minX, this.x)
    );
  }

  // Y clamp
  if (worldHeight <= vh) {

    this.y = (vh - worldHeight) / 2;

  } else {

    this.y = Math.min(
      0,
      Math.max(minY, this.y)
    );
  }
}

  applyInitialTransform() {
    this.render();
  }

  resetView(options = {}) {
    if (options.animated) {
      this.world.style.transition =
        `transform ${options.duration || 1000}ms ease`;
    }
    this.scale = this.config.startScale;
const vw = this.viewport.clientWidth;
const vh = this.viewport.clientHeight;

const worldWidth = this.world.offsetWidth * this.scale;
const worldHeight = this.world.offsetHeight * this.scale;

this.x = (vw - worldWidth) / 2;
this.y = (vh - worldHeight) / 2;
    this.render();
    if (options.animated) {
      setTimeout(() => {
        this.world.style.transition = "";
      }, options.duration || 1000);
    }
  }
  setMode(mode) {
    switch(mode) {
      case "intro":
        this.config.enableZoom = false;
        this.config.enablePan = false;
        break;
      case "explore":
        this.config.enableZoom = true;
        this.config.enablePan = true;
        break;
      case "locked":
        this.config.enableZoom = false;
        this.config.enablePan = false;
        break;
    }
  }
}

/* =========================
   GLOBAL EXPORT
========================= */
window.GameEngine = GameEngine;