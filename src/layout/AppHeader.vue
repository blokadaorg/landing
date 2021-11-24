<template>
    <header class="header-global">
        <base-nav class="navbar-main" transparent type="" effect="light" expand>
            <router-link slot="brand" class="navbar-brand mr-lg-5" to="/">
                <img src="img/brand/white.png" alt="logo">
            </router-link>

            <div class="row" slot="content-header" slot-scope="{closeMenu}">
                <div class="col-6 collapse-brand">
                    <img src="img/brand/blue.png">
                </div>
                <div class="col-6 collapse-close">
                    <close-button @click="closeMenu"></close-button>
                </div>
            </div>

            <ul class="navbar-nav navbar-nav-hover align-items-lg-center">
                <base-dropdown class="nav-item" menu-classes="dropdown-menu-xl">
                    <a slot="title" href="#" class="nav-link" data-toggle="dropdown" role="button">
                        <i class="ni ni-ui-04 d-lg-none mr-2"></i>
                        <span class="nav-link-inner--text">{{ $t('account action about') }}</span>
                    </a>
                    <div class="dropdown-menu-inner">
                        <a href="#about"
                           class="media d-flex align-items-center">
                            <div class="icon icon-shape bg-gradient-info rounded-circle text-white">
                                <i class="fas fa-info"></i>
                            </div>
                            <div class="media-body ml-3">
                                <h6 class="heading mb-md-1">{{ $t('homepage header what is blokada') }}</h6>
                                <p class="description d-none d-md-inline-block mb-0">{{ $t('homepage desc what is blokada') }}</p>
                            </div>
                        </a>
                        <a href="#download"
                           class="media d-flex align-items-center">
                            <div class="icon icon-shape bg-gradient-warning rounded-circle text-white">
                                <i class="fas fa-cloud-download-alt"></i>
                            </div>
                            <div class="media-body ml-3">
                                <h5 class="heading mb-md-1">{{ $t('universal action download') }}</h5>
                                <p class="description d-none d-md-inline-block mb-0">{{ $t('homepage desc download') }}</p>
                            </div>
                        </a>
                        <a href="#community"
                           class="media d-flex align-items-center">
                            <div class="icon icon-shape bg-gradient-success rounded-circle text-white">
                                <i class="fas fa-comments"></i>
                            </div>
                            <div class="media-body ml-3">
                                <h5 class="heading mb-md-1">{{ $t('universal action community') }}</h5>
                                <p class="description d-none d-md-inline-block mb-0">{{ $t('homepage desc community') }}</p>
                            </div>
                        </a>
                        <a href="#donate"
                           class="media d-flex align-items-center">
                            <div class="icon icon-shape bg-gradient-primary rounded-circle text-white">
                                <i class="fas fa-heart"></i>
                            </div>
                            <div class="media-body ml-3">
                                <h5 class="heading mb-md-1">{{ $t('homepage header support') }}</h5>
                                <p class="description d-none d-md-inline-block mb-0">{{ $t('homepage desc support') }}</p>
                            </div>
                        </a>
                    </div>
                </base-dropdown>
                <base-dropdown tag="li" class="nav-item">
                    <a slot="title" href="#" class="nav-link" data-toggle="dropdown" role="button">
                        <i class="ni ni-collection d-lg-none mr-2"></i>
                        <span class="nav-link-inner--text">{{ $t('universal action more') }}</span>
                    </a>
                    <a href="#faq" class="dropdown-item">{{ $t('homepage action faq') }}</a>
                    <a href="#cloud" class="dropdown-item">{{ $t('homepage action cloud') }}</a>
                    <a href="#vpn" class="dropdown-item">{{ $t('homepage action vpn') }}</a>
                    <a href="#opinions" class="dropdown-item">{{ $t('homepage action opinions') }}</a>
                    <a href="#developer" class="dropdown-item">{{ $t('homepage action source') }}</a>
                    <a href="https://go.blokada.org/credits" class="dropdown-item">{{ $t('homepage action authors') }}</a>
                    <a href="https://go.blokada.org/terms" class="dropdown-item">{{ $t('payment action terms') }}</a>
                    <a href="https://go.blokada.org/privacy" class="dropdown-item">{{ $t('payment action policy') }}</a>
                </base-dropdown>
            </ul>
            <ul class="navbar-nav align-items-lg-center ml-lg-auto">
                <li class="nav-item">
                    <a class="nav-link nav-link-icon" href="https://go.blokada.org/forum" rel="noopener"
                       data-toggle="tooltip" :title="$t('homepage action forums')">
                        <i class="ni fas fa-comments"></i>
                        <span class="nav-link-inner--text d-lg-none ml-2">{{ $t('homepage action forums') }}</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link nav-link-icon" href="https://app.blokada.org"
                       rel="noopener" data-toggle="tooltip" :title="$t('homepage action dashboard')">
                        <i class="ni fas fa-user-circle"></i>
                        <span class="nav-link-inner--text d-lg-none ml-2">{{ $t('homepage action dashboard') }}</span>
                    </a>
                </li>
                <li class="nav-item ml-lg-4">
                  <a href="#" rel="noopener" @click.prevent="modal = true"
                    class="nav-link nav-link-icon" data-toggle="tooltip" :title="$t('app settings language label')">
                    <i class="ni fas fa-flag"></i>
                    <span class="nav-link-inner--text ml-2">{{ $i18n.locale.toUpperCase() }}</span>
                  </a>
                </li>
                <li class="nav-item d-none d-lg-block ml-lg-4">
                    <a href="#download" rel="noopener"
                       class="btn btn-neutral btn-icon">
                        <span class="btn-inner--icon">
                          <i class="fas fa-cloud-download-alt mr-2"></i>
                        </span>
                        <span class="nav-link-inner--text">{{ $t('universal action download') }}</span>
                    </a>
                </li>
            </ul>
        </base-nav>
        <modal :show.sync="modal">
          <h6 slot="header" class="modal-title" id="modal-title-default">{{ $t('app settings language label') }}</h6>

          <div class="custom-control custom-radio mb-3" v-for="lang in langs" :key="lang" @click="saveLocale(lang)">
            <input name="language" class="custom-control-input" :id="lang" type="radio">
            <label class="custom-control-label" :for="lang">{{ langNames[lang] }}</label>
          </div>

          <template slot="footer">
            <base-button type="link" class="ml-auto" @click="modal = false">{{ $t('universal action cancel') }}</base-button>
          </template>
        </modal>
    </header>
