/**
 * CYBER-SHINOBI PORTFOLIO — MASTER INTERACTIVITY ENGINE
 * Real-time autonomous execution, decision matrices, and cinematic animations
 */

class CyberShinobiEngine {
  constructor() {
    this.state = {
      loaded: false,
      audioPlaying: false,
      tasksExecuted: 0,
      uptime: 0,
      matrixNodes: [],
      mouse: { x: 0, y: 0 },
    };
    this.elements = {};
    this.init();
  }

  init() {
    this.cacheElements();
    this.initLoader();
    this.initCursor();
    this.initNavigation();
    this.initHeroWebGL();
    this.initScrollAnimations();
    this.initDemos();
    this.initContactForm();
    this.initAudio();
    this.startUptime();
  }

  /* ───────────────────── CACHE DOM ELEMENTS ───────────────────── */
  cacheElements() {
    this.elements = {
      loader: document.getElementById("loader"),
      loaderProgress: document.getElementById("loaderProgress"),
      loaderStatus: document.getElementById("loaderStatus"),
      loaderText: document.getElementById("loaderText"),
      cursor: document.getElementById("cursor"),
      cursorTrail: document.getElementById("cursorTrail"),
      cursorGlow: document.getElementById("cursorGlow"),
      nav: document.getElementById("nav"),
      navToggle: document.getElementById("navToggle"),
      mobileMenu: document.getElementById("mobileMenu"),
      scrollProgress: document.getElementById("scrollProgress"),
      audioToggle: document.getElementById("audioToggle"),
      audioIcon: document.getElementById("audioIcon"),
      bgMusic: document.getElementById("bgMusic"),
      heroCanvas: document.getElementById("heroCanvas"),
      matrixCanvas: document.getElementById("matrixCanvas"),
      terminalBody: document.getElementById("terminalBody"),
      executorCore: document.getElementById("executorCore"),
      coreParticles: document.getElementById("coreParticles"),
    };
  }

  /* ───────────────────── LOADER ───────────────────── */
  initLoader() {
    const { loader, loaderProgress, loaderStatus, loaderText } = this.elements;
    const statuses = [
      "Allocating neural pathways...",
      "Synthesizing shaders...",
      "Compiling decision trees...",
      "Calibrating cursor dynamics...",
      "Establishing secure link...",
      "Ready.",
    ];
    let progress = 0;
    let statusIdx = 0;

    const interval = setInterval(() => {
      progress += Math.random() * 18 + 5;
      if (progress > 100) progress = 100;
      loaderProgress.style.width = progress + "%";

      if (statusIdx < statuses.length && progress > (statusIdx + 1) * 18) {
        loaderStatus.textContent = statuses[statusIdx];
        loaderText.textContent = `LOADING ${Math.floor(progress)}%`;
        statusIdx++;
      }

      if (progress >= 100) {
        clearInterval(interval);
        loaderText.textContent = "READY";
        setTimeout(() => {
          loader.classList.add("loaded");
          this.state.loaded = true;
          this.animateHeroEntrance();
        }, 600);
      }
    }, 200);
  }

  /* ───────────────────── CUSTOM CURSOR ───────────────────── */
  initCursor() {
    const { cursor, cursorTrail, cursorGlow } = this.elements;
    if (!cursor || window.matchMedia("(pointer: coarse)").matches) {
      document.body.style.cursor = "auto";
      if (cursor) {
        cursor.style.display = "none";
        cursorTrail.style.display = "none";
        cursorGlow.style.display = "none";
      }
      return;
    }

    let mx = 0,
      my = 0,
      cx = 0,
      cy = 0,
      tx = 0,
      ty = 0;

    document.addEventListener("mousemove", (e) => {
      mx = e.clientX;
      my = e.clientY;
      this.state.mouse.x = mx;
      this.state.mouse.y = my;
    });

    const loop = () => {
      cx += (mx - cx) * 0.15;
      cy += (my - cy) * 0.15;
      tx += (mx - tx) * 0.08;
      ty += (my - ty) * 0.08;

      cursor.style.left = cx + "px";
      cursor.style.top = cy + "px";
      cursorTrail.style.left = tx + "px";
      cursorTrail.style.top = ty + "px";
      cursorGlow.style.left = cx + "px";
      cursorGlow.style.top = cy + "px";

      requestAnimationFrame(loop);
    };
    loop();

    document
      .querySelectorAll(
        "a, button, .tech-tag, .project-card, .hobby-card, .demo-btn",
      )
      .forEach((el) => {
        el.addEventListener("mouseenter", () => cursor.classList.add("hover"));
        el.addEventListener("mouseleave", () =>
          cursor.classList.remove("hover"),
        );
      });

    document.addEventListener("mousedown", () => cursor.classList.add("click"));
    document.addEventListener("mouseup", () =>
      cursor.classList.remove("click"),
    );
  }

