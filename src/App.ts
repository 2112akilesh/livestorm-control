import Livestorm from '@livestorm/plugin'

const template = require('./template/game.html').default
const basisControl = require('./template/basicControl.html').default


export default function () {
  // // Livestorm.PubSub.subscribe('hello', ({ message }) => {
  // //   console.log(`Someone said : ${message}`)
  // // })
  // Livestorm.PubSub.publish('hello', {
  //   data: { message: 'Hello World' }
  // })

  //------------------Hello there message----------------------
  Livestorm.Chat.send({
    user: {
      firstName: 'Akilesh'
    },
    text: `controll plugin`,
  })

  //----------------Send text message to chatbox-------------------
  Livestorm.PubSub.subscribe('textMessage', async (data) => {
    console.log(data.text);

    const text = await data.text;
    // => "lol"
    Livestorm.Chat.send({
      user: {
        firstName: 'Test Message'
      },
      text: `${text}`,
      //html: template,
    })
  });


  //----------------Send File to chatbox-------------------
  Livestorm.PubSub.subscribe('image', async (data) => {
    console.log(data.text);

    // => "lol"
    Livestorm.Chat.send({
      user: {
        firstName: 'File'
      },
      html: `<img width="300px" height="300px" src= "${data.text}"  />`
    })
  });


  //----------------Proper way to send files-------------------
  Livestorm.PubSub.subscribe('file', async (data) => {
    console.log(data.text);

    // => "lol"
    Livestorm.Chat.send({
      user: {
        firstName: 'File'
      },
      html: `${data.text}`
    })
  });


  //-----------------------Games & stuff------------------------
  Livestorm.PubSub.subscribe('game', (data) => {
    Livestorm.Streams.addStream({
      title: 'Game',
      imageUrl: 'https://www.pngitem.com/pimgs/m/117-1178877_let-s-play-pixel-game-controller-png-transparent.png',
      template: template,
      variables: { gameUrl: data.id },
      onMessage: () => console.log('Game started'),
    });
  })


  //------------------------Basic controll--------------------
  Livestorm.PubSub.subscribe('game', (data) => {
    Livestorm.Streams.addStream({
      title: 'basic-controll',
      imageUrl: 'https://www.pngitem.com/pimgs/m/117-1178877_let-s-play-pixel-game-controller-png-transparent.png',
      template: basisControl,
      variables: { querry: data.todo },
      onMessage: () => console.log('Game started'),
    });
  })


}
