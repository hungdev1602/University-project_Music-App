// Tính năng phát nhạc
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
// Hết Tính năng phát nhạc

// Tính năng like
const likeButton = document.querySelector(".inner-actions .inner-like")
if(likeButton){
  likeButton.addEventListener("click", () => {
    const songId = likeButton.getAttribute("button-like")
    let status = ""

    if(likeButton.classList.contains("active")){
      likeButton.classList.remove("active")
      status = "decrease"
    }
    else{
      likeButton.classList.add("active")
      status = "increase"
    }

    const fullData = {
      songId: songId,
      status: status
    }

    fetch("/songs/like", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(fullData)
    })
    .then(res => res.json())
    .then(data => {
      const numberLike = likeButton.querySelector("span")
      if(numberLike){
        numberLike.innerHTML = data.like
      }
    })
  })
}
// Hết Tính năng like

// Tính năng yêu thích bài hát
const buttonFavorite = document.querySelectorAll("[button-favorite]")

if(buttonFavorite.length > 0){
  buttonFavorite.forEach(button => {
    button.addEventListener("click", () => {
      const songId = button.getAttribute("button-favorite")
      
      button.classList.toggle("active")

      fetch("/songs/favorite", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          songId: songId
        })
      })
      .then(res => res.json())
      .then(data => console.log(data))
    })
  })
  
}
// Hết tính năng yêu thích bài hát