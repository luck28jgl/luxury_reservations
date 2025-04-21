<script setup>
    // import imgBg from '../assets/bgstate.jpg'
    // import tecsollogo from '../assets/tecsol-logo.png'
    // import LoginServices from '@/services/LoginServices';

</script>
<template>
    <div style="height: 97vh;" class="w-full h-full">
        <div class="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24 bg-wtppa">
        <div class="mx-auto w-full max-w-sm lg:w-96">
            <div class="flex justify-center">
                <!-- <img :src="tecsollogo" class="w-3/4"> -->
            </div>
            <div class="mt-10">
                <div class="wrapper">
                    <div class="card-switch">
                        <label class="switch">
                        <input type="checkbox" class="toggle">
                        <span class="slider"></span>
                        <span class="card-side"></span>
                        <div class="flip-card__inner">
                            <div class="flip-card__front">
                                <div class="title">iniciar secion</div>
                                <form class="flip-card__form" @submit="loginUser"> >
                                    <input  v-model="email" class="flip-card__input" name="email" placeholder="Email" type="email">
                                    <input  v-model="password" class="flip-card__input" name="contraseña" placeholder="Password" type="password">
                                    <button class="flip-card__btn">Iniciar</button>
                                </form>
                            </div>
                            <div class="flip-card__back">
                                <div class="title">Registrate</div>
                                <form class="flip-card__form"  @submit="crearUsuario" >
                                    <input v-model="user.first_name" class="flip-card__input" placeholder="Nombre" type="name">
                                    <input v-model="user.email" class="flip-card__input" name="email" placeholder="Correo" type="email">
                                    <input v-model="user.password" class="flip-card__input" name="password" placeholder="Contraseña" type="password">
                                    <button class="flip-card__btn" >Crear</button>
                                </form>
                            </div>
                        </div>
                        </label>
                    </div>   
                </div>
            </div>
        </div>
        </div>
    </div>
