import Link from 'next/link'

const Channel = ({ channel, audioClips, series }) => {
  return (
    <div>
      <header>Podcast</header>

      <h1>{channel.title}</h1>

      <h2>Ultimos Podcasts</h2>
      {audioClips.map((clip, key) => (
        <div key={key}>
          <Link href={`/podcast?id=${clip.id}`} prefetch key={clip.id}>
            <a className="podcast">
              <h3>{clip.title}</h3>
              <div className="meta">
                {Math.ceil(clip.duration / 60)} minutes
              </div>
            </a>
          </Link>
        </div>
      ))}
      <h2>Series</h2>
      {series.map((serie, key) => (
        <div key={key}>
          <Link href={`/channel?id=${serie.id}`} prefetch>
            <a className="channel">
              <img src={serie.urls.logo_image.original} alt="" />
              <h2>{serie.title}</h2>
            </a>
          </Link>
        </div>
      ))}
      <style jsx>
        {`
          header {
            color: #fff;
            background: #8756ca;
            padding: 15px;
            text-align: center;
          }

          h1 {
            padding: 3px;
            text-align: center;
            font-size: 16px;
          }
        `}
      </style>

      <style jsx global>
        {`
          body {
            background: white;
            margin: 0;
            font-family: system-ui;
          }
        `}
      </style>
    </div>
  )
}

Channel.getInitialProps = async ({ query }) => {
  let idChannel = query.id
  console.log('hola')
  console.log(idChannel)
  let [reqChannel, reqAudio, reqSeries] = await Promise.all([
    fetch(`https://api.audioboom.com/channels/${idChannel}`),
    fetch(`https://api.audioboom.com/channels/${idChannel}/audio_clips`),
    fetch(`https://api.audioboom.com/channels/${idChannel}/child_channels`)
  ])

  let dataChannel = await reqChannel.json()
  let channel = dataChannel.body.channel

  let dataAudio = await reqAudio.json()
  let audioClips = dataAudio.body.audio_clips

  let dataSeries = await reqSeries.json()
  let series = dataSeries.body.channels
  return { channel, audioClips, series }
}

export default Channel
