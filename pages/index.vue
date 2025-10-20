<template>
  <div class="page-container">
    <!-- Sección del sobre -->
    <section class="envelope-section">
      <div class="envelope-container" @click="handleClick">
        <!-- Sobre -->
        <div class="envelope" :class="{ open: isOpen, hidden: showLetterOnly }" ref="envelope">
          <div class="flap"></div>
          <div class="body"></div>
        </div>

        <!-- Carta -->
        <transition name="slide-up">
          <div v-if="isOpen" class="letter" :class="{ focused: showLetterOnly }" ref="letter">
            <div class="content">
              <h2>Querida mía...</h2>
              <p>
                <br/>Aunque no lo parezca, ha pasado un año ya desde aquella noche en el tejado....<br/><br/>
                Ha sido un año lleno de momentos inolvidables a tu lado y de mucho pero mucho aprendizajes, de crecimientos y risas,
                de desvelos y sueños compartidos... Un año en el que aprendí a amar de una forma tan bonita
                y única, de una forma que solo tú has podido enseñarme...
                Gracias por ser guía y primera vez en tantas cosas, gracias por llegar a mi vida y llenarlo de colores,
                gracias por ser inspiración, por acompañarme, por apoyarme y por entenderme cuando más lo necesité...
                Gracias por permitirme amarte y por darme un amor que no deja de crecer con cada día que pasa.
                <br/><br/>
                Gracias mi angelita bella y sobre todo gracias a Dios por haberme dado una bendición tan grande
                como tú... Te amo con todo mi corazón y muy importante... <br/><br/>!Felíz Primer aniversario mi vida!
              </p>
            </div>
          </div>
        </transition>
      </div>
    </section>

    <!--  Sección de texto animado -->
    <section class="text-section" ref="textSection">
      <h1 ref="animatedText" class="split-text">
        La vida está llena de tantos <br/>momentos que se vuelven  <br/> eternos a tu lado...
        <br/><br/>Gracias por estos momentos <br/> y por muchos más!!!
      </h1>
      
      <!-- Flecha animada -->
      <div class="animated-arrow" ref="animatedArrow" @click="scrollToGallery">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 5V19M12 19L19 12M12 19L5 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </section>

    <!-- 🖼️ Galería de imágenes -->
    <section class="gallery-section" ref="gallerySection">
      <div class="gallery">
        <div
          v-for="(photo, index) in photos"
          :key="index"
          class="photo"
          :ref="el => { if (el) photoRefs[index] = el }"
        >
          <img :src="photo" alt="Foto" />
        </div>
      </div>
    </section>

    <!-- 💝 Sección final -->
    <section class="final-section" ref="finalSection">
      <div class="final-content">
        <h2 ref="finalText" class="final-text">
          ¡¡Muchas gracias por este año mi amor y por muchos años más a tu lado!!
        </h2>
        <div class="hearts-animation">
          <div class="heart">🤎</div>
          <div class="heart">💕</div>
          <div class="heart">🤎</div>
          <div class="heart">❤️‍🔥</div>
          <div class="heart">🤎</div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, nextTick } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// ------------------ Importaciones de imágenes ------------------
import img1 from "@/assets/images/1.jpg";
import img2 from "@/assets/images/2.jpg";
import img3 from "@/assets/images/3.jpg";
import img4 from "@/assets/images/4.jpg";
import img5 from "@/assets/images/5.jpg";
import img6 from "@/assets/images/6.jpg";
import img7 from "@/assets/images/7.jpg";
import img8 from "@/assets/images/8.jpg";
import img9 from "@/assets/images/9.jpg";
import img10 from "@/assets/images/10.jpg";
import img11 from "@/assets/images/11.jpg";
import img12 from "@/assets/images/12.jpg";
import img13 from "@/assets/images/13.jpg";
import img14 from "@/assets/images/14.jpg";
import img15 from "@/assets/images/15.jpg";   
import img16 from "@/assets/images/16.jpg";
import img17 from "@/assets/images/17.jpg";
import img18 from "@/assets/images/18.jpg";
import img19 from "@/assets/images/19.jpg";
import img20 from "@/assets/images/20.jpg";

