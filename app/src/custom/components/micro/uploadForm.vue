<template>
  <span class="uploader_block">
    <p>
    </p>
    <div class="file_upload">
      <p class="top-text">Загрузи изображение,<br>и выбери где его разместить</p>
      <div class="file_upload_btn_container">
        <Button classList="file">
          <span role="img" aria-label="upload">
            📥
          </span>
          <label for="file_input">
            <span>Загрузить</span>
          </label>
          <input style="display: none" type="file" id="file_input" @change="handleImageChange" />
        </Button>
        <div class="text_wrapper">
          <p>jpg,png</p>
          <p>не больше 5 мб</p>
        </div>
      </div>
    </div>

    <button class="spec_btn" v-if="image" @click="createScreenshot">Generate and Download Image</button>

    <div v-if="image" class="preview">
      <vue-draggable-resizable
        :w="120"
        :h="150"
        :min-width="50"
        :max-width="180"
        :min-height="50"
        :max-height="200"
        
        :x="110"
        :y="190"

        :parent="true"
        :resizable="true"
        :draggable="true"
        :handles="['br']"
        @mousedown.native.stop
        @touchstart.native.stop
        >
        <img :src="image" alt="Uploaded Image" v-if="image"/>
      </vue-draggable-resizable>
    </div>

  </span>
</template>

<script>
import Button from './button.vue';
import VueDraggableResizable from 'vue-draggable-resizable';

export default {
  components: {
    Button,
    VueDraggableResizable
  },
  props: {
    text: String,
    type: String,
    image: String,
    selectedImg: String | null
  },
  





  methods: {
  async createScreenshot() {
    console.log("Начало создания скриншота");

    const uploadedImage = document.querySelector('.preview img');
    if (!uploadedImage) {
        console.error("Загруженное изображение не найдено");
        return;
    }

    console.log("Загруженное изображение найдено:", this.image);

    const { left, top, width, height } = uploadedImage.getBoundingClientRect();
    console.log("Размеры и позиция загруженного изображения:", { left, top, width, height });

    const containerRect = document.querySelector('.image-container').getBoundingClientRect();
    console.log("Размеры и позиция контейнера:", containerRect);

    const scaleX = containerRect.width / 500;
    const scaleY = containerRect.height / 513;

    const canvasX = (left - containerRect.left) / scaleX;
    const canvasY = (top - containerRect.top) / scaleY;
    const canvasWidth = width / scaleX;
    const canvasHeight = height / scaleY;

    console.log("Коэффициенты масштабирования:", { scaleX, scaleY });
    console.log("Рисование загруженного изображения на canvas с координатами:", { canvasX, canvasY, canvasWidth, canvasHeight });

    const canvas = document.createElement('canvas');
    canvas.width = 500;
    canvas.height = 513;
    const ctx = canvas.getContext('2d');

    // Загрузка фонового изображения
    const backgroundImage = new Image();
    backgroundImage.src = this.selectedImg;

    backgroundImage.onload = () => {
        console.log("Фоновое изображение загружено");
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
        console.log("Фоновое изображение нарисовано на canvas");

        // Загрузка и рисование загруженного изображения
        const overlayImage = new Image();
        overlayImage.src = this.image;

        overlayImage.onload = () => {
            console.log("Загруженное изображение загружено");
            const uploadedImageDataUrl = overlayImage.src; // Сохраняем base64 загруженного изображения

            ctx.drawImage(overlayImage, canvasX, canvasY, canvasWidth, canvasHeight);
            console.log("Загруженное изображение нарисовано на canvas");

            const dataUrl = canvas.toDataURL('image/png');
            console.log("Финальное изображение создано");
            this.downloadImage(dataUrl);
            this.downloadImage(uploadedImageDataUrl);
        };
    };
},

  downloadImage(dataUrl) {
    console.log("Скачивание изображения");
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = 'custom_image.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    console.log("Изображение скачано");
  },
  handleImageChange(e) {
      e.preventDefault();

      let reader = new FileReader();
      let file = e.target.files[0];

      reader.onloadend = () => {
        this.$emit('updateOrderDetails', 'image', reader.result);
      };

      reader.readAsDataURL(file);
    },
},









};
</script>

<style>
@import "vue-draggable-resizable/style.css";

.file_upload_btn_container {
  align-items: center;
  display: flex;
  gap: 20px;
  z-index: 999;
  position: relative;
}

.top-text {
  font-size: 20px;
  margin-bottom: 20px;
}

.text_wrapper p {
  font-size: 12px;
  line-height: 1.2;
}

.preview img {
  max-width: 100%;
}

.file_ipload {
  z-index: 9999;
  position: relative;
}

.spec_btn {
  z-index: 9999;
  position: relative;
}

.uploader_block .preview {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  right: calc(50% - 18vw);
}
.uploader_block .preview .vdr {
  display: flex;
  justify-content: center;
  align-items: center;
}

.handle.handle-br {
  display: block!important;
  position: absolute;
  bottom: -12px;
  right: -12px;
  width: 10px;
  height: 10px;
  cursor: nwse-resize;
  border-radius: 20px;
  background: #555;
}
</style>
