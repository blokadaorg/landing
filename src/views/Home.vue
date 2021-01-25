<template>
    <div>

        <div class="position-relative">
            <!-- shape Hero -->
            <section class="section-shaped my-0">
                <div class="shape shape-style-4 shape-default shape-skew">
                    <span style="display:none;"></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div class="container shape-container d-flex">
                    <div class="col px-0">
                        <div class="row">
                            <div class="col-lg-6">
                                <h1 class="display-3  text-white">{{ $t('homepage hero title') }}
                                    <span>{{ $t('homepage hero subtitle') }}</span>
                                </h1>
                                <p class="lead text-white">{{ $t('homepage hero desc') }}</p>
                                <div class="btn-wrapper">
                                    <base-button tag="a"
                                                 href="#download"
                                                 class="mb-3 mb-sm-0"
                                                 type="warning"
                                                 icon="ni ni-cloud-download-95">
                                        {{ $t('universal action download') }}
                                    </base-button>
                                    <base-button tag="a"
                                                 href="#about"
                                                 class="mb-3 mb-sm-0"
                                                 type="white">
                                        {{ $t('universal action learn more') }}
                                    </base-button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <!-- 1st Hero Variation -->
        </div>
        <section class="section section-lg" id="about">
            <div class="container">
                <div class="row row-grid align-items-center">
                    <div class="col-md-5 col-lg-6 order-md-2">
                        <img src="img/ill/blokada-libre.png" class="img-fluid floating">
                    </div>
                    <div class="col-md-7 col-lg-6 order-md-1">
                        <div class="pr-md-5">
                            <h3>{{ $t('homepage about title') }}</h3>
                            <p>{{ $t('homepage about desc') }}</p>
                            <ul class="list-unstyled mt-5">
                                <li class="py-2">
                                    <div class="d-flex align-items-center">
                                        <badge type="warning" circle class="mr-3" icon="fas fa-check"></badge>
                                        <h6 class="mb-0">{{ $t('homepage about point one') }}</h6>
                                    </div>
                                </li>
                                <li class="py-2">
                                    <div class="d-flex align-items-center">
                                        <badge type="warning" circle class="mr-3" icon="fas fa-check"></badge>
                                        <h6 class="mb-0">{{ $t('homepage about point two') }}</h6>
                                    </div>
                                </li>
                                <li class="py-2">
                                    <div class="d-flex align-items-center">
                                        <badge type="warning" circle class="mr-3" icon="fas fa-check"></badge>
                                        <h6 class="mb-0">{{ $t('homepage about point three') }}</h6>
                                    </div>
                                </li>
                                <li class="py-2">
                                    <div class="d-flex align-items-center">
                                        <badge type="warning" circle class="mr-3" icon="fas fa-check"></badge>
                                        <h6 class="mb-0">{{ $t('homepage about point four') }}</h6>
                                    </div>
                                </li>
                                <li class="py-2">
                                    <div class="d-flex align-items-center">
                                        <badge type="warning" circle class="mr-3" icon="fas fa-check"></badge>
                                        <h6 class="mb-0">{{ $t('homepage about point five') }}</h6>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div>
                    <h6 class="mt-5"><a href="#faq" class="text-warning">{{ $t('homepage about action faq') }}</a></h6>
                </div>
            </div>
        </section>
        <section class="section section-lg" id="vpn">
            <div class="container">
                <div class="row row-grid align-items-center">
                    <div class="col-md-5 col-lg-6 order-md-1">
                        <img src="img/ill/blokada-plus.png" class="img-fluid floating">
                    </div>
                    <div class="col-md-7 col-lg-6 order-md-2">
                        <div class="pl-md-5">
                            <h3>{{ $t('homepage vpn title') }}</h3>
                            <p>{{ $t('homepage vpn desc') }}</p>
                            <ul class="list-unstyled mt-5">
                                <li class="py-2">
                                    <div class="d-flex align-items-center">
                                        <badge type="warning" circle class="mr-3" icon="fas fa-check"></badge>
                                        <h6 class="mb-0">{{ $t('homepage vpn point one') }}</h6>
                                    </div>
                                </li>
                                <li class="py-2">
                                    <div class="d-flex align-items-center">
                                        <badge type="warning" circle class="mr-3" icon="fas fa-check"></badge>
                                        <h6 class="mb-0">{{ $t('homepage vpn point two') }}</h6>
                                    </div>
                                </li>
                                <li class="py-2">
                                    <div class="d-flex align-items-center">
                                        <badge type="warning" circle class="mr-3" icon="fas fa-check"></badge>
                                        <h6 class="mb-0">{{ $t('homepage vpn point three') }}</h6>
                                    </div>
                                </li>
                                <li class="py-2">
                                    <div class="d-flex align-items-center">
                                        <badge type="warning" circle class="mr-3" icon="fas fa-check"></badge>
                                        <h6 class="mb-0">{{ $t('homepage vpn point four') }}</h6>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div>
                    <h6 class="mt-5"><a href="https://go.blokada.org/vpn" class="text-warning">{{ $t('homepage about action plus') }}</a></h6>
                </div>
            </div>
        </section>
        <section class="section section section-shaped my-0 overflow-hidden" id="download">
            <div class="shape shape-style-4 bg-gradient-warning shape-skew">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div class="container py-0">
                <div class="row row-grid align-items-center">
                    <div class="col-lg-12 order-lg-1">
                        <div class="d-flex px-md-3">
                            <div class="d-none d-lg-block">
                                <icon name="ni ni-cloud-download-95" size="lg" class="bg-gradient-white" color="default" shadow
                                      rounded></icon>
                            </div>
                            <div class="pl-md-4">
                                <h4 class="display-3 text-white">{{ $t('homepage download header') }}</h4>
                                <p class="text-white">{{ $t('homepage download subheader') }}</p>
                            </div>
                        </div>



                        <tabs fill class="flex-column flex-md-row">
                            <card shadow slot-scope="{activeTabIndex}">
                                <tab-pane key="tab1" color="default">
                                    <template slot="title" color="default">
                                        <i class="fab fa-android mr-2" color="default"></i>Android
                                    </template>

                                    <div class="d-flex px-md-3">
                                        <div class="d-none d-lg-block">
                                            <icon name="fab fa-android" gradient="warning" color="white" shadow
                                                rounded></icon>
                                        </div>
                                        <div class="pl-md-4">
                                            <h4 class="title">{{ $t('homepage download option android five') }}</h4>
                                            <p v-html="$t('homepage download desc android five')">{{ $t('homepage download desc android five') }} <a href="https://go.blokada.org/blokada5_vs_blokada4" class="text-warning">{{ $t('universal action learn more') }}</a></p>

                                            <div class="btn-wrapper">
                                                <base-button tag="a"
                                                        href="https://go.blokada.org/apk5"
                                                        class="mb-3 mb-sm-0"
                                                        type="warning"
                                                        icon="ni ni-cloud-download-95">
                                                    {{ $t('homepage download action android five') }}
                                                </base-button>
                                                <base-button tag="a"
                                                            href="https://go.blokada.org/apk5_beta"
                                                            class="mb-3 mb-sm-0"
                                                            type="white" v-html="$t('homepage download action android five beta')">
                                                    {{ $t('homepage download action android five beta') }}
                                                </base-button>
                                                <base-button tag="a"
                                                            href="https://go.blokada.org/fdroid5"
                                                            class="mb-3 mb-sm-0"
                                                            type="white">
                                                    {{ $t('homepage download action android four fdroid') }}
                                                </base-button>
                                            </div>
                                        </div>
                                    </div>

                                    <hr/>

                                    <div class="d-flex px-md-3">
                                        <div class="d-none d-lg-block">
                                            <icon name="fab fa-google-play" gradient="info" color="white" shadow
                                                rounded></icon>
                                        </div>
                                        <div class="pl-md-4">
                                            <h4 class="title">{{ $t('homepage download option android slim') }}</h4>
                                            <p v-html="$t('homepage download desc android slim')">{{ $t('homepage download desc android slim') }} <a href="https://go.blokada.org/slim_faq" class="text-warning">{{ $t('universal action learn more') }}</a></p>

                                            <div class="btn-wrapper">
                                                <base-button tag="a"
                                                        href="https://go.blokada.org/play"
                                                        class="mb-3 mb-sm-0"
                                                        type="info"
                                                        icon="fab fa-google-play">
                                                    {{ $t('homepage download action android slim') }}
                                                </base-button>
                                            </div>
                                        </div>
                                    </div>

                                    <hr/>

                                    <div class="d-flex px-md-3">
                                        <div class="d-none d-lg-block">
                                            <icon name="fas fa-robot" gradient="success" color="white" shadow
                                                rounded></icon>
                                        </div>
                                        <div class="pl-md-4">
                                            <h4 class="title">{{ $t('homepage download option android four') }}</h4>
                                            <p>{{ $t('homepage download desc android four')}}</p>

                                            <div class="btn-wrapper">
                                                <base-button tag="a"
                                                        href="https://go.blokada.org/apk4"
                                                        class="mb-3 mb-sm-0"
                                                        type="success"
                                                        icon="ni ni-cloud-download-95">
                                                    {{ $t('homepage download action android four') }}
                                                </base-button>
                                                <base-button tag="a"
                                                            href="https://go.blokada.org/fdroid"
                                                            class="mb-3 mb-sm-0"
                                                            type="white">
                                                    {{ $t('homepage download action android four fdroid') }}
                                                </base-button>
                                            </div>
                                        </div>
                                    </div>
                                </tab-pane>

                                <tab-pane key="tab2">
                                    <template slot="title">
                                        <i class="fab fa-apple mr-2"></i>iOS
                                    </template>

                                    <div class="d-flex px-md-3">
                                        <div class="d-none d-lg-block">
                                            <icon name="fab fa-apple" gradient="danger" color="white" shadow
                                                rounded></icon>
                                        </div>
                                        <div class="pl-md-4">
                                            <h4 class="title">{{ $t('homepage download option ios') }}</h4>
                                            <p>{{ $t('homepage download desc ios') }}</p>

                                            <div class="btn-wrapper">
                                                <base-button tag="a"
                                                        href="https://go.blokada.org/appstore"
                                                        class="mb-3 mb-sm-0"
                                                        type="danger"
                                                        icon="fab fa-apple">
                                                    {{ $t('homepage download action ios') }}
                                                </base-button>
                                            </div>
                                        </div>
                                    </div>
                                </tab-pane>

                                <tab-pane key="tab3">
                                    <template slot="title">
                                        <i class="fas fa-laptop mr-2"></i>{{ $t('account section header other') }}
                                    </template>

                                    <div class="d-flex px-md-3">
                                        <div class="d-none d-lg-block">
                                            <icon name="fas fa-laptop" gradient="dark" color="white" shadow
                                                rounded></icon>
                                        </div>
                                        <div class="pl-md-4">
                                            <h4 class="title">{{ $t('homepage download option other') }}</h4>
                                            <p>{{ $t('homepage download desc other')}}</p>
                                            <a href="https://go.blokada.org/other_platforms" class="text-warning">{{ $t('universal action learn more') }}</a>
                                        </div>
                                    </div>
                                </tab-pane>
                            </card>
                        </tabs>

                    </div>
                </div>
            </div>
        </section>
        <section class="section section-lg" id="community">
            <div class="container">
                <div class="row justify-content-center text-center mb-lg">
                    <div class="col-lg-8">
                        <h2 class="display-3">{{ $t('homepage community header')}}</h2>
                        <p class="lead text-muted">{{ $t('homepage community desc') }}</p>
                    </div>
                </div>

                <card gradient="success"
                      no-body
                      shadow-size="lg"
                      class="border-0">
                    <div class="p-4 p-md-5">
                        <div class="row align-items-center">
                            <div class="col-lg-8">
                                <h3 class="text-white">{{ $t('homepage community cta subheader')}}</h3>
                                <p class="lead text-white mt-3">{{ $t('homepage community cta desc')}}</p>
                            </div>
                            <div class="col-lg-3 ml-lg-auto">
                                <base-button tag="a" href="https://go.blokada.org/forum"
                                             type="white" block size="lg">
                                    {{ $t('homepage community cta action')}}
                                </base-button>
                            </div>
                        </div>
                    </div>
                </card>
            </div>
        </section>
        <section class="section section-lg pt-lg-0 mt-4" id="opinions">
            <div class="container">
                <div class="row justify-content-center text-center mb-lg">
                    <div class="col-lg-8">
                        <p class="lead text-muted">{{ $t('homepage community opinions') }}<br/><a href="https://go.blokada.org/opinions" class="text-warning">{{ $t('universal action learn more') }}</a></p>
                    </div>
                </div>

                <div class="row justify-content-center">
                    <div class="col-lg-12">
                        <div class="row row-grid">
                            <div class="col-lg-4" v-for="opinion in opinionsToShow" :key="opinion">
                                <card class="border-0" hover shadow body-classes="py-3">
                                    <p class="mt-4">
                                        <span class="text-warning"><i class="fas fa-star" /></span>
                                        <span class="text-warning"><i class="fas fa-star" /></span>
                                        <span class="text-warning"><i class="fas fa-star" /></span>
                                        <span class="text-warning"><i class="fas fa-star" /></span>
                                        <span class="text-warning"><i class="fas fa-star" /></span>
                                    </p>

                                    <p class="description mt-4">{{ opinion }}</p>
                                </card>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="section section-lg" id="faq">
            <div class="container">
                <div class="row row-grid justify-content-center">
                    <div class="col-lg-8 text-center">
                        <h2 class="display-3">{{ $t('homepage faq header')}}</h2>
                        <br/><br/>

                        <div class="col text-justify">
                            <h3>{{ $t('homepage faq title 1') }}</h3>
                            <p>{{ $t('homepage faq desc 1') }}</p>
                            <br/>

                            <h3>{{ $t('homepage faq title 2') }}</h3>
                            <p>{{ $t('homepage faq desc 2') }}</p>
                            <br/>

                            <h3>{{ $t('homepage faq title 3') }}</h3>
                            <p>{{ $t('homepage faq desc 3') }}</p>
                            <br/>

                            <h3>{{ $t('homepage faq title 4') }}</h3>
                            <p>{{ $t('homepage faq desc 4') }}</p>

                            <div>
                                <h6 class="mt-5"><a href="https://go.blokada.org/faq" class="text-warning">{{ $t('homepage faq action more') }}</a></h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="section section-shaped my-0 overflow-hidden" id="donate">
            <div class="shape shape-style-3 bg-gradient-default shape-skew">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div class="container pt-lg pb-300">
                <div class="row text-center justify-content-center">
                    <div class="col-lg-10">
                        <h2 class="display-3 text-white">{{ $t('homepage support header') }}</h2>
                        <p class="lead text-white">{{ $t('homepage support desc') }}</p>
                    </div>
                </div>
            </div>
        </section>
        <section class="section section-lg pt-lg-0 section-contact-us" id="crypto">
            <div class="container">
                <div class="row justify-content-center mt--300">
                    <div class="col-lg-8">
                        <card gradient="secondary" shadow body-classes="p-lg-5">
                            <h4 class="mb-1">{{ $t('homepage support cta header') }}</h4>
                            <p class="mt-0">{{ $t('homepage support cta desc') }}</p>

                            <p>{{ $t('homepage support cta desc more') }}</p>

                            <div class="row justify-content-center">
                                <div class="col-md-8 mt-3">
                                    <base-button type="default" round block size="lg" tag="a" href="https://go.blokada.org/donate">
                                        {{ $t('homepage support cta action')}}
                                    </base-button>
                                    <base-button type="white" round block size="lg" tag="a" @click.prevent="donateModal = true">
                                        {{ $t('homepage support cta action alt')}}
                                    </base-button>
                                </div>
                            </div>
                        </card>
                        <modal :show.sync="donateModal"
                            gradient="success"
                            modal-classes="modal-success modal-dialog-centered">
                            <h6 slot="header" class="modal-title" id="modal-title-notification">{{ $t('homepage support cta action alt')}}</h6>

                            <div class="text-center">
                                <p>{{ $t('payment donate disclaimer') }}</p>
                                <p class="small">{{ $t('payment euro desc') }}</p>

                                <hr />
                                <div class="row justify-content-center mb-3">
                                    <base-button class="col-2" type="primary" textColor="white" @click.prevent="donateAmount = 5">5 €</base-button>
                                    <base-button class="col-2" type="primary" textColor="white" @click.prevent="donateAmount = 10">10 €</base-button>
                                    <base-button class="col-2" type="primary" textColor="white" @click.prevent="donateAmount = 20">20 €</base-button>
                                    <base-button class="col-2" type="primary" textColor="white" @click.prevent="donateAmount = 50">50 €</base-button>
                                </div>

                                <form method="POST"  action="https://btcpay.blocka.net/api/v1/invoices" class="btcpay-form btcpay-form--block">
                                <input type="hidden" name="storeId" value="9zW6UzCqpL622q1M92tQtodLdug3ChSdLMqjLGmcph7i" />
                                <input type="hidden" name="price" :value="donateAmount" />
                                <input type="hidden" name="currency" value="EUR" />
                                <button type="submit" class="submit" name="submit" style="min-width:209px; min-height:57px; border-radius: 4px;border-style: none;background-color: #0f3b21;" alt="Pay with BtcPay, Self-Hosted Bitcoin Payment Processor"><span style="color:#fff">{{ paymentText() }} &nbsp;&nbsp;</span>
                                <img src="https://btcpay.blocka.net/img/logo.svg" style="height:57px;display:inline-block;padding: 5% 0 5% 5px;">
                                </button></form>

                                <hr />
                                <p class="text-monospace text-left small">
                                    BTC: 16rJ49uNKCohVhHvWNganP6Y48Ba9BTyKd<br/>
                                    ETH: 0x91F94632B8269F92E6B41E016458EeA682a10395<br/>
                                    LTC: LNThTbPqgFiAg9yzG31BXQ5QYwfBbH8NC9
                                </p>
                                <hr />

                                <p class="text-monospace text-left small">
                                    IBAN: SE79 5000 0000 0508 0822 7432<br/>
                                    BIC: ESSESESS<br/>
                                    NAME: Blocka AB<br/>
                                    TITLE: Blokada donation
                                </p>
                            </div>

                            <template slot="footer">
                                <base-button type="link"
                                            text-color="white"
                                            class="ml-auto"
                                            @click="donateModal = false">
                                    {{ $t('universal action close') }}
                                </base-button>
                            </template>
                        </modal>
                    </div>
                </div>
            </div>
        </section>
        <section class="section section-lg" id="developer">
            <div class="container">
                <div class="row row-grid justify-content-center">
                    <div class="col-lg-8 text-center">
                        <h2 class="display-3">{{ $t('homepage developer header')}}
                            <span class="text-success">{{ $t('homepage developer subheader') }}</span>
                        </h2>
                        <p class="lead">{{ $t('homepage developer desc') }}</p>

                        <br/><br/>
                        <base-button tag="a"
                            href="https://go.blokada.org/dev_home"
                            class="mb-3 mb-sm-0"
                            type="default"
                            icon="fab fa-github">
                            {{ $t('homepage developer action')}}
                        </base-button>
                    </div>
                </div>
            </div>
        </section>

    </div>
