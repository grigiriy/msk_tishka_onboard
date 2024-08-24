import { defineConfig } from '@tok/generation';

export default defineConfig({

  pages: [
    {
      slides: [
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
          description:
            "Сейчас расскажу, как здесь все работает:<br>Грузи в меня картинки, и выбирай модель одежды. Об оплате поговорим на последнем шаге)",
          button: 'Круто! дальше',
        },

        // image
        {
          media: {
            type: 'image',
            src: import('./assets/img/chick.jpg'),
          },
          shape: 'rounded',
          pagination: 'count',
          title: 'Что я могу',
          description:"Я могу делать принты на футболках, свитшотах (толстовка без капюшона) и худи (толстовка с капюшоном).<br><br>У меня (пока что) есть два базовых цвета: черный и белый.<br><br>И множество размеров от xs до 3xl",
          button: 'Пон, дальше',
        },

        // sticker
        {
          media: {
            type: 'sticker',
            src: import('./assets/stickers/shiba_no.tgs'),
            size: 250,
          },
          shape: 'square',
          pagination: 'count',
          title: 'Есть ограничения!',
          description:'Я могу отказать в печати, если твоя картинка нарушает какие-нибудь законы или моё чувство прекрасного.<br><br>Боту, конечно, ничего не будет, а вот кожаным, которые будут это печатать, может и прилететь. Так что сегодня без фурри-порно, прости.<br><br>Если у тебя специфический заказ, пиши вот сюда @gmalyshev — обсудим лично.',
          button: 'Понятно',
          // description: 'Я могу отказать в печати по личным причинам, например, всякие БЛМ или прон я печатать не буду (либо за сильно дорохо - можем покумекать ЛС)',
          // button: 'Пон, согл',
        },

        // sticker
        {
          media: {
            type: 'image',
            src: import('./assets/img/go.webp'),
          },
          shape: 'square',
          pagination: 'count',

          title: 'Как заказать?',
          description:'Всё очень просто. Кидай в меня картинку, которую хочешь напечатать, выбирай модель одежды, размер и цвет. И оплачивай заказ.<br><br>Срок изготовления – 1 (иногда 2) дня с момента оплаты. Статус заказа я буду присылать тебе в нашу переписку.<br><br>Доставка — по всей России СДЭКом или Почтой, но оплачиваешь её ты — при получении.<br><br>Если остались вопросы, пиши @gmalyshev.<br><br><b style="font-size:24px">Погнали?</b>',
          button: 'ПОГНАЛИ!',
          
          // title: 'Крч,',
          // description:'делай десигн, выбирай размеры итп<br>Как будешь готов, жми "КУПИТЬ", и я скину тебе куар для оплаты.<br><br><b style="font-size:24px">Погнали?</b>',
          // button: 'ПОГНАЛИ!',
        },
      ],
    },

    // paywall
    {
      extends: 'paywall',
      path: '/paywall',
      media: {
        type: 'sticker',
        src: import('./assets/stickers/duck_money.tgs'),
        size: 150,
      },
      shape: 'square',
      title: 'Your beautiful Paywall',
      list: [
        'Adjustable product cards',
        '<b>👛 Wallet Pay</b> and <b>Telegram Payments</b> ready. Add custom methods easily',
        'Subscriptions or One-time payments',
      ],
      products: [
        {
          id: '1_month_subscription',
          title: '1 month subscription',
          description: '2$/month',
          discount: '',
          price: 2,
        },
        {
          id: '1_year_subscription',
          title: '1 year subscription',
          description: '1$/month',
          discount: 'Discount 50%',
          price: 12,
        },
        {
          id: 'lifetime_access',
          title: 'Lifetime access',
          description: '20$ once',
          discount: 'Best offer',
          price: 20,
        },
      ],
      mainButtonText: 'Buy for {price}',
      popup: {
        // popup for payment methods choice
        type: 'web',
      },
      links: [
        {
          text: 'Privacy policy',
          href: 'https://google.com',
        },
        {
          text: 'Terms of use',
          href: 'https://google.com',
        },
      ],
    },
  ],
});
