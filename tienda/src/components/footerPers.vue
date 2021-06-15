<template>
  <div class="footerPers">
    <footer class="bg-white">
    <div class="container py-5">
      <div class="row py-4">
        <div class="col-lg-4 col-md-6 mb-4 mb-lg-0"><img src="img/logo.png" alt="" width="180" class="mb-3">
          <p class="font-italic text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.</p>
          <ul class="list-inline mt-4">
            <li class="list-inline-item"><a href="#" target="_blank" title="twitter"><i class="fa fa-twitter"></i></a></li>
            <li class="list-inline-item"><a href="#" target="_blank" title="facebook"><i class="fa fa-facebook"></i></a></li>
            <li class="list-inline-item"><a href="#" target="_blank" title="instagram"><i class="fa fa-instagram"></i></a></li>
            <li class="list-inline-item"><a href="#" target="_blank" title="pinterest"><i class="fa fa-pinterest"></i></a></li>
            <li class="list-inline-item"><a href="#" target="_blank" title="vimeo"><i class="fa fa-vimeo"></i></a></li>
          </ul>
        </div>
        <div class="col-lg-2 col-md-6 mb-4 mb-lg-0">
          <h6 class="text-uppercase font-weight-bold mb-4">Tienda</h6>
          <ul class="list-unstyled mb-0">
            <li class="mb-2"><router-link to="/tienda/Mujer" class="text-muted">Para Mujer</router-link></li>
            <li class="mb-2"><router-link to="/tienda/Hombre" class="text-muted">Para Hombre</router-link></li>
            <li class="mb-2"><router-link to="/tienda/Niños" class="text-muted">Para Niños</router-link></li>
          </ul>
        </div>
        <div class="col-lg-2 col-md-6 mb-4 mb-lg-0">
          <h6 class="text-uppercase font-weight-bold mb-4">Compañia</h6>
          <ul class="list-unstyled mb-0">
            <li class="mb-2"><router-link to="/login-signup/login" class="text-muted">Iniciar sesión</router-link></li>
            <li class="mb-2"><router-link to="/login-signup/signup" class="text-muted">Registrarse</router-link></li>
          </ul>
        </div>
        <div class="col-lg-4 col-md-6 mb-lg-0">
          <h6 class="text-uppercase font-weight-bold mb-4">Newsletter</h6>
          <p class="text-muted mb-4">!Muy pronto disponible!</p>
          <div class="p-1 rounded border">
            <div class="input-group">
              <input disabled type="email" placeholder="Enter your email address" aria-describedby="button-addon1" class="form-control border-0 shadow-0">
              <div class="input-group-append">
                <button disabled id="button-addon1" type="submit" class="btn btn-link"><i class="pi pi-send"></i></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Copyrights -->
    <div class="bg-light py-4">
      <div class="container text-center">
        <p class="text-muted mb-0 py-2">© 2021 Jacob Lomas All rights reserved.</p>
      </div>
    </div>
  </footer>

  </div>
</template>

<script>
export default {
  name: 'footerPers',
  data () {
    return {}
  }
}
</script>

<style scoped>
.footerPers{
  
    margin-top: 10vh;
}
</style>
