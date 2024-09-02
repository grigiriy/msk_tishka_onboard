<template>
    <div class="constructor-container">
        <div class="top-container">
            <UploadForm :image="uploadedImage" @updateOrderDetails="updateOrderDetails" :selectedImg="selectedImage"/>
        </div>
    
        <div class="image-container" ref="container">
            <img :src="selectedImage" alt="Selected Image" ref="selectedImage" />
        </div>
    
        <div class="thumbnails">
            <img v-for="image in images" :key="image" :src="image" alt="Thumbnail" @click="selectImage(image)" />
        </div>
        <div class="bottom-container">
            <div class="color-buttons">
                <button @click="selectColor('white')" style="background-color:white;"></button>
                <button @click="selectColor('black')" style="background-color:darkslategray;"></button>
            </div>
            <div class="price">{{ price }} ₽</div>
        </div>
    </div>
</template>

<script lang="ts">
import UploadForm from './components/micro/uploadForm.vue';

import shirtWhite from '../assets/img/products/shirt_white.png';
import sweetshirtWhite from '../assets/img/products/sweetshirt_white.png';
import hoodieWhite from '../assets/img/products/hoodie_white.png';
import shirtBlack from '../assets/img/products/shirt_black.png';
import sweetshirtBlack from '../assets/img/products/sweetshirt_black.png';
import hoodieBlack from '../assets/img/products/hoodie_black.png';
    
export default {
    components: {
        UploadForm,
    },
    data() {
        return {
            screenshot: null as string | null,
            selectedImage: shirtWhite,
            uploadedImage: null as string | null,
            images: [shirtWhite, sweetshirtWhite, hoodieWhite],
            imageMap: {
            white: [shirtWhite, sweetshirtWhite, hoodieWhite],
            black: [shirtBlack, sweetshirtBlack, hoodieBlack],
            },
            currentType: 'shirt', // Добавлено для хранения текущего типа
            price: 2500,
            prices: {
                shirt: 2500,
                sweetshirt: 3000,
                hoodie: 4000
            },
        };
    },
    methods: {
        updateOrderDetails(key: string, value: string) {
            if (key === 'image') {
                this.uploadedImage = value;
            }
        },
        selectImage(image: string): void {
            this.selectedImage = image;
            this.currentType = image.split('_')[0].split('/').pop() as 'shirt' | 'sweetshirt' | 'hoodie'; // Обновляем currentType
            console.log('currentType', this.currentType);
            this.price = this.prices[this.currentType as keyof typeof this.prices];
        },
        selectColor(color: string) {
            const typeArray = ['shirt', 'sweetshirt', 'hoodie'];
            this.images = this.imageMap[color];
            this.selectedImage = this.images[typeArray.indexOf(this.currentType)]; // Используем currentType для получения индекса
        },
        updateScreenshot(screenshot: string) {
            this.screenshot = screenshot;
        },
    },
};
</script>
    
<style scoped>
.constructor-container {
    max-width:300px;
    display: flex;
    flex-direction: column;
    margin: auto;
}

.top-container {
    margin-bottom: 20px;
    margin-left: 10px;
}

.price {
    font-size: 20px;
    margin-top: 20px;
    margin-left: 10px;
}

.color-buttons {
    display: flex;
    gap: 10px;
    margin-left: 10px;
    margin-bottom: 20px;
    margin-top: 20px;
    position: relative;
    z-index: 999;
}

.color-buttons button {
    border: solid 1px #efefef;
    width: 30px;
    height: 30px;
    border-radius: 30px;
}

.image-container {
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
}

.image-container img {
    max-width: 300px;
}

.thumbnails {
    display: flex;
    justify-content: space-between;
    position: relative;
    z-index: 999;
}

.thumbnails img {
    margin-right: 10px;
    cursor: pointer;
    max-width: 30%;
}

.bottom-container {
    display: flex;
    justify-content: space-between;
    margin-right: 10px;
}
</style>