// ------------------ Importación de audio ------------------
import mainAudio from "@/assets/audio/1.mp3";

// Registrar ScrollTrigger solo en el cliente
if (process.client) {
  gsap.registerPlugin(ScrollTrigger);
}

const isOpen = ref(false);
const showLetterOnly = ref(false);
const animatedText = ref<HTMLHeadingElement | null>(null);
const animatedArrow = ref<HTMLElement | null>(null);
const finalText = ref<HTMLHeadingElement | null>(null);
const envelope = ref<HTMLElement | null>(null);
const letter = ref<HTMLElement | null>(null);
const textSection = ref<HTMLElement | null>(null);
const gallerySection = ref<HTMLElement | null>(null);
const finalSection = ref<HTMLElement | null>(null);
const photoRefs: HTMLElement[] = [];

const photos = ref([
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  img9,
  img10,
  img11,
  img12,
  img13,
  img14,
  img15,
  img16,
  img17,
  img18,
  img19,
  img20,
]);

// Función para hacer scroll a la galería
const scrollToGallery = () => {
  if (gallerySection.value) {
    gallerySection.value.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  }
};

// Animación de shake rápida horizontal
const startEnvelopeShake = () => {
  if (!gsap || !envelope.value) return;
  
  // Timeline para shake rápido y repetitivo
  const shakeTimeline = gsap.timeline({ repeat: -1 });
  
  // Movimiento rápido de lado a lado
  shakeTimeline
    .to(envelope.value, {
      x: -8,
      duration: 0.1,
      ease: "power1.inOut"
    })
    .to(envelope.value, {
      x: 8,
      duration: 0.1,
      ease: "power1.inOut"
    })
    .to(envelope.value, {
      x: -6,
      duration: 0.08,
      ease: "power1.inOut"
    })
    .to(envelope.value, {
      x: 6,
      duration: 0.08,
      ease: "power1.inOut"
    })
    .to(envelope.value, {
      x: -4,
      duration: 0.06,
      ease: "power1.inOut"
    })
    .to(envelope.value, {
      x: 4,
      duration: 0.06,
      ease: "power1.inOut"
    })
    .to(envelope.value, {
      x: -2,
      duration: 0.04,
      ease: "power1.inOut"
    })
    .to(envelope.value, {
      x: 2,
      duration: 0.04,
      ease: "power1.inOut"
    })
    .to(envelope.value, {
      x: 0,
      duration: 0.1,
      ease: "elastic.out(1, 0.5)"
    });

  // Detener la animación después de 6 segundos
  setTimeout(() => {
    shakeTimeline.kill();
    // Resetear posición
    gsap.to(envelope.value, {
      x: 0,
      duration: 0.3,
      ease: "back.out(1.7)"
    });
  }, 6000);
};

const handleClick = () => {
  if (!isOpen.value) {
    isOpen.value = true;
  } else if (!showLetterOnly.value) {
    showLetterOnly.value = true;
  }
};

