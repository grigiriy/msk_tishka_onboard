<template>
    <div>
        <div class="top-container">
            <UploadForm :image_url="uploadedImage" @updateOrderDetails="updateOrderDetails" />
        </div>

        <div class="image-container">
            <img :src="selectedImage" alt="Selected Image" />
        </div>

        <div class="thumbnails">
            <img v-for="image in images" :key="image" :src="image" alt="Thumbnail" @click="selectImage(image)" />
        </div>

        <div class="price">{{ price }} ₽</div>
        <div class="color-buttons">
            <button @click="selectColor('white')" style="background-color:white;"></button>
            <button @click="selectColor('black')" style="background-color:darkslategray;"></button>
        </div>
    </div>
</template>


<script lang="ts">
import UploadForm from './micro/uploadForm.vue';

export default {
    components: {
        UploadForm,
    },
    data() {
        return {
            selectedImage: '/src/assets/img/products/shirt_white.png' as string | null,
            uploadedImage: null as string | null,
            images: [
                '/src/assets/img/products/shirt_white.png',
                '/src/assets/img/products/sweetshirt_white.png',
                '/src/assets/img/products/hoodie_white.png'
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
            if (key === 'image_url') {
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
                `/src/assets/img/products/shirt_${color}.png`,
                `/src/assets/img/products/sweetshirt_${color}.png`,
                `/src/assets/img/products/hoodie_${color}.png`
            ];
            this.selectedImage = `/src/assets/img/products/${type}_${color}.png`;
        },
    },
};

</script>

<style scoped>
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
    max-width: 80vw;
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
    max-width: 20vw;
}
</style>