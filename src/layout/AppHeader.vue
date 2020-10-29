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
                        <span class="nav-link-inner--text">About</span>
                    </a>
                    <div class="dropdown-menu-inner">
                        <a href="#about"
                           class="media d-flex align-items-center">
                            <div class="icon icon-shape bg-gradient-info rounded-circle text-white">
                                <i class="fas fa-info"></i>
                            </div>
                            <div class="media-body ml-3">
                                <h6 class="heading mb-md-1">What is Blokada?</h6>
                                <p class="description d-none d-md-inline-block mb-0">Learn the basic information about the app.</p>
                            </div>
                        </a>
                        <a href="#download"
                           class="media d-flex align-items-center">
                            <div class="icon icon-shape bg-gradient-warning rounded-circle text-white">
                                <i class="fas fa-cloud-download-alt"></i>
                            </div>
                            <div class="media-body ml-3">
                                <h5 class="heading mb-md-1">Download</h5>
                                <p class="description d-none d-md-inline-block mb-0">Download Blokada for your platform.</p>
                            </div>
                        </a>
                        <a href="#community"
                           class="media d-flex align-items-center">
                            <div class="icon icon-shape bg-gradient-success rounded-circle text-white">
                                <i class="fas fa-comments"></i>
                            </div>
                            <div class="media-body ml-3">
                                <h5 class="heading mb-md-1">Community</h5>
                                <p class="description d-none d-md-inline-block mb-0">Join our awesome community.</p>
                            </div>
                        </a>
                        <a href="#donate"
                           class="media d-flex align-items-center">
                            <div class="icon icon-shape bg-gradient-primary rounded-circle text-white">
                                <i class="fas fa-heart"></i>
                            </div>
                            <div class="media-body ml-3">
                                <h5 class="heading mb-md-1">Support us</h5>
                                <p class="description d-none d-md-inline-block mb-0">Donate to help us continue the project.</p>
                            </div>
                        </a>
                    </div>
                </base-dropdown>
                <base-dropdown tag="li" class="nav-item">
                    <a slot="title" href="#" class="nav-link" data-toggle="dropdown" role="button">
                        <i class="ni ni-collection d-lg-none mr-2"></i>
                        <span class="nav-link-inner--text">More</span>
                    </a>
                    <a href="https://go.blokada.org/dev_home" class="dropdown-item">Source</a>
                    <a href="https://go.blokada.org/credits" class="dropdown-item">Authors</a>
                    <a href="https://go.blokada.org/terms" class="dropdown-item">Terms of use</a>
                    <a href="https://go.blokada.org/privacy" class="dropdown-item">Privacy policy</a>
                </base-dropdown>
            </ul>
            <ul class="navbar-nav align-items-lg-center ml-lg-auto">
                <li class="nav-item">
                    <a class="nav-link nav-link-icon" href="https://go.blokada.org/forum" rel="noopener"
                       data-toggle="tooltip" title="Forums">
                        <i class="fas fa-comments"></i>
                        <span class="nav-link-inner--text d-lg-none ml-2">Forums</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link nav-link-icon" href="https://app.blokada.org"
                       rel="noopener" data-toggle="tooltip" title="Dashboard">
                        <i class="fas fa-user-circle"></i>
                        <span class="nav-link-inner--text d-lg-none ml-2">Dashboard</span>
                    </a>
                </li>
                <li class="nav-item d-none d-lg-block ml-lg-4">
                    <a href="#download" rel="noopener"
                       class="btn btn-neutral btn-icon">
                <span class="btn-inner--icon">
                  <i class="fas fa-cloud-download-alt mr-2"></i>
                </span>
                        <span class="nav-link-inner--text">Download</span>
                    </a>
                </li>
            </ul>
        </base-nav>
    </header>
</template>
<script>
import BaseNav from "@/components/BaseNav";
import BaseDropdown from "@/components/BaseDropdown";
import CloseButton from "@/components/CloseButton";

export default {
  components: {
    BaseNav,
    CloseButton,
    BaseDropdown
  }
};
</script>
<style>
</style>
