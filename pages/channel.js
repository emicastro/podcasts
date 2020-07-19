const Channel = ({ channel, audioClips, series }) => {
  return (
    <div>
      <header>Podcast</header>

      <h1>{channel.title}</h1>

      <h2>Ultimos Podcasts</h2>
      {audioClips.map((clip, key) => (
        <div key={key}>{clip.title}</div>
      ))}
      <h2>Series</h2>
      {series.map((serie, key) => (
        <div key={key}>{serie.title}</div>
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

  let reqChannel = await fetch(
    `https://api.audioboom.com/channels/${idChannel}`
  )
  let dataChannel = await reqChannel.json()
  let channel = dataChannel.body.channel

  let reqAudio = await fetch(
    `https://api.audioboom.com/channels/${idChannel}/audio_clips`
  )
  let dataAudio = await reqAudio.json()
  let audioClips = dataAudio.body.audio_clips

  let reqSeries = await fetch(
    `https://api.audioboom.com/channels/${idChannel}/child_channels`
  )
  let dataSeries = await reqSeries.json()
  let series = dataSeries.body.channels
  return { channel, audioClips, series }
}

export default Channel