// Animación del sobre mejorada
watch(isOpen, (newVal) => {
  if (newVal && process.client && gsap) {
    const envelopeElement = envelope.value;
    const letterElement = letter.value;

    if (!envelopeElement || !letterElement) return;

    // Detener cualquier animación de shake
    gsap.killTweensOf(envelopeElement);

    // Timeline para la secuencia completa
    const openTimeline = gsap.timeline();

    // 1. Abrir el flap
    openTimeline.to(".flap", { 
      rotateX: 180, 
      duration: 0.6, 
      transformOrigin: "top",
      ease: "power2.inOut"
    });

    // 2. La carta sale del sobre
    openTimeline.to(letterElement, { 
      y: "-15%", 
      duration: 0.8, 
      ease: "back.out(1.5)",
      scale: 1.02
    }, "-=0.2");

    // 3. El sobre se mueve hacia atrás y se reduce
    openTimeline.to(envelopeElement, {
      y: "8%",
      scale: 0.85,
      zIndex: 1,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.4");

    // 4. La carta se estabiliza en posición
    openTimeline.to(letterElement, {
      y: "-0%",
      scale: 1,
      duration: 0.4,
      ease: "power2.inOut"
    });

    // 5. Animación del contenido de la carta
    openTimeline.from(".content h2", {
      opacity: 0,
      y: 15,
      duration: 0.6,
      ease: "power2.out"
    });

    openTimeline.from(".content p", {
      opacity: 0,
      y: 30,
      stagger: 0.08,
      duration: 1,
      ease: "power2.out"
    }, "-=0.2");
  }
});

// Cuando se muestra solo la carta
watch(showLetterOnly, (newVal) => {
  if (newVal && process.client && gsap) {
    const envelopeElement = envelope.value;
    const letterElement = letter.value;

    if (!envelopeElement || !letterElement) return;

    const focusTimeline = gsap.timeline();

    // 1. El sobre desaparece suavemente
    focusTimeline.to(envelopeElement, {
      opacity: 0,
      scale: 0.7,
      y: "25%",
      duration: 0.6,
      ease: "power2.inOut"
    });

    // 2. La carta se centra y agranda
    focusTimeline.to(letterElement, {
      y: "22%",
      scale: 1.08,
      duration: 0.8,
      ease: "back.out(1.5)"
    }, "-=0.3");

    // 3. Asegurar que el contenido sea visible
    focusTimeline.to(".content", { 
      opacity: 1, 
      duration: 0.4 
    }, "-=0.2");
  }
});

// Función para animar la flecha
const animateArrow = () => {
  if (!gsap || !animatedArrow.value) return;

  const arrow = animatedArrow.value;

  // Animación de entrada
  gsap.fromTo(arrow,
    {
      opacity: 0,
      y: 20,
      scale: 0.8
    },
    {
      opacity: 1,
      y: 0,
      scale: 1.5,
      duration: 0.8,
      ease: "back.out(1.7)",
      delay: 0.2
    }
  );

  // Animación continua de flotación
  gsap.to(arrow, {
    y: 10,
    duration: 1.5,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    delay: 1.5
  });

  // Animación de parpadeo sutil
  gsap.to(arrow, {
    opacity: 0.7,
    duration: 1,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    delay: 1
  });
};

// Función para animar la sección final
const animateFinalSection = () => {
  if (!gsap || !finalText.value || !finalSection.value) return;

  const textElement = finalText.value;
  const section = finalSection.value;

  // Dividir el texto en caracteres para animación
  const text = textElement.innerText;
  textElement.innerHTML = text
    .split("")
    .map((char) =>
      char === " " ? `<span class='final-char space'>&nbsp;</span>` : `<span class='final-char'>${char}</span>`
    )
    .join("");

  const finalChars = textElement.querySelectorAll('.final-char');

  // Animación del texto
  gsap.fromTo(finalChars, 
    {
      opacity: 0,
      y: 50,
      rotationY: 90,
    },
    {
      opacity: 1,
      y: 0,
      rotationY: 0,
      duration: 1.5,
      stagger: 0.05,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: section,
        start: "top 70%",
        end: "bottom 30%",
        toggleActions: "play none none none",
      }
    }
  );

  // Animación de corazones
  const hearts = document.querySelectorAll('.heart');
  hearts.forEach((heart, index) => {
    gsap.fromTo(heart,
      {
        opacity: 0,
        scale: 0,
        y: 100,
        rotation: -180,
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        rotation: 0,
        duration: 1.2,
        delay: index * 0.3,
        ease: "elastic.out(1, 0.8)",
        scrollTrigger: {
          trigger: section,
          start: "top 60%",
          toggleActions: "play none none none",
        }
      }
    );

    // Animación continua de los corazones
    gsap.to(heart, {
      y: -20,
      rotation: 10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 2 + (index * 0.2)
    });
  });

  // Efecto de brillo intermitente en el texto
  gsap.to(finalChars, {
    filter: "brightness(1.2)",
    duration: 1.5,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    stagger: 0.1,
    delay: 3
  });
};

// === Animaciones de scroll y audio ===
onMounted(async () => {
  // Solo ejecutar en el cliente
  if (!process.client) return;

  await nextTick();

  // Iniciar animación de shake del sobre después de un breve delay
  setTimeout(() => {
    startEnvelopeShake();
  }, 1000);

  // Fotos con ScrollTrigger
  photoRefs.forEach((el, i) => {
    if (el) {
      gsap.from(el, {
        opacity: 0,
        y: 100,
        duration: 12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 70%",
          end: "bottom 30%",
          toggleActions: "play none none reverse",
        },
        delay: i * 0.1,
      });
    }
  });

  // Texto final (última sección)
  const textEl = animatedText.value;
  if (textEl) {
    const text = textEl.innerText;
    textEl.innerHTML = text
      .split("")
      .map((char) =>
        char === " " ? `<span class='char space'>&nbsp;</span>` : `<span class='char'>${char}</span>`
      )
      .join("");

    const chars = textEl.querySelectorAll(".char");

    gsap.from(chars, {
      opacity: 0,
      y: 60,
      stagger: 0.05,
      duration: 2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: textSection.value,
        start: "top 50%",
        toggleActions: "play none none none",
        markers: false,
        once: true,
      },
      onComplete: () => {
        // Iniciar animación de la flecha cuando el texto termine
        animateArrow();
      }
    });
  }

  // Animación de la sección final
  animateFinalSection();

  // === Audio con delay de 20s, solo una vez ===
  const audio = new Audio(mainAudio);
  let audioPlayed = false;

  setTimeout(() => {
    if (!audioPlayed) {
      audio.play().catch(() => {
        console.warn("No se pudo reproducir el audio automáticamente.");
      });
      audioPlayed = true;
    }
  }, 15000);
});
</script>

