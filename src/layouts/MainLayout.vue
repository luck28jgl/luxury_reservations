<script setup>
    import kamajologo from '../assets/kamajo-logo-ferreteria.png'
    
    import { ref, onMounted, onUnmounted } from 'vue';

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
  <div>
    <TransitionRoot as="template" :show="sidebarOpen">
      <Dialog as="div" class="relative z-50 " @close="sidebarOpen = false"> <!--class= lg:hidden-->
        <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100" leave-to="opacity-0">
          <div class="fixed inset-0 bg-gray-900/80" />
        </TransitionChild>

        <div class="fixed inset-0 flex">
          <TransitionChild as="template" enter="transition ease-in-out duration-300 transform" enter-from="-translate-x-full" enter-to="translate-x-0" leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0" leave-to="-translate-x-full">
            <DialogPanel class="relative mr-16 flex w-full max-w-xs flex-1">
              <TransitionChild as="template" enter="ease-in-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in-out duration-300" leave-from="opacity-100" leave-to="opacity-0">
                <div style="    left: 135px;" class="absolute left-full top-0 flex w-16 justify-center pt-5">
                  <button type="button" style="  width: 100%;   color: #000000;" class="-m-2.5 p-2.5 " @click="sidebarOpen = false">
                    <span class="sr-only">Close</span>
                    <XMarkIcon class="h-6 w-6 text-black" aria-hidden="true" />
                  </button>
                </div>
              </TransitionChild>
              <!--Sidebar component, swap this element with another sidebar if you like -->
              <div class="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
                <div class="flex h-16 shrink-0 items-center mt-6">
                  <!-- <div class="w-11/12 flex justify-center">
                    <img :src="kamajologo" class="w-3/4">
                  </div> -->
                </div>
                <nav class="flex flex-1 flex-col">
                  <ul style=" display: flex;flex-direction: column;justify-content: space-between;" role="list" class="flex flex-1 flex-col gap-y-7">
                    <li style="margin-top: 50px" >
                      <ul role="list" class="-mx-2 space-y-1">
                        <li v-for="item in navigation" :key="item.name">
                          <!-- <div @click="pageIr(item)" :class="[item.url.includes(currentUrl) ? 'bg-gray-50 text-black' : 'text-black hover:text-black hover:bg-gray-50', 'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold cursor-pointer']">
                            {{ item.name }}
                          </div> -->
                          <div @click="pageIr(item)" style="color: black;" class="group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold text-black hover:bg-gray-50 cursor-pointer">
                            {{ item.name }}
                          </div>
                        </li>
                      </ul>
                    </li>
                    <li class="mt-auto">
                        <div class="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-50 cursor-pointer" @click="logout()">
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                                </svg>

                            </div>
                            Cerrar Sesión
                        </div>
                    </li>
                  </ul>
                </nav>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>
    <div>
      <div style="height: 5vh; margin-bottom:6px; background: #024a71;     position: fixed; display: flex;        justify-content: flex-start;;align-items: center;     z-index: 99; "   class=" bg-[#024a71] w-full h-[5vh] ">
        <button type="button" style="    width: 10%;" class=" -m-2.5 p-2.5 text-white " @click="sidebarOpen = true">
          <span class="sr-only"> </span>
          <Bars3Icon class="h-6 w-6" aria-hidden="true" />
        </button>  <h1 style="       position: fixed; left: 150px;  font-size: 18px; font-weight: 600; font-family: none;" class="text-white font-bold text-2xl my-2 clsstt-3" :class="{ 'opacity-0 scale-75': !isScrolled, 'opacity-100 scale-100': isScrolled }">luxe reserve</h1>

        <div class="h-6 w-px bg-gray-900/10 lg:hidden" aria-hidden="true" />
      </div>

      <main class="py-2">
        <div class="px-2 sm:px-4 lg:px-6">
            <router-view/>
        </div>
      </main>
    </div>
  </div>
</template>
<script>
    // import LoginServices from '../services/LoginService';
    // import EssentialLink from "@/components/EssentialLink.vue";
    import {
      Dialog,
      DialogPanel,
      DialogTitle,
      Menu,
      MenuButton,
      MenuItem,
      MenuItems,
      TransitionChild,
      TransitionRoot,
    } from '@headlessui/vue'
    import { Bars3Icon, XMarkIcon, EllipsisVerticalIcon, BellIcon, CalendarIcon } from '@heroicons/vue/24/outline'
    // import LoginService from '@/services/LoginService';
    export default {
      name: 'MainLayout',
      components: {
        Bars3Icon,
        // EssentialLink,
        Dialog,
        DialogPanel,
        DialogTitle,
        Menu,
        MenuButton,
        MenuItem,
        MenuItems,
        TransitionChild,
        TransitionRoot,
        XMarkIcon,
        EllipsisVerticalIcon,
        BellIcon,
        CalendarIcon
      },
      mounted() {
        // this.tipoUsuario = this.$store.state.user.type
        this.id_user = sessionStorage.getItem('pk')
        console.log(this.id_user)
        // this.filtrarNavigation(); // Re-enable the method call
      },
      computed: {
      },
      data() {
          return {
              id_user: '',
              sidebarOpen: false,
              nowYear: new Date().getFullYear(),
              navigation: [
                { name: 'Reservaciones', link: 'RutasListIndex', icon: '', url: '/rutasList', tipo:[0]},
              ],
              open: false,
              tipoUsuario: '',
          }
      },
      methods: {
        pageIr(item){
          this.sidebarOpen = false
          if ('ResumenIndex' == item.link) {
            this.$router.push({ name: item.link, params: { id: 'reciente' } })
          } else {
            this.$router.push(item.url)
          }
        },
        logout() {
          window.sessionStorage.removeItem("auth_token")
          let loader = this.$loading.show({
              canCancel: false,
              loader: 'bars'
          });
          LoginServices.logut().then((response) => {
              loader.hide()
              this.$store.dispatch("user/logout", response.data);
              this.$router.push("/ingresar");
          }).catch((e) => {
              loader.hide()
          });
        },
        filtrarNavigation() {
          LoginService.getUType({
            username: this.id_user
          }).then((response) => {
            this.tipoUsuario = response.data.tipo
            this.navigation = this.navigation.filter(item => {
              if (item.tipo.includes(this.tipoUsuario)) {
                return item;
              }
            });
          }).catch(error => {
            console.log(error)
            this.$swal({
              icon: 'error',
              title: 'Error al obtener el tipo de usuario'
            });
          });
        },
      }
    }
</script>
