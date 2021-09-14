import Livestorm from '@livestorm/plugin'

export default function() {
  Livestorm.PubSub.subscribe('hello', ({ message }) => {
    console.log(`Someone said : ${message}`)
  })

  Livestorm.PubSub.publish('hello', {
    data: { message: 'Hello World' }
  })
}