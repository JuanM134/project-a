<template>
  <div class="page-container">
    <!-- 📨 Sección del sobre -->
    <section class="envelope-section">
      <div class="envelope-container" @click="handleClick">
        <!-- Sobre -->
        <div class="envelope" :class="{ open: isOpen, hidden: showLetterOnly }">
          <div class="flap"></div>
          <div class="body"></div>
        </div>

        <!-- Carta -->
        <transition name="slide-up">
          <div v-if="isOpen" class="letter" :class="{ focused: showLetterOnly }">
            <div class="content">
              <h2>Querida mía...</h2>
              <p>
                Aunque no lo parezca, ha pasado un año ya desde aquella noche en el tejado....<br/><br/>
                Un año lleno de momentos inolvidables a tu lado y de aprendizajes, crecimientos y risas,
                de desvelos y sueños compartidos... Un año en el que aprendí a amar de una forma tan bonita
                y única, que solo tú has podido enseñarme...
                Gracias por ser guía y primera vez en tantas cosas, gracias por llegar a mi vida y llenarlo de colores,
                gracias por ser inspiración, por apoyarme y por entenderme cuando más lo necesité...
                Gracias por permitirme amarte y por darme un amor que no deja de crecer con cada día que pasa.
                <br/><br/>
                Gracias mi angelita bella y sobre todo gracias a Dios por haberme dado una bendición tan grande
                como tú... Te amo con todo mi corazón y muy importante <br/><br/>!Felíz Primer aniversario mi vida!
              </p>
            </div>
          </div>
        </transition>
      </div>
    </section>

    <!-- ✨ Sección de texto animado -->
    <section class="text-section">
      <h1 ref="animatedText" class="split-text">
        La vida está llena de tantos <br/>momentos que se vuelven  <br/>eternos a tu lado...
        <br/><br/>Por estos y muchos más!!!
      </h1>
    </section>

    <!-- 🖼️ Galería de imágenes -->
    <section class="gallery-section">
      <div class="gallery">
        <div
          v-for="(photo, index) in photos"
          :key="index"
          class="photo"
          :ref="el => photoRefs[index] = el"
        >
          <img :src="photo" alt="Foto" />
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
// ... importa todas tus demás imágenes de la misma forma

// ------------------ Importación de audio ------------------
import mainAudio from "@/assets/audio/1.mp3";

gsap.registerPlugin(ScrollTrigger);

const isOpen = ref(false);
const showLetterOnly = ref(false);
const animatedText = ref<HTMLHeadingElement | null>(null);
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

const handleClick = () => {
  if (!isOpen.value) {
    isOpen.value = true;
  } else if (!showLetterOnly.value) {
    showLetterOnly.value = true;
  }
};

// Animación del sobre
watch(isOpen, (newVal) => {
  if (newVal) {
    gsap.to(".flap", { rotateX: 180, duration: 0.8, transformOrigin: "top" });
    gsap.to(".letter", { y: "-1%", duration: 1, delay: 0.3 });

    gsap.from(".content p, .content h2", {
      opacity: 0,
      y: 10,
      stagger: 0.3,
      duration: 1.2,
      delay: 1,
      ease: "power3.out",
    });
  }
});

// Cuando se muestra solo la carta
watch(showLetterOnly, (newVal) => {
  if (newVal) {
    gsap.to(".envelope", { opacity: 0, duration: 1 });
    gsap.to(".letter", { y: "35%", duration: 1 });
    gsap.to(".content", { opacity: 1, duration: 1, delay: 0.5 });
  }
});

// === Animaciones de scroll y audio ===
onMounted(async () => {
  await nextTick();

  // Fotos con ScrollTrigger
  photoRefs.forEach((el, i) => {
    gsap.from(el, {
      opacity: 0,
      y: 100,
      duration: 15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 70%",
        end: "bottom 30%",
        toggleActions: "play none none reverse",
      },
      delay: i * 0.1,
    });
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
    const textSection = document.querySelector(".text-section");

    gsap.from(chars, {
      opacity: 0,
      y: 60,
      stagger: 0.05,
      duration: 2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: textSection,
        start: "top 50%",
        toggleActions: "play none none none",
        markers: false,
        once: true,
      },
    });
  }

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
  }, 20000);
});
</script>

<style scoped>
.page-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background:  #fdf6e3 ;
}

.envelope-section {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.gallery-section {
  width: 100%;
  padding: 100px 20px;
  background:  #fdf6e3 ;
}

.text-section {
  min-height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 100px 40px;
  font-family: "Satisfy", cursive;
  box-sizing: border-box;
  width: 100%;
   background:  #fdf6e3 ;
  height: 100vh;
}

.envelope-container {
  position: relative;
  width: 370px;
  height: 220px;
  cursor: pointer;
  perspective: 800px;
  user-select: none;
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
}

.letter.focused {
  z-index: 5;
  padding-top: -50%;
}

.content {
  opacity: 0;
  padding: 20px;
  font-family: "Satisfy", cursive;
  font-size: 1.3rem;
  line-height: 1.7;
  color: #3b2f2f;
  text-align: left;
}

.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  max-width: 1200px;
  margin: 0 auto;
}

.photo {
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
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
  color: #4b3b2f;
  max-width: 90vw;
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
</style>
