<script setup>
    // import imgBg from '../assets/bgstate.jpg'
    import { ref, onMounted, onUnmounted } from 'vue';

    import ppalogo from '../assets/hotelbok.png'
    // import ppalogo from '../assets/hotelbok.png'

    const isScrolled = ref(false);

    const handleScroll = () => {
    isScrolled.value = window.scrollY > 50; // Cambia el valor según el umbral deseado
    };

    onMounted(() => {
        window.addEventListener('scroll', handleScroll);
    });

    onUnmounted(() => {
        window.removeEventListener('scroll', handleScroll);
    });
</script>
<template>
    <div class="sm:flex items-center " style="    height: 25vh; " >
        <!-- <div style="height: 5vh; margin-bottom:6px; background: white; " class="bg-[#024a71] w-full h-[1vh] " >
        </div> -->
        <div class="w-full flex justify-center md:px-10 sm:px-5 transition-all duration-300" :class="{ 'opacity-0 scale-75': isScrolled, 'opacity-100 scale-100': !isScrolled }">
            <img class="bg-cover" :src="ppalogo" alt="" />
        </div>

        <div class="md:px-10 sm:px-5 ctnn-33">
            <h1 class="text-gray-800 font-bold text-2xl my-2 clsstt-3" :class="{ 'opacity-0 scale-75': isScrolled, 'opacity-100 scale-100': !isScrolled }">luxe reserve</h1>
            <p class="text-gray-700 mb-2 md:mb-6 ltr-33">
                Te mejoramos el precio comparativo con Spedia y Booking....
            </p>
        </div>

    </div>
    <div   class="flex items-center justify-center"  style="margin-top: 20px;" >
        <div style="width: 80%;"  class="flex  items-center p-1 border border-blue-600 dark:border-blue-400 rounded-xl">
            <button @click="navigation_host()" style="    border: solid 1px #024a71; background-color: #024a7163; width: 50%; " class="px-4 bg-[#024a7163] py-2 text-sm font-medium text-[#024a71] capitalize  md:py-3 rounded-xl md:px-12">Hoteles</button>
            <button @click="navigation_host()"  style="    border: solid 1px #024a71;  background-color: #024a7163; width: 50%;" class="px-4 bg-[#024a7163] py-2 mx-4 text-sm font-medium text-[#024a71] capitalize transition-colors duration-300 md:py-3 dark:text-blue-400 dark:hover:text-white focus:outline-none hover:bg-blue-600 hover:text-white rounded-xl md:mx-8 md:px-12">Reservaciones</button>
        </div>
    </div>
    <div class="max-w-6xl mt-20" style="margin-top: 40px;" >

        <div v-if="reservaciones.length === 0 && swich " style="display: flex; flex-direction: column; justify-content: center;">
          <div style="    width: 100%; display: flex; justify-content: center;align-content: center; flex-direction: column;">
              <!-- <label for="location" class="block text-sm font-medium leading-6 text-gray-900  text-left">Buscar hotel por nombre</label> -->

              <input @input="debounceFilter()" v-model="searchQuery" id="search-field" style="width: 100%;     height: fit-content;     align-items: flex-end;" class="block w-full rounded-full border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6" placeholder="Buscar hotel por nombre" type="search" name="search" />

          </div>
          <div  class="w-[25%] mx-3  flex justify-center items-end gap-[15px]">
              <div style=" width: 70%;  display: flex; justify-content: center; align-items: flex-end;">
                  <div style="    display: flex; align-items: flex-end;  justify-content: center;    width: 100%;  " class=" sm:mt-0 sm:flex-none">
                      <button @click="applyFilter()"  type="button" class=" butonn-reserv w-full block rounded-md bg-redppa px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-redppahv focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">Buscar</button>
                  </div>
              </div>
          </div>
        </div>
        <div  v-if="swich " class="flex items-center justify-center " v-for="item in filteredTes" :key="item.id">
            <div class="max-w-sm w-full sm:w-1/2 lg:w-1/3 py-6 px-3">
                <div class="bg-white shadow-xl rounded-lg overflow-hidden">
              
                    <div class="bg-cover bg-center h-56 p-4 image-container">
                        <img :src="item.url" alt="" class="hover-image cls-img22" />
                    </div>
                    <div class="p-4">
                        <p class="uppercase tracking-wide text-sm font-bold text-gray-700">{{ item.name }}</p>

                    </div>
                    <div>
                    </div>
                    <div class="px-4 pt-3 pb-4 border-b border-gray-300 bg-gray-100">
                        <div class="flex justify-center items-center pt-2">
                            <button class="butonn-reserv" @click="abrir_mdlserv(item)">
                                hacer reservacion
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div  v-if="reservaciones.length > 0 &&!swich " class="flex cls-55 items-center justify-center " v-for="item in reservaciones" :key="item.id">
            <div class="max-w-sm w-full sm:w-1/2 lg:w-1/3 py-6 px-3">
                <div class="bg-white shadow-xl rounded-lg overflow-hidden">
                    <div class="p-4">
                        <p class="uppercase tracking-wide text-sm font-bold text-gray-700">{{ item.hotel }}</p>

                    </div>
                </div>
            </div>
        </div>
        <div v-else-if="!swich && reservaciones.length === 0" class="flex cls-55 items-center justify-center">
            <p class="text-gray-700 text-lg font-semibold">No hay reservaciones</p>
        </div>
    </div>
    <TransitionRoot as="template" :show="open">
        <Dialog as="div" class="relative z-50" @close="open = false">
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </TransitionChild>

            <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center max-sm:items-center  sm:p-0 max-2xl:items-center">
                <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" style="    max-height: 90vh;" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                    <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-10/12 sm:max-w-4xl sm:p-6 max-md:w-11/12 scroll" style="height: 90vh;     width: 100%; margin-block: 25px;">
                        <div>
                            <div class="mt-3 text-center sm:mt-5 ">
                                <!-- <dialog as="h3" class="text-base font-semibold leading-6 text-gray-900" > para el hotel {{  nomhotl }}</dialog> -->
                                <div class="mt-2 mb-2" style="    margin-bottom: 20px;" >
                                    <form class="form">
                                        <div class="title">
                                            <DialogTitle as="h3" class="text-base font-semibold leading-6 text-gray-900">Nueva Reservacion para el  hotel : <br> {{  nomhotl }}</DialogTitle>

                                        </div>
                                        <!-- <input class="input" name="email" placeholder="Email" type="email">
                                        <input class="input" name="password" placeholder="Password" type="password"> -->
                                        <span class="text-black" style="color: black;" >Selecciona un plan</span>
                                        <div id="checklist">
                                            <input checked="" value="1" name="r" type="radio" id="01" v-model="resev.check" >
                                            <label for="01">Solo alojamiento</label>
                                            <input value="2" name="r" type="radio" id="02" v-model="check">
                                            <label for="02">Desayuno bufet</label>
                                            <input value="3" name="r" type="radio" id="03" v-model="check">
                                            <label for="03">Todo incluido</label>
                                        </div>

                                        <!-- <span>Selecciona la vista de la habitación</span> -->
                                        <div >
                                          <div class="w-full">
                                              <div style="    width: 300px; display: flex; justify-content: center; flex-direction: column; ">
                                                  <label for="location" class="block text-sm font-medium leading-6 text-gray-900  text-left">Tipo de habitacion</label>
                                                  <select v-model="resev.tipo_habitacion" id="location" name="location" class="mt-2 block w-full bg-imputs rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-black sm:text-sm sm:leading-6" >
                                                      <option value="1" >King Size</option>
                                                      <option value="2" >Estandar</option>
                                                  </select>
                                              </div>
                                          </div>	
                                        </div>
                                        <div >
                                          <div class="w-full">
                                              <div style="    width: 300px; display: flex; justify-content: center; flex-direction: column; ">
                                                  <label for="location" class="block text-sm font-medium leading-6 text-gray-900  text-left">Selecciona la vista de la habitación</label>
                                                  <select v-model="resev.vista_habitacion" id="location" name="location" class="mt-2 block w-full bg-imputs rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-black sm:text-sm sm:leading-6" >
                                                      <option value="1" >vista a la montaña</option>
                                                      <option value="2" >vista al mar</option>
                                                  </select>
                                              </div>
                                          </div>	
                                        </div>
                                    
                                        <div class="login-with">
      
                                        </div>
                                        <!-- <button class="button-confirm">Let`s go →</button> -->
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div class="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                            <button type="button" class="inline-flex w-full justify-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black sm:col-start-2" @click="guardarDatos()">Guardar</button>
                            <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0" @click="open = false" ref="cancelButtonRef">Cancelar</button>
                        </div>
                    </DialogPanel>
                </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>
<script>
    // import LoginService from '../services/LoginService';
    // import { defineComponent } from "vue";
    // import { RecaptchaV2, useRecaptcha } from "vue3-recaptcha-v2";
    // const { handleGetResponse } = useRecaptcha();
    import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
    import hotel1 from '@/assets/hotel1.jpg';
    import hotel2 from '@/assets/hotel2.jpg';
    import hotel3 from '@/assets/hotel3.jpg';
    export default {
        name: 'LoginPage',
        components: {
            Dialog,
            DialogPanel,
            DialogTitle,
            TransitionChild,
            TransitionRoot
        },
        data() {
            return {
                tes: [
                    { id: 1, name: 'KRYSTAL GRAND PUNTA CANCÚN - CANCÚN, QUINTANA ROO', telefono: '01 (998) 891-5555', url:hotel1 },
                    { id: 2, name: 'KRYSTAL GRAND LOS CABOS - SAN JOSÉ DEL CABO, BCS', telefono: '01 (624) 163-4750', url:hotel2  },
                    { id: 3, name: 'KRYSTAL GRAND SUITES INSURGENTES SUR - CIUDAD DE MÉXICO, CDMX', telefono: '01 (55) 5322-1580', url: hotel3  },
                    { id: 4, name: 'KRYSTAL GRAND NUEVO VALLARTA - PUERTO VALLARTA, JALISCO', telefono: '01 (322) 226-1050', url:hotel1  },
                    { id: 5, name: 'KRYSTAL GRAND PUERTO VALLARTA - PUERTO VALLARTA, JALISCO', telefono: '01 (322) 176-1176' , url:hotel1  },
                    { id: 6, name: 'KRYSTAL GRAND RESIDENCES & VILLAS SAN MIGUEL DE ALLENDE', telefono: '01 (415) 148-2000', url:hotel1  },
                    { id: 7, name: 'KRYSTAL CANCÚN - CANCÚN, QUINTANA ROO', telefono: '01 (998) 848-9800' , url:hotel1  },
                    { id: 8, name: 'KRYSTAL PUERTO VALLARTA - PUERTO VALLARTA, JALISCO', telefono: '01 (322) 226-0700' , url:hotel1  },
                    { id: 9, name: 'KRYSTAL IXTAPA - IXTAPA ZIHUATANEJO, GUERRERO', telefono: '01 (755) 555-0510' , url:hotel1  },
                    { id: 10, name: 'PLAYA KRYSTAL ACAPULCO - ACAPULCO, GUERRERO', telefono: '01 (744) 485-5050' , url:hotel1  },
                    { id: 11, name: 'KRYSTAL SATÉLITE MARIA BARBARA - TLALNEPANTLA, MÉXICO', telefono: '01 (55) 5366-9924' , url:hotel1  },
                    { id: 12, name: 'KRYSTAL MONTERREY - MONTERREY, NUEVO LEÓN', telefono: '01 (81) 8319-0900' , url:hotel1  },
                    { id: 13, name: 'KRYSTAL URBAN CANCUN CENTRO - CANCÚN, QUINTANA ROO', telefono: '01 (998) 848-8000' , url:hotel1  },
                    { id: 14, name: 'KRYSTAL URBAN CIUDAD JUAREZ - CIUDAD JUAREZ, CHIHUAHUA', telefono: '01 (656) 629-0995' , url:hotel1  },
                    { id: 15, name: 'KRYSTAL URBANO GUADALAJARA - GUADALAJARA, JALISCO', telefono: '01 (33) 3679-3780' , url:hotel1  },
                    { id: 16, name: 'KRYSTAL URBAN / MONTERREY - MONTERREY, NUEVO LEÓN', telefono: '01 (81) 8122-8000' , url:hotel1  },
                    { id: 17, name: 'HAMPTON INN & SUITES PARAISO TABASCO - PARAISO, TABASCO', telefono: '01 (933) 333-6092' , url:hotel1  },
                    { id: 18, name: 'HYATT PLACE AGUASCALIENTES', telefono: '(449) 800-1234' , url:hotel1  },
                    { id: 19, name: 'HYATT CENTRIC LEON', telefono: '01 (477) 344-1100' , url:hotel1  },
                    { id: 20, name: 'HYATT REGENCY MÉXICO CITY INSURGENTES', telefono: '01 (55) 57247700' , url:hotel1  },
                    { id: 21, name: 'MAHEKAL - PLAYA DEL CARMEN', telefono: '800 836-8942' , url:hotel1  },
                ],
                searchQuery: '',
                filteredTes: [],
                reservaciones: [],
                debounceTimeout: null,
                nomhotl: '',
                vista: 0,
                check: 0,
                idhotl: 0,
                swich: true,
                open: false,
                resev: {
                  check: 1,
                  tipo_habitacion: 1,
                  vista_habitacion: 1,
                },
                userAdd: {
                    first_name: '',
                    tipo_usuario: 0,
                    last_name: '',
                    email: '',
                    password: '',
                    password_confirmation: '',
                },
            }
        },
        mounted() {
            this.filteredTes = this.tes;
        },
        methods: {
            navigation_host() {
              this.swich = !this.swich
              console.log('Switch state:', this.swich);
            },
            debounceFilter() {
                clearTimeout(this.debounceTimeout);
                this.debounceTimeout = setTimeout(() => {
                    this.applyFilter();
                }, 2000);
            },
            applyFilter() {
                const query = this.searchQuery.toLowerCase();
                this.filteredTes = this.tes.filter(item =>
                    item.name.toLowerCase().includes(query)
                );
            },
            abrir_mdlserv(item){
                console.log('id', item);
                this.nomhotl = item.name
                this.idhotl = item.id
                this.open = true;
            },
            guardarDatos(){
              this.reservaciones.push({
                  hotel: this.nomhotl,
                  id: this.idhotl,
                  plan: this.resev.check,
                  tipo_habitacion: this.resev.tipo_habitacion,
                  vista_habitacion: this.resev.vista_habitacion,
              });
              console.log('guardarDatos', this.nomhotl, this.idhotl);
              this.open = false;
              this.$swal({
                  icon: 'success',
                  title: 'se ha Creado su reservacion con exito',
                  timer: 2000
              });

            }
        }
    }
</script>
<style scoped>
.cls-55{
  height: 55vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.cls-img22{
    width: 100%;
    height: 100%;
}
#checklist {
  --background: #e7e7e7;
  --text: #00000000;
  --check: #000000;
  --disabled: #000000;
  --width: 100%;
  --height: 180px;
  --border-radius: 10px;
  background: var(--background);
  width: var(--width);
  height: var(--height);
  border-radius: var(--border-radius);
  position: relative;
  box-shadow: 0 10px 30px rgba(65, 72, 86, 0.05);
  padding: 30px 45px;
  display: grid;
  grid-template-columns: 30px auto;
  justify-content: start;
  align-items: flex-start;
}


#checklist label {
  /* color: var(--text); */
  color: rgb(0, 0, 0);
  position: relative;
  cursor: pointer;
  display: grid;
  align-items: center;
  width: fit-content;
  transition: color 0.3s ease;
  margin-right: 20px;
}


#checklist label::before, #checklist label::after {
  content: "";
  position: absolute;
}


#checklist label::before {
  height: 2px;
  width: 8px;
  left: -27px;
  background: var(--check);
  border-radius: 2px;
  transition: background 0.3s ease;
}


#checklist label:after {
  height: 4px;
  width: 4px;
  top: 8px;
  left: -25px;
  border-radius: 50%;
}


#checklist input[type="radio"] {
  -webkit-appearance: none;
  -moz-appearance: none;
  position: relative;
  height: 15px;
  width: 15px;
  outline: none;
  border: 0;
  margin: 0 15px 0 0;
  cursor: pointer;
  background: var(--background);
  display: grid;
  align-items: center;
  margin-right: 20px;
}

#checklist input[type="radio"]::before, #checklist input[type="radio"]::after {
  content: "";
  position: absolute;
  height: 2px;
  top: auto;
  background: var(--check);
  border-radius: 2px;
}




#checklist input[type="radio"]::before {
  width: 0px;
  right: 60%;
  transform-origin: right bottom;
}

#checklist input[type="radio"]::after {
  width: 0px;
  left: 40%;
  transform-origin: left bottom;
}

#checklist input[type="radio"]:checked::before {
  animation: check-01 0.4s ease forwards;
}

#checklist input[type="radio"]:checked::after {
  animation: check-02 0.4s ease forwards;
}



#checklist input[type="radio"]:checked + label {
  color: var(--disabled);
  animation: move 0.3s ease 0.1s forwards;
}

#checklist input[type="radio"]:checked + label::before {
  background: var(--disabled);
  animation: slice 0.4s ease forwards;
}

#checklist input[type="radio"]:checked + label::after {
  animation: firework 0.5s ease forwards 0.1s;
}


@keyframes move {
  50% {
    padding-left: 8px;
    padding-right: 0px;
  }

  100% {
    padding-right: 4px;
  }
}

@keyframes slice {
  60% {
    width: 100%;
    left: 4px;
  }

  100% {
    width: 100%;
    left: -2px;
    padding-left: 0;
  }
}

@keyframes check-01 {
  0% {
    width: 4px;
    top: auto;
    transform: rotate(0);
  }

  50% {
    width: 0px;
    top: auto;
    transform: rotate(0);
  }

  51% {
    width: 0px;
    top: 8px;
    transform: rotate(45deg);
  }

  100% {
    width: 5px;
    top: 8px;
    transform: rotate(45deg);
  }
}

@keyframes check-02 {
  0% {
    width: 4px;
    top: auto;
    transform: rotate(0);
  }

  50% {
    width: 0px;
    top: auto;
    transform: rotate(0);
  }

  51% {
    width: 0px;
    top: 8px;
    transform: rotate(-45deg);
  }

  100% {
    width: 10px;
    top: 8px;
    transform: rotate(-45deg);
  }
}

@keyframes firework {
  0% {
    opacity: 1;
    box-shadow: 0 0 0 -2px #4f29f0, 0 0 0 -2px #4f29f0, 0 0 0 -2px #4f29f0, 0 0 0 -2px #4f29f0, 0 0 0 -2px #4f29f0, 0 0 0 -2px #4f29f0;
  }

  30% {
    opacity: 1;
  }

  100% {
    opacity: 0;
    box-shadow: 0 -15px 0 0px #4f29f0, 14px -8px 0 0px #4f29f0, 14px 8px 0 0px #4f29f0, 0 15px 0 0px #4f29f0, -14px 8px 0 0px #4f29f0, -14px -8px 0 0px #4f29f0;
  }
}

.form {
  --input-focus: #2d8cf0;
  --font-color: #323232;
  --font-color-sub: #666;
  --bg-color: beige;
  --main-color: black;
  padding: 20px;
  background: lightblue;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 20px;
  border-radius: 5px;
  border: 2px solid var(--main-color);
  box-shadow: 4px 4px var(--main-color);
}

.title {
  color: var(--font-color);
  font-weight: 900;
  font-size: 20px;
  margin-bottom: 25px;
}

.title span {
  color: var(--font-color-sub);
  font-weight: 600;
  font-size: 17px;
}

.input {
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

.input::placeholder {
  color: var(--font-color-sub);
  opacity: 0.8;
}

.input:focus {
  border: 2px solid var(--input-focus);
}

.login-with {
  display: flex;
  gap: 20px;
}

.button-log {
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 100%;
  border: 2px solid var(--main-color);
  background-color: var(--bg-color);
  box-shadow: 4px 4px var(--main-color);
  color: var(--font-color);
  font-size: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.icon {
  width: 24px;
  height: 24px;
  fill: var(--main-color);
}

.button-log:active, .button-confirm:active {
  box-shadow: 0px 0px var(--main-color);
  transform: translate(3px, 3px);
}

.button-confirm {
  margin: 50px auto 0 auto;
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


.butonn-reserv {
    margin-bottom: 20px;
    margin-top: 20px;
    font-weight: 600;
    width: 60%;
    background: #024a71;
    color: white;
    border-radius: 9px;
    height: 5vh;
    font-size: 17px;
}
/* .hover-image {
    transition: transform 0.3s ease-in-out;
}

.image-container:hover .hover-image {
    transform: scale(1.1);
} */
.ltr-33{
    font-size: 18px;
    text-align: center;
    font-weight: 500;
    font-family: ui-monospace;
}
.ctnn-33{
    position: absolute;
    top: 18%;
}
.clsstt-3{
    font-size: 20px;
    font-weight: 800;
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