<style scoped>
/* Todos los estilos CSS se mantienen exactamente igual que en la versión anterior */
.page-container {
  width: 100%;
  display: grid;
  grid-template-rows: 100vh 100vh auto auto;
  grid-template-areas: 
    "envelope"
    "text"
    "gallery"
    "final";
  background: #fdf6e3;
  min-height: 100vh;
  overflow-x: hidden;
  height: fit-content;
}

.envelope-section {
  grid-area: envelope;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  padding: 0 20px;
  box-sizing: border-box;
  background: #fdf6e3;
}

.gallery-section {
  grid-area: gallery;
  width: 100%;
  padding: 80px 20px;
  background: #fdf6e3;
  box-sizing: border-box;
  overflow: hidden;
}

.text-section {
  grid-area: text;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 80px 20px;
  font-family: "Satisfy", cursive;
  box-sizing: border-box;
  width: 100%;
  height: 90vh;
  background: #fdf6e3;
  overflow: hidden;
  position: relative;
}

.final-section {
  grid-area: final;
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #fdf6e3 0%, #fae8d3 50%, #f5d9b8 100%);
  padding: 80px 20px;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  word-wrap: break-word;
}

.final-content {
  text-align: center;
  max-width: 800px;
  width: 100%;
}

.final-text {
  font-family: "Satisfy", cursive;
  font-size: 2.5rem;
  color: #ff6b35;
  line-height: 1.4;
  margin-bottom: 60px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.final-char {
  display: inline-block;
  opacity: 0;
  transform: translateY(50px) rotateY(90deg);
}

.hearts-animation {
  display: flex;
  justify-content: center;
  gap: 30px;
  flex-wrap: wrap;
}

.heart {
  font-size: 3rem;
  opacity: 0;
  filter: drop-shadow(0 4px 8px rgba(255, 107, 53, 0.3));
  transition: transform 0.3s ease;
}

.heart:hover {
  transform: scale(1.3);
}

.animated-arrow {
  position: absolute;
  bottom: 200px;
  left: 50%;
  transform: translateX(-50%);
  color: #d4a373;
  opacity: 0;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;
}

.animated-arrow:hover {
  color: #b5835a;
  transform: translateX(-50%) scale(1.1);
}

.animated-arrow svg {
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

.envelope-container {
  position: relative;
  width: 100%;
  max-width: 500px;
  height: 300px;
  cursor: pointer;
  perspective: 800px;
  user-select: none;
  margin: 0 auto;
}

.envelope {
  position: absolute;
  width: 100%;
  height: 100%;
  background: #d4a373;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 1s ease;
  box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.2),
    0 10px 20px rgba(0, 0, 0, 0.3);
  z-index: 2;
  background-image: url("https://www.transparenttextures.com/patterns/paper-fibers.png");
  transform-style: preserve-3d;
}

.envelope .flap {
  position: absolute;
  top: 0;
  width: 100%;
  height: 50%;
  background: #c58b5b;
  clip-path: polygon(0 0, 50% 100%, 100% 0);
  transform-origin: top;
  background-image: url("https://www.transparenttextures.com/patterns/paper-fibers.png");
}

.envelope .body {
  width: 100%;
  height: 100%;
  background: #d4a373;
  background-image: url("https://www.transparenttextures.com/patterns/paper-fibers.png");
}

.envelope.hidden {
  opacity: 0;
  pointer-events: none;
}

.letter {
  position: absolute;
  bottom: 0;
  left: 0%;
  width: 100%;
  height: fit-content;
  background: #fff;
  border-radius: 4px;
  z-index: 1;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  transition: transform 1s ease;
  max-height: 80vh;
  overflow-y: auto;
  transform-style: preserve-3d;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.letter.focused {
  z-index: 10;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.4);
}

.content {
  opacity: 0;
  padding: 20px;
  font-family: "Satisfy", cursive;
  font-size: 1.3rem;
  line-height: 1.7;
  color: #3b2f2f;
  text-align: left;
  width: 100%;
  box-sizing: border-box;
}

.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
}

