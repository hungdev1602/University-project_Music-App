const aPlayer = document.querySelector("#aplayer")
if(aPlayer){
  const dataSong = JSON.parse(aPlayer.getAttribute("data-song"))
  const singerName = aPlayer.getAttribute("data-singer")
  const rollingAvatar = document.querySelector(".inner-play .inner-avatar")

  const ap = new APlayer({
    container: aPlayer,
    audio: [{
        name: dataSong.title,
        artist: singerName,
        url: dataSong.audio,
        cover: dataSong.avatar
    }]
  });

  ap.on("play", () => {
    rollingAvatar.style.animationPlayState = "running"
  })

  ap.on("pause", () => {
    rollingAvatar.style.animationPlayState = "paused"
  })
}