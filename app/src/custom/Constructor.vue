<template>
    <div :class="classList">

        <ConstructorSection />

        <div class="flex">
            <UploadForm :text="text" :type="textName" :image_url="image_url" @updateOrderDetails="updateOrderDetails" />
            <PriceForm :price="price" />
        </div>

        <div>
            <div class="image-container">
                <img :src="selectedImage" alt="Selected Image" />
            </div>
            <div class="thumbnails">
                <img v-for="image in images" :key="image" :src="image" alt="Thumbnail" @click="selectImage(image)" />
            </div>
        </div>



        <div v-if="image_url" class="preview">
            <img :src="image_url" alt="Preview" />
        </div>

        <!-- <p class="attributes">
            <SelectAttForm type="size" :atts="sizes" @updateOrderDetails="updateOrderDetails" />
            <SelectAttForm type="color" :atts="colors" @updateOrderDetails="updateOrderDetails" />
        </p>

        <OrderForm /> -->
    </div>
</template>


<script lang="ts">

import OrderForm from './components/orderForm.vue';
import SelectAttForm from './components/micro/selectAttForm.vue';
import PriceForm from './components/micro/priceForm.vue';

import ConstructorSection from './components/ConstructorSection.vue';


export default {
    components: {
        UploadForm,
    },
    data() {
        return {
            text: 'Загрузить',
            textName: 'изображение',
            image_url: null,
        };
    },
    methods: {
        updateOrderDetails(key, value) {
            this[key] = value;
        },
    },
};

</script>