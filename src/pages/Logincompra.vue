<script setup>
    // import imgBg from '../assets/bgstate.jpg'
    import { ref, onMounted, onUnmounted } from 'vue';

    import ppalogo from '../assets/logoluxereserv.jpg'
    // import ppalogo from '../assets/hotelbok.png'
    import { URL_API } from '@/boot/axios'; // Importar la URL base

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
        <div style="width: 90%;"  class="flex  items-center p-1 border border-blue-600 dark:border-blue-400 rounded-xl">
            <button  @click="navigation_host(1)"  style="      white-space: nowrap;   border: solid 1px #024a71;  background-color: #024a7163; width: 50%;" class="px-4 bg-[#024a7163] py-2 mx-4 text-sm font-medium text-[#024a71] capitalize transition-colors duration-300 md:py-3 dark:text-blue-400 dark:hover:text-white focus:outline-none hover:bg-blue-600 hover:text-white rounded-xl md:mx-8 md:px-12">Usuarios con cuenta</button>
            <button @click="navigation_host(2)" style="      white-space: nowrap;   border: solid 1px #024a71; background-color: #024a7163; width: 50%; " class="px-4 bg-[#024a7163] py-2 text-sm font-medium text-[#024a71] capitalize  md:py-3 rounded-xl md:px-12">Usuarios de plataforma</button>

        </div>
    </div>
    <div class="max-w-6xl mt-20" style="margin-top: 40px;  " >

        <div  style="display: flex; flex-direction: column; justify-content: center;">
          <div style="    width: 100%; display: flex; justify-content: center; align-items: center; flex-direction: column;">
              <!-- <label for="location" class="block text-sm font-medium leading-6 text-gray-900  text-left">Buscar hotel por nombre</label> -->

              <input v-model="searchQuery" id="search-field" style="width: 80%;     height: fit-content;     align-items: flex-end;" class="block w-full rounded-full border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6" placeholder="Buscar hotel por nombre" type="search" name="search" />

          </div>
          <div  class="w-[25%] mx-3  flex justify-center items-end gap-[15px]">
              <div style=" width: 70%;  display: flex; justify-content: center; align-items: flex-end;">
                  <div style="    display: flex; align-items: flex-end;  justify-content: center;    width: 100%;  " class=" sm:mt-0 sm:flex-none">
                      <button @click="applyFilter()"  type="button" class=" butonn-reserv w-full block rounded-md bg-redppa px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-redppahv focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">Buscar</button>
                  </div>
              </div>
          </div>
        </div>
        <div   v-if="reservaciones.length > 0 && swich "  class="max-w-6xl " style="  height: 56vh;overflow: scroll;" >
          <div   class="flex items-center justify-center"  style="margin-top: 20px;" >
            <div style="width: 80%;     display: flex;justify-content: center;"  class="flex  items-center p-1   rounded-xl">
                <p style="color: #000000; font-size: 20px; font-weight: 700;">reservaciónes  de usuarios de la plataforma </p>
            </div>
          </div>
          <div  v-if="reservaciones.length > 0 && swich "   class="flex cls-55 items-center justify-center " v-for="item in reservaciones" :key="item.id">
              <div class="max-w-sm w-full sm:w-1/2 lg:w-1/3 py-6 px-3">
                  <div class="bg-white shadow-xl rounded-lg overflow-hidden">
                      <div class="flex w-full " >
                        <div class="p-4">
                            <p class="uppercase tracking-wide text-sm font-bold text-gray-700">{{ item.hotel }}</p>
                          
                        </div>
                        <div style="    display: flex;align-items: center;">
                          <span v-if="!item.pagado" style="width: 20px; height: 20px; border-radius: 15px; margin: 10px;  background: #ffa0a0; border: 1px solid #a10000; color: #900;font-weight: 700; padding: 1px;"  class="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-red-600/10 ring-inset"></span>
                          <span v-else style="width: 20px; height: 20px; border-radius: 15px; margin: 10px;     background: #bbffa0; border: solid 1px #135900; color: #135900; font-weight: 700; padding: 1px;" class="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-green-600/20 ring-inset"></span>
                        </div>
                      </div>

                      <div class="p-4" style="    display: flex ;justify-content: space-around;" >
                        <div @click="open_delete(item)" style="    width: 10%; color: #910000;  display: flex ; align-items: center; " >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                          </svg>
                        </div>
                        <!-- <div @click="open_verifi_img(item)" style="    width: 10%; color: #910000; " >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                          </svg>
                        </div> -->
                        <div  v-if="item.clent_envie_img && !item.pagado"  style="    width: 55%; color: green; " >
                          <div style="    display: flex; align-items: flex-end;  justify-content: center;    width: 100%;  " class=" sm:mt-0 sm:flex-none">
                              <button  @click="open_verifi_img(item)" style="width: 100%;     height: 6vh;     font-size: 13px;"  type="button" class=" butonn-reserv w-full block rounded-md bg-redppa px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-redppahv focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">Vefificar comprobante de pago</button>
                          </div>
                        </div>
                        <div @click="ver_info(item)"  style="    width: 10%;     color: #024a71;  display: flex ; align-items: center; " >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                          </svg>
                        </div>
                      </div>
                  </div>
              </div>
          </div>
          <div v-else-if=" swich && reservaciones.length === 0" class="flex cls-55 items-center justify-center">
              <p class="text-gray-700 text-lg font-semibold">No hay reservaciones con usuarios con sesion </p>
          </div>
        </div>
        <div v-if="reserv_priv.length > 0 && !swich "   class="max-w-6xl " style="  height: 56vh;overflow: scroll;" >
          <div   class="flex items-center justify-center"  style="margin-top: 20px;" >
            <div style="width: 80%;     display: flex;justify-content: center;"  class="flex  items-center p-1   rounded-xl">
                <p style="color: #900; font-size: 20px; font-weight: 700;">reservaciónes  de externos de la plataforma </p>
            </div>
          </div>
          <div  v-if="reserv_priv.length > 0 && !swich "   class="flex cls-55 items-center justify-center " v-for="item in reserv_priv" :key="item.id">
              <div class="max-w-sm w-full sm:w-1/2 lg:w-1/3 py-6 px-3">
                  <div class="bg-white shadow-xl rounded-lg overflow-hidden">

                      <!-- <div class="p-4">
                          <p class="uppercase tracking-wide text-sm font-bold text-gray-700">{{ item.hotel }}</p>

                      </div> -->
                      <div class="flex w-full " >
                        <div class="p-4">
                          <p class="uppercase tracking-wide text-sm font-bold text-gray-700">{{ item.hotel }}</p>
                      </div>
                        <div style="    display: flex;align-items: center;">
                          <span v-if="!item.pagado" style="margin: 10px;  width: 20px; height: 20px; border-radius: 15px;     background: #ffa0a0; border: 1px solid #a10000; color: #900;font-weight: 700; padding: 1px;"  class="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-red-600/10 ring-inset"></span>
                          <span v-else style=" margin: 10px;  width: 20px; height: 20px; border-radius: 15px;  background: #bbffa0; border: solid 1px #135900; color: #135900; font-weight: 700; padding: 1px;" class="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-green-600/20 ring-inset"></span>
                        </div>
                      </div>
                      <div class="p-4" style="    display: flex ;justify-content: space-around;" >
                        <div @click="open_delete(item)" style="     display: flex;   width: 10%; color: #910000; " >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                          </svg>
                        </div>
                        <div  v-if="!item.pagado"  style="    width: 55%; color: green; " >
                          <div style="    display: flex; align-items: flex-end;  justify-content: center;    width: 100%;  " class=" sm:mt-0 sm:flex-none">
                              <button  @click="Completar_resevacion(item)" style="width: 100%;     height: 6vh;     font-size: 13px;"  type="button" class=" butonn-reserv w-full block rounded-md bg-redppa px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-redppahv focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">Completar reservación</button>
                          </div>
                        </div>
                        <div @click="ver_info(item)"  style="      display: flex;   width: 10%;     color: #024a71;" >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                          </svg>
                        </div>
                      </div>
                  </div>
              </div>
          </div>
          <div v-else-if=" !swich && reserv_priv.length === 0" class="flex cls-55 items-center justify-center">
              <p class="text-gray-700 text-lg font-semibold">No hay reservaciones de usuarios sin secion</p>
          </div>
        </div>
    </div>

    <TransitionRoot as="template" :show="open_verifi">
        <Dialog as="div" class="relative z-50" @close="open_verifi = false">
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </TransitionChild>

            <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center max-sm:items-center  sm:p-0 max-2xl:items-center">
                <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" style="    max-height: 90vh;" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                    <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-10/12 sm:max-w-4xl sm:p-6 max-md:w-11/12 scroll" style="display: flex ; flex-direction: column; justify-content: space-around; height: 75vh;     width: 100%; margin-block: 25px; overflow: scroll;">
                        <div style="width: 100%; height: 45vh;">
                            <div class="mt-3 text-center sm:mt-5 ">
                                <!-- <dialog as="h3" class="text-base font-semibold leading-6 text-gray-900" > para el hotel {{  nomhotl }}</dialog> -->
                                <div class="mt-2 mb-2" style="    margin-bottom: 20px;" >
                                  <div class="title">
                                        <DialogTitle as="h3" class="text-base font-semibold leading-6 text-gray-900">Estas  deacuerdo de eliminar esta  reservación <br> esta accion no tendra retorno </DialogTitle>
                                    </div>
                                </div>
                                <div>
                                  <img style="    width: 90%;" :src="urlimg" alt="imgalt">
                                </div>
                            </div>
                        </div>
                        <div class="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                            <button @click="validar_reserva()" type="button" class="inline-flex w-full justify-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black sm:col-start-2" >verificar paso</button>
                            <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0" @click="open_verifi = false" ref="cancelButtonRef">Cancelar</button>
                        </div>
                    </DialogPanel>
                </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
    <TransitionRoot as="template" :show="open_confirm">
        <Dialog as="div" class="relative z-50" @close="open_confirm = false">
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </TransitionChild>

            <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center max-sm:items-center  sm:p-0 max-2xl:items-center">
                <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" style="    max-height: 90vh;" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                    <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-10/12 sm:max-w-4xl sm:p-6 max-md:w-11/12 scroll" style="height: 25vh;     width: 100%; margin-block: 25px; overflow: scroll;">
                        <div>
                            <div class="mt-3 text-center sm:mt-5 ">
                                <!-- <dialog as="h3" class="text-base font-semibold leading-6 text-gray-900" > para el hotel {{  nomhotl }}</dialog> -->
                                <div class="mt-2 mb-2" style="    margin-bottom: 20px;" >
                                  <div class="title">
                                        <DialogTitle as="h3" class="text-base font-semibold leading-6 text-gray-900">Estas  deacuerdo de eliminar esta  reservación <br> esta accion no tendra retorno </DialogTitle>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                            <button type="button" class="inline-flex w-full justify-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black sm:col-start-2" @click="deltereserv()">Eliminar</button>
                            <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0" @click="open_confirm = false" ref="cancelButtonRef">Cancelar</button>
                        </div>
                    </DialogPanel>
                </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
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
                                        <div class="title">
                                            <DialogTitle as="h3" class="text-base font-semibold leading-6 text-gray-900">Nueva Reservacion para el  hotel : <br> {{  nomhotl }}</DialogTitle>

                                        </div>
                                        <div style=" width: 100%; display: flex; justify-content: center;align-content: center; flex-direction: column;">
                                            <p class="text-base font-semibold leading-6 text-gray-900">Fecha de creacion de la reservacion <br> {{ formatDate(resev.fech_creacion) }}</p>

                                        </div>
                                        <div style="    width: 95%; display: flex; justify-content: center;align-content: center; flex-direction: column;">
                                            <label for="location" class="block text-sm font-medium leading-6 text-gray-900  text-left">nombre de quien reserva </label>

                                            <input  v-model="namesr" id="name" style="width: 100%;     height: fit-content;     align-items: flex-end;" class="block w-full rounded-full border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6" placeholder="Nombre de quien reserva" type="search" name="search" disabled/>

                                        </div>
                                        <div style="    width: 95%; display: flex; justify-content: center;align-content: center; flex-direction: column;">
                                            <label for="location" class="block text-sm font-medium leading-6 text-gray-900  text-left">email de quien reserva </label>

                                            <input  v-model="emailusr" id="email" style="width: 100%;     height: fit-content;     align-items: flex-end;" class="block w-full rounded-full border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6" placeholder="email de quien reserva" type="search" name="search" disabled />

                                        </div>
                                        <div style="    width: 95%; display: flex; justify-content: center;align-content: center; flex-direction: column;">
                                            <label for="location" class="block text-sm font-medium leading-6 text-gray-900  text-left">desde</label>
                                            <p for="location" class="block text-sm font-medium leading-6 text-gray-900  text-left">{{ formatDate(resev.desde) }}</p>


                                        </div>
                                        <div style="    width: 95%; display: flex; justify-content: center;align-content: center; flex-direction: column;">
                                            <label for="location" class="block text-sm font-medium leading-6 text-gray-900  text-left">hasta</label>
                                            <p for="location" class="block text-sm font-medium leading-6 text-gray-900  text-left">{{ formatDate(resev.hasta) }}</p>
                                        </div>
                                        <div style="    width: 95%; display: flex; justify-content: center;align-content: center; flex-direction: column;">
                                            <label for="location" class="block text-sm font-medium leading-6 text-gray-900  text-left"> Para cuantas personas</label>

                                            <input   v-model="resev.numperson"  placeholder="ingrea el numero de perosa para la reservacion" id="email" style="width: 100%;     height: fit-content;     align-items: flex-end;" class="block w-full rounded-full border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"  type="number" name="search" />

                                        </div>
                                        <span class="text-black" style="color: black;" >Selecciona un plan</span>
                                        <div id="checklist">
                                            <input checked="" value="Solo alojamiento" name="r" type="radio" id="01" v-model="resev.check" disabled>
                                            <label for="01">Solo alojamiento</label>
                                            <input value="Desayuno bufet" name="r" type="radio" id="02" v-model="check" disabled>
                                            <label for="02">Desayuno bufet</label>
                                            <input value="Todo incluido" name="r" type="radio" id="03" v-model="check" disabled>
                                            <label for="03">Todo incluido</label>
                                        </div>
                                        <div >
                                          <div class="w-full">
                                              <div style="    width: 300px; display: flex; justify-content: center; flex-direction: column; ">
                                                  <label for="location" class="block text-sm font-medium leading-6 text-gray-900  text-left">Tipo de habitacion</label>
                                                  <select v-model="resev.tipo_habitacion" id="location" name="location" class="mt-2 block w-full bg-imputs rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-black sm:text-sm sm:leading-6"  disabled>
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
                                                  <select v-model="resev.vista_habitacion" id="location" name="location" class="mt-2 block w-full bg-imputs rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-black sm:text-sm sm:leading-6"  disabled>
                                                      <option value="vista a la montaña" >vista a la montaña</option>
                                                      <option value="vista al mar" >vista al mar</option>
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
                            <!-- <button type="button" class="inline-flex w-full justify-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black sm:col-start-2" @click="guardarDatos()">Guardar</button> -->
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
    import reservacionesservices from '../services/reservacionesservices';
    // import { defineComponent } from "vue";
    // import { RecaptchaV2, useRecaptcha } from "vue3-recaptcha-v2";
    // const { handleGetResponse } = useRecaptcha();
    import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
    import hotel1 from '@/assets/hotel1.jpg';
    import hotel2 from '@/assets/hotel2.jpg';
    import hotel3 from '@/assets/hotel3.jpg';
