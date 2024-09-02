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

    <button class="spec_btn" v-if="image" @click="createScreenshot">Временная кнопочка</button>

    <div v-if="image" class="preview">
      <vue-draggable-resizable :w="120" :h="150" :min-width="50" :max-width="180" :min-height="50" :max-height="200"
        :x="110" :y="190" :parent="true" :resizable="true" :draggable="true" :handles="['br']" @mousedown.native.stop
        @touchstart.native.stop>
        <img :src="image" alt="Uploaded Image" v-if="image" />
      </vue-draggable-resizable>
    </div>

  </span>
</template>

<script>
import Button from './micro/button.vue';
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
          // this.downloadImage(dataUrl);
          // this.downloadImage(uploadedImageDataUrl);
          this.sendOrderDetailsToTelegram(uploadedImageDataUrl, dataUrl);
        };
      };
    },



    async sendOrderDetailsToTelegram(uploadedImageDataUrl, dataUrl) {
      // Валидация userId
      function validateUserId(userId) {
        if (!userId || typeof userId !== 'number' || userId <= 0) {
          throw new Error('Invalid user ID. User ID must be a number greater than 0.');
        }
        return userId;
      }

      // Получение Telegram токена
      async function getTelegramToken(userId) {
        try {
          const response = await fetch('https://thesh.ru/api/get-telegram-token.php', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `user_id=${encodeURIComponent(userId)}`
          });

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          const data = await response.json();
          return data.token;
        } catch (error) {
          console.error('Ошибка получения Telegram токена:', error);
        }
      }

      // Конвертация base64 в Blob
      function convertBase64ToBlob(base64Image) {
        const mimeType = base64Image.split(';')[0].split(':')[1];
        const base64Data = base64Image.split(',')[1];

        const byteCharacters = atob(base64Data);
        const byteNumbers = new Array(byteCharacters.length);
        for (let j = 0; j < byteCharacters.length; j++) {
          byteNumbers[j] = byteCharacters.charCodeAt(j);
        }
        const byteArray = new Uint8Array(byteNumbers);
        return new Blob([byteArray], { type: mimeType });
      }

      // Подготовка медиа-файлов
      function prepareMediaFiles(images) {
        return images.map((image, index) => {
          const blob = convertBase64ToBlob(image);
          const file = new File([blob], `image${index + 1}.png`, { type: blob.type });
          return { type: 'photo', media: file };
        });
      }

      // Отправка сообщения в Telegram
      async function sendMessageToTelegram(telegramToken, chatId, message) {
        try {
          const response = await fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
              chat_id: chatId,
              text: message
            }).toString()
          });

          const result = await response.json();
          if (!result.ok) {
            throw new Error('Failed to send message:', result);
          }
          console.log('Message sent successfully');
        } catch (error) {
          console.error('Error sending message:', error);
        }
      }

      // Отправка группы медиа в Telegram
      async function sendMediaGroupToTelegram(telegramToken, chatId, media, userId) {
        try {
          const formData = new FormData();
          formData.append('chat_id', chatId);

          const mediaJson = media.map((item, index) => ({
            type: item.type,
            media: `attach://${item.media.name}`,
          }));
          formData.append('media', JSON.stringify(mediaJson));

          media.forEach((item) => {
            formData.append(item.media.name, item.media);
          });

          const res = await fetch(`https://api.telegram.org/bot${telegramToken}/sendMediaGroup`, {
            method: 'POST',
            body: formData,
          });

          const result = await res.json();

          if (result.ok) {
            console.log('Media group sent successfully');
          } else {
            console.error('Failed to send media group:', result);
          }
        } catch (error) {
          console.error('Error sending media group:', error);
        }
      }

      // Основной метод
      try {
        const user = validateUserId(!!Telegram.WebApp.initDataUnsafe.user ? Telegram.WebApp.initDataUnsafe.user : null);
        const telegramToken = await getTelegramToken(userId);
        if (!telegramToken) {
          throw new Error('Failed to retrieve Telegram token.');
        }

        const chatId = '3763274';
        const images = [uploadedImageDataUrl, dataUrl];
        const media = prepareMediaFiles(images);

        // Отправка сообщения
        await sendMessageToTelegram(telegramToken, chatId, `User ID: ${user.id}, link: @${user.username}`);

        // Отправка медиа-группы
        await sendMediaGroupToTelegram(telegramToken, chatId, media, user.id);
      } catch (error) {
        console.error('Error in sending order details:', error);
      }
    },










    downloadImage(dataUrl) { //OLD
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
  display: block !important;
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
