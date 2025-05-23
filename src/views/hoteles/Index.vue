<script setup>
    import { URL_API } from '@/boot/axios'; // Importar la URL base
    // import igBg from '../assets/bgstate.jpg'
    import { ref, onMounted, onUnmounted } from 'vue';
    import VueEasyLightbox from 'vue-easy-lightbox';
    import ppalogo from '@/assets/logoluxereserv.jpg'
    // import ppalogo from '../assets/hotelbok.png'
    import tel from '@/assets/icons8-asistente-100.png'

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
    const isViewerOpen = ref(false); // Controla si el visor está abierto
    const currentImage = ref(''); // Imagen actual para mostrar en el visor

    const openImageViewer = (imageUrl) => {
      currentImage.value = imageUrl;
      isViewerOpen.value = true;
    };

    const closeImageViewer = () => {
      isViewerOpen.value = false;
    };
</script>
<template>
    <div class="sm:flex items-center " style="    height: 25vh;     margin-top: 40px;     display: flex;justify-content: center;" >
        <div class="w-full flex justify-center md:px-10 sm:px-5 transition-all duration-300" style="    width: 50%;" :class="{ 'opacity-0 scale-75': isScrolled, 'opacity-100 scale-100': !isScrolled }">
            <img class="bg-cover" :src="ppalogo" alt="" />
        </div>

    </div>
    <div   class="flex items-center justify-center"  style="margin-top: 20px;     gap: 21px;" >
        <div style="width: 62%;"  class="flex  items-center p-1 border border-blue-600 dark:border-blue-400 rounded-xl">
            <!-- <button @click="navigation_host(1)" style="    border: solid 1px #024a71; background-color: #024a7163; width: 50%; " class="px-4 bg-[#024a7163] py-2 text-sm font-medium text-[#024a71] capitalize  md:py-3 rounded-xl md:px-12">Hoteles</button> -->
            <button  style="    border: solid 1px #024a71;  background-color: #024a7163; width: 100%;" class="px-4 bg-[#024a7163] py-2 mx-4 text-sm font-medium text-[#024a71] capitalize transition-colors duration-300 md:py-3 dark:text-blue-400 dark:hover:text-white focus:outline-none hover:bg-blue-600 hover:text-white rounded-xl md:mx-8 md:px-12">Hoteles</button>
        </div>
        <!-- <div @click="abrir_mdl()" style="    width: 11%; border: solid 0px;"  class="flex  items-center p-1 border border-blue-600 dark:border-blue-400 rounded-xl">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
        </div> -->
        <div style="       width: 15%; display: flex;   justify-content: center; " class=" sm:mt-0 sm:flex-none">
            <button @click="abrir_mdl()"  style="    font-size: 20px; font-weight: 600;" type="button" class=" butonn-reserv w-full block rounded-md bg-redppa px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-redppahv focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">+</button>
        </div>
    </div>
    <div  v-if="swich " class="max-w-6xl mt-20" style="margin-top: 40px;  " >

        <div v-if="swich " style="display: flex; flex-direction: column; justify-content: center;">
          <div style="    width: 100%; display: flex; justify-content: center; align-items: center; flex-direction: column;">
              <!-- <label for="location" class="block text-sm font-medium leading-6 text-gray-900  text-left">Buscar hotel por nombre</label> -->

              <input @input="debounceFilter()" v-model="searchQuery" id="search-field" style="width: 80%;     height: fit-content;     align-items: flex-end;" class="block w-full rounded-full border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6" placeholder="Buscar hotel por nombre" type="search" name="search" />

          </div>
          <div  class="w-[25%] mx-3  flex justify-center items-end gap-[15px]">
              <div style=" width: 70%;  display: flex; justify-content: center; align-items: flex-end;">
                  <div style=" font-size: 13px;    width: 88%;    display: flex; align-items: flex-end;  justify-content: center;    width: 100%;  " class=" sm:mt-0 sm:flex-none">
                      <button @click="get_reserv()"  type="button" class=" butonn-reserv w-full block rounded-md bg-redppa px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-redppahv focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">Buscar</button>
                  </div>
                  <div style="   font-size: 13px;   width: 88%;  display: flex; align-items: flex-end;  justify-content: center;    width: 100%;  " class=" sm:mt-0 sm:flex-none">
                      <button @click="get_reserv()"  type="button" class=" butonn-reserv w-full block rounded-md bg-redppa px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-redppahv focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">Recargar</button>
                  </div>
              </div>
          </div>
        </div>
        <div class="max-w-6xl " style="  height: 56vh;overflow: scroll;" >

            <div  v-if="filteredTes.length > 0" class="flex items-center justify-center " v-for="item in filteredTes" :key="item.id">
                <div class="max-w-sm w-full sm:w-1/2 lg:w-1/3 py-6 px-3">
                    <div class="bg-white shadow-xl rounded-lg overflow-hidden">
                
                        <div class="bg-cover bg-center h-56 p-4 image-container">
                            <img :src="`https://mi-api-imagenes.s3.us-east-2.amazonaws.com${item.img}`" alt="Imagen del hotel" class="hover-image cls-img22" />
                        </div>
                        <div class="p-4">
                            <p class="uppercase tracking-wide text-sm font-bold text-gray-700">{{ item.Nombre }}</p>

                            <p class="uppercase tracking-wide text-sm font-bold text-gray-700">MXN {{ item.price }}</p>
                            <!-- <p class="uppercase tracking-wide text-sm font-bold text-gray-700">+ {{ item.impuesto_por_hotel }}% Impuesto por hotel </p> -->
                            <p class="uppercase tracking-wide text-sm font-bold text-gray-700">+ 16% IVA </p>
                        </div>
                        <div>

                        </div>
                        <div class="px-4 pt-3 pb-4 border-b border-gray-300 bg-gray-100">
                            <div class="p-4" style="    display: flex ;justify-content: space-around;" >
                                <div @click="open_delete(item)" style="    width: 50%; color: #910000; " >
                                    <!-- <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                    </svg> -->
                                    <div style="       width: 90%; display: flex;   justify-content: center; " class=" sm:mt-0 sm:flex-none">
                                        <button  style="  font-weight: 600; background-color: red;" type="button" class=" butonn-reserv w-full block rounded-md bg-redppa px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-redppahv focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">Eliminar</button>
                                    </div>
                                </div>
                                <div @click="ver_info(item)"  style="    width: 50%;     color: #024a71;" >
                                    <!-- <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    </svg> -->
                                    <div style="       width: 90%; display: flex;   justify-content: center; " class=" sm:mt-0 sm:flex-none">
                                        <button  style="    font-weight: 600; background-color: olivedrab;" type="button" class=" butonn-reserv w-full block rounded-md bg-redppa px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-redppahv focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">Info</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

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
    <TransitionRoot as="template" :show="openedit">
        <Dialog as="div" class="relative z-50" @close="openedit = false">
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
                                    <form v-if="!blockedit" class="form">
                                        <div class="title">
                                            <DialogTitle as="h3" class="text-base font-semibold leading-6 text-gray-900">Editar hotel</DialogTitle>

                                        </div>
                                        <!-- <div style=" width: 100%; display: flex; justify-content: center;align-content: center; flex-direction: column;">
                                            <p class="text-base font-semibold leading-6 text-gray-900">Fecha de creacion de la reservacion <br> {{ formatDate(resev.fech_creacion) }}</p>

                                        </div> -->
                                        <div style="    width: 95%; display: flex; justify-content: center;align-content: center; flex-direction: column;">
                                            <label for="location" class="block text-sm font-medium leading-6 text-gray-900  text-left">Nombre</label>

                                            <input  v-model="hote_select.nombre" id="nombre" style="width: 100%;     height: fit-content;     align-items: flex-end;" class="block w-full rounded-full border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6" placeholder="Nombre de hotel" type="search" name="search" />

                                        </div>
                                        <div style="    width: 95%; display: flex; justify-content: center;align-content: center; flex-direction: column;">
                                            <label for="location" class="block text-sm font-medium leading-6 text-gray-900  text-left">Precio por noche</label>

                                            <input  v-model="hote_select.price" id="price" style="width: 100%;     height: fit-content;     align-items: flex-end;" class="block w-full rounded-full border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6" placeholder="Precio por noche" type="search" name="search"  />

                                        </div>
                                        <div style="    width: 95%; display: flex; justify-content: center;align-content: center; flex-direction: column;">
                                          <div style="       width: 100%; display: flex;   justify-content: center; " class=" sm:mt-0 sm:flex-none">
                                            <button @click="asignar_preciospor_hotel_edit()" style="padding: 15px; width: 200px; height: 40px;" class="bg-black p-[15px] rounded-lg text-sm sm:text-base flex items-center gap-x-3 justify-center text-white hover:bg-black/80 duration-300 transition-colors border border-transparent px-8 py-2.5" >Asignar precios</button>
                                          </div>
                                        </div>
                                        <div style="width: 100%; height: 30vh;">
                                          <div class="mt-3 text-center sm:mt-5 ">
                                           
                                              <div style="display: flex; justify-content: center; width: 200px; margin: auto;" >
                                                <img style="width: 71%; height: 71%;" :src="`https://mi-api-imagenes.s3.us-east-2.amazonaws.com${hote_select.img}`"  @click="openImageViewer(`https://mi-api-imagenes.s3.us-east-2.amazonaws.com${hote_select.img}`)" alt="imgalt">
                                              </div>
                                              <VueEasyLightbox
                                                :visible="isViewerOpen"
                                                :imgs="[currentImage]"
                                                @hide="closeImageViewer"
                                              />
                                          </div>
                                        </div>
                                        <!-- <button class="button-confirm">Let`s go →</button> -->
                                    </form>
                                    <form v-else class="form form2test">
                                        <div style="gap: 20px;" class="w-full flex justify-between items-center" >
                                          <div class="return">
                                            <img :src="imgreturn" alt="return" @click="blockedit = false" style="width: 50px; height: 50px; cursor: pointer;">
                                          </div>
                                          <div class="title">
                                              <DialogTitle as="h3" class="text-base font-semibold leading-6 text-gray-900">Asignar precio</DialogTitle>
                                          </div>

                                        </div>

                                        <!-- <div style=" width: 100%; display: flex; justify-content: center;align-content: center; flex-direction: column;">
                                            <p class="text-base font-semibold leading-6 text-gray-900">Fecha de creacion de la reservacion <br> {{ formatDate(resev.fech_creacion) }}</p>

                                        </div> -->
                                        <!-- <div style="    width: 95%; display: flex; justify-content: center;align-content: center; flex-direction: column;">
                                            <label for="impuesto" class="block text-sm font-medium leading-6 text-gray-900  text-left">Impuesto por estado  <br> (Solo ingrese numero del porcentaje)  </label>

                                            <input  v-model="hote_select.impuesto_por_hotel" id="impuesto" style="width: 100%;     height: fit-content;     align-items: flex-end;" class="block w-full rounded-full border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6" placeholder="precio por estado" type="number" name="impuesto" />

                                        </div> -->
                                        <div style="    width: 95%; display: flex; justify-content: center;align-content: center; flex-direction: column;">
                                            <label for="precio_adulto" class="block text-sm font-medium leading-6 text-gray-900  text-left">Precio por adulto <br>  (Este sera el mismo que el precio por noche )</label>

                                            <input @input="validateNumberInput" v-model="hote_select.price" id="precio_adulto" style="width: 100%;     height: fit-content;     align-items: flex-end;" class="block w-full rounded-full border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6" placeholder="precio por adulto del hotel" type="number" name="precio_adulto" />

                                        </div>
                                        <!-- filepath: c:\Users\JGL\Documents\repos_practica\luxe\luxury_reservations\src\views\hoteles\Index.vue -->
                                        <div style="width: 95%; display: flex; justify-content: center; align-content: center; flex-direction: column;">
                                            <label for="edad" class="block text-sm font-medium leading-6 text-gray-900 text-left">Edad</label>
                                            <select 
                                                v-model="edadselectedit" 
                                                id="price-child" 
                                                style="width: 100%; height: fit-content; align-items: flex-end;" 
                                                class="block w-full rounded-full border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                            >
                                                <option 
                                                    v-for="n in hote_select.price_nin_comp" 
                                                    :key="n.id" 
                                                    :value="n"
                                                >
                                                    edad {{ n.edad }}
                                                </option>
                                            </select>
                                        </div>
                                        <div v-if="edadselectedit " style="width: 95%; display: flex; justify-content: center; align-content: center; flex-direction: column;">
                                            <label for="precio-nino" class="block text-sm font-medium leading-6 text-gray-900 text-left">Precio por niño {{ edadselectedit.edad }}</label>
                                            <input 
                                                @input="cambiar_precio_edit" 
                                                v-model="edadselectedit.precio" 
                                                id="precio-nino" 
                                                style="width: 100%; height: fit-content; align-items: flex-end;" 
                                                class="block w-full rounded-full border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6" 
                                                placeholder="Precio por niño del hotel" 
                                                type="number" 
                                                name="search" 
                                            />
                                        </div>

                                        <div class="login-with">
      
                                        </div>
                                        <div class="flex flex-col justify-center w-full max-w-xs gap-y-5">
                                          <button type="button"  @click="guardar_info()"  style="padding: 15px;" class="bg-black p-[15px] rounded-lg text-sm sm:text-base flex items-center gap-x-3 justify-center text-white hover:bg-black/80 duration-300 transition-colors border border-transparent px-8 py-2.5">
                                              <span>Guardar informacion </span>
                                          </button>
                                        </div>

                                    </form>
                                </div>
                            </div>
                        </div>
                        <div class="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                            <button type="button" class="inline-flex w-full justify-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black sm:col-start-2" @click="edit_hotel()">Editar</button>
                            <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0" @click="openedit = false" ref="cancelButtonRef">Cancelar</button>
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
                                    <form v-if="!busc" class="form">
                                        <div class="title">
                                            <DialogTitle as="h3" class="text-base font-semibold leading-6 text-gray-900">Nuevo hotel</DialogTitle>

                                        </div>
                                        <!-- <div style=" width: 100%; display: flex; justify-content: center;align-content: center; flex-direction: column;">
                                            <p class="text-base font-semibold leading-6 text-gray-900">Fecha de creacion de la reservacion <br> {{ formatDate(resev.fech_creacion) }}</p>

                                        </div> -->
                                        <div style="    width: 95%; display: flex; justify-content: center;align-content: center; flex-direction: column;">
                                            <label for="location" class="block text-sm font-medium leading-6 text-gray-900  text-left">nombre </label>

                                            <input  v-model="hotel.nombre" id="nombre" style="width: 100%;     height: fit-content;     align-items: flex-end;" class="block w-full rounded-full border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6" placeholder="Nombre de hotel" type="text" name="search" />

                                        </div>
                                        <div style="    width: 95%; display: flex; justify-content: center;align-content: center; flex-direction: column;">
                                            <label for="location" class="block text-sm font-medium leading-6 text-gray-900  text-left">precio por noche</label>

                                            <input  v-model="hotel.price" id="price" style="width: 100%;     height: fit-content;     align-items: flex-end;" class="block w-full rounded-full border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6" placeholder="Precio por noche" type="number" name="search"  />

                                        </div>
                                        <div style="    width: 95%; display: flex; justify-content: center;align-content: center; flex-direction: column;">
                                          <div style="       width: 100%; display: flex;   justify-content: center; " class=" sm:mt-0 sm:flex-none">
                                            <button @click="asignar_preciospor_hotel()" style="padding: 15px;  width: 200px; height: 40px " class="bg-black p-[15px] rounded-lg text-sm sm:text-base flex items-center gap-x-3 justify-center text-white hover:bg-black/80 duration-300 transition-colors border border-transparent px-8 py-2.5">Asignar precios</button>
                                          </div>
                                        </div>
                                        <!-- <div class="mt-5">
                                            <label for="file-upload" class="block text-sm font-medium text-gray-700">Adjuntar archivo</label>
                                            <input style=" height: 10vh;   background: aliceblue;" id="file-upload" type="file" accept="image/*,application/pdf" class="mt-2 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" @change="handleFileUpload">
                                            <p class="mt-1 text-sm text-gray-500">Formatos permitidos: imágenes y PDF.</p>
                                        </div> -->
                                        <div class="container"> 
                                            <div for="file" class="header"> 
                                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> 
                                                <path d="M7 10V9C7 6.23858 9.23858 4 12 4C14.7614 4 17 6.23858 17 9V10C19.2091 10 21 11.7909 21 14C21 15.4806 20.1956 16.8084 19 17.5M7 10C4.79086 10 3 11.7909 3 14C3 15.4806 3.8044 16.8084 5 17.5M7 10C7.43285 10 7.84965 10.0688 8.24006 10.1959M12 12V21M12 12L15 15M12 12L9 15" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                                                <!-- <p!</p> -->
                                                <label v-if="Archivo_recibido"  class="footer"> 
                                                    <p>imagen seleccionada{{ Archivo_recibido }}</p> 
                                                </label> 
                                            </div> 

                                            <label v-if="!Archivo_recibido"  for="file" class="footer"> 
                                                <!-- <svg fill="#000000" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M15.331 6H8.5v20h15V14.154h-8.169z"></path><path d="M18.153 6h-.009v5.342H23.5v-.002z"></path></g></svg>  -->
                                                <p class="test33" >
                                                    Seleccione imagen 
                                                    <svg style="width: 15%;"   xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672ZM12 2.25V4.5m5.834.166-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243-1.59-1.59" />
                                                    </svg>

                                                </p> 
                                                <!-- <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M5.16565 10.1534C5.07629 8.99181 5.99473 8 7.15975 8H16.8402C18.0053 8 18.9237 8.9918 18.8344 10.1534L18.142 19.1534C18.0619 20.1954 17.193 21 16.1479 21H7.85206C6.80699 21 5.93811 20.1954 5.85795 19.1534L5.16565 10.1534Z" stroke="#000000" stroke-width="2"></path> <path d="M19.5 5H4.5" stroke="#000000" stroke-width="2" stroke-linecap="round"></path> <path d="M10 3C10 2.44772 10.4477 2 11 2H13C13.5523 2 14 2.44772 14 3V5H10V3Z" stroke="#000000" stroke-width="2"></path> </g></svg> -->
                                            </label> 
                                            <input  v-if="!Archivo_recibido" @input="agregar_file" id="file" type="file"> 
                                        </div>
                                    
                                        <div class="login-with">
      
                                        </div>

                                        <!-- <button class="button-confirm">Let`s go →</button> -->
                                    </form>
                                    <form v-else class="form form2test">
                                        <div style="gap: 20px;" class="w-full flex justify-between items-center" >
                                          <div class="return">
                                            <img :src="imgreturn" alt="return" @click="busc = false" style="width: 50px; height: 50px; cursor: pointer;">
                                          </div>
                                          <div class="title">
                                              <DialogTitle as="h3" class="text-base font-semibold leading-6 text-gray-900">Asignar precio</DialogTitle>

                                          </div>

                                        </div>
                                        <!-- <div style=" width: 100%; display: flex; justify-content: center;align-content: center; flex-direction: column;">
                                            <p class="text-base font-semibold leading-6 text-gray-900">Fecha de creacion de la reservacion <br> {{ formatDate(resev.fech_creacion) }}</p>

                                        </div> -->
                                        <!-- <div style="    width: 95%; display: flex; justify-content: center;align-content: center; flex-direction: column;">
                                            <label for="impuesto" class="block text-sm font-medium leading-6 text-gray-900  text-left">Impuesto por estado  <br> (Solo ingrese numero del porcentaje) </label>

                                            <input  v-model="hotel.impuesto_por_hotel" id="impuesto" style="width: 100%;     height: fit-content;     align-items: flex-end;" class="block w-full rounded-full border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6" placeholder="precio por estado" type="number" name="impuesto" />

                                        </div> -->
                                        <div style="    width: 95%; display: flex; justify-content: center;align-content: center; flex-direction: column;">
                                            <label for="precio_adulto" class="block text-sm font-medium leading-6 text-gray-900  text-left">Precio por adulto  <br>  (Este sera el mismo que el precio por noche ) </label>

                                            <input  v-model="hotel.price" id="precio_adulto" style="width: 100%;     height: fit-content;     align-items: flex-end;" class="block w-full rounded-full border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6" placeholder="precio por adulto del hotel" type="number" name="precio_adulto" />

                                        </div>
                                        <!-- filepath: c:\Users\JGL\Documents\repos_practica\luxe\luxury_reservations\src\views\hoteles\Index.vue -->
                                        <div style="width: 95%; display: flex; justify-content: center; align-content: center; flex-direction: column;">
                                            <label for="edad" class="block text-sm font-medium leading-6 text-gray-900 text-left">Edad</label>
                                            <select 
                                                v-model="edadselect" 
                                                id="price-child" 
                                                min-length="1"
                                                style="width: 100%; height: fit-content; align-items: flex-end;" 
                                                class="block w-full rounded-full border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                            >
                                                <option 
                                                    v-for="n in hotel.price_nin_comp" 
                                                    :key="n.id" 
                                                    :value="n"
                                                >
                                                    edad {{ n.edad }}
                                                </option>
                                            </select>
                                        </div>
                                        <div v-if="edadselect " style="width: 95%; display: flex; justify-content: center; align-content: center; flex-direction: column;">
                                          <label for="precio-nino" class="block text-sm font-medium leading-6 text-gray-900 text-left">Precio por niño {{ edadselect.edad }}</label>
                                          <input 
                                                @input="cambiar_precio" 
                                                v-model="edadselect.precio" 
                                                id="precio-nino" 
                                                style="width: 100%; height: fit-content; align-items: flex-end;" 
                                                class="block w-full rounded-full border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6" 
                                                placeholder="Precio por niño del hotel" 
                                                type="number" 
                                                name="search" 
                                            />
                                        </div>

                                        <div class="login-with">
      
                                        </div>
                                        <div class="flex flex-col justify-center w-full max-w-xs gap-y-5">
                                          <button type="button"  @click="guardar_info_nurm()"  style="padding: 15px;" class="bg-black p-[15px] rounded-lg text-sm sm:text-base flex items-center gap-x-3 justify-center text-white hover:bg-black/80 duration-300 transition-colors border border-transparent px-8 py-2.5">
                                              <span>Guardar informacion </span>
                                          </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div class="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                            <button type="button" class="inline-flex w-full justify-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black sm:col-start-2" @click="crear_hot()">Guardar</button>
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
    import hotelesservices from '@/services/hotelesservices';
    import imgreturn from '@/assets/return.png';
    // import { defineComponent } from "vue";
    // import { RecaptchaV2, useRecaptcha } from "vue3-recaptcha-v2";
    // const { handleGetResponse } = useRecaptcha();
    import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
    import { useLoading } from 'vue-loading-overlay';

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
                Archivo_recibido: '',
                searchQuery: '',
                edadselect: { id: 1, edad: 1, precio: 100},
                edadselectedit: { id: 1, edad: 1, precio: 100},
                filteredTes: [],
                reservaciones: [],
                debounceTimeout: null,
                nomhotl: '',
                emailusr: '',
                namesr: '',
                vistasmash: 0,
                vistasmash: 0,
                check: 0,
                idhotl: 0,
                swich: true,
                busc: false,
                blockedit: false,
                openedit: false,
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
                hote_select: {
                  id: 0,
                  nombre: '',
                  img: '',
                  price: 0,
                  impuesto_por_hotel: 15,
                  precio_adult: 0,
                  iva: 16,

                  price_nin_comp: [
                    { id: 1, edad: 1, precio: 100},
                    { id: 2, edad: 2, precio: 200},
                    { id: 3, edad: 3, precio: 300},
                    { id: 4, edad: 4, precio: 400},
                    { id: 5, edad: 5, precio: 500},
                    { id: 6, edad: 6, precio: 600},
                    { id: 7, edad: 7, precio: 700},
                    { id: 8, edad: 8, precio: 800},
                    { id: 9, edad: 9, precio: 900},
                    { id: 10, edad: 10, precio: 1000},
                    { id: 11, edad: 11, precio: 1100},
                    { id: 12, edad: 12, precio: 1200},
                    { id: 13, edad: 13, precio: 1300},
                  ],
                },
                hotel: {
                  impuesto_por_hotel: 15,
                  nombre: '',
                  price: '',
                  archivo: null,
                  price_nin_comp: [
                    { id: 1, edad: 1, precio: 100},
                    { id: 2, edad: 2, precio: 200},
                    { id: 3, edad: 3, precio: 300},
                    { id: 4, edad: 4, precio: 400},
                    { id: 5, edad: 5, precio: 500},
                    { id: 6, edad: 6, precio: 600},
                    { id: 7, edad: 7, precio: 700},
                    { id: 8, edad: 8, precio: 800},
                    { id: 9, edad: 9, precio: 900},
                    { id: 10, edad: 10, precio: 1000},
                    { id: 11, edad: 11, precio: 1100},
                    { id: 12, edad: 12, precio: 1200},
                    { id: 13, edad: 13, precio: 1300},
                  ],
                  precio_adult: '',
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
            // this.filteredTes = this.tes;
            // this.get_prueb();
            this.get_reserv();
        },
        methods: {
          validateNumberInput(event) {
              const input = event.target;
              input.value = input.value.replace(/[^0-9]/g, ''); // Permitir solo números
              this.hote_select.price = input.value; // Actualizar el modelo con el valor limpio
          },
            guardar_info_nurm() {
              if (!this.hotel.price) {
                this.$swal({
                  icon: 'error',
                  title: 'ingresa un precio por adulto',
                  text: 'Por favor seleccion  a un precio por adulto.',
                  confirmButtonText: 'Entendido',
                });
                return;
              }

              this.busc = false;

            },
            guardar_info() {
              if (!this.hote_select.price) {
                this.$swal({
                  icon: 'error',
                  title: 'ingresa un precio por adulto',
                  text: 'Por favor seleccion  a un precio por adulto.',
                  confirmButtonText: 'Entendido',
                });
                return;
              }
              this.blockedit = false;

            },
            cambiar_precio() {
              // Actualiza el precio en el array `price_nin_comp` basado en la selección actual
              const index = this.hotel.price_nin_comp.findIndex(item => item.id === this.edadselect.id);
              if (index !== -1) {
                  this.hotel.price_nin_comp[index].precio = this.edadselect.precio;
                  
              }
            },
            cambiar_precio_edit() {
              // Actualiza el precio en el array `price_nin_comp` basado en la selección actual
              const index = this.hote_select.price_nin_comp.findIndex(item => item.id === this.edadselectedit.id);
              if (index !== -1) {
                  this.hote_select.price_nin_comp[index].precio = this.edadselectedit.precio; 
              }
            },
            asignar_preciospor_hotel() {
              this.busc = true;
            },
            asignar_preciospor_hotel_edit() {
              this.blockedit = true;
            },
            handleFileUpload(event) {
                  const file = event.target.files[0];
                if (file) {
                    // console.log('Archivo seleccionado:', file);
                    this.archivo_enviar = file;
                }
            },
            agregar_file(event) {
                const file = event.target.files[0];
                if (file) {
                    this.hotel.archivo = file;
                    this.Archivo_recibido = this.hotel.archivo.name;
                    // console.log('Archivo seleccionado:', file);
                }
            },
            abrir_mdl() {
                this.open = true
            },
            formatDate(dateString) {
                const date = new Date(dateString);
                const day = String(date.getDate()).padStart(2, '0');
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const year = date.getFullYear();
                return `${day}/${month}/${year}`;
            },
            deltereserv(){
                hotelesservices.Deletehotel({ id: this.idhotl })
                .then(response => {
                    // console.log('Success:', response.data);
                    this.open_confirm = false;
                    this.get_reserv();
                })
                .catch(error => {
                    console.error('Error:', error.response.data);
                });
            },
            open_delete(item){
                // console.log('ver_info', item);
                this.idhotl = item.id
                this.open_confirm = true;
            },
            ver_info(item){
                console.log('ver_info', item);
                this.openedit = true;
                this.hote_select.nombre = item.Nombre
                this.hote_select.img = item.img
                this.hote_select.price = item.price
                if (item.price_nin_comp && item.price_nin_comp !== '[]') {
                    this.hote_select.price_nin_comp = JSON.parse(item.price_nin_comp)
                } else {
                  console.log('sim precio aun no se ha asignado');
                } 
                this.hote_select.precio_adult = item.precio_adult
                this.hote_select.impuesto_por_hotel = item.impuesto_por_hotel
                this.hote_select.iva = item.iva
                this.hote_select.id = item.id

            },
            navigation_host(id) {
                if (id === 1) {
                    this.swich = true;
                } else if (id === 2) {
                    this.swich = false;
                }
                // console.log('id', id);
                
            },
            debounceFilter() {
                clearTimeout(this.debounceTimeout);
                this.debounceTimeout = setTimeout(() => {
                    this.applyFilter();
                }, 2000);
            },
            applyFilter() {
                const query = this.searchQuery.toLowerCase();
                this.filteredTes = this.reservaciones.filter(item =>
                    item.hotel.toLowerCase().includes(query)
                );
            },
            abrir_mdlserv(item){
                // console.log('id', item);
                this.nomhotl = item.name
                this.idhotl = item.id
                this.open = true;
            },
            get_prueb(){
              // this.loading = true;
              let loader = useLoading().show({
                  canCancel: false,
                  loader: 'bars'
              });
              reservacionesservices.getNot({ mensaje: 'Test message' })
              .then(response => {
                loader.hide();
                // console.log('Success:', response.data);
              })
              .catch(error => {
                console.error('Error:', error.response.data); // Inspecciona los errores aquí
              });

            },
            get_reserv(){
              // this.loading = true;
              let loader = useLoading().show({
                  canCancel: false,
                  loader: 'bars'
              });
              // const mensaje = "Este es el mensaje que deseas enviar";
              hotelesservices.get_hoteles({ 
                filt: this.searchQuery ,
              })
              .then(response => {
                loader.hide();
                // console.log('Success:', response.data);
                this.reservaciones = response.data;
                this.filteredTes = this.reservaciones
              })
              .catch(error => {
                loader.hide();
                console.error('Error:', error.response.data); // Inspecciona los errores aquí
              });

            },
            edit_hotel(){
                if (!this.hote_select.nombre) {
                  this.$swal({
                    icon: 'error',
                    title: 'Selecciona un nombre',
                    text: 'Por favor selecciona un nombre.',
                    confirmButtonText: 'Entendido',
                  });
                  return;
                }
       
                if (this.hote_select.price == '') {
                  this.$swal({
                    icon: 'error',
                    title: 'Selecciona un precio',
                    text: 'Por favor selecciona un precio.',
                    confirmButtonText: 'Entendido',
                  });
                  return;
                }   
                
                let loader = useLoading().show({
                    canCancel: false,
                    loader: 'bars'
                });
                this.hote_select.precio_adult = this.hote_select.price

                hotelesservices.editCotizacion({
                  id: this.hote_select.id,
                  nombre: this.hote_select.nombre,
                  price: this.hote_select.price,
                  iva: this.hote_select.iva,
                  precio_adult: this.hote_select.precio_adult,
                  price_nin_comp: this.hote_select.price_nin_comp,
                  impuesto_por_hotel: this.hote_select.impuesto_por_hotel,
                })
                    .then(response => {
                        // // console.log('Success:', response.data);
                        this.openedit = false;
                        this.$swal({
                            icon: 'success',
                            title: 'Se ha editado su hotel con éxito',
                            timer: 2000
                        });
                        this.get_reserv();
                        this.get_prueb();

                        loader.hide();
                    })
                    .catch(error => {
                        console.error('Error:', error.response.data); // Inspecciona los errores aquí
                        loader.hide();
                    });
                this.openedit = false;
            },
            crear_hot(){
                if (!this.hotel.archivo) {
                  this.$swal({
                    icon: 'error',
                    title: 'Selecciona una imagen',
                    text: 'Por favor selecciona una imagen.',
                    confirmButtonText: 'Entendido',
                  });
                  return;
                }
                if (this.hotel.nombre == '') {
                  this.$swal({
                    icon: 'error',
                    title: 'Selecciona un nombre',
                    text: 'Por favor selecciona un nombre.',
                    confirmButtonText: 'Entendido',
                  });
                  return;
                }        
                if (this.hotel.price == '') {
                  this.$swal({
                    icon: 'error',
                    title: 'Selecciona un precio',
                    text: 'Por favor selecciona un precio.',
                    confirmButtonText: 'Entendido',
                  });
                  return;
                }    
                let loader = useLoading().show({
                    canCancel: false,
                    loader: 'bars'
                });
                // console.log('guardarDatos', this.hotel.nombre, this.hotel.price, this.hotel.archivo);

                // Crear un objeto FormData
                const formData = new FormData();
                this.hote_select.precio_adult = this.hote_select.price
                formData.append('nombre', this.hotel.nombre);
                formData.append('price', this.hotel.price);
                formData.append('precio_adult', this.hotel.price);
                formData.append('impuesto_por_hotel', this.hotel.impuesto_por_hotel);
                formData.append('price_nin_comp', JSON.stringify(this.hotel.price_nin_comp));
                formData.append('archivo', this.hotel.archivo); // Asegúrate de que sea un archivo válido
                console.log('formData', formData);
                    // Imprimir el contenido de FormData
                for (let [key, value] of formData.entries()) {
                    console.log(`${key}: ${value}`);
                }
                hotelesservices.createhotel(formData)
                    .then(response => {
                        // console.log('Success:', response.data);
                        
                        this.open = false;
                        this.get_prueb();
                        this.get_reserv();
                        this.$swal({
                            icon: 'success',
                            title: 'Se ha creado su hotel con éxito',
                            timer: 2000
                        });
                        loader.hide();
                        this.hotel = {
                          impuesto_por_hotel: 0,
                          nombre: '',
                          price: '',
                          archivo: null,
                          price_nin_comp: [
                            { id: 1, edad: 1, precio: 100},
                            { id: 2, edad: 2, precio: 200},
                            { id: 3, edad: 3, precio: 300},
                            { id: 4, edad: 4, precio: 400},
                            { id: 5, edad: 5, precio: 500},
                            { id: 6, edad: 6, precio: 600},
                            { id: 7, edad: 7, precio: 700},
                            { id: 8, edad: 8, precio: 800},
                            { id: 9, edad: 9, precio: 900},
                            { id: 10, edad: 10, precio: 1000},
                            { id: 11, edad: 11, precio: 1100},
                            { id: 12, edad: 12, precio: 1200},
                            { id: 13, edad: 13, precio: 1300},
                          ],
                          precio_adult: '',
                        }
                        this.Archivo_recibido = ''
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
.form2test {
  height: 70vh;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  justify-content: flex-start!important;
}
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
.test33{
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: center;
}
.container {
  height: 300px;
  width: 300px;
  border-radius: 10px;
  box-shadow: 4px 4px 30px rgba(0, 0, 0, .2);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
  gap: 5px;
  background-color: rgba(0, 110, 255, 0.041);
}

.header {
  flex: 1;
  width: 100%;
  border: 2px dashed royalblue;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.header svg {
  height: 100px;
}

.header p {
  text-align: center;
  color: black;
}

.footer {
  background-color: rgba(0, 110, 255, 0.075);
  width: 100%;
  height: 40px;
  padding: 8px;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  color: black;
  border: none;
}

.footer svg {
  height: 130%;
  fill: royalblue;
  background-color: rgba(70, 66, 66, 0.103);
  border-radius: 50%;
  padding: 2px;
  cursor: pointer;
  box-shadow: 0 2px 30px rgba(0, 0, 0, 0.205);
}

.footer p {
  flex: 1;
  text-align: center;
}

#file {
  display: none;
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
    font-size: 13px;
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