import { defineConfig } from '@tok/generation';

export default defineConfig({
  // If you want to add language/currency localization – see ./examples/meditation as reference

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
          button: 'Выбрать фото',
        },

        // image
        {
          media: {
            type: 'image',
            src: import('./assets/img/durov.webp'),
          },
          shape: 'rounded',
          pagination: 'count',
          title: 'Что я могу',
          description:"Я могу делать принты на футболках, свитшотах (толстовка без капюшона) и худи (толстовка с капюшоном).<br>У меня (пока что) есть три базовых цвета: черный, белый и серый.<br>И множество размеров от ~~дрища до жиробасины~~ xxs до 3xl",
          button: 'Пон, дальше',
        },

        // sticker
        {
          media: {
            type: 'sticker',
            src: import('./assets/stickers/duck_love.tgs'),
            size: 250,
          },
          shape: 'square',
          pagination: 'count',
          title: 'Есть ограничения!',
          description:
            'Я могу отказать в печати по личным причинам, например, всякие БЛМ или прон я печатать не буду (либо за сильно дорохо - можем покумекать ЛС)',
          button: 'Пон, согл',
        },

        // sticker
        {
          media: {
            type: 'sticker',
            src: import('./assets/stickers/duck_love.tgs'),
            size: 250,
          },
          shape: 'square',
          pagination: 'count',
          title: 'Есть ограничения!',
          description:
            'Крч, делай десигн, выбирай размеры итп<br>Как будешь готов, жми "КУПИТЬ", и я скину тебе куар для оплаты.<br><br><b style="font-size:36px">Погнали?</b>',
          button: 'ПОГНАЛИ!',
        },

        // form
        // {
        //   extends: 'form', // note, it's important to extend from 'form' here
        //   media: {
        //     type: 'sticker',
        //     src: import('./assets/stickers/duck_spy.tgs'),
        //     size: 150,
        //   },
        //   shape: 'square',
        //   pagination: 'count',
        //   title: 'Forms',
        //   description: 'User fills in the form – the bot receives the data',
        //   form: [
        //     {
        //       id: 'text_from_form',
        //       placeholder: 'Text input',
        //       type: 'text',
        //     },
        //     {
        //       id: 'number_from_form',
        //       placeholder: 'Number input',
        //       type: 'number',
        //     },
        //     {
        //       id: 'checkbox_from_form',
        //       placeholder: 'Checkbox',
        //       type: 'checkbox',
        //     },
        //   ],
        //   button: 'Next',
        // },

        // video
        // {
        //   media: {
        //     type: 'video',
        //     src: import('./assets/videos/spongebob.mp4'),
        //     poster: import('./assets/img/spongebob_poster.webp'),
        //     style: 'aspect-ratio: 400/287', // here we manually set video aspect-ratio (default is 16:9)
        //   },
        //   shape: 'rounded',
        //   pagination: 'count',
        //   title: 'Videos',
        //   description:
        //     "Typically, video starts <b>automatically</b><br><br>However, on iOS, it will only autoplay upon any prior tap on the page ('Next' button doesn't count). If video doesn't autoplay, user will see preview and pretty animation, inviting them to tap to play the video",
        //   button: 'Next',
        // },

        // list
        // {
        //   media: {
        //     type: 'sticker',
        //     src: import('./assets/stickers/duck_juggling.tgs'),
        //     size: 150,
        //   },
        //   shape: 'square',
        //   pagination: 'count',
        //   title: 'Lists',
        //   description:
        //     'Lists can be used to showcase <b>features</b> of your product. Items support customizable icons',
        //   list: [
        //     {
        //       media: {
        //         type: 'icon',
        //         src: import('./assets/icons/guide.svg'),
        //         size: 30,
        //       },
        //       text: 'Some cool feature',
        //     },
        //     {
        //       media: {
        //         type: 'icon',
        //         src: import('./assets/icons/track.svg'),
        //         size: 30,
        //       },
        //       text: 'Some very cool feature',
        //     },
        //     {
        //       media: {
        //         type: 'icon',
        //         src: import('./assets/icons/time.svg'),
        //         size: 30,
        //       },
        //       text: 'Some extremely cool feature',
        //     },
        //   ],
        //   button: 'Next',
        // },

        // "everything is customizable" slide
        // {
        //   media: {
        //     type: 'sticker',
        //     src: import('./assets/stickers/duck_xray.tgs'),
        //     size: 250,
        //   },
        //   shape: 'square',
        //   pagination: 'count',
        //   title: 'Everything is customizable',
        //   description: '',
        //   textAlign: 'center',
        //   list: [
        //     '<b>CSS styles</b>: extend primary colors from Telegram or set yours',
        //     'Button text and actions (look down)',
        //     'Use our carefully crafted <b>presets</b> or easily create your own',
        //   ],
        //   button: 'Super-Duper Next',
        // },

        // slide with other features
        // {
        //   media: {
        //     type: 'sticker',
        //     src: import('./assets/stickers/duck_cool.tgs'),
        //     size: 150,
        //   },
        //   shape: 'square',
        //   pagination: 'count',
        //   title: 'Some other features:',
        //   description: '',
        //   list: [
        //     'One-click 0$ <b>deploy</b> on GitHub Pages',
        //     'Language and currency localization',
        //     'Buttons with <b>haptic</b> feedback',
        //     'Content pre-loading for high speed',
        //     '<b>Low-code</b> approach to building onboardings',
        //     'Many examples/presets',
        //     "And many more... (see <a href='https://github.com/Easterok/telegram-onboarding-kit' target='_blank'>GitHub</a>)",
        //   ],
        //   button: 'Next',
        // },

        // go to paywall slide
        // {
        //   media: {
        //     type: 'sticker',
        //     src: import('./assets/stickers/duck_knife.tgs'),
        //     size: 250,
        //   },
        //   shape: 'square',
        //   pagination: 'count',
        //   textAlign: 'center',
        //   title: 'But onboarding slides are not enough...',
        //   description: "Let's go to Paywall",
        //   button: {
        //     content: 'Go to Paywall',
        //     to: '/paywall',
        //   },
        // },
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
