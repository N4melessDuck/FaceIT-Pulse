<template>
  <div class="landing-page">
    <!-- Language Switcher -->
    <div class="lang-switcher-container">
      <LanguageSwitcher />
    </div>

    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">{{ t('landing.hero.title') }}</h1>
        <p class="hero-subtitle">
          {{ t('landing.hero.subtitle') }}
        </p>
        
        <div class="hero-features">
          <div class="hero-feature">
            <svg class="feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
            <span>{{ t('landing.hero.features.noRegistration') }}</span>
          </div>
          <div class="hero-feature">
            <svg class="feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
            <span>{{ t('landing.hero.features.instantLaunch') }}</span>
          </div>
          <div class="hero-feature">
            <svg class="feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
            </svg>
            <span>{{ t('landing.hero.features.simpleSetup') }}</span>
          </div>
        </div>

        <router-link to="/settings" class="cta-button">
          {{ t('landing.hero.cta') }}
        </router-link>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features-section">
      <h2 class="section-title">{{ t('landing.features.title') }}</h2>
      
      <!-- Feature: Live Match -->
      <div class="feature-block">
        <div class="feature-text">
          <h3 class="feature-title">{{ t('landing.features.liveMatch.title') }}</h3>
          <p class="feature-description">
            {{ t('landing.features.liveMatch.description') }}
          </p>
          <ul class="feature-list">
            <li v-for="(item, index) in liveMatchList" :key="index">{{ item }}</li>
          </ul>
        </div>
        <div class="feature-screenshot">
          <img 
            src="https://github.com/user-attachments/assets/e186427e-455b-4643-a3aa-a9280e899e62" 
            :alt="t('landing.screenshots.liveMatch')"
            class="screenshot-image"
          />
        </div>
      </div>

      <!-- Feature: Stats Cards -->
      <div class="feature-block reverse">
        <div class="feature-text">
          <h3 class="feature-title">{{ t('landing.features.stats.title') }}</h3>
          <p class="feature-description">
            {{ t('landing.features.stats.description') }}
          </p>
          <ul class="feature-list">
            <li v-for="(item, index) in statsList" :key="index">{{ item }}</li>
          </ul>
        </div>
        <div class="feature-screenshot">
          <img 
            src="https://github.com/user-attachments/assets/f1a3b0c8-8349-4604-9b16-1a94e2af45d2" 
            :alt="t('landing.screenshots.stats')"
            class="screenshot-image"
          />
        </div>
      </div>

      <!-- Feature: Recent Matches -->
      <div class="feature-block">
        <div class="feature-text">
          <h3 class="feature-title">{{ t('landing.features.history.title') }}</h3>
          <p class="feature-description">
            {{ t('landing.features.history.description') }}
          </p>
          <ul class="feature-list">
            <li v-for="(item, index) in historyList" :key="index">{{ item }}</li>
          </ul>
        </div>
        <div class="feature-screenshot">
          <img 
            src="https://github.com/user-attachments/assets/70df6955-cb53-4df7-9346-ecc7bc343964" 
            :alt="t('landing.screenshots.history')"
            class="screenshot-image"
          />
        </div>
      </div>

      <!-- Feature: Customization -->
      <div class="feature-block reverse">
        <div class="feature-text">
          <h3 class="feature-title">{{ t('landing.features.customization.title') }}</h3>
          <p class="feature-description">
            {{ t('landing.features.customization.description') }}
          </p>
          <ul class="feature-list">
            <li v-for="(item, index) in customizationList" :key="index">{{ item }}</li>
          </ul>
        </div>
        <div class="feature-screenshot">
          <img 
            src="https://github.com/user-attachments/assets/0d5c5469-52f7-4960-9b0d-ad59631850e4" 
            :alt="t('landing.screenshots.settings')"
            class="screenshot-image"
          />
        </div>
      </div>
    </section>

    <!-- How It Works -->
    <section class="how-it-works-section">
      <h2 class="section-title">{{ t('landing.howItWorks.title') }}</h2>
      <div class="steps">
        <div class="step" v-for="(step, index) in howItWorksSteps" :key="index">
          <div class="step-number">{{ index + 1 }}</div>
          <h3 class="step-title">{{ step.title }}</h3>
          <p class="step-description">{{ step.description }}</p>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section class="contact-section">
      <div class="contact-container">
        <div class="contact-icon">💬</div>
        <h3 class="contact-title">{{ t('landing.contact.title') }}</h3>
        <p class="contact-description">
          {{ t('landing.contact.description') }}
        </p>
        <div class="contact-links">
          <a 
            href="https://t.me/nameIess_0" 
            target="_blank" 
            rel="noopener noreferrer"
            class="contact-link"
          >
            <svg fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121L7.78 13.73l-2.955-.924c-.64-.203-.654-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.827z"/>
            </svg>
            <span>{{ t('landing.contact.telegram') }}</span>
          </a>
          <a 
            href="https://x.com/N4melessDuck" 
            target="_blank" 
            rel="noopener noreferrer"
            class="contact-link"
          >
            <svg fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
            <span>{{ t('landing.contact.twitter') }}</span>
          </a>
        </div>
      </div>
    </section>

    <!-- Footer CTA -->
    <section class="footer-cta">
      <h2 class="cta-title">{{ t('landing.footerCta.title') }}</h2>
      <p class="cta-description">{{ t('landing.footerCta.description') }}</p>
      <router-link to="/settings" class="cta-button large">
        {{ t('landing.footerCta.button') }}
      </router-link>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'

const { t, tm } = useI18n()

// Получаем массивы для списков
const liveMatchList = computed(() => tm('landing.features.liveMatch.list') as string[])
const statsList = computed(() => tm('landing.features.stats.list') as string[])
const historyList = computed(() => tm('landing.features.history.list') as string[])
const customizationList = computed(() => tm('landing.features.customization.list') as string[])
const howItWorksSteps = computed(() => tm('landing.howItWorks.steps') as Array<{ title: string; description: string }>)
</script>

<style scoped>
.landing-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  color: #fff;
  position: relative;
}

/* Language Switcher */
.lang-switcher-container {
  position: fixed;
  top: 2rem;
  right: 2rem;
  z-index: 100;
}

/* Hero Section */
.hero-section {
  min-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
}

.hero-content {
  max-width: 800px;
}

.hero-title {
  font-size: 4rem;
  font-weight: 800;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 1.5rem;
  color: #94a3b8;
  margin-bottom: 3rem;
}

.hero-features {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.hero-feature {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.1rem;
  color: #cbd5e1;
}

.feature-icon {
  width: 24px;
  height: 24px;
  color: #ff6b35;
}

.cta-button {
  display: inline-block;
  padding: 1rem 2.5rem;
  background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
  color: white;
  text-decoration: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1.1rem;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3);
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 107, 53, 0.4);
}

.cta-button.large {
  padding: 1.25rem 3rem;
  font-size: 1.25rem;
}

/* Features Section */
.features-section {
  padding: 5rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 4rem;
  color: #fff;
}

.feature-block {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin-bottom: 5rem;
  align-items: center;
}

.feature-block.reverse {
  direction: rtl;
}

.feature-block.reverse > * {
  direction: ltr;
}

.feature-text {
  padding: 1rem;
}

.feature-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #fff;
}

.feature-description {
  font-size: 1.1rem;
  color: #94a3b8;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.feature-list {
  list-style: none;
  padding: 0;
}

.feature-list li {
  padding: 0.5rem 0;
  padding-left: 1.5rem;
  position: relative;
  color: #cbd5e1;
}

.feature-list li::before {
  content: "→";
  position: absolute;
  left: 0;
  color: #ff6b35;
  font-weight: bold;
}

.feature-screenshot {
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.screenshot-image {
  width: 100%;
  height: auto;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s, box-shadow 0.3s;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.screenshot-image:hover {
  transform: scale(1.02);
  box-shadow: 0 12px 48px rgba(255, 107, 53, 0.2);
}

.screenshot-placeholder {
  width: 100%;
  height: 100%;
  min-height: 300px;
  background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px dashed #475569;
  color: #64748b;
  font-size: 1.1rem;
}

/* How It Works */
.how-it-works-section {
  padding: 5rem 2rem;
  background: rgba(15, 23, 42, 0.5);
}

.steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
  max-width: 1000px;
  margin: 0 auto;
}

.step {
  text-align: center;
}

.step-number {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 auto 1rem;
}

.step-title {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #fff;
}

.step-description {
  color: #94a3b8;
}

/* Footer CTA */
.footer-cta {
  padding: 5rem 2rem;
  text-align: center;
}

.cta-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.cta-description {
  font-size: 1.2rem;
  color: #94a3b8;
  margin-bottom: 2rem;
}

/* Responsive */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1.2rem;
  }

  .hero-features {
    flex-direction: column;
    align-items: center;
  }

  .feature-block,
  .feature-block.reverse {
    grid-template-columns: 1fr;
    direction: ltr;
  }

  .section-title {
    font-size: 2rem;
  }

  .feature-title {
    font-size: 1.5rem;
  }

  .steps {
    grid-template-columns: 1fr;
  }

  .lang-switcher-container {
    top: 1rem;
    right: 1rem;
  }

  .contact-links {
    flex-direction: column;
    gap: 0.75rem;
  }

  .contact-link {
    width: 100%;
  }
}

/* Contact Section */
.contact-section {
  padding: 4rem 2rem;
  display: flex;
  justify-content: center;
}

.contact-container {
  max-width: 600px;
  text-align: center;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 3rem 2rem;
  transition: transform 0.3s, box-shadow 0.3s;
}

.contact-container:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 32px rgba(255, 107, 53, 0.2);
}

.contact-icon {
  font-size: 3rem;
  margin-bottom: 1.5rem;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

.contact-title {
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.contact-description {
  font-size: 1.1rem;
  color: #94a3b8;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.contact-links {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.contact-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1.75rem;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s;
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid rgba(255, 255, 255, 0.1);
  color: #cbd5e1;
  backdrop-filter: blur(10px);
}

.contact-link svg {
  width: 1.5rem;
  height: 1.5rem;
  transition: all 0.3s;
}

.contact-link:hover {
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 107, 53, 0.5);
  box-shadow: 0 6px 20px rgba(255, 107, 53, 0.2);
  color: #ff6b35;
}

.contact-link:hover svg {
  color: #ff6b35;
  transform: scale(1.1);
}
</style>
