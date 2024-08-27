<template>
    <form class="order_form" action="">
      <p class="top-text">Куда доставить?</p>
      <p class="hint-text">После обработки заказа мы напишем вам в телеграм, для подтверждения, и пришлем ссылку на оплату.</p>
      <Input placeholder="Контакт в тг" type="name" :val="username"/>
      <Input placeholder="Адрес доставки" type="address" />
      <Textarea placeholder="Комментарий" type="comment"></Textarea>
      <Button type="submit">Сделать заказ</Button>
      <p class="bottom-text">В рабочее время (08:00 - 20:00) обрабатываем заказы в течение часа, заказы сделанные в нерабочее время будут обработаны на следующий день.</p>
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
      if(Telegram.WebApp.initDataUnsafe.user){
        return {
          name: Telegram.WebApp.initDataUnsafe.user.first_name,
          username: '@'+Telegram.WebApp.initDataUnsafe.user.username,
          id: Telegram.WebApp.initDataUnsafe.user.id,
        }
      } else {
        return {
          name: '',
          username: '',
          id: ''
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