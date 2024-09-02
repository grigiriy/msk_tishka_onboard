<template>
  <form class="order_form" @submit.prevent="submitForm">
    <p class="top-text">Куда доставить?</p>
    <p class="hint-text">После обработки заказа мы напишем вам в телеграм, для подтверждения, и пришлем ссылку на
      оплату.</p>
    <Input placeholder="Контакт в тг" type="name"/>
    <Input placeholder="Адрес доставки" type="address" />
    <Textarea placeholder="Комментарий" type="comment"></Textarea>
    <Button type="submit">Сделать заказ</Button>
    <p class="bottom-text">В рабочее время (08:00 - 20:00) обрабатываем заказы в течение часа, заказы сделанные в
      нерабочее время будут обработаны на следующий день.</p>
  </form>
</template>

<script>
import Button from './micro/button.vue';
import Input from './micro/input.vue';
import Textarea from './micro/textarea.vue';

export default {
  components: {
    Button,
    Input,
    Textarea
  },
  data() {
    if (Telegram.WebApp.initDataUnsafe.user) {
      return {
        name: Telegram.WebApp.initDataUnsafe.user.first_name,
        username: '@' + Telegram.WebApp.initDataUnsafe.user.username,
        id: Telegram.WebApp.initDataUnsafe.user.id,
        form: {
          username: '@' + Telegram.WebApp.initDataUnsafe.user.username,
          address: '',
          comment: ''
        }
      }
    } else {
      return {
        name: '',
        username: '',
        id: '',
        form: {
          username: '',
          address: '',
          comment: ''
        }
      }
    }
  },
  methods: {
    async submitForm() {
      console.log('Form submission intercepted');
      try {
        const { userId, form } = this;
        // Проверка userId
        if (!userId || typeof userId !== 'number' || userId <= 0) {
          console.error('Invalid user ID. Cannot submit the form.');
          return;
        }

        // Получаем токен
        const telegramToken = await this.getTelegramToken(userId);
        if (!telegramToken) {
          console.error('Failed to retrieve Telegram token.');
          return;
        }

        // Формируем сообщение для отправки в Telegram
        const message = `
          Новый заказ от пользователя @${form.username}:
          Адрес доставки: ${form.address}
          Комментарий: ${form.comment}
          User ID: ${userId}
        `;

        // Отправляем сообщение
        await this.sendMessageToTelegram(telegramToken, '3763274', message);
      } catch (error) {
        console.error('Error submitting the form:', error);
      }
    },

    async getTelegramToken(userId) {
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
        return null;
      }
    },

    async sendMessageToTelegram(telegramToken, chatId, message) {
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
  }
};
</script>

<style scoped>
.top-text {
  font-size: 20px;
}

.hint-text {
  margin-bottom: 20px;
}

.order_form {
  padding: 20px;
}

.bottom-text {
  margin-top: 20px;
}
</style>