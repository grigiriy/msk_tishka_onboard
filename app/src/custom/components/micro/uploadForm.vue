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
    <div v-if="image_url" class="preview">
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
        <img :src="image_url" alt="Uploaded Image" />
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
    image_url: String,
  },
  methods: {
    handleImageChange(e) {
      e.preventDefault();

      let reader = new FileReader();
      let file = e.target.files[0];

      reader.onloadend = () => {
        this.$emit('updateOrderDetails', 'image_url', reader.result);
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

.uploader_block .preview {
  position: absolute;
  top: 0;
  left: 0;

  /* position: relative; */
  /* top: 80px; */
  /* left: 90px; */

  width: 100%;
  height: 100%;
  right: calc(50% - 18vw);
}
.uploader_block .preview .vdr {
  /* position: absolute; */
  /* position: relative; */
  /* top: 80px; */
  /* left: 90px;  */

  display: flex;
  justify-content: center;
  align-items: center;
}

.handle.handle-br {
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
