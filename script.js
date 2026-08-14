const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let particles = [];
let width;
let height;

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}

window.addEventListener("resize", resize);
resize();

class Particle {

    constructor() {
        this.reset(true);
    }

    reset(inicio = false) {

        const t = Math.random() * Math.PI * 2;

        // Fórmula do coração
        const x =
            16 * Math.pow(Math.sin(t), 3);

        const y =
            13 * Math.cos(t)
            - 5 * Math.cos(2 * t)
            - 2 * Math.cos(3 * t)
            - Math.cos(4 * t);

        // Preenche o coração
        const preenchimento = Math.sqrt(Math.random());

        this.baseX = x * preenchimento;
        this.baseY = y * preenchimento;

        this.scale = Math.min(width, height) / 38;

        this.targetX = this.baseX * this.scale;
        this.targetY = -this.baseY * this.scale;

        // Posição inicial espalhada
        if (inicio) {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
        } else {
            this.x = width / 2;
            this.y = height / 2;
        }

        this.size = Math.random() * 2.2 + 0.6;

        this.alpha = Math.random() * 0.7 + 0.3;

        this.angle = Math.random() * Math.PI * 2;

        this.floatSpeed =
            Math.random() * 0.02 + 0.005;

        this.offset =
            Math.random() * Math.PI * 2;
    }

    update() {

        const tempo = Date.now() * 0.003;

        // Pulsação do coração
        const pulse =
            1 + Math.sin(tempo) * 0.06;

        const centerX = width / 2;
        const centerY = height / 2;

        const targetX =
            centerX + this.targetX * pulse;

        const targetY =
            centerY + this.targetY * pulse;

        // Movimento suave até o coração
        this.x +=
            (targetX - this.x) * 0.035;

        this.y +=
            (targetY - this.y) * 0.035;

        // Flutuação
        this.x +=
            Math.cos(this.angle) * 0.12;

        this.y +=
            Math.sin(this.angle) * 0.12;

        this.angle += this.floatSpeed;
    }

    draw() {

        ctx.beginPath();

        ctx.arc(
            this.x,
            this.y,
            this.size,
            0,
            Math.PI * 2
        );

        // Variação entre rosa e vermelho
        const brilho =
            Math.random() > 0.96;

        ctx.fillStyle = brilho
            ? `rgba(255, 255, 255, ${this.alpha})`
            : `rgba(255, 30, 90, ${this.alpha})`;

        ctx.shadowBlur = brilho ? 25 : 12;
        ctx.shadowColor =
            brilho ? "#ffffff" : "#ff1744";

        ctx.fill();

        ctx.shadowBlur = 0;
    }
}


// Quantidade de partículas
const quantidade = 2500;

for (let i = 0; i < quantidade; i++) {
    particles.push(new Particle());
}


// Algumas partículas extras espalhadas
const estrelas = [];

for (let i = 0; i < 150; i++) {

    estrelas.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.5,
        alpha: Math.random(),
        velocidade: Math.random() * 0.02
    });
}


function desenharEstrelas() {

    estrelas.forEach(estrela => {

        estrela.alpha += estrela.velocidade;

        if (estrela.alpha > 1 ||
            estrela.alpha < 0.1) {
            estrela.velocidade *= -1;
        }

        ctx.beginPath();

        ctx.arc(
            estrela.x,
            estrela.y,
            estrela.size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            `rgba(255,255,255,${estrela.alpha})`;

        ctx.shadowBlur = 8;
        ctx.shadowColor = "#ffffff";

        ctx.fill();

        ctx.shadowBlur = 0;
    });
}


function animate() {

    // Rastro suave
    ctx.fillStyle =
        "rgba(0, 0, 0, 0.20)";

    ctx.fillRect(
        0,
        0,
        width,
        height
    );

    desenharEstrelas();

    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });

    requestAnimationFrame(animate);
}

animate();