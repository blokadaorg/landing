<template>
    <div>
    <section class="section section-shaped section-lg my-0">
        <div class="shape shape-style-4 shape-default shape-skew">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
        <div class="container pt-lg-md">
            <div class="row justify-content-center">
                <div class="col-lg-5">
                    <card type="secondary" shadow
                          header-classes="bg-white pb-5"
                          body-classes="px-lg-5 py-lg-5"
                          class="border-0">
                        <template>
                            <div class="text-center text-muted mb-4">
                                <h2>Blokada Plus</h2>
                                <small>Enter your account ID to continue</small>
                            </div>
                            <form role="form">
                                <base-input alternative
                                            type="password"
                                            placeholder="Account ID"
                                            addon-left-icon="ni ni-lock-circle-open">
                                </base-input>
                                <div class="text-center">
                                    <base-button type="primary" class="my-4">Sign In</base-button>
                                </div>
                            </form>
                        </template>
                    </card>
                    <div class="row mt-3">
                        <div class="col-6">
                            <a href="#" class="text-light">
                                <small>Forgot ID?</small>
                            </a>
                        </div>
                        <div class="col-6 text-right">
                            <a href="#" class="text-light">
                                <small>Create new account</small>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

        <div class="container">
            <br/><br/><br/><br/><br/><br/><br/><br/><br/>
        </div>

        </div>
    </section>

    <section class="section section-lg">
        <div class="container">
            <div class="row row-grid justify-content-center">
                <div class="col-lg-8 text-center">
                    <h2 class="display-3">What should I know
                        <span class="text-success">about Blokada Plus?</span>
                    </h2>
                    <p class="lead">Blokada is an open source project dedicated to developing the best ad blocker and privacy app for Android and iOS. Blokada Plus is our commercial offering with additional features, like VPN.</p>
                </div>
            </div>
        </div>
    </section>

    </div>
</template>
<script>
export default {};
</script>
<style>
</style>
