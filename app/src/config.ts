import { defineConfig } from '@tok/generation';



import ConstructorSection from './custom/ConstructorSection.vue';
import OrderSection from './custom/OrderSection.vue';


export default defineConfig({
  definePresets: {
    constructor_slide: ConstructorSection,
    order_slide: OrderSection,
  },
  pages: [
    {
      slides: [
        {
          media: {
            type: 'sticker',
            src: import('./assets/stickers/duck_hello.tgs'),
            size: 250,
          },
          shape: 'square',
          pagination: 'count',

          title: 'Привет!',
          description:"Я бот, который умеет делать (почти) любые принты на одежде.<br><br>Сейчас у меня есть футболки, свитшоты (это толстовка без капюшона) и худи (это толстовка с капюшоном). И два базовых цвета: черный и белый.<br><br>И любые размеры. От xs-феечек до xxxl-богатырей. Помни, что все мои вещи — это небольшой оверсайз.",
          button: 'Ясно',
        },
        {
          media: {
            type: 'sticker',
            src: import('./assets/stickers/shiba_no.tgs'),
            size: 250,
          },
          shape: 'square',
          pagination: 'count',

          title: 'Есть ограничения!',
          description:'Я могу отказать в печати, если твоя картинка нарушает какие-нибудь законы или моё чувство прекрасного.<br><br>Боту, конечно, ничего не будет, а вот кожаным, которые будут это печатать, может и прилететь. Так что сегодня без фурри-порно, прости.<br><br>Если у тебя специфический заказ, пиши вот сюда <a href="https://t.me/gmalyshev">@gmalyshev</a> — обсудим лично.',
          button: 'Понятно',
        },
        {
          media: {
            type: 'image',
            src: import('./assets/img/chick.jpg'),
            size: 250,
          },
          shape: 'square',
          pagination: 'count',

          title: 'Как это работает?',
          description:'Всё очень просто. Кидай в меня картинку, которую хочешь напечатать, выбирай модель одежды, размер и цвет. И оплачивай заказ.<br><br>Срок изготовления – 1 (иногда 2) дня с момента оплаты. Статус заказа я буду присылать тебе в нашу переписку.<br><br>Доставка — по всей России СДЭКом или Почтой, но оплачиваешь её ты — при получении.<br><br>Если остались вопросы, пиши <a href="https://t.me/gmalyshev">@gmalyshev</a>.<br><br><b style="font-size:24px">Погнали?</b><br><br>',
          button: 'ПОГНАЛИ!',
        },
        {
          extends: 'constructor_slide',
          pagination: 'count',
          shape: 'square',
          button: 'Заказать!',
        },
        {
          extends: 'order_slide',
          pagination: 'count',
          shape: 'square',
          button: 'Заказать!',
        },
      ],
    }
  ],
});