</template>
<script>
  import BaseNav from "@/components/BaseNav";
  import BaseDropdown from "@/components/BaseDropdown";
  import CloseButton from "@/components/CloseButton";
  import Modal from "@/components/Modal.vue";

  export default {
    components: {
      BaseNav,
      CloseButton,
      BaseDropdown,
      Modal
    },
    data () {
      return {
        modal: false,
        langs: [
            "bg", "cs", "de", "en", "es", "fr", "id", "it", "ja", "hu", "nl", "pl", "pt-BR", "ro", "ru", "fi", "sv", "tr", "zh-Hant"
        ],
        langNames: {
            "en": "English",
            "pl": "Polski",
            "de": "Deutsch",
            "es": "Español",
            "it": "Italiano",
            "hi": "हिन्दी",
            "ru": "Pусский",
            "bg": "Български",
            "tr": "Türk",
            "ja": "日本語",
            "id": "bahasa Indonesia",
            "cs": "Český",
            "zh-Hant": "中文 (繁體)",
            "ar": "عربى",
            "fi": "Suomalainen",
            "ro": "Română",
            "pt-BR": "Portugues (Brasil)",
            "fr": "Français",
            "hu": "Magyar",
            "nl": "Nederlands",
            "sv": "Svenska"
        }
      }
    },
    methods: {
      saveLocale(lang) {
        console.log(`Changed locale: ${lang}`)
        this.$i18n.locale = lang
        sessionStorage.setItem("blokada_locale", lang)
        this.modal = false
      }
    }
  };
</script>