const ap = document.querySelector("#aplayer")
if(ap){
  const dataSong = JSON.parse(ap.getAttribute("data-song"))
  const singerName = ap.getAttribute("data-singer")

  new APlayer({
    container: ap,
    audio: [{
        name: dataSong.title,
        artist: singerName,
        url: dataSong.audio,
        cover: dataSong.avatar
    }]
});
}