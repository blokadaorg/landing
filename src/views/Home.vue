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
                                <h1 class="display-3  text-white">The privacy app
                                    <span>free and open source</span>
                                </h1>
                                <p class="lead  text-white">Blokada is the popular ad blocker and privacy app for Android and iOS. It's being supported and actively developed by the amazing open source community.</p>
                                <div class="btn-wrapper">
                                    <base-button tag="a"
                                                 href="#download"
                                                 class="mb-3 mb-sm-0"
                                                 type="warning"
                                                 icon="ni ni-cloud-download-95">
                                        Download
                                    </base-button>
                                    <base-button tag="a"
                                                 href="#about"
                                                 class="mb-3 mb-sm-0"
                                                 type="white">
                                        Learn More
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
                        <img src="img/ill/android-phones.png" class="img-fluid floating">
                    </div>
                    <div class="col-md-7 col-lg-6 order-md-1">
                        <div class="pr-md-5">
                            <h3>Blokada 5, the ad blocker</h3>
                            <p>If you want to efficiently block ads, trackers, malware, save on your data plan, speed up your device and protect your privacy with just one application, then Blokada is for you. It is free, secure and open source.</p>
                            <ul class="list-unstyled mt-5">
                                <li class="py-2">
                                    <div class="d-flex align-items-center">
                                        <badge type="warning" circle class="mr-3" icon="fas fa-check"></badge>
                                        <h6 class="mb-0">Blocks ads & trackers</h6>
                                    </div>
                                </li>
                                <li class="py-2">
                                    <div class="d-flex align-items-center">
                                        <badge type="warning" circle class="mr-3" icon="fas fa-check"></badge>
                                        <h6 class="mb-0">Works for all apps and the browser</h6>
                                    </div>
                                </li>
                                <li class="py-2">
                                    <div class="d-flex align-items-center">
                                        <badge type="warning" circle class="mr-3" icon="fas fa-check"></badge>
                                        <h6 class="mb-0">Requires no root or jailbreak</h6>
                                    </div>
                                </li>
                                <li class="py-2">
                                    <div class="d-flex align-items-center">
                                        <badge type="warning" circle class="mr-3" icon="fas fa-check"></badge>
                                        <h6 class="mb-0">Built in VPN for better protection</h6>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div>
                    <h6 class="mt-5"><a href="https://go.blokada.org/vpn" class="text-warning">Learn more about Blokada Plus</a></h6>
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
                                <h4 class="display-3 text-white">Download Blokada</h4>
                                <p class="text-white">Blokada is available for several platforms, choose yours.</p>
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
                                            <h4 class="title">Blokada 5 for Android</h4>
                                            <p>This is our new, recommended version <b>for smartphones and tablets with Android 7 or newer</b>. It is simpler and faster compared to Blokada 4 (<a href="https://go.blokada.org/blokada5_vs_blokada4" class="text-warning">read more</a>).</p>

                                            <div class="btn-wrapper">
                                                <base-button tag="a"
                                                        href="https://go.blokada.org/apk5"
                                                        class="mb-3 mb-sm-0"
                                                        type="warning"
                                                        icon="ni ni-cloud-download-95">
                                                    Download Blokada 5 .apk
                                                </base-button>
                                                <base-button tag="a"
                                                            href="https://go.blokada.org/apk5_beta"
                                                            class="mb-3 mb-sm-0"
                                                            type="white">
                                                    Get Beta .apk
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
                                            <h4 class="title">Blokada 5 Slim for Android</h4>
                                            <p>Blokada Slim is a <b>lightweight version of the app</b>, and it only contains features allowed by the Google Play policy (<a href="https://go.blokada.org/slim_faq" class="text-warning">read more</a>).</p>

                                            <div class="btn-wrapper">
                                                <base-button tag="a"
                                                        href="https://go.blokada.org/play"
                                                        class="mb-3 mb-sm-0"
                                                        type="info"
                                                        icon="fab fa-google-play">
                                                    Get it on Google Play
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
                                            <h4 class="title">Blokada 4 for Android</h4>
                                            <p>We still maintain the older version of Blokada. It has more features, and works on older devices, and TVs.</p>

                                            <div class="btn-wrapper">
                                                <base-button tag="a"
                                                        href="https://go.blokada.org/apk4"
                                                        class="mb-3 mb-sm-0"
                                                        type="success"
                                                        icon="ni ni-cloud-download-95">
                                                    Download Blokada 4 .apk
                                                </base-button>
                                                <base-button tag="a"
                                                            href="https://go.blokada.org/fdroid"
                                                            class="mb-3 mb-sm-0"
                                                            type="white">
                                                    Get it on F-Droid
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
                                            <h4 class="title">Blokada 5 for iOS</h4>
                                            <p>Blokada 5 is simply available on App Store.</p>

                                            <div class="btn-wrapper">
                                                <base-button tag="a"
                                                        href="https://go.blokada.org/appstore"
                                                        class="mb-3 mb-sm-0"
                                                        type="danger"
                                                        icon="fab fa-apple">
                                                    Get it on App Store
                                                </base-button>
                                            </div>
                                        </div>
                                    </div>
                                </tab-pane>

                                <tab-pane key="tab3">
                                    <template slot="title">
                                        <i class="fas fa-laptop mr-2"></i>Other
                                    </template>

                                    <div class="d-flex px-md-3">
                                        <div class="d-none d-lg-block">
                                            <icon name="fas fa-laptop" gradient="dark" color="white" shadow
                                                rounded></icon>
                                        </div>
                                        <div class="pl-md-4">
                                            <h4 class="title">Blokada for other platforms</h4>
                                            <p>Currently, we do not provide Blokada for other platforms. However, if you are Blokada Plus user, you can use our VPN on Windows, Linux, Mac, and other platforms where Wireguard is available.</p>
                                            <a href="https://go.blokada.org/other_platforms" class="text-warning">Learn more</a>
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
                        <h2 class="display-3">The Community</h2>
                        <p class="lead text-muted">Blokada is not only the privacy app. It is also the community of people who care about their digital privacy and wellbeing. You will find us on our forum, where you can ask any questions you may have. We are also present on other social media and chats.</p>
                    </div>
                </div>

                <card gradient="success"
                      no-body
                      shadow-size="lg"
                      class="border-0">
                    <div class="p-4 p-md-5">
                        <div class="row align-items-center">
                            <div class="col-lg-8">
                                <h3 class="text-white">Join us and say hi!</h3>
                                <p class="lead text-white mt-3">We base all of our work on the feedback of our users. Tell us what you think, what should we improve, or just hang out.</p>
                            </div>
                            <div class="col-lg-3 ml-lg-auto">
                                <base-button tag="a" href="https://go.blokada.org/forum"
                                             type="white" block size="lg">
                                    Go to forums
                                </base-button>
                            </div>
                        </div>
                    </div>
                </card>
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
                        <h2 class="display-3 text-white">Support the project</h2>
                        <p class="lead text-white">If you like what we do, consider supporting us, so that we can continue developing new features and improvements. This way, Blokada can stay open source and free forever.</p>
                    </div>
                </div>
            </div>
        </section>
        <section class="section section-lg pt-lg-0 section-contact-us">
            <div class="container">
                <div class="row justify-content-center mt--300">
                    <div class="col-lg-8">
                        <card gradient="secondary" shadow body-classes="p-lg-5">
                            <h4 class="mb-1">Blokada is made by you</h4>
                            <p class="mt-0">Blokada is an open source project, which means you can be sure it's always going to be free, safe to use, and without any hidden agenda. We believe this is the only right way to develop a privacy app you can trust.</p>

                            <p>However, developing a quality app like Blokada requires a considerable amount of resources. This project exists thanks to the support of awesome people like you!.</p>

                            <div class="row justify-content-center">
                                <div class="col-md-8 mt-3">
                                    <base-button type="default" round block size="lg" tag="a" href="https://go.blokada.org/donate">
                                        Donate (card, Paypal)
                                    </base-button>
                                    <base-button type="white" round block size="lg" tag="a" href="https://go.blokada.org/donate_more">
                                        Donate (bank, crypto)
                                    </base-button>
                                </div>
                            </div>
                        </card>
                    </div>
                </div>
            </div>
        </section>
        <section class="section section-lg" id="developer">
            <div class="container">
                <div class="row row-grid justify-content-center">
                    <div class="col-lg-8 text-center">
                        <h2 class="display-3">Are you a developer
                            <span class="text-success">and want to make Blokada better?</span>
                        </h2>
                        <p class="lead">Blokada is an open source project dedicated to developing the best ad blocker and privacy app for Android and iOS. Check our Github, and let us know, if you need any assistance to make your first PR.</p>

                        <br/><br/>
                        <base-button tag="a"
                            href="https://go.blokada.org/dev_home"
                            class="mb-3 mb-sm-0"
                            type="default"
                            icon="fab fa-github">
                            Go to repo
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
export default {
  name: "home",
  components: {
    Tabs,
    TabPane
  }
};
</script>