</template>
<script>
  import Tabs from "@/components/Tabs/Tabs.vue";
  import TabPane from "@/components/Tabs/TabPane.vue";
  import Modal from "@/components/Modal.vue";

  export default {
    name: "home",
    components: {
      Tabs,
      TabPane,
      Modal
    },
    data() {
      return {
        opinions: [
          "Thanks for it. It totally solved the problem. Not a single ad. I tried some other apps /games from playstore which are known to have most annoying ads, but I didn’t see a single type of ad in any form. I didn’t know that it was my system’s fault, but thanks to Blokada now I’m ad free.",
          "A world without blokada is desolate, annoying and too full.",
          "My parents are phone shopping and yes this is a selling point that it works with Blokada as dad said so.",
          "Just tested v5 today and speeds are nearly identical. Looks like v5 brought a performance boost.",
          "I installed the v5 over the app and it went smoothly. No reset and the new ui is… Big. Great app, much thanks to the devs.",
          "Best app till now. Installed on all my phones.",
          "And thanks for making this free app in the first place, it’s a lifesaver.",
          "IMO v5 is better organized compared to v4. all main actions are visible in bottom toolbar view.",
          "Huge reason why I love this app now. Lots of battery left with 3 hours of SOT so far.",
          "By the way VPN works flawlessly. It’s nice to have both working (blocking ads and using vpn).",
          "To the developers: THANK YOU for releasing an iOS version of Blokada! This is the app I missed most when I migrated to iOS, and to top it off this is running on iOS 14 Beta 4!"
        ],
        donateModal: false,
        donateAmount: 10
      }
    },
    computed: {
      opinionsToShow() {
        const size = this.opinions.length
        const startIndex = Math.floor(Math.random() * (size - 3 + 1));
        return this.opinions.slice(startIndex, startIndex + 3)
      }
    },
    methods: {
      paymentText() {
        let price = `${this.donateAmount} €`;
        return this.$t("payment action pay", [price]);
      }
    },
    created() {
        if (this.$route.hash == "#crypto") {
            this.donateModal = true
        }
    }
  };
</script>