  /* ───────────────────── NAVIGATION ───────────────────── */
  initNavigation() {
    const { nav, navToggle, mobileMenu, scrollProgress } = this.elements;
    let lastScroll = 0;

    window.addEventListener(
      "scroll",
      () => {
        const y = window.scrollY;
        const h = document.documentElement.scrollHeight - window.innerHeight;
        scrollProgress.style.width = (y / h) * 100 + "%";

        if (y > 50) nav.classList.add("scrolled");
        else nav.classList.remove("scrolled");
        lastScroll = y;
      },
      { passive: true },
    );

    navToggle?.addEventListener("click", () => {
      const isActive = mobileMenu.classList.toggle("active");
      navToggle.classList.toggle("active", isActive);
      document.body.style.overflow = isActive ? "hidden" : "";
    });

    document
      .querySelectorAll(".mobile-nav-links a, .nav-links a")
      .forEach((link) => {
        link.addEventListener("click", () => {
          mobileMenu?.classList.remove("active");
          navToggle?.classList.remove("active");
          document.body.style.overflow = "";
        });
      });

    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-links a");
    window.addEventListener(
      "scroll",
      () => {
        let current = "";
        sections.forEach((s) => {
          if (window.scrollY >= s.offsetTop - 200) current = s.id;
        });
        navLinks.forEach((l) => {
          l.classList.toggle(
            "active",
            l.getAttribute("href") === "#" + current,
          );
        });
      },
      { passive: true },
    );
  }

