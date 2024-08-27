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
    


    createScreenshot() {
      // Get the position and size of the uploaded image
      const uploadedImage = document.querySelector('.preview img');
      const { left, top, width, height } = uploadedImage.getBoundingClientRect();

      // Send the necessary data to the backend
      const data = {
        image1: this.selectedImg,
        image2: this.image,
        left,
        top,
        width,
        height
      };
      fetch('https://thesh.ru/api/genimg.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(response => response.blob())
        .then(blob => {
          // Create a data URL for the generated image
          const dataUrl = URL.createObjectURL(blob);

          // Call the downloadImage method with the data URL
          this.downloadImage(dataUrl);
        });
    },



  downloadImage(dataUrl) {
    // Create a temporary link element
    const link = document.createElement('a');

    // Set the link href to the data URL
    link.href = dataUrl;

    // Set the link download attribute to the desired filename
    link.download = 'image.png';

    // Append the link to the document body
    document.body.appendChild(link);

    // Trigger a click event on the link to initiate the download
    link.click();

    // Remove the link from the document body
    document.body.removeChild(link);
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
