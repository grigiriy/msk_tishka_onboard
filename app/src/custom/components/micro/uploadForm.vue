<template>
  <span class="uploader_block">
    <p>
    </p>
    <div class="file_upload">
      <Button classList="file">
        <span role="img" aria-label="upload">
          📥
        </span>
        <label for="file_input">
          <span>Загрузить</span>
        </label>
        <input
          style="display: none"
          type="file"
          id="file_input"
          @change="handleImageChange"
        />
      </Button>
      <div class="text_wrapper">
        <p>jpg,png</p>
        <p>не больше 5 мб</p>
      </div>
    </div>
    <div v-if="image_url" class="preview">
      <img :src="image_url" alt="Preview" />
    </div>
  </span>
</template>

<script>
import Button from './button.vue';

export default {
  components: {
    Button,
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

<style scoped>
.preview img {
  max-width: 100%;
  max-width: 40vw;
}

.uploader_block .preview {
  position: absolute;
  right: calc(50% - 20vw);
  top: 24vh;
}
</style>