.photo {
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  width: 100%;
}

.photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}

.photo:hover img {
  transform: scale(1.1);
}

.split-text {
  font-size: 2rem;
  font-weight: 500;
  line-height: 1.6;
  color: #ff8930;
  max-width: 100%;
  width: 100%;
  padding: 0 10px;
  box-sizing: border-box;
  word-wrap: break-word;
}

.char {
  display: inline-block;
  opacity: 0;
  transform: translateY(20px);
}

.space {
  width: 0.4em;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.8s ease;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(30%);
}

.slide-up-enter-to {
  opacity: 1;
  transform: translateY(0);
}

/* Responsive adjustments para móvil */
@media (max-width: 768px) {
  .page-container {
    grid-template-rows: 100vh 80vh auto auto;
    width: 100vw;
    overflow-x: hidden;
  }
  
  .envelope-section {
    padding: 0 15px;
  }
  
  .text-section {
    padding: 40px 15px;
    height: 65vh;

  }
  
  .split-text {
    font-size: 1.5rem;
    line-height: 1.4;
    padding: 0 5px;
    
  }
  
  .final-text {
    font-size: 1.8rem;
    margin-bottom: 40px;
  }
  
  .heart {
    font-size: 2.5rem;
  }
  
  .hearts-animation {
    gap: 20px;
  }
  
  .gallery-section {
    padding: 60px 15px;
  }
  
  .gallery {
    grid-template-columns: 1fr;
    gap: 15px;
    padding: 0 10px;
  }
  
  .envelope-container {
    width: 90%;
    max-width: 300px;
    height: 180px;
  }
  
  .content {
    font-size: 1rem;
    padding: 15px;
    line-height: 1.5;
    word-wrap: break-word;
  }
  
  .letter {
    max-height: 70vh;
  }
  
  .animated-arrow {
    bottom: 50px;
  }
  
  .animated-arrow svg {
    width: 69px;
    height: 69px;
  }
}

@media (max-width: 400px) {
  .split-text {
    font-size: 1.3rem;
  }
  
  .final-text {
    font-size: 1.4rem;
  }
  
  .heart {
    font-size: 2rem;
  }
  
  .envelope-container {
    max-width: 280px;
    height: 160px;
  }
  
  .content {
    font-size: 0.9rem;
    padding: 12px;
  }
  
  .gallery {
    grid-template-columns: 1fr;
    gap: 12px;
  }
  
  .animated-arrow {
    bottom: 50px;
  }
  
  .animated-arrow svg {
    width: 69px;
    height: 69px;
  }
}

/* Prevenir scroll horizontal */
* {
  max-width: 100%;
}

section {
  width: 100%;
  overflow-x: hidden;
}
</style>