import { URL_API } from '@/boot/axios';
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
                    { id: 1, name: 'KRYSTAL GRAND PUNTA CANCÚN - CANCÚN, QUINTANA ROO', telefono: '01 (998) 891-5555', url:hotel1 , precio_inicial: 400 , precio_dec: 2268 },
                    { id: 2, name: 'KRYSTAL GRAND LOS CABOS - SAN JOSÉ DEL CABO, BCS', telefono: '01 (624) 163-4750', url:hotel2  , precio_inicial: 400 , precio_dec: 2268 },
                    { id: 3, name: 'KRYSTAL GRAND SUITES INSURGENTES SUR - CIUDAD DE MÉXICO, CDMX', telefono: '01 (55) 5322-1580', url: hotel3 , precio_inicial: 400 , precio_dec: 2268  },
                    { id: 4, name: 'KRYSTAL GRAND NUEVO VALLARTA - PUERTO VALLARTA, JALISCO', telefono: '01 (322) 226-1050', url:hotel1 , precio_inicial: 400 , precio_dec: 2268  },
                    { id: 5, name: 'KRYSTAL GRAND PUERTO VALLARTA - PUERTO VALLARTA, JALISCO', telefono: '01 (322) 176-1176' , url:hotel2 , precio_inicial: 400 , precio_dec: 2268   },
                    { id: 6, name: 'KRYSTAL GRAND RESIDENCES & VILLAS SAN MIGUEL DE ALLENDE', telefono: '01 (415) 148-2000', url:hotel3   , precio_inicial: 400 , precio_dec: 2268  },
                    { id: 7, name: 'KRYSTAL CANCÚN - CANCÚN, QUINTANA ROO', telefono: '01 (998) 848-9800' , url:hotel1  },
                    { id: 8, name: 'KRYSTAL PUERTO VALLARTA - PUERTO VALLARTA, JALISCO', telefono: '01 (322) 226-0700' , url:hotel2 , precio_inicial: 400 , precio_dec: 2268   },
                    { id: 9, name: 'KRYSTAL IXTAPA - IXTAPA ZIHUATANEJO, GUERRERO', telefono: '01 (755) 555-0510' , url:hotel3  , precio_inicial: 400 , precio_dec: 2268  },
                    { id: 10, name: 'PLAYA KRYSTAL ACAPULCO - ACAPULCO, GUERRERO', telefono: '01 (744) 485-5050' , url:hotel1  , precio_inicial: 400 , precio_dec: 2268  },
                    { id: 11, name: 'KRYSTAL SATÉLITE MARIA BARBARA - TLALNEPANTLA, MÉXICO', telefono: '01 (55) 5366-9924' , url:hotel2   , precio_inicial: 400 , precio_dec: 2268 },
                    { id: 12, name: 'KRYSTAL MONTERREY - MONTERREY, NUEVO LEÓN', telefono: '01 (81) 8319-0900' , url:hotel3  , precio_inicial: 400 , precio_dec: 2268  },
                    { id: 13, name: 'KRYSTAL URBAN CANCUN CENTRO - CANCÚN, QUINTANA ROO', telefono: '01 (998) 848-8000' , url:hotel1  , precio_inicial: 400 , precio_dec: 2268  },
                    { id: 14, name: 'KRYSTAL URBAN CIUDAD JUAREZ - CIUDAD JUAREZ, CHIHUAHUA', telefono: '01 (656) 629-0995' , url:hotel2  , precio_inicial: 400 , precio_dec: 2268  },
                    { id: 15, name: 'KRYSTAL URBANO GUADALAJARA - GUADALAJARA, JALISCO', telefono: '01 (33) 3679-3780' , url:hotel3 , precio_inicial: 400 , precio_dec: 2268  },
                    { id: 16, name: 'KRYSTAL URBAN / MONTERREY - MONTERREY, NUEVO LEÓN', telefono: '01 (81) 8122-8000' , url:hotel1, precio_inicial: 400 , precio_dec: 2268   },
                    { id: 17, name: 'HAMPTON INN & SUITES PARAISO TABASCO - PARAISO, TABASCO', telefono: '01 (933) 333-6092' , url:hotel2  , precio_inicial: 400 , precio_dec: 2268  },
                    { id: 18, name: 'HYATT PLACE AGUASCALIENTES', telefono: '(449) 800-1234' , url:hotel3  , precio_inicial: 400 , precio_dec: 2268  },
                    { id: 19, name: 'HYATT CENTRIC LEON', telefono: '01 (477) 344-1100' , url:hotel1  , precio_inicial: 400 , precio_dec: 2268  },
                    { id: 20, name: 'HYATT REGENCY MÉXICO CITY INSURGENTES', telefono: '01 (55) 57247700' , url:hotel2  , precio_inicial: 400 , precio_dec: 2268  },
                    { id: 21, name: 'MAHEKAL - PLAYA DEL CARMEN', telefono: '800 836-8942' , url:hotel3  , precio_inicial: 400 , precio_dec: 2268  },
                ],
                searchQuery: '',
                reserv_priv: [],
                filteredTes: [],
                reservaciones: [],
                urlimg: '',
                debounceTimeout: null,
                nomhotl: '',
                emailusr: '',
                namesr: '',
                check: 0,
                id_reserva: 0,
                idhotl: 0,
                swich: true,
                open_verifi: false,
                open_confirm: false,
                open: false,
                resev: {
                  check: '',
                  tipo_habitacion: '',
                  fech_creacion: '',
                  desde: '',
                  hasta: '',
                  numperson: '',
                  vista_habitacion: '',
                },
                userAdd: {
                    first_name: '',
                    tipo_usuario: 0,
                    last_name: '',
                    email: '',
                    password: '',
                    password_confirmation: '',
                },
                reservacion: {
                    id: 0,
                },
            }
        },
        mounted() {
            // this.filteredTes = this.tes;
            this.get_reserv_priv();
            this.get_prueb();
            this.get_reserv();
        },
        methods: {
            Completar_resevacion(item){
              // Vlidate_reserv
              reservacionesservices.Vlidate_reserv(item.id)
              .then(response => {
                console.log('Success:', response.data);
                this.open_verifi = false;
                this.get_reserv_priv();
                this.get_prueb();
                this.get_reserv();
                this.reservacion.id = 0;
                this.$swal({
                    icon: 'success',
                    title: 'Se ha completado la reservacion',
                    text: 'La reservacion se ha realizado con exito',
                    timer: 2000
                });
              })
              .catch(error => {
                console.error('Error:', error.response?.data || error.message); // Inspecciona los errores aquí

              });
            },
            validar_reserva(){
              // Vlidate_reserv
              reservacionesservices.Vlidate_reserv(this.reservacion)
              .then(response => {
                console.log('Success:', response.data);
                this.open_verifi = false;
                this.get_reserv_priv();
                this.get_prueb();
                this.get_reserv();
                this.reservacion.id = 0;
                this.$swal({
                    icon: 'success',
                    title: 'Se ha completado la reservacion',
                    text: 'La reservacion se ha realizado con exito',
                    timer: 2000
                });
              })
              .catch(error => {
                console.error('Error:', error.response?.data || error.message); // Inspecciona los errores aquí

              });
            },
            open_verifi_img(item){
              this.open_verifi = true;
              this.reservacion.id = item.id
              this.urlimg = item.img_enviada
            },
            formatDate(dateString) {
                const date = new Date(dateString);
                const day = String(date.getDate()).padStart(2, '0');
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const year = date.getFullYear();
                return `${day}/${month}/${year}`;
            },
            deltereserv(){
                reservacionesservices.Deletereserv({ id: this.idhotl })
                .then(response => {
                    console.log('Success:', response.data);
                    this.open_confirm = false;
                    this.get_reserv_priv();
                    this.get_prueb();
                    this.get_reserv();
                })
                .catch(error => {
                    console.error('Error:', error.response.data);
                });
            },
            open_delete(item){
                console.log('ver_info', item);
                this.idhotl = item.id
                this.open_confirm = true;
            },
            ver_info(item){
                console.log('ver_info', item);
                this.nomhotl = item.hotel
                this.namesr = item.uduario
                this.emailusr = item.email
                this.resev.tipo_habitacion = item.tip_hab

                this.resev.vista_habitacion = item.tip_vista
                this.resev.desde = item.desde;
                this.resev.hasta = item.hasta;
                this.resev.fech_creacion = item.fecha_de_creacion;
                this.resev.numperson = item.cuentas_pesonas
                this.idhotl = item.id
                this.open = true;
                this.check = item.plan
            },
            navigation_host(id) {
                if (id === 1) {
                    this.swich = true;
                } else if (id === 2) {
                    this.swich = false;
                }
                console.log('id', id);
                
            },
            // debounceFilter() {
            //     clearTimeout(this.debounceTimeout);
            //     this.debounceTimeout = setTimeout(() => {
            //         this.applyFilter();
            //     }, 2000);
            // },
            applyFilter() {
              this.reserv_priv = [];
              this.filteredTes = [];
              this.reservaciones = [];
              //aqui quiero poner un set time out para que no se ejecute tan rapido
              clearTimeout(this.debounceTimeout);
              this.debounceTimeout = setTimeout(() => {
                this.get_reserv_priv();
                this.get_reserv();
              }, 2000);

            },
            abrir_mdlserv(item){
                console.log('id', item);
                this.nomhotl = item.name
                this.idhotl = item.id
                this.open = true;
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
            get_reserv(){
              this.loading = true;
              // const mensaje = "Este es el mensaje que deseas enviar";
              reservacionesservices.getReservaciones({ 
                filt: '' ,
              })
              .then(response => {

                console.log('Success:', response.data);
                this.reservaciones = response.data;
                // this.filteredTes = this.reservaciones
              })
              .catch(error => {
                console.error('Error:', error.response.data); // Inspecciona los errores aquí
              });

            },
            get_reserv_priv(){
              this.loading = true;
              // const mensaje = "Este es el mensaje que deseas enviar";
              reservacionesservices.getReservaciones_priv({ 
                filt:  this.searchQuery,
              })
              .then(response => {

                // console.log('Success:', response.data);
                this.reserv_priv = response.data;
                console.log('reserv_priv:', response.data);

                // this.filteredTes = this.reservaciones
              })
              .catch(error => {
                console.error('Error:', error.response.data); // Inspecciona los errores aquí
              });

            },
            guardarDatos(){              
              // this.reservaciones.push({
              //     hotel: this.nomhotl,
              //     id: this.idhotl,
              //     plan: this.resev.check,
              //     tipo_habitacion: this.resev.tipo_habitacion,
              //     vista_habitacion: this.resev.vista_habitacion,
              // });
              // login('guardarDatos1', this.nomhotl, this.idhotl, this.resev.check, this.resev.tipo_habitacion, this.resev.vista_habitacion);
              reservacionesservices.createreserv({ 
                email: this.emailusr, 
                uduario: this.namesr, 
                hotel: this.nomhotl, 
                plan: this.resev.check, 
                tip_hab:  this.resev.tipo_habitacion, 
                tip_vista: this.resev.vista_habitacion, 
              })
              .then(response => {
                console.log('Success:', response.data);
                
              })
              .catch(error => {
                console.error('Error:', error.response.data); // Inspecciona los errores aquí
              });
              console.log('guardarDatos2', this.nomhotl, this.emailusr, this.resev.check, this.resev.tipo_habitacion, this.resev.vista_habitacion);
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