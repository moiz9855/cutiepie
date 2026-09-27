/**
 * FOR MANAHIL — ROMANTIC SCROLL-DRIVEN EXPERIENCE
 * Interactive Canvas Fireflies, Typewriter, Starfield Constellation,
 * Intersection Observers, and Web Audio API Ambient Dreamscape.
 */

(function () {
  'use strict';

  /* ==========================================================================
     1. FIREFLIES CANVAS BACKGROUND
     ========================================================================== */
  const firefliesCanvas = document.getElementById('fireflies-canvas');
  const ffCtx = firefliesCanvas.getContext('2d');
  let ffWidth = 0;
  let ffHeight = 0;
  let fireflies = [];
  const FIREFLY_COUNT = Math.min(55, Math.floor(window.innerWidth / 22));

  function resizeFireflies() {
    ffWidth = firefliesCanvas.width = window.innerWidth;
    ffHeight = firefliesCanvas.height = window.innerHeight;
  }

  class Firefly {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * ffWidth;
      this.y = initial ? Math.random() * ffHeight : ffHeight + 20;
      this.radius = 1.2 + Math.random() * 2.2;
      this.speedY = -(0.18 + Math.random() * 0.45);
      this.speedX = (Math.random() - 0.5) * 0.35;
      this.alpha = 0;
      this.targetAlpha = 0.25 + Math.random() * 0.65;
      this.fadeSpeed = 0.005 + Math.random() * 0.008;
      this.fadingIn = true;
      this.angle = Math.random() * Math.PI * 2;
      this.angleSpeed = 0.015 + Math.random() * 0.02;

      // Color variation: rose, champagne, soft gold
      const hues = [
        { r: 248, g: 168, b: 191 }, // rose
        { r: 246, g: 207, b: 138 }, // soft gold
        { r: 255, g: 218, b: 230 }  // champagne
      ];
      this.color = hues[Math.floor(Math.random() * hues.length)];
    }

    update() {
      this.angle += this.angleSpeed;
      this.x += this.speedX + Math.sin(this.angle) * 0.45;
      this.y += this.speedY;

      // Alpha breathing
      if (this.fadingIn) {
        this.alpha += this.fadeSpeed;
        if (this.alpha >= this.targetAlpha) {
          this.fadingIn = false;
        }
      } else {
        this.alpha -= this.fadeSpeed * 0.7;
        if (this.alpha <= 0.05) {
          this.fadingIn = true;
          this.targetAlpha = 0.2 + Math.random() * 0.6;
        }
      }

      if (this.y < -30 || this.x < -30 || this.x > ffWidth + 30) {
        this.reset();
      }
    }

    draw(ctx) {
      if (this.alpha <= 0) return;
      ctx.save();
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.alpha})`;
      ctx.shadowColor = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0.8)`;
      ctx.shadowBlur = this.radius * 7;
      ctx.fill();
      ctx.restore();
    }
  }

  function initFireflies() {
    resizeFireflies();
    fireflies = [];
    for (let i = 0; i < FIREFLY_COUNT; i++) {
      fireflies.push(new Firefly());
    }
  }

  function animateFireflies() {
    ffCtx.clearRect(0, 0, ffWidth, ffHeight);
    for (let i = 0; i < fireflies.length; i++) {
      fireflies[i].update();
      fireflies[i].draw(ffCtx);
    }
    requestAnimationFrame(animateFireflies);
  }

  window.addEventListener('resize', resizeFireflies);
  initFireflies();
  requestAnimationFrame(animateFireflies);


  /* ==========================================================================
     2. HERO TYPEWRITER
     ========================================================================== */
  const typewriterElement = document.getElementById('hero-typewriter');
  const sublineElement = document.getElementById('hero-subline');
  const textToType = "Kuch cheezein keh nahi paate...";
  let typeIndex = 0;

  function runTypewriter() {
    if (!typewriterElement) return;

    if (typeIndex < textToType.length) {
      typewriterElement.textContent += textToType.charAt(typeIndex);
      typeIndex++;
      // Natural cadence variation
      const delay = 75 + Math.random() * 50;
      setTimeout(runTypewriter, delay);
    } else {
      // Pause then reveal second line smoothly
      setTimeout(() => {
        if (sublineElement) {
          sublineElement.classList.add('is-revealed');
        }
      }, 700);
    }
  }

  // Start typewriter slightly after initial page load
  setTimeout(runTypewriter, 750);


  /* ==========================================================================
     3. CONSTELLATION CANVAS ("MANAHIL")
     ========================================================================== */
  const constCanvas = document.getElementById('constellation-canvas');
  const cCtx = constCanvas ? constCanvas.getContext('2d') : null;
  let cWidth = 0;
  let cHeight = 0;
  let isConstellationVisible = false;
  let constellationProgress = 0; // 0 to 1 draw-in animation
  let backgroundStars = [];
  let mouse = { x: -9999, y: -9999, active: false };

  // Normalized Star Coordinates for "MANAHIL"
  // (x: 0-1, y: 0-1) so it automatically adapts to any screen width/aspect ratio
  const letterSegments = [
    // --- LETTER M ---
    {
      points: [
        { x: 0.08, y: 0.72 },
        { x: 0.08, y: 0.28 },
        { x: 0.13, y: 0.52 },
        { x: 0.18, y: 0.28 },
        { x: 0.18, y: 0.72 }
      ],
      connections: [[0, 1], [1, 2], [2, 3], [3, 4]]
    },
    // --- LETTER A (First) ---
    {
      points: [
        { x: 0.23, y: 0.72 },
        { x: 0.27, y: 0.28 },
        { x: 0.31, y: 0.72 },
        { x: 0.245, y: 0.54 },
        { x: 0.295, y: 0.54 }
      ],
      connections: [[0, 1], [1, 2], [3, 4]]
    },
    // --- LETTER N ---
    {
      points: [
        { x: 0.36, y: 0.72 },
        { x: 0.36, y: 0.28 },
        { x: 0.44, y: 0.72 },
        { x: 0.44, y: 0.28 }
      ],
      connections: [[0, 1], [1, 2], [2, 3]]
    },
    // --- LETTER A (Second) ---
    {
      points: [
        { x: 0.49, y: 0.72 },
        { x: 0.53, y: 0.28 },
        { x: 0.57, y: 0.72 },
        { x: 0.505, y: 0.54 },
        { x: 0.555, y: 0.54 }
      ],
      connections: [[0, 1], [1, 2], [3, 4]]
    },
    // --- LETTER H ---
    {
      points: [
        { x: 0.62, y: 0.28 },
        { x: 0.62, y: 0.72 },
        { x: 0.62, y: 0.50 },
        { x: 0.70, y: 0.50 },
        { x: 0.70, y: 0.28 },
        { x: 0.70, y: 0.72 }
      ],
      connections: [[0, 1], [2, 3], [4, 5]]
    },
    // --- LETTER I ---
    {
      points: [
        { x: 0.75, y: 0.28 },
        { x: 0.79, y: 0.28 },
        { x: 0.77, y: 0.28 },
        { x: 0.77, y: 0.72 },
        { x: 0.75, y: 0.72 },
        { x: 0.79, y: 0.72 }
      ],
      connections: [[0, 1], [2, 3], [4, 5]]
    },
    // --- LETTER L ---
    {
      points: [
        { x: 0.84, y: 0.28 },
        { x: 0.84, y: 0.72 },
        { x: 0.92, y: 0.72 }
      ],
      connections: [[0, 1], [1, 2]]
    }
  ];

  function resizeConstellation() {
    if (!constCanvas) return;
    const rect = constCanvas.getBoundingClientRect();
    cWidth = constCanvas.width = rect.width;
    cHeight = constCanvas.height = rect.height;

    // Create random background twinkling field
    backgroundStars = [];
    const bgStarCount = Math.floor((cWidth * cHeight) / 5000);
    for (let i = 0; i < bgStarCount; i++) {
      backgroundStars.push({
        x: Math.random() * cWidth,
        y: Math.random() * cHeight,
        radius: 0.6 + Math.random() * 1.4,
        alpha: 0.2 + Math.random() * 0.7,
        twinkleSpeed: 0.01 + Math.random() * 0.03,
        twinkleOffset: Math.random() * Math.PI * 2
      });
    }
  }

  function renderConstellation(timestamp) {
    if (!cCtx) return;

    cCtx.clearRect(0, 0, cWidth, cHeight);

    // 1. Draw subtle background celestial stars
    for (let i = 0; i < backgroundStars.length; i++) {
      const s = backgroundStars[i];
      const brightness = s.alpha * (0.6 + 0.4 * Math.sin(timestamp * 0.002 * s.twinkleSpeed * 100 + s.twinkleOffset));
      cCtx.beginPath();
      cCtx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
      cCtx.fillStyle = `rgba(255, 240, 246, ${brightness})`;
      cCtx.fill();
    }

    // 2. Animate drawing progress if visible
    if (isConstellationVisible && constellationProgress < 1) {
      constellationProgress = Math.min(1, constellationProgress + 0.012);
    }

    // Flatten all constellation lines to draw with progress
    const allLines = [];
    letterSegments.forEach(letter => {
      letter.connections.forEach(([p1Idx, p2Idx]) => {
        const p1 = letter.points[p1Idx];
        const p2 = letter.points[p2Idx];
        allLines.push({
          x1: p1.x * cWidth,
          y1: p1.y * cHeight,
          x2: p2.x * cWidth,
          y2: p2.y * cHeight
        });
      });
    });

    const totalLines = allLines.length;
    const linesToDraw = totalLines * constellationProgress;

    // 3. Draw Connecting Glowing Lines
    for (let i = 0; i < totalLines; i++) {
      if (i > linesToDraw) break;

      const line = allLines[i];
      const partial = Math.min(1, linesToDraw - i);

      const targetX = line.x1 + (line.x2 - line.x1) * partial;
      const targetY = line.y1 + (line.y2 - line.y1) * partial;

      cCtx.save();
      cCtx.beginPath();
      cCtx.moveTo(line.x1, line.y1);
      cCtx.lineTo(targetX, targetY);

      // Line style
      cCtx.strokeStyle = 'rgba(248, 168, 191, 0.55)';
      cCtx.lineWidth = 1.35;
      cCtx.shadowColor = 'rgba(216, 92, 136, 0.8)';
      cCtx.shadowBlur = 8;
      cCtx.stroke();
      cCtx.restore();
    }

    // 4. Draw Star Points for Each Letter
    letterSegments.forEach(letter => {
      letter.points.forEach(pt => {
        const px = pt.x * cWidth;
        const py = pt.y * cHeight;

        // Interaction with mouse/touch
        let dist = 999;
        if (mouse.active) {
          const dx = px - mouse.x;
          const dy = py - mouse.y;
          dist = Math.sqrt(dx * dx + dy * dy);
        }

        const isHovered = dist < 70;
        const starSize = isHovered ? 4.2 : 2.6;
        const glowRadius = isHovered ? 22 : 12;

        cCtx.save();
        // Outer halo
        const haloGrad = cCtx.createRadialGradient(px, py, 0, px, py, glowRadius);
        haloGrad.addColorStop(0, 'rgba(255, 235, 242, 0.9)');
        haloGrad.addColorStop(0.35, 'rgba(248, 168, 191, 0.5)');
        haloGrad.addColorStop(1, 'rgba(110, 22, 59, 0)');

        cCtx.beginPath();
        cCtx.arc(px, py, glowRadius, 0, Math.PI * 2);
        cCtx.fillStyle = haloGrad;
        cCtx.fill();

        // Inner sharp star core
        cCtx.beginPath();
        cCtx.arc(px, py, starSize, 0, Math.PI * 2);
        cCtx.fillStyle = isHovered ? '#fffdfa' : '#ffeaf1';
        cCtx.shadowColor = '#f8a8bf';
        cCtx.shadowBlur = 12;
        cCtx.fill();
        cCtx.restore();
      });
    });

    // 5. Connect nearby star to mouse pointer if cursor is active
    if (mouse.active) {
      letterSegments.forEach(letter => {
        letter.points.forEach(pt => {
          const px = pt.x * cWidth;
          const py = pt.y * cHeight;
          const dx = mouse.x - px;
          const dy = mouse.y - py;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 110) {
            cCtx.save();
            cCtx.beginPath();
            cCtx.moveTo(px, py);
            cCtx.lineTo(mouse.x, mouse.y);
            const lineAlpha = (1 - d / 110) * 0.45;
            cCtx.strokeStyle = `rgba(246, 207, 138, ${lineAlpha})`;
            cCtx.lineWidth = 1;
            cCtx.stroke();
            cCtx.restore();
          }
        });
      });
    }

    requestAnimationFrame(renderConstellation);
  }

  if (constCanvas) {
    window.addEventListener('resize', resizeConstellation);
    resizeConstellation();
    requestAnimationFrame(renderConstellation);

    // Mouse / Touch listeners for interactive starlight
    const updatePointer = (clientX, clientY) => {
      const rect = constCanvas.getBoundingClientRect();
      mouse.x = clientX - rect.left;
      mouse.y = clientY - rect.top;
      mouse.active = true;
    };

    constCanvas.addEventListener('mousemove', e => updatePointer(e.clientX, e.clientY));
    constCanvas.addEventListener('mouseleave', () => { mouse.active = false; });
    constCanvas.addEventListener('touchmove', e => {
      if (e.touches && e.touches[0]) {
        updatePointer(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: true });
    constCanvas.addEventListener('touchend', () => { mouse.active = false; });
  }


  /* ==========================================================================
     4. INTERSECTION OBSERVERS (SCROLL TRIGGERS)
     ========================================================================== */
  const observerOptions = {
    threshold: 0.18,
    rootMargin: '0px 0px -40px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');

        // Check if constellation section
        if (entry.target.id === 'constellation' || entry.target.closest('#constellation')) {
          isConstellationVisible = true;
        }

        // Check if closing section (triggers grand lotus bloom)
        if (entry.target.id === 'closing' || entry.target.closest('#closing')) {
          const closingSec = document.getElementById('closing');
          if (closingSec) closingSec.classList.add('is-bloomed');
        }
      }
    });
  }, observerOptions);

  // Observe elements with reveal classes
  document.querySelectorAll('.reveal-card, .reveal-item, .reveal-para').forEach(el => {
    observer.observe(el);
  });

  // Explicitly observe constellation and closing sections
  const constSection = document.getElementById('constellation');
  if (constSection) observer.observe(constSection);

  const closingSection = document.getElementById('closing');
  if (closingSection) observer.observe(closingSection);


  /* ==========================================================================
     5. NAVIGATION & SCROLL HELPERS
     ========================================================================== */
  const scrollCue = document.getElementById('scroll-cue');
  if (scrollCue) {
    scrollCue.addEventListener('click', () => {
      const target = document.getElementById('why-her');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  const scrollToTopBtn = document.getElementById('scroll-to-top');
  if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }


  /* ==========================================================================
     6. AMBIENT AUDIO ENGINE (NATIVE WEB AUDIO API)
     Warm, meditative, ethereal pad chords with subtle starlight chimes.
     Zero external MP3 file dependency = 100% reliable, offline, instant playback!
     ========================================================================== */
  class AmbientAudioEngine {
    constructor() {
      this.ctx = null;
      this.isPlaying = false;
      this.masterGain = null;
      this.activeOscillators = [];
      this.chimeTimer = null;
      this.chordStep = 0;
      this.chordTimer = null;

      // Romantic chord progressions in Eb (Eb Maj9, Ab Maj7, Cm9, Bb sus4)
      this.chords = [
        // Eb Maj9 (Eb3, G3, Bb3, D4, F4)
        [155.56, 196.00, 233.08, 293.66, 349.23],
        // Ab Maj7 (Ab2, C3, Eb3, G3, C4)
        [103.83, 130.81, 155.56, 196.00, 261.63],
        // Cm9 (C3, Eb3, G3, Bb3, D4)
        [130.81, 155.56, 196.00, 233.08, 293.66],
        // Bb sus4 (Bb2, F3, Bb3, Eb4, F4)
        [116.54, 174.61, 233.08, 311.13, 349.23]
      ];

      // Pentatonic chime frequencies (starlight bells)
      this.chimeNotes = [523.25, 587.33, 659.25, 783.99, 880.00, 1046.50];
    }

    init() {
      if (this.ctx) return;
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();

      // Master output with gentle limiter/compressor for lushness
      this.compressor = this.ctx.createDynamicsCompressor();
      this.compressor.threshold.setValueAtTime(-18, this.ctx.currentTime);
      this.compressor.knee.setValueAtTime(30, this.ctx.currentTime);
      this.compressor.ratio.setValueAtTime(4, this.ctx.currentTime);
      this.compressor.attack.setValueAtTime(0.05, this.ctx.currentTime);
      this.compressor.release.setValueAtTime(0.35, this.ctx.currentTime);

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.0001, this.ctx.currentTime);

      // Lowpass filter for warm, dreamy analog pad quality
      this.filter = this.ctx.createBiquadFilter();
      this.filter.type = 'lowpass';
      this.filter.frequency.setValueAtTime(650, this.ctx.currentTime);
      this.filter.Q.setValueAtTime(1.5, this.ctx.currentTime);

      this.masterGain.connect(this.filter);
      this.filter.connect(this.compressor);
      this.compressor.connect(this.ctx.destination);
    }

    playChord(notes) {
      if (!this.ctx || !this.isPlaying) return;

      const chordGain = this.ctx.createGain();
      chordGain.gain.setValueAtTime(0.0001, this.ctx.currentTime);
      chordGain.gain.exponentialRampToValueAtTime(0.09, this.ctx.currentTime + 3.0);
      chordGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 7.8);
      chordGain.connect(this.masterGain);

      const oscs = [];

      notes.forEach((freq, idx) => {
        // Dual detuned oscillators for rich spatial chorus effect
        [-4, 4].forEach(detune => {
          const osc = this.ctx.createOscillator();
          osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
          osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
          osc.detune.setValueAtTime(detune, this.ctx.currentTime);

          const oscGain = this.ctx.createGain();
          oscGain.gain.setValueAtTime(0.35, this.ctx.currentTime);

          osc.connect(oscGain);
          oscGain.connect(chordGain);

          osc.start(this.ctx.currentTime);
          osc.stop(this.ctx.currentTime + 8.2);
          oscs.push(osc);
        });
      });

      // Schedule next chord progression smoothly
      this.chordTimer = setTimeout(() => {
        if (this.isPlaying) {
          this.chordStep = (this.chordStep + 1) % this.chords.length;
          this.playChord(this.chords[this.chordStep]);
        }
      }, 6200);
    }

    playRandomChime() {
      if (!this.ctx || !this.isPlaying) return;

      const freq = this.chimeNotes[Math.floor(Math.random() * this.chimeNotes.length)];
      const osc = this.ctx.createOscillator();
      const chimeGain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      chimeGain.gain.setValueAtTime(0.0001, this.ctx.currentTime);
      chimeGain.gain.exponentialRampToValueAtTime(0.045, this.ctx.currentTime + 0.08);
      chimeGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 2.8);

      osc.connect(chimeGain);
      chimeGain.connect(this.masterGain);

      osc.start(this.ctx.currentTime);
      osc.stop(this.ctx.currentTime + 3.0);

      // Random delay for next chime (every 3 to 7 seconds)
      const nextDelay = 3000 + Math.random() * 4500;
      this.chimeTimer = setTimeout(() => {
        this.playRandomChime();
      }, nextDelay);
    }

    toggle() {
      this.init();

      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      if (!this.isPlaying) {
        // Start playing
        this.isPlaying = true;
        this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
        this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, this.ctx.currentTime);
        this.masterGain.gain.exponentialRampToValueAtTime(0.7, this.ctx.currentTime + 2.0);

        this.chordStep = 0;
        this.playChord(this.chords[this.chordStep]);
        this.chimeTimer = setTimeout(() => this.playRandomChime(), 2000);
        return true;
      } else {
        // Stop playing
        this.isPlaying = false;
        clearTimeout(this.chordTimer);
        clearTimeout(this.chimeTimer);

        if (this.masterGain) {
          this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
          this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, this.ctx.currentTime);
          this.masterGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.2);
        }
        return false;
      }
    }
  }

  const ambientAudio = new AmbientAudioEngine();
  const audioToggleBtn = document.getElementById('audio-toggle');
  const audioLabel = document.getElementById('audio-label');

  if (audioToggleBtn) {
    audioToggleBtn.addEventListener('click', () => {
      const playing = ambientAudio.toggle();
      if (playing) {
        audioToggleBtn.classList.add('is-playing');
        if (audioLabel) audioLabel.textContent = 'Mute';
      } else {
        audioToggleBtn.classList.remove('is-playing');
        if (audioLabel) audioLabel.textContent = 'Sound on';
      }
    });
  }

})();
