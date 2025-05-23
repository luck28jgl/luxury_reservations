<script setup>
    // import imgBg from '../assets/bgstate.jpg'
    import { ref, onMounted, onUnmounted } from 'vue';
    import { URL_API } from '@/boot/axios'; // Importar la URL base


    import ppalogo from '@/assets/logoluxereserv.jpg'
    import ewtz from '@/assets/icons8-whatsapp-96.png'
    // import tel from './assets/icons8-llamada-saliente.png'
    import tel from '@/assets/icons8-asistente-100.png'
    // import ppalogo from '../assets/hotelbok.png'
    // Función para construir la URL completa de la imagen
    const getImageUrl = (imgPath) => {
        return `${URL_API}${imgPath}`;
    };
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
    <div class="sm:flex items-center " style="    height: 25vh;     margin-top: 40px;     display: flex;justify-content: center;" >
        <div class="w-full flex justify-center md:px-10 sm:px-5 transition-all duration-300" style="    width: 50%;" :class="{ 'opacity-0 scale-75': isScrolled, 'opacity-100 scale-100': !isScrolled }">
            <img class="bg-cover" :src="ppalogo" alt="" />
        </div>

    </div>

    <div   class="flex items-center justify-center"  style="margin-top: 20px;" >
        <div style="width: 80%;     display: flex;justify-content: center;"  class="flex  items-center p-1   rounded-xl">
            <p style="font-weight: 700; font-size: 17px;"> ! Hola {{ usuario_act }} Solicita tu cotización personalizada!</p>
        </div>
    </div>
    <div   class="flex items-center justify-center"  style="margin-top: 20px;" >
        <div style="width: 80%;"  class="flex  items-center p-1 border border-blue-600 dark:border-blue-400 rounded-xl">
            <button  style="    border: solid 1px #024a71; background-color: #024a7163;    width: 100%; " class="px-4 bg-[#024a7163] py-2 text-sm font-medium text-[#024a71] capitalize  md:py-3 rounded-xl md:px-12">Hoteles</button>
        </div>
    </div>
    <div>
      <a href="https://api.whatsapp.com/send?phone=5517247751&text=Hola,%20me%20gustartia%20hacer%20una%20reservacion"  target="_blank" rel="noopener noreferrer">
        <img :src="ewtz" alt="wtz" target="_blank" class="wtz" >
      </a>
    </div>

    <div  v-if="swich " class="max-w-6xl mt-20" style="margin-top: 40px;  " >

        <div v-if=" swich " style="display: flex; flex-direction: column; justify-content: center;">
          <div style="    width: 100%; display: flex; justify-content: center; align-items: center; flex-direction: column;">
              <!-- <label for="location" class="block text-sm font-medium leading-6 text-gray-900  text-left">Buscar hotel por nombre</label> -->

              <input @input="debounceFilter()" v-model="searchQuery" id="search-field" style="width: 80%;     height: fit-content;     align-items: flex-end;" class="block w-full rounded-full border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6" placeholder="Buscar hotel por nombre" type="search" name="search" />

          </div>
          <div  class="w-[25%] mx-3  flex justify-center items-end gap-[15px]">
              <div style=" width: 70%;  display: flex; justify-content: center; align-items: flex-end;">
                  <div style="    display: flex; align-items: flex-end;  justify-content: center;    width: 100%;  " class=" sm:mt-0 sm:flex-none">
                      <button @click="applyFilter()"  type="button" class=" butonn-reserv w-full block rounded-md bg-redppa px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-redppahv focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">Buscar</button>
                  </div>
              </div>
          </div>
        </div>
        <div  class="flex items-center justify-center " v-for="item in filteredTes" :key="item.id">
            <div class="max-w-sm w-full sm:w-1/2 lg:w-1/3 py-6 px-3">
                <div class="bg-white shadow-xl rounded-lg overflow-hidden">
              
                    <div class="bg-cover bg-center h-56 p-4 image-container">
                        <img :src="'https://mi-api-imagenes.s3.us-east-2.amazonaws.com' + item.img" alt="Imagen del hotel" class="hover-image cls-img22" />
                    </div>
                    <div class="p-4">
                        <p class="uppercase tracking-wide text-sm font-bold text-gray-700">{{ item.Nombre }}</p>

                    </div>
                    <div>

                    </div>
                    <div class="px-4 pt-3 pb-4 border-b border-gray-300 bg-gray-100">
                        <div style="display: flex;     flex-direction: column;" class="flex flex-col justify-center items-center pt-2">
                          <div class="tel-d">
                            <a href="tel:+5636549047" class="tel-a"  rel="noopener noreferrer">
                              <img :src="tel" alt="tel" class="tel" target="_blank"  >
                            </a>
                          </div>
                          <p class="uppercase tracking-wide text-sm font-bold text-gray-700">precio para 1 noche 
                           </p>
                          <p class="uppercase tracking-wide text-sm font-bold text-gray-700">{{ item.price }}
                           </p>
                          <!-- <p class="uppercase tracking-wide text-sm font-bold text-gray-700">2 dultos </p> -->
                          <!-- <p class="uppercase tracking-wide text-sm font-bold text-gray-700">MXN {{item.precio_inicial}} MXN {{item.precio_dec}}</p> -->
                          <p class="uppercase tracking-wide text-sm font-bold text-gray-700">+ 15% IVA</p>

                        </div>
                        <div class="flex justify-center items-center pt-2">
                            <button class="butonn-reserv" @click="abrir_mdlserv(item)">
                                hacer reservacion
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="max-w-6xl mt-20" style="margin-top: 40px;   height: 56vh;overflow: scroll;" >

        <div  v-if="reservaciones.length > 0 &&!swich "   class="flex cls-55 items-center justify-center " v-for="item in reservaciones" :key="item.id">
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
                    <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-10/12 sm:max-w-4xl sm:p-6 max-md:w-11/12 scroll" style="height: 90vh;     width: 100%; margin-block: 25px; overflow: scroll;">
                        <div>
                            <div class="mt-3 text-center sm:mt-5 ">
                                <!-- <dialog as="h3" class="text-base font-semibold leading-6 text-gray-900" > para el hotel {{  nomhotl }}</dialog> -->
                                <div class="mt-2 mb-2" style="    margin-bottom: 20px;" >
                                    <form class="form">
                                        <div class="title" style="margin-bottom: 2px; width: 100%;">
                                            <DialogTitle as="h3" class="text-base font-semibold leading-6 text-gray-900">Nueva Reservacion para el  hotel : <br> {{  nomhotl }}</DialogTitle>

                                        </div>
                                        <div class=" w-full">
                                            <p style="font-weight: 600; font-size: 17px; text-align: center; margin-top: 20px;" class="text-gray-900">
                                              precio por noche: {{ pricemultiplicado }} MXN
                                            </p>
                                            <!-- <p v-if="price != pricemultiplicado " style="font-weight: 600; font-size: 17px; text-align: center; margin-top: 20px;" class="text-gray-900">
                                              precio de toda la reservacion: {{ price }} MXN
                                            </p> -->
                                        </div>
                                        <div style="    width: 95%; display: flex; justify-content: center;align-content: center; flex-direction: column;">
                                            <label for="location" class="block text-sm font-medium leading-6 text-gray-900  text-left">nombre de quien reserva </label>

                                            <input  v-model="namesr" id="name" style="width: 100%;     height: fit-content;     align-items: flex-end;" class="block w-full rounded-full border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6" placeholder="Nombre de quien reserva" type="search" name="search" />

                                        </div>
                                        <div style="    width: 95%; display: flex; justify-content: center;align-content: center; flex-direction: column;">
                                            <label for="email" class="block text-sm font-medium leading-6 text-gray-900  text-left">email de quien reserva </label>

                                            <input  v-model="emailusr" id="email" style="width: 100%;     height: fit-content;     align-items: flex-end;" class="block w-full rounded-full border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6" placeholder="email de quien reserva" type="search" name="search" />

                                        </div>

                                        <div style="    width: 95%; display: flex; justify-content: center;align-content: center; flex-direction: column;">
                                            <label for="desde" class="block text-sm font-medium leading-6 text-gray-900  text-left">desde</label>

                                            <input :min="currentDate" @change="calcularTotal" type="date"  v-model="resev.desde" id="desde" style="width: 100%;     height: fit-content;     align-items: flex-end;" class="block w-full rounded-full border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"  />

                                        </div>
                                        <div style="    width: 95%; display: flex; justify-content: center;align-content: center; flex-direction: column;">
                                            <label for="hasta" class="block text-sm font-medium leading-6 text-gray-900  text-left">hasta</label>

                                            <input :min="currentDate" @change="calcularTotal" type="date"  v-model="resev.hasta" id="hasta" style="width: 100%;     height: fit-content;     align-items: flex-end;" class="block w-full rounded-full border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"    />

                                        </div>
                                        <!-- Centering wrapper -->
                                        <div style="margin: auto;"  class="w-[250px] m-auto max-w-sm relative mt-4">
                                          <label class="block mb-1 text-sm text-gray-900">Adultos</label>
                                          <div class="flex items-center border border-gray-900 rounded shadow-sm focus-within:ring-2 focus-within:ring-gray-900">
                                              <!-- Botón para decrementar -->
                                              <button
                                                  style="width: 50px;"
                                                  @click="decrementAdults"
                                                  class="h-10 w-[70px] flex items-center justify-center bg-gray-100 hover:bg-gray-200 border-r border-gray-900 rounded-l"
                                                  type="button"
                                              >
                                                  <svg 
                                                      xmlns="http://www.w3.org/2000/svg" 
                                                      fill="none" 
                                                      viewBox="0 0 24 24" 
                                                      stroke-width="1.5" 
                                                      stroke="currentColor" 
                                                      class="w-5 h-5 text-gray-700"
                                                  >
                                                      <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
                                                  </svg>
                                              </button>
                                              <!-- Input para mostrar el valor -->
                                              <input
                                                 
                                                  type="number"
                                                  v-model="resev.person_reservation.adultos"
                                                  class="w-full h-10 text-center bg-transparent placeholder:text-slate-400 text-gray-900 text-sm focus:outline-none"
                                                  placeholder="55"
                                                  min="0"
                                              />
                                              <!-- Botón para incrementar -->
                                              <button
                                               style="width: 50px;"
                                                  @click="incrementAdults"
                                                  class="h-10 w-[70px] flex items-center justify-center bg-gray-100 hover:bg-gray-200 border-l border-gray-900 rounded-r"
                                                  type="button"
                                              >
                                                  <svg 
                                                      xmlns="http://www.w3.org/2000/svg" 
                                                      fill="none" 
                                                      viewBox="0 0 24 24" 
                                                      stroke-width="1.5" 
                                                      stroke="currentColor" 
                                                      class="w-5 h-5 text-gray-700"
                                                  >
                                                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                                  </svg>
                                              </button>
                                          </div>
                                        </div>
                                        <!-- Centering wrapper -->
                                        <div style="margin: auto;" class="w-[250px] m-auto max-w-sm relative mt-4">
                                          <label class="block mb-1 text-sm text-gray-900">Niños</label>
                                          <div class="flex items-center border border-gray-900 rounded shadow-sm focus-within:ring-2 focus-within:ring-gray-900">
                                              <!-- Botón para decrementar -->
                                              <button
                                                  style="width: 50px;"
                                                  @click="decrementChildren"
                                                  class="h-10 w-[70px] flex items-center justify-center bg-gray-100 hover:bg-gray-200 border-r border-gray-900 rounded-l"
                                                  type="button"
                                              >
                                                  <svg 
                                                      xmlns="http://www.w3.org/2000/svg" 
                                                      fill="none" 
                                                      viewBox="0 0 24 24" 
                                                      stroke-width="1.5" 
                                                      stroke="currentColor" 
                                                      class="w-5 h-5 text-gray-700"
                                                  >
                                                      <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
                                                  </svg>
                                              </button>
                                              <!-- Input para mostrar el valor -->
                                              <input
                                                 
                                                  type="number"
                                                  v-model="resev.person_reservation.ninos_num"
                                                  class="w-full h-10 text-center bg-transparent placeholder:text-slate-400 text-gray-900 text-sm focus:outline-none"
                                                  placeholder="0"
                                                  min="0"
                                              />
                                              <!-- Botón para incrementar -->
                                              <button
                                               style="width: 50px;"
                                                  @click="incrementChildren"
                                                  class="h-10 w-[70px] flex items-center justify-center bg-gray-100 hover:bg-gray-200 border-l border-gray-900 rounded-r"
                                                  type="button"
                                              >
                                                  <svg 
                                                      xmlns="http://www.w3.org/2000/svg" 
                                                      fill="none" 
                                                      viewBox="0 0 24 24" 
                                                      stroke-width="1.5" 
                                                      stroke="currentColor" 
                                                      class="w-5 h-5 text-gray-700"
                                                  >
                                                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                                  </svg>
                                              </button>
                                          </div>
                                        </div>
                                        <!-- Inputs dinámicos para edades -->
                                         
                                        <div v-for="(child, index) in resev.person_reservation.ninos_num" :key="index" style="margin: auto;" class="w-[250px] m-auto max-w-sm relative mt-4">
                                          <label :for="'child-age-' + index" class="block mb-1 text-sm text-gray-900">Edad del niño {{ index + 1 }}</label>
                                          <input
                                            type="number"
                                            v-model="resev.person_reservation.ninosedades[index].edad"
                                            :id="'child-age-' + index"
                                            class="block w-full rounded-full border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6" 
                                            placeholder="0"
                                            min="0"
                                          />
                                        </div>
                                        <div style="    width: 95%; display: flex; justify-content: center;align-content: center; flex-direction: column;">
                                            <!-- <label for="location" class="block text-sm font-medium leading-6 text-gray-900  text-left"> Para cuantas personas</label> -->

                                            <!-- <input   v-model="resev.numperson"  placeholder="ingresa el número de perosas para la reservacion" id="email" style="width: 100%;     height: fit-content;     align-items: flex-end;" class="block w-full rounded-full border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"  type="number" name="search" /> -->
                                            <div style="    width: 300px; display: flex; justify-content: center; flex-direction: column; ">
                                                <label for="location" class="block text-sm font-medium leading-6 text-gray-900  text-center">Para cuantas personas</label>
                                                <!-- como ago que este select no intaractue ocn el usuario solo quiero que  -->
                                                <span class="text-black" style="color: black;" >{{ totalPersonas }}</span>

                                                <!-- <input disabled   :value="totalPersonas" id="totalperson" style="width: 100%; height: fit-content; align-items: flex-end;" class="block w-full rounded-full border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6" placeholder="personas en total" type="text" name="search" /> -->

                                            </div>
                                        </div>

                                        <div class=" w-full">
                                            <p  style="font-weight: 600; font-size: 17px; text-align: center; margin-top: 2px;" class="text-gray-900">
                                             {{ por_dias }} X <span style="font-size: 10px;" >{{ nomhotl }}</span><br> = <br> {{ precioTotal }} MXN
                                            </p>
                                        </div>
        
                                        <span class="text-black" style="color: black;" >Selecciona un plan</span>
                                        <div id="checklist">
                                            <input value="Solo alojamiento" name="r" type="radio" id="01" v-model="resev.check">
                                            <label for="01">Solo alojamiento</label>
                                            <input value="Desayuno bufet" name="r" type="radio" id="02" v-model="resev.check">
                                            <label for="02">Desayuno bufet</label>
                                            <input value="Todo incluido" name="r" type="radio" id="03" v-model="resev.check">
                                            <label for="03">Todo incluido</label>
                                        </div>

                                        <!-- <span>Selecciona la vista de la habitación</span> -->
                                        <div >
                                          <div class="w-full">
                                              <div style="    width: 300px; display: flex; justify-content: center; flex-direction: column; ">
                                                  <label for="location" class="block text-sm font-medium leading-6 text-gray-900  text-left">Tipo de habitacion</label>
                                                  <select v-model="resev.tipo_habitacion" id="location" name="location" class="mt-2 block w-full bg-imputs rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-black sm:text-sm sm:leading-6" >
                                                      <option value="King Size" >King Size</option>
                                                      <option value="Estandar" >Estandar</option>
                                                  </select>
                                              </div>
                                          </div>	
                                        </div>
                                        <div >
                                          <div class="w-full">
                                              <div style="    width: 300px; display: flex; justify-content: center; flex-direction: column; ">
                                                  <label for="location" class="block text-sm font-medium leading-6 text-gray-900  text-left">Selecciona la vista de la habitación</label>
                                                  <select v-model="resev.vista_habitacion" id="location" name="location" class="mt-2 block w-full bg-imputs rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-black sm:text-sm sm:leading-6" >
                                                      <option value="vista a la montaña" >vista a la montaña</option>
                                                      <option value="vista al mar" >vista al mar</option>
                                                  </select>
                                              </div>
                                          </div>	
                                        </div>
                                    
                                        <div class="login-with">
      
                                        </div>
                                        <div style="margin: auto;" class="w-[250px] m-auto max-w-sm relative mt-4">
                                          <p class="text-gray-900 text-center font-bold">
                                            Precio: {{ price_second }} MXN <span class="uppercase tracking-wide text-sm font-bold text-gray-700">+ 16 % IVA </span>

                                          </p>
                                        </div>
                                        <div style="margin: auto;" class="w-[250px] m-auto max-w-sm relative mt-4">
                                          <p class="text-gray-900 text-center font-bold">
                                            Precio total: {{ precioConImpuestos.total }} MXN

                                          </p>
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

    import reservacionesservices from '@/services/reservacionesservices';
    import LoginServices from '@/services/LoginServices';
    import hotelesservices from '@/services/hotelesservices';
    import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
    import { useLoading } from 'vue-loading-overlay';

    export default {
        name: 'reservaIndex',
        components: {
            Dialog,
            DialogPanel,
            DialogTitle,
            TransitionChild,
            TransitionRoot
        },
        data() {
            return {
                currentDate: new Date().toISOString().split('T')[0], 
                tes: [],
                searchQuery: '',
                usuario_act: '',
                filteredTes: [],
                reservaciones: [],
                debounceTimeout: null,
                nomhotl: '',
                emailusr: '',
                namesr: '',
                id_user: '',
                pricemultiplicado: '',
                price: '',
                pricemultiplicado: '',
                price_ultimate: 0,

                iduser_activo: 0,
                vista: 0,
                check: 0,
                idhotl: 0,
                swich: true,
                open: false,
                resev: {
                  check: 'Solo alojamiento',
                  tipo_habitacion: '',
                  vista_habitacion: '',
                  person_reservation: {
                    adultos: 2,
                    ninos_num: 0,
                    ninosedades: [],
                  },
                },
                userAdd: {
                    first_name: '',
                    tipo_usuario: 0,
                    numperson: 0,
                    last_name: '',
                    email: '',
                    password: '',
                    password_confirmation: '',
                },
                precioninos: [],
                price_ultimate: 0,
                precioAdult: 0,
                price_second: 0,
                por_dias: 0,

                total_amultiplicar: 0,
            }
        },
        mounted() {
            this.id_user = localStorage.getItem('userPk'); // Obtén el ID del usuario desde localStorage
            console.log(`ID del usuario obtenido: ${this.id_user}`);
            if (this.id_user) {
                this.filtrarNavigation(); // Llama al método si es necesario
            } else {
                console.error('No se pudo obtener el ID del usuario desde localStorage.');
            }
            // this.filteredTes = this.tes;
            this.get_prueb();
            this.get_reserv();
        },
        watch: {
          'resev.person_reservation.ninos_num': {
            handler() {
              this.calcularPrecioNinos();
            },
            immediate: true,
          },
          'resev.person_reservation.ninosedades': {
            handler() {
              this.calcularPrecioNinos();
            },
            deep: true, // Observa cambios dentro del array
          },
        },
        computed: {
          totalPersonas: {
            get() {
              // Calcula la suma de adultos y niños
              const total = this.resev.person_reservation.adultos + this.resev.person_reservation.ninos_num;
              // Asigna el valor calculado a resev.numperson
              this.resev.numperson = total;
              return total;
            },
            set(value) {
              // Si necesitas manejar un setter, puedes dejarlo vacío o agregar lógica adicional
              console.warn('El valor de totalPersonas no debe ser modificado directamente.');
            },
          },
          
          // Computed property to calculate the total price

          precioTotal() {
            let total = this.calcularPrecioNinos() + this.precioAdult;
            this.total_amultiplicar = total; // Guarda el valor en la variable
            this.calcularTotal()
            return total;
          },

          precioConImpuestos() {
            const basePrice = parseFloat(this.price_second) || 0; // Asegúrate de que sea un número
            const iva = basePrice * 0.16; // Calcula el porcentaje del impuesto por hotel
            const total = basePrice + iva; // Suma el precio base y los impuestos
            this.price = total; // Actualiza el precio total
            return {
              basePrice: basePrice.toFixed(2),
              iva: iva.toFixed(2),
              total: total.toFixed(2),
            };
          },  
        },
        methods: {
            calcularPrecioNinos() {
              let totalPrecioNinos = 0;

              // Recorre las edades seleccionadas por el cliente
              this.resev.person_reservation.ninosedades.forEach((nino) => {
                // Busca el precio correspondiente en this.precioninos
                const precioEdad = this.precioninos.find((item) => item.edad === nino.edad);

                // Si se encuentra un precio, agrégalo al total
                if (precioEdad) {
                  totalPrecioNinos += precioEdad.precio;
                }
              });

              console.log('Precio total para niños:', totalPrecioNinos);
              return totalPrecioNinos;
            },
            incrementChildren() {
              this.resev.person_reservation.ninos_num++;
              this.resev.person_reservation.ninosedades.push({ edad: 0, num: this.resev.person_reservation.ninos_num });
            },

            decrementChildren() {
                if (this.resev.person_reservation.ninos_num > 0) {
                  this.resev.person_reservation.ninos_num-- - 1;
                  this.resev.person_reservation.ninosedades.pop();
                }
            },
            incrementAdults() {
                this.resev.person_reservation.adultos++;
                this.precioAdult = this.precioAdultBase * this.resev.person_reservation.adultos;
            },
            decrementAdults() {
                if (this.resev.person_reservation.adultos > 0) {
                    this.resev.person_reservation.adultos--;
                    this.precioAdult = this.precioAdultBase * this.resev.person_reservation.adultos;
                }
            },

            calcularTotal() {
              if (this.resev.desde && this.resev.hasta) {
                  const desde = new Date(this.resev.desde);
                  const hasta = new Date(this.resev.hasta);
                  hasta.setDate(hasta.getDate() + 1); // Agregar 1 día a la fecha hasta
                  // Calcular la cantidad de días
                  const days = Math.ceil((hasta - desde) / (1000 * 60 * 60 * 24)); // Contar días incluyendo el mismo día

                  // Validar que las fechas sean correctas
                  if (days > 0) {
                      this.por_dias = days;
                      const totalPrice = days * this.total_amultiplicar;
                      this.price = totalPrice; // Actualizar el precio total
                      this.price_second = totalPrice; // Actualizar el precio total
                      this.price_ultimate = totalPrice; // Actualizar el precio total
                      
                      console.log(`Días reservados: ${days}, Precio total: ${totalPrice}`);
                  } else {
                      console.error('La fecha "Hasta" debe ser mayor o igual a la fecha "Desde".');
                      this.$swal({
                        icon: 'error',
                        title: 'La fecha "Hasta" debe ser mayor o igual a la fecha "Desde".',
                        text: 'Por favor ingresa una fecha valida.',
                        confirmButtonText: 'Entendido',
                      });
                  }
              }
              // if (this.resev.numperson ) {
              //   if (this.resev.numperson === 2) {
              //     this.price = this.price_ultimate * 1; // Actualizar el precio total
              //   } else if (this.resev.numperson === 4) {
              //     this.price = this.price_ultimate * 2; // Actualizar el precio total
              //   } else if (this.resev.numperson === 6) {
              //     this.price = this.price_ultimate * 3; // Actualizar el precio total
              //   }else {
              //     console.log('Número de personas no válido');
                  
              //   }
              // }
            },

            filtrarNavigation() {
                LoginServices.getUType({
                    username: this.id_user
                }).then((response) => {
                    this.usuario_act = response.data.nombre
                    this.tipoUsuario = response.data.tipo
                    this.iduser_activo = response.data.id
                    // this.$store.dispatch('user/setUserType', this.tipoUsuario);
                    // console.log('si se guardo el id del usuario',this.tipoUsuario)
                    // 
                    // this.navigation = this.navigation.filter(item => {
                    // if (item.tipo.includes(this.tipoUsuario)) {
                    //     return item;
                    // }
                    // });
                }).catch(error => {
                    console.log(error)
                    this.$swal({
                        icon: 'error',
                        title: 'Error al obtener el tipo de usuario'
                    });
                });
            },
            get_reserv(){
              this.loading = true;
              // const mensaje = "Este es el mensaje que deseas enviar";
              hotelesservices.get_hoteles({ 
                filt: this.searchQuery,
              })
              .then(response => {

                console.log('Success:', response.data);
                this.reservaciones = response.data;
                this.filteredTes = this.reservaciones
              })
              .catch(error => {
                console.error('Error:', error.response.data); // Inspecciona los errores aquí
              });

            },
            navigation_host(id) {
                if (id === 1) {
                    this.swich = true;
                } else if (id === 2) {
                    this.swich = false;
                }
                console.log('id', id);
                
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
                    item.Nombre.toLowerCase().includes(query)
                );
            },
            abrir_mdlserv(item){
              if ( item.precio_adult === 0) {
                this.$swal({
                  icon: 'error',
                  title: 'No hay precios de dulto para este hotel aun ',
                  text: 'Por favor selecciona un hotel con precios para niños.',
                  confirmButtonText: 'Entendido',
                });
                return;
              } 
              if (item.price_nin_comp === '[]') {
                this.$swal({
                  icon: 'error',
                  title: 'No hay precios para este hotel aun ',
                  text: 'Por favor selecciona un hotel con precios para niños.',
                  confirmButtonText: 'Entendido',
                });
                return;
              } else{
                console.log('id', item);
                this.nomhotl = item.Nombre
                const priceNumber = parseFloat(item.price.replace(/,/g, ''));
                this.price = item.price
                this.price_second = item.price
                this.price_ultimate = priceNumber;
                this.pricemultiplicado = priceNumber;
                this.idhotl = item.id
                this.open = true;
                this.precioninos = JSON.parse(item.price_nin_comp) 
                console.log('JSON RESPUESTA', JSON.parse(item.price_nin_comp));
                console.log('precioniños', this.precioninos);
      
                // this.precioAdult = item.precio_adult 
                this.precioAdultBase = item.precio_adult; // Guardar el precio base de un adulto
                this.precioAdult = this.precioAdultBase * this.resev.person_reservation.adultos; // Calcular el precio inicial para adultos
                const tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                const desde_fech = tomorrow.toISOString().split('T')[0];

                // Obtener la fecha de mañana más 1 día
                const dayAfterTomorrow = new Date(tomorrow);
                dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 1);
                const hasta_fech = dayAfterTomorrow.toISOString().split('T')[0];
                this.resev.desde = desde_fech;
                this.resev.hasta = hasta_fech;

                // Calcular la cantidad de días y el precio total
                const desde = new Date(this.resev.desde);
                const hasta = new Date(this.resev.hasta);
                const days = Math.ceil((hasta - desde) / (1000 * 60 * 60 * 24)) ; // Contar días incluyendo el mismo día
                const totalPrice = days * this.pricemultiplicado;

                console.log(`Días reservados: ${days}, Precio total: ${totalPrice}`);
                console.log('JSON RESPUESTA', JSON.parse(item.price_nin_comp));
                console.log('precioniños', this.precioninos);
              }

            },
            get_prueb(){
              this.loading = true;
              reservacionesservices.getNot({ mensaje: 'Test message' })
              .then(response => {
                console.log('Success:', response.data);
              })
              .catch(error => {
                console.error('Error:', error.response.data); // Inspecciona los errores aquí
              });

            },

            guardarDatos(){   
                console.log('resev',this.resev);

                // Validar campos requeridos
              if (!this.resev.tipo_habitacion) {
                this.$swal({
                  icon: 'error',
                  title: 'Selecciona un tipo de habitación',
                  text: 'Por favor selecciona el tipo de habitación.',
                  confirmButtonText: 'Entendido',
                });
                return;
              }
              if (!this.resev.vista_habitacion) {
                this.$swal({
                  icon: 'error',
                  title: 'Selecciona una vista de habitación',
                  text: 'Por favor selecciona la vista de la habitación.',
                  confirmButtonText: 'Entendido',
                });
                return;
              }
              if (!this.resev.check) {
                this.$swal({
                  icon: 'error',
                  title: 'Selecciona un plan',
                  text: 'Por favor selecciona un plan.',
                  confirmButtonText: 'Entendido',
                });
                return;
              }
              if (!this.resev.desde) {
                this.$swal({
                  icon: 'error',
                  title: 'Selecciona un desde cuando ocupas la habitación',
                  text: 'Por favor selecciona la fecha de inicio (desde).',
                  confirmButtonText: 'Entendido',
                });
                return;
              }
              if (!this.resev.hasta) {
                this.$swal({
                  icon: 'error',
                  title: 'Selecciona hasta cuando ocupas la habitación',
                  text: 'Por favor selecciona la fecha de fin (hasta).',
                  confirmButtonText: 'Entendido',
                });
                return;
              }
              if (!this.resev.numperson || this.resev.numperson <= 0) {
                this.$swal({
                  icon: 'error',
                  title: 'Selecciona un número de personas',
                  text: 'Por favor ingresa un número válido de personas.',
                  confirmButtonText: 'Entendido',
                });
                return;
              }
              console.log('guardarDatos1', this.nomhotl, this.idhotl, this.resev.check, this.resev.tipo_habitacion, this.resev.vista_habitacion);
              console.log('guardarDatos2', this.resev.desde, this.resev.hasta , this.resev.check);
              let loader = useLoading().show({
                  canCancel: false,
                  loader: 'bars'
              });
              reservacionesservices.createreserv_client({ 
                email: this.emailusr, 
                uduario: this.namesr, 
                price: this.price, 
                usuario_id: this.iduser_activo, 
                hotel: this.nomhotl, 
                plan: this.resev.check, 
                desde: this.resev.desde,
                hasta: this.resev.hasta,
                usuario_on: true,
                cuentas_pesonas: this.resev.numperson,
                tip_hab:  this.resev.tipo_habitacion, 
                tip_vista: this.resev.vista_habitacion, 
                precio_adult: this.resev.person_reservation.adultos, 
                precio_nino: this.resev.person_reservation.ninos_num, 
                tip_peson: JSON.stringify(this.resev.person_reservation),
              })
              .then(response => {
                console.log('Success:', response.data);

                 this.open = false; // Cerrar el modal después de guardar los datos
                 loader.hide();

                this.$swal({
                    icon: 'success',
                    title: 'se ha Creado su reservacion con exito',
                    timer: 2000
                });
                this.get_prueb();
                this.get_reserv();
              })
              .catch(error => {
                  loader.hide();

                console.error('Error:', error.response.data); // Inspecciona los errores aquí
              });

              
            }
        }
    }
</script>
<style scoped>
.tel-a {
  display: flex;
    align-items: flex-start;
    width: 14%; /* Added width property */
}
.tel-d {
  height: 0vh;
  width: 100%;

}
.tel {
  width: 100%;
  height: 4vh;
  cursor: pointer; /* Cambia el cursor al pasar sobre el ícono */
  background: #9db9c8;
  color: #f3f4f6;
  border-radius: 5px;
  border: solid 3px #024a71;
}
.wtz {
  position: fixed;
  right: 14px;
  bottom: 36px;
  /* font-size: 7px; */
  width: 59px;
  cursor: pointer; /* Cambia el cursor al pasar sobre el ícono */
  z-index: 1000; /* Asegúrate de que esté por encima de otros elementos */
}
.ring-gray-300 {
    --tw-ring-color: oklch(0 0 0);
}
.cls-55{
  /* height: 55vh; */
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