</template>
<script>
    // import LoginService from '@/services/LoginServices';
    // import { defineComponent } from "vue";
    // import { RecaptchaV2, useRecaptcha } from "vue3-recaptcha-v2";
    // const { handleGetResponse } = useRecaptcha();
    // import reservacionesservices from '../services/reservacionesservices';
    import LoginServices from '@/services/LoginServices';
    import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
    import { useLoading } from 'vue-loading-overlay';

    export default {
        name: 'Login',
        components: {
            // RecaptchaV2,
            Dialog,
            DialogPanel,
            DialogTitle,
            TransitionChild,
            TransitionRoot
        },
        data() {
            return {
                openEdit: false,
                user: {
                    first_name: '',
                    lasname_name: '',
                    email: '',
                    password: '',
                    tip_usr: 0,
                },
                datosrecuperar: {
                    email: ''
                },
                contraseñaNueva: {
                    contraseñaNew: '',
                    repeatcontrasena: ''
                },
                code: ['', '', '', '', '', ''],
                tokencatpcha: '',
                email: '',
                password: '',
                recuperar: false,
                showPassword: false,
                passwords: false,
                recuperarContra: false
            }
        },
        methods: {

            onInput(event, index) {
                const input = event.target;
                const value = input.value;

                if (value.length === 1 && index < 5) {
                    const nextInput = document.getElementById(`code${index + 1}`);
                    if (nextInput) {
                    nextInput.focus();
                    }
                }
            },
            onKeyDown(event, index) {
                const input = event.target;

                if (event.key === 'Backspace' && input.value.length === 0 && index > 0) {
                    const prevInput = document.getElementById(`code${index - 1}`);
                    if (prevInput) {
                    prevInput.focus();
                    }
                }
            },
            abrirModalContra() {
                this.openEdit = true;
                if(this.passwords || this.recuperarContra === true) {
                    this.recuperar = true
                } else {
                    this.recuperar = false
                }
                this.datosrecuperar.email = '';
            },

            validarEmail() {
                if (this.datosrecuperar.email === '') {
                    this.$swal({
                        icon: 'warning',
                        title: 'Favor de ingresar el correo electronico'
                    })
                    return
                }
                let loader = this.$loading.show({
                    canCancel: false,
                    loader: 'bars'
                });
                const datos = {
                    email: this.datosrecuperar.email,
                }
                LoginService.verifyEmail(datos).then(response => {
                    loader.hide()
                    this.$swal({
                        icon: 'success',
                        title: 'Se ha enviado un correo electronico a tu correo ingresado',
                        timer: 3000
                    });
                    this.recuperar = true
                    this.recuperarContra = true
                }).catch(error => {
                    loader.hide()
                    this.$swal({
                        icon: 'error',
                        title: 'Comunicate con el Administrador',
                        timer: 3000
                    });
                })
            },

            crearUsuario(event) {
                event.preventDefault(); // Evita el comportamiento predeterminado del formulario
                let loader = useLoading().show({
                    canCancel: false,
                    loader: 'bars'
                });
                const datos = {
                    first_name: this.user.first_name,
                    email: this.user.email,
                    password: this.user.password,
                    tipo_usuario: this.user.tip_usr,
                };
                LoginServices.create_user(datos).then(response => {
                    loader.hide();
                    this.$swal({
                        icon: 'success',
                        title: 'Se creo el usuario correctamente ',
                        timer: 2000
                    });
                            // Cambiar el estado del checkbox a apagado
                    const checkbox = document.querySelector('.toggle');
                    if (checkbox) {
                        checkbox.checked = false;
                    }
                }).catch(e => {
                    loader.hide();
                    if (e.response.data.error === 'Invalid credentials') {
                        this.$swal({
                            icon: 'error',
                            title: 'Verifica tu información'
                        });
                    } else {
                        this.$swal({
                            icon: 'error',
                            title: 'Comunícate con el administrador.'
                        });
                    }
                });
            },
            loginUser(event) {
                event.preventDefault();
                let loader =  useLoading().show({
                    canCancel: false,
                    loader: 'bars'
                });
                const loginForm = {
                    username: this.email,
                    password: this.password,
                }
                LoginServices.login(loginForm)
                    .then(response => {
                        loader.hide()
                        // Verificar si la respuesta contiene el token
                        console.log(response.data.auth_token);
                        
                        if (response.data.auth_token) {
                            this.$swal({
                                icon: 'success',
                                title: 'Bienvenido',
                                timer: 2000
                            });

                            // Guardar el token en el store o localStorage
                            this.$store.dispatch('user/setSession', response.data.auth_token);
                            // this.$store.dispatch('user/setSession', { token: response.data.auth_token });

                            // Obtener el tipo de usuario
                            this.getUserType(this.email);

                            // Redirigir después de un tiempo
                            setTimeout(() => {
                                this.$router.push('/lista-all-reservation');
                            }, 2000);
                        } else {
                            // Si no hay token, mostrar un mensaje de error
                            this.$swal({
                                icon: 'error',
                                title: 'Error al iniciar sesión. Intenta nuevamente.'
                            });
                        }
                    }).catch(e => {
                        loader.hide();
                        if (e.response && e.response.data && e.response.data.error === 'Invalid credentials') {
                            this.$swal({
                                icon: 'error',
                                title: 'Verifica tu información'
                            });
                        } else {
                            console.error(e); // Para depuración
                            this.$swal({
                                icon: 'error',
                                title: 'Comunícate con el administrador.'
                            });
                        }
                    })
            },
            getUserType(hash_id) {
                LoginServices.getUType({
                    username: hash_id,
                }).then(response => {
                    this.$store.dispatch('user/setUserType', response.data.tipo);
                    // this.$store.dispatch('user/setUserId', hash_id);
                    if (hash_id) {
                        localStorage.setItem('userPk', hash_id); 
                        localStorage.setItem('userId', this.email);
                        console.log(`El ID del usuario (${this.email}) se guardó correctamente en localStorage.`);
                    } else {
                        console.error('No se pudo guardar el ID del usuario porque "this.email" está vacío o indefinido.');
                    }
                    // localStorage.setItem('userId', this.email);
                    // aqui quiro quale guarde el id el pk en el storaje 
                }).catch(e => {
                    console.log(e.response)
                })
            }
        }
    }
</script>
<style scoped>
/* From Uiverse.io by andrew-demchenk0 */ 
.wrapper {
  --input-focus: #2d8cf0;
  --font-color: #323232;
  --font-color-sub: #666;
  --bg-color: #fff;
  --bg-color-alt: #666;
  --main-color: #323232;
    /* display: flex; */
    /* flex-direction: column; */
    /* align-items: center; */
}
/* switch card */
.switch {
  transform: translateY(-200px);
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  width: 50px;
  height: 20px;
  left: 165px;
  top: 350px;
}

.card-side::before {
  position: absolute;
  content: 'Iniciar sesión';
  left: -130px;
  top: 0;
  width: 100px;
  text-decoration: underline;
  color: var(--font-color);
  font-weight: 600;
}

.card-side::after {
  position: absolute;
  content: 'Crear cuenta';
  left: 70px;
  top: 0;
  width: 100px;
  text-decoration: none;
  color: var(--font-color);
  font-weight: 600;
}

.toggle {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  box-sizing: border-box;
  border-radius: 5px;
  border: 2px solid var(--main-color);
  box-shadow: 4px 4px var(--main-color);
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--bg-colorcolor);
  transition: 0.3s;
}

.slider:before {
  box-sizing: border-box;
  position: absolute;
  content: "";
  height: 20px;
  width: 20px;
  border: 2px solid var(--main-color);
  border-radius: 5px;
  left: -2px;
  bottom: 2px;
  background-color: var(--bg-color);
  box-shadow: 0 3px 0 var(--main-color);
  transition: 0.3s;
}

.toggle:checked + .slider {
  background-color: #024a71;
}

.toggle:checked + .slider:before {
  transform: translateX(30px);
}

.toggle:checked ~ .card-side:before {
  text-decoration: none;
}

.toggle:checked ~ .card-side:after {
  text-decoration: underline;
}

/* card */ 

.flip-card__inner {
  width: 300px;
  height: 350px;
  position: relative;
  background-color: transparent;
  perspective: 1000px;
    /* width: 100%;
    height: 100%; */
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}

.toggle:checked ~ .flip-card__inner {
  transform: rotateY(180deg);
}

.toggle:checked ~ .flip-card__front {
  box-shadow: none;
}

.flip-card__front, .flip-card__back {
  padding: 20px;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  background: #024a71;
  gap: 20px;
  border-radius: 5px;
  border: 2px solid var(--main-color);
  box-shadow: 4px 4px var(--main-color);
  
}

.flip-card__back {
  width: 100%;
  transform: rotateY(180deg);
}

.flip-card__form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.title {
  margin: 20px 0 20px 0;
  font-size: 25px;
  font-weight: 900;
  text-align: center;
  color: #ffffff;
}

.flip-card__input {
  width: 250px;
  height: 40px;
  border-radius: 5px;
  border: 2px solid var(--main-color);
  background-color: var(--bg-color);
  box-shadow: 4px 4px var(--main-color);
  font-size: 15px;
  font-weight: 600;
  color: var(--font-color);
  padding: 5px 10px;
  outline: none;
}

.flip-card__input::placeholder {
  color: var(--font-color-sub);
  opacity: 0.8;
}

.flip-card__input:focus {
  border: 2px solid var(--input-focus);
}

.flip-card__btn:active, .button-confirm:active {
  box-shadow: 0px 0px var(--main-color);
  transform: translate(3px, 3px);
}

.flip-card__btn {
  margin: 20px 0 20px 0;
  width: 120px;
  height: 40px;
  border-radius: 5px;
  border: 2px solid var(--main-color);
  background-color: var(--bg-color);
  box-shadow: 4px 4px var(--main-color);
  font-size: 17px;
  font-weight: 600;
  color: var(--font-color);
  cursor: pointer;
} 

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type='number'] {
  -moz-appearance: textfield;
}
</style>