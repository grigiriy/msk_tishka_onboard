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

export default {
    components: {
        UploadForm,
    },
    data() {
        return {
            screenshot: null,
            // selectedImage: 'https://thesh.ru/src/assets/img/products/shirt_white.png' as string | null,
            // selectedImage: './src/assets/img/products/shirt_white.png' as string | null,
            selectedImage: `${import.meta.env.VITE_BASE_URL}shirt_white.png` as string | null,

            uploadedImage: null as string | null,
            images: [
                // 'https://thesh.ru/src/assets/img/products/shirt_white.png',
                // 'https://thesh.ru/src/assets/img/products/sweetshirt_white.png',
                // 'https://thesh.ru/src/assets/img/products/hoodie_white.png'
                // './src/assets/img/products/shirt_white.png',
                // './src/assets/img/products/sweetshirt_white.png',
                // './src/assets/img/products/hoodie_white.png'
                `${import.meta.env.VITE_BASE_URL}shirt_white.png`,
                `${import.meta.env.VITE_BASE_URL}sweetshirt_white.png`,
                `${import.meta.env.VITE_BASE_URL}hoodie_white.png`
            ],
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
            const type = image.split('_')[0].split('/').pop();
            this.price = this.prices[type as keyof typeof this.prices];
        },
        selectColor(color: string): void {
            const type = this.selectedImage?.split('_')[0].split('/').pop();
            this.images = [
                // `./src/assets/img/products/shirt_${color}.png`,
                // `./src/assets/img/products/sweetshirt_${color}.png`,
                // `./src/assets/img/products/hoodie_${color}.png`
                // `https://thesh.ru/src/assets/img/products/shirt_${color}.png`,
                // `https://thesh.ru/src/assets/img/products/sweetshirt_${color}.png`,
                // `https://thesh.ru/src/assets/img/products/hoodie_${color}.png`
                `${import.meta.env.VITE_BASE_URL}shirt_${color}.png`,
                `${import.meta.env.VITE_BASE_URL}sweetshirt_${color}.png`,
                `${import.meta.env.VITE_BASE_URL}hoodie_${color}.png`
            ];
            // this.selectedImage = `https://thesh.ru/src/assets/img/products/${type}_${color}.png`;
            // this.selectedImage = `./src/assets/img/products/${type}_${color}.png`;
            this.selectedImage = `${import.meta.env.VITE_BASE_URL}${type}_${color}.png`;
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