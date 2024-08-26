import { defineConfig } from '@tok/generation';



import ConstructorSection from './custom/ConstructorSection.vue';
// import OrderSection from './custom/OrderSection.vue';

const imageStyle =
  'left: 50%; top: 50%; transform: translate(-50%, -50%); max-width: initial';


export default defineConfig({
  definePresets: {
    constructor_slide: ConstructorSection,
    // order_slide: OrderSection,
  },
  pages: [
    {
      slides: [
        {
          // extends: 'order_slide',
          // button: 'Оформить заказ',
          extends: 'form',
          media: {
            type: 'sticker',
            src: import('./assets/stickers/duck_spy.tgs'),
            size: 150,
          },
          shape: 'square',
          pagination: 'count',
          title: 'Forms',
          description: 'User fills in the form – the bot receives the data',
          form: [
            {
              id: 'text_from_form',
              placeholder: 'Text input',
              type: 'text',
            },
            {
              id: 'number_from_form',
              placeholder: 'Number input',
              type: 'number',
            },
            {
              id: 'checkbox_from_form',
              placeholder: 'Checkbox',
              type: 'checkbox',
            },
          ],
          button: 'Next',
        },
        // intro
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
          },
          shape: 'square',
          pagination: 'count',

          title: 'Как это работает?',
          description:'Всё очень просто. Кидай в меня картинку, которую хочешь напечатать, выбирай модель одежды, размер и цвет. И оплачивай заказ.<br><br>Срок изготовления – 1 (иногда 2) дня с момента оплаты. Статус заказа я буду присылать тебе в нашу переписку.<br><br>Доставка — по всей России СДЭКом или Почтой, но оплачиваешь её ты — при получении.<br><br>Если остались вопросы, пиши <a href="https://t.me/gmalyshev">@gmalyshev</a>.<br><br><b style="font-size:24px">Погнали?</b><br><br>',
          button: 'ПОГНАЛИ!',
        },
        {
          extends: 'constructor_slide',
          button: 'Заказать!',
        },
        {
          extends: 'order_slide',
          button: 'Оформить заказ',
        },
      ],
    },

    // paywall
    // {
    //   extends: 'paywall',
    //   path: '/paywall',
    //   media: {
    //     type: 'sticker',
    //     src: import('./assets/stickers/duck_money.tgs'),
    //     size: 150,
    //   },
    //   shape: 'square',
    //   title: 'Your beautiful Paywall',
    //   list: [
    //     'Adjustable product cards',
    //     '<b>👛 Wallet Pay</b> and <b>Telegram Payments</b> ready. Add custom methods easily',
    //     'Subscriptions or One-time payments',
    //   ],
    //   products: [
    //     {
    //       id: '1_month_subscription',
    //       title: '1 month subscription',
    //       description: '2$/month',
    //       discount: '',
    //       price: 2,
    //     },
    //     {
    //       id: '1_year_subscription',
    //       title: '1 year subscription',
    //       description: '1$/month',
    //       discount: 'Discount 50%',
    //       price: 12,
    //     },
    //     {
    //       id: 'lifetime_access',
    //       title: 'Lifetime access',
    //       description: '20$ once',
    //       discount: 'Best offer',
    //       price: 20,
    //     },
    //   ],
    //   mainButtonText: 'Buy for {price}',
    //   popup: {
    //     // popup for payment methods choice
    //     type: 'web',
    //   },
    //   links: [
    //     {
    //       text: 'Privacy policy',
    //       href: 'https://google.com',
    //     },
    //     {
    //       text: 'Terms of use',
    //       href: 'https://google.com',
    //     },
    //   ],
    // },
  ],
});
