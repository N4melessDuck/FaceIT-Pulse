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
            <li v-for="(item, index) in t('landing.features.liveMatch.list')" :key="index">{{ item }}</li>
          </ul>
        </div>
        <div class="feature-screenshot">
          <div class="screenshot-placeholder">
            <span>{{ t('landing.screenshots.liveMatch') }}</span>
          </div>
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
            <li v-for="(item, index) in t('landing.features.stats.list')" :key="index">{{ item }}</li>
          </ul>
        </div>
        <div class="feature-screenshot">
          <div class="screenshot-placeholder">
            <span>{{ t('landing.screenshots.stats') }}</span>
          </div>
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
            <li v-for="(item, index) in t('landing.features.history.list')" :key="index">{{ item }}</li>
          </ul>
        </div>
        <div class="feature-screenshot">
          <div class="screenshot-placeholder">
            <span>{{ t('landing.screenshots.history') }}</span>
          </div>
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
            <li v-for="(item, index) in t('landing.features.customization.list')" :key="index">{{ item }}</li>
          </ul>
        </div>
        <div class="feature-screenshot">
          <div class="screenshot-placeholder">
            <span>{{ t('landing.screenshots.settings') }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works -->
    <section class="how-it-works-section">
      <h2 class="section-title">{{ t('landing.howItWorks.title') }}</h2>
      <div class="steps">
        <div class="step" v-for="(step, index) in t('landing.howItWorks.steps')" :key="index">
          <div class="step-number">{{ index + 1 }}</div>
          <h3 class="step-title">{{ step.title }}</h3>
          <p class="step-description">{{ step.description }}</p>
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
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'

const { t } = useI18n()
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
}
</style>