  /* ───────────────────── HERO WEBGL ───────────────────── */
  initHeroWebGL() {
    const canvas = this.elements.heroCanvas;
    if (!canvas || !window.THREE) return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const vShader = `
      varying vec2 vUv; varying float vTime;
      uniform float uTime;
      void main(){
        vUv = uv; vTime = uTime;
        vec3 p = position;
        float wave = sin(p.x * 2.0 + uTime) * cos(p.y * 2.0 + uTime * 0.5) * 0.3;
        p.z += wave;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
      }
    `;

    const fShader = `
      varying vec2 vUv; varying float vTime;
      uniform vec3 uColor1; uniform vec3 uColor2; uniform vec3 uColor3;
      float n(vec2 p){
        return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453);
      }
      void main(){
        vec2 uv = vUv * 3.0;
        float t = vTime * 0.2;
        float noise1 = n(uv + t);
        float noise2 = n(uv * 2.0 - t * 0.5);
        vec3 c = mix(uColor1, uColor2, sin(t + noise1 * 6.28) * 0.5 + 0.5);
        c = mix(c, uColor3, noise2 * 0.3);
        gl_FragColor = vec4(c * (0.2 + noise1 * 0.5), 0.7);
      }
    `;

    const geo = new THREE.PlaneGeometry(30, 30, 128, 128);
    const mat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor1: { value: new THREE.Color(0x8b0000) },
        uColor2: { value: new THREE.Color(0x00bfff) },
        uColor3: { value: new THREE.Color(0x050505) },
      },
      vertexShader: vShader,
      fragmentShader: fShader,
      transparent: true,
      side: THREE.DoubleSide,
    });

    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);
    camera.position.z = 6;

    let animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      mat.uniforms.uTime.value = performance.now() * 0.001;
      const mx = (this.state.mouse.x / window.innerWidth - 0.5) * 0.3;
      const my = (this.state.mouse.y / window.innerHeight - 0.5) * 0.3;
      mesh.rotation.x = my;
      mesh.rotation.y = mx;
      renderer.render(scene, camera);
    };
    animate();

    window.addEventListener("resize", () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }

  /* ───────────────────── HERO ENTRANCE ANIMATION ───────────────────── */
  animateHeroEntrance() {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.to(
      ".hero-line:nth-child(1) .char",
      {
        y: "0%",
        opacity: 1,
        stagger: 0.04,
        duration: 1,
      },
      0.2,
    )
      .to(
        ".hero-line:nth-child(2) .char",
        {
          y: "0%",
          opacity: 1,
          stagger: 0.04,
          duration: 1,
        },
        0.4,
      )
      .to(".hero-subtitle", { y: 0, opacity: 1, duration: 0.8 }, 0.8)
      .to(".stat", { y: 0, opacity: 1, stagger: 0.15, duration: 0.8 }, 1)
      .to(".hero-scroll-indicator", { opacity: 1, duration: 0.6 }, 1.4)
      .to(
        "#heroCtaPrimary, #heroCtaSecondary",
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.6 },
        1.2,
      );
  }

  /* ───────────────────── SCROLL ANIMATIONS ───────────────────── */
  initScrollAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    // Section titles
    gsap.utils.toArray(".section-title[data-splitting]").forEach((title) => {
      const chars = title.querySelectorAll(".char");
      gsap.to(chars, {
        y: "0%",
        opacity: 1,
        stagger: 0.02,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: title,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    });

    // About cards
    gsap.utils.toArray(".about-card").forEach((card, i) => {
      gsap.from(card, {
        y: 80,
        opacity: 0,
        rotateX: -10,
        duration: 1,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    });

    // Tech tags
    gsap.from(".tech-tag", {
      y: 30,
      opacity: 0,
      stagger: 0.08,
      duration: 0.6,
      ease: "power2.out",
      scrollTrigger: { trigger: "#techStack", start: "top 85%" },
    });

    // Hobby cards
    gsap.from(".hobby-card", {
      y: 60,
      opacity: 0,
      stagger: 0.12,
      duration: 0.8,
      ease: "back.out(1.5)",
      scrollTrigger: { trigger: ".hobbies-grid", start: "top 85%" },
    });

    // Demo panels
    gsap.from(".demo-panel", {
      y: 100,
      opacity: 0,
      stagger: 0.2,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: { trigger: "#demos", start: "top 70%" },
    });

    // Project cards
    gsap.from(".project-card", {
      y: 80,
      opacity: 0,
      stagger: 0.15,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: { trigger: "#projectsGrid", start: "top 80%" },
    });

    // Contact
    gsap.from(".contact-info-panel", {
      x: -60,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: { trigger: "#contact", start: "top 70%" },
    });
    gsap.from(".contact-form-panel", {
      x: 60,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: { trigger: "#contact", start: "top 70%" },
    });

    // Stats counter
    document.querySelectorAll(".stat-number[data-target]").forEach((stat) => {
      const target = parseInt(stat.dataset.target);
      gsap.to(stat, {
        innerText: target,
        duration: 2,
        snap: { innerText: 1 },
        ease: "power2.out",
        scrollTrigger: { trigger: stat, start: "top 90%" },
      });
    });

    // Parallax elements
    window.addEventListener(
      "scroll",
      () => {
        const y = window.scrollY;
        document.querySelectorAll("[data-parallax]").forEach((el) => {
          const speed = parseFloat(el.dataset.parallax);
          el.style.transform = `translateY(${y * speed * 0.1}px)`;
        });
      },
      { passive: true },
    );
  }

  /* ───────────────────── DEMOS ───────────────────── */
  initDemos() {
    this.initExecutorDemo();
    this.initMatrixDemo();
  }

  /* Executor Demo */
  initExecutorDemo() {
    const tasks = [
      "Analyzing system parameters...",
      "Optimizing neural weights...",
      "Compiling decision trees...",
      "Allocating memory blocks...",
      "Synchronizing thread pools...",
      "Verifying data integrity...",
      "Deploying microservices...",
      "Monitoring real-time metrics...",
      "Executing batch operations...",
      "Finalizing autonomous pipeline...",
    ];

    document.getElementById("btnRunTasks")?.addEventListener("click", () => {
      let i = 0;
      const body = this.elements.terminalBody;
      const addLine = () => {
        if (i >= tasks.length) {
          this.logToTerminal(
            "success",
            "Autonomous sequence complete. All systems nominal.",
          );
          this.state.tasksExecuted += tasks.length;
          document.getElementById("metricTasks").textContent =
            this.state.tasksExecuted;
          document.getElementById("metricEfficiency").textContent =
            Math.floor(85 + Math.random() * 15) + "%";
          return;
        }
        const type =
          Math.random() > 0.8
            ? "warn"
            : Math.random() > 0.95
              ? "error"
              : "info";
        this.logToTerminal(type, tasks[i]);
        i++;
        setTimeout(addLine, 400 + Math.random() * 600);
      };
      addLine();
    });

    document.getElementById("btnClearLog")?.addEventListener("click", () => {
      this.elements.terminalBody.innerHTML = "";
      this.logToTerminal("info", "Log cleared. Ready for new sequence.");
    });

    // Core particles
    const container = this.elements.coreParticles;
    for (let i = 0; i < 12; i++) {
      const p = document.createElement("div");
      p.className = "core-particle";
      p.style.cssText = `
        position: absolute; width: 4px; height: 4px;
        background: ${Math.random() > 0.5 ? "var(--crimson-primary)" : "var(--electric-blue)"};
        border-radius: 50%; opacity: 0.6;
      `;
      const angle = (i / 12) * Math.PI * 2;
      const radius = 70 + Math.random() * 30;
      const duration = 3 + Math.random() * 4;
      p.style.animation = `orbit ${duration}s linear infinite`;
      p.style.setProperty("--angle", angle + "rad");
      p.style.setProperty("--radius", radius + "px");
      container?.appendChild(p);
    }
  }

  logToTerminal(level, message) {
    const body = this.elements.terminalBody;
    const time = new Date().toLocaleTimeString("en-US", { hour12: false });
    const line = document.createElement("div");
    line.className = "terminal-line";
    line.innerHTML = `
      <span class="timestamp">[${time}]</span>
      <span class="level ${level}">[${level.toUpperCase()}]</span>
      <span class="message">${message}</span>
    `;
    body.appendChild(line);
    body.scrollTop = body.scrollHeight;
  }

  /* Matrix Demo */
  initMatrixDemo() {
    const canvas = this.elements.matrixCanvas;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w,
      h,
      nodes = [],
      connections = [];
    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      w = canvas.width = rect.width;
      h = canvas.height = rect.height;
    };
    resize();
    window.addEventListener("resize", resize);

    const createNodes = (count) => {
      nodes = [];
      for (let i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8,
          r: 3 + Math.random() * 4,
          pulse: Math.random() * Math.PI * 2,
          type:
            Math.random() > 0.7
              ? "crimson"
              : Math.random() > 0.5
                ? "blue"
                : "white",
        });
      }
    };
    createNodes(25);

    let frame = 0;
    const draw = () => {
      requestAnimationFrame(draw);
      frame++;
      ctx.fillStyle = "rgba(5,5,5,0.15)";
      ctx.fillRect(0, 0, w, h);

      // Update nodes
      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
        n.pulse += 0.05;
      });

      // Draw connections
      ctx.lineWidth = 0.5;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            const alpha = (1 - dist / 150) * 0.3;
            ctx.strokeStyle =
              nodes[i].type === "crimson" || nodes[j].type === "crimson"
                ? `rgba(139,0,0,${alpha})`
                : `rgba(0,191,255,${alpha})`;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      nodes.forEach((n) => {
        const pulseR = n.r + Math.sin(n.pulse) * 2;
        const color =
          n.type === "crimson"
            ? "139,0,0"
            : n.type === "blue"
              ? "0,191,255"
              : "192,192,192";
        ctx.beginPath();
        ctx.arc(n.x, n.y, pulseR, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color},0.8)`;
        ctx.fill();
        ctx.shadowBlur = 10;
        ctx.shadowColor = `rgba(${color},0.5)`;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Update stats periodically
      if (frame % 60 === 0) {
        const active = nodes.filter((n) => n.type === "crimson").length;
        document.getElementById("activeNodes").textContent = active;
        document.getElementById("confidenceLevel").textContent =
          Math.floor(70 + Math.random() * 30) + "%";
      }
    };
    draw();

    document.getElementById("btnSimulate")?.addEventListener("click", () => {
      const paths = ["A->B->D", "A->C->E", "B->D->F", "C->E->G", "A->B->C->D"];
      document.getElementById("decisionPath").textContent =
        paths[Math.floor(Math.random() * paths.length)];
      document.getElementById("confidenceLevel").textContent =
        Math.floor(75 + Math.random() * 25) + "%";
      createNodes(20 + Math.floor(Math.random() * 15));
    });

    document.getElementById("btnResetMatrix")?.addEventListener("click", () => {
      createNodes(25);
      document.getElementById("decisionPath").textContent = "--";
      document.getElementById("confidenceLevel").textContent = "0%";
    });
  }

  /* ───────────────────── CONTACT FORM ───────────────────── */
  initContactForm() {
    const form = document.getElementById("contactForm");
    const status = document.getElementById("formStatus");

    form?.addEventListener("submit", (e) => {
      e.preventDefault();
      const btn = document.getElementById("formSubmit");
      const originalText = btn.innerHTML;

      btn.disabled = true;
      btn.innerHTML = '<span class="submit-text">TRANSMITTING...</span>';

      setTimeout(() => {
        status.innerHTML =
          '<span style="color:#00ff88"><i class="fas fa-check-circle"></i> Message transmitted successfully.</span>';
        btn.innerHTML =
          '<span class="submit-text">SENT</span> <i class="fas fa-check"></i>';
        form.reset();

        setTimeout(() => {
          btn.disabled = false;
          btn.innerHTML = originalText;
          status.innerHTML = "";
        }, 3000);
      }, 1500);
    });
  }

  /* ───────────────────── AUDIO ───────────────────── */
  initAudio() {
    const { audioToggle, audioIcon } = this.elements;
    if (!audioToggle) return;

    // Create oscillator-based ambient tone since no audio file exists
    let audioCtx, oscillator, gainNode;

    const startAudio = () => {
      if (!audioCtx)
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      if (oscillator) return;
      oscillator = audioCtx.createOscillator();
      gainNode = audioCtx.createGain();
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(110, audioCtx.currentTime);
      gainNode.gain.setValueAtTime(0.03, audioCtx.currentTime);
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      oscillator.start();

      // Subtle frequency modulation
      setInterval(() => {
        if (oscillator) {
          const freq = 100 + Math.random() * 40;
          oscillator.frequency.setTargetAtTime(freq, audioCtx.currentTime, 2);
        }
      }, 3000);
    };

    const stopAudio = () => {
      oscillator?.stop();
      oscillator = null;
    };

    audioToggle.addEventListener("click", () => {
      this.state.audioPlaying = !this.state.audioPlaying;
      audioToggle.classList.toggle("active", this.state.audioPlaying);
      audioIcon.className = this.state.audioPlaying
        ? "fas fa-volume-up"
        : "fas fa-volume-mute";
      this.state.audioPlaying ? startAudio() : stopAudio();
    });
  }

  /* ───────────────────── UPTIME COUNTER ───────────────────── */
  startUptime() {
    const el = document.getElementById("metricUptime");
    if (!el) return;
    let sec = 0;
    setInterval(() => {
      sec++;
      const m = Math.floor(sec / 60)
        .toString()
        .padStart(2, "0");
      const s = (sec % 60).toString().padStart(2, "0");
      el.textContent = `${m}:${s}`;
    }, 1000);
  }
}

/* ───────────────────── ORBIT ANIMATION CSS INJECTION ───────────────────── */
const orbitStyle = document.createElement("style");
orbitStyle.textContent = `
  @keyframes orbit {
    from { transform: rotate(var(--angle)) translateX(var(--radius)) rotate(calc(-1 * var(--angle))); }
    to { transform: rotate(calc(var(--angle) + 360deg)) translateX(var(--radius)) rotate(calc(-1 * var(--angle) - 360deg)); }
  }
`;
document.head.appendChild(orbitStyle);

/* ───────────────────── INITIALIZE ───────────────────── */
document.addEventListener("DOMContentLoaded", () => {
  if (typeof Splitting !== "undefined") Splitting();
  new CyberShinobiEngine();
});
