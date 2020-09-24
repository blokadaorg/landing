<template>
    <footer class="footer has-cards">
        <div class="container">
            <br/><br/><br/><br/><br/><br/><br/>
        </div>

        <div class="container">
            <div class="row row-grid align-items-center my-md">
                <div class="col-lg-6">
                    <h4 class="mb-0 font-weight-light">Let's stay in touch!</h4>
                </div>
                <div class="col-lg-6 text-lg-center btn-wrapper">
                    <a rel="noopener" href="http://go.blokada.org/social_twitter"
                       class="btn btn-neutral btn-icon-only btn-twitter btn-round btn-lg" data-toggle="tooltip"
                       data-original-title="Twitter">
                        <i class="fab fa-twitter"></i>
                    </a>
                    <a rel="noopener" href="http://go.blokada.org/social_facebook"
                       class="btn btn-neutral btn-icon-only btn-facebook btn-round btn-lg" data-toggle="tooltip"
                       data-original-title="Facebook">
                        <i class="fab fa-facebook-square"></i>
                    </a>
                    <a rel="noopener" href="https://go.blokada.org/social_reddit"
                       class="btn btn-neutral btn-icon-only btn-pinterest btn-lg btn-round" data-toggle="tooltip"
                       data-original-title="Reddit">
                        <i class="fab fa-reddit"></i>
                    </a>
                    <a rel="noopener" href="https://go.blokada.org/dev_home"
                       class="btn btn-neutral btn-icon-only btn-github btn-round btn-lg" data-toggle="tooltip"
                       data-original-title="Github">
                        <i class="fab fa-github"></i>
                    </a>
                </div>
            </div>
            <hr>
            <div class="row align-items-center justify-content-md-between">
                <div class="col-md-4 mb-4 mb-md-0">
                    <div class="copyright">
                        &copy; {{year}}
                        <a href="https://blokada.org" rel="noopener">Blocka AB</a>
                    </div>
                </div>
                <div class="col-12 col-md-8">
                    <ul class="nav nav-footer justify-content-end">
                        <li class="nav-item">
                            <a href="https://go.blokada.org/dev_home" class="nav-link" rel="noopener">Source</a>
                        </li>
                        <li class="nav-item">
                            <a href="https://go.blokada.org/credits"
                               class="nav-link" rel="noopener">Authors</a>
                        </li>
                        <li class="nav-item">
                            <a href="https://go.blokada.org/terms" class="nav-link" rel="noopener">Terms of use</a>
                        </li>
                        <li class="nav-item">
                            <a href="https://go.blokada.org/privacy" class="nav-link" rel="noopener">Privacy policy</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </footer>
</template>
<script>
export default {
  name: 'app-footer',
  data() {
    return {
      year: new Date().getFullYear()
    }
  }
};
</script>
<style>
</style>
