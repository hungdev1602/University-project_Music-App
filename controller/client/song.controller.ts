import { Request, Response } from "express"
import { Topic } from "../../models/client/topic.model"
import { Song } from "../../models/client/song.model"
import { Singer } from "../../models/client/singer.model"
import { FavoriteSong } from "../../models/client/favorite-song.model"
import moment from "moment"
import unidecode from "unidecode"

export const listSongByTopic = async (req: Request, res: Response) => {
  const slugTopic: string = req.params.slugTopic
  const topic = await Topic.findOne({
    slug: slugTopic,
    status: "active",
    deleted: false
  })

  const songs = await Song.find({
    topicId: topic._id,
    status: "active",
    deleted: false
  }).select("id title avatar singerId like slug")

  for (const song of songs) {
    const singer = await Singer.findOne({
      _id: song.singerId,
      deleted: false
    })

    song["singerFullName"] = singer ? singer.fullName : ""
  }

  // console.log(songs)
  
  res.render("client/pages/songs/listSongByTopic", {
    pageTitle: "List songs",
    songs: songs
  })
}

export const songDetail = async (req: Request, res: Response) => {
  const songSlug: string = req.params.slugSong

  const song = await Song.findOne({
    slug: songSlug,
    status: "active",
    deleted: false
  })

  const singer = await Singer.findOne({
    _id: song.singerId,
    status: "active",
    deleted: false
  }).select("fullName")

  const topic = await Topic.findOne({
    _id: song.topicId,
    status: "active",
    deleted: false
  }).select("title")

  // check xem bài hát có phải trong danh sách yêu thích hay ko
  const isFavorite = await FavoriteSong.findOne({
    songId: song.id
  })

  if(isFavorite){
    song["isFavorite"] = true
  } else{
    song["isFavorite"] = false
  }
  
  res.render("client/pages/songs/detail", {
    pageTitle: "Song detail",
    song: song,
    singer: singer,
    topic: topic
  })
}

export const likePatch = async (req: Request, res: Response) => {
  const { songId, status } = req.body

  const song = await Song.findOne({
    _id: songId,
    status: "active",
    deleted: false
  })

  if(song){
    let updateLike = song.like
    switch (status) {
      case "increase":
        updateLike++
        break;
      case "decrease":
        updateLike--
        break;
      default:
        break;
    }

    await Song.updateOne({
      _id: songId,
      status: "active",
      deleted: false
    }, {
      like: updateLike
    })
    res.json({
      message: "success",
      like: updateLike
    })
  }
  else{
    res.json({
      message: "error"
    })
  }
}

export const favoritePatch = async (req: Request, res: Response) => {
  const { songId } = req.body

  const existInFavorite = await FavoriteSong.findOne({
    // userId: res.locals.user._id, => sau khi làm tính năng đăng nhập đăng ký
    songId: songId
  })

  if(existInFavorite){
    await FavoriteSong.deleteOne({
      // userId: res.locals.user._id, => sau khi làm tính năng đăng nhập đăng ký
      songId: songId
    })
  }
  else{
    const record = new FavoriteSong({
      // userId: res.locals.user._id, => sau khi làm tính năng đăng nhập đăng ký
      songId: songId
    })
    await record.save()
  }

  res.json({
    message: "success"
  })
}

export const favoriteGet = async (req: Request, res: Response) => {
  const favoriteSongs = await FavoriteSong.find()

  for (const song of favoriteSongs) {
    const info = await Song.findOne({
      _id: song.songId,
      status: "active",
      deleted: false
    })

    const singer = await Singer.findOne({
      _id: info.singerId,
      status: "active",
      deleted: false
    })

    song["title"] = info.title
    song["avatar"] = info.avatar
    song["like"] = info.like
    song["singerFullName"] = singer ? singer.fullName : ""
    song["createdAtFormatted"] = moment(song.createdAt).format("DD/MM/YYYY")
  }
  
  res.render("client/pages/songs/favorite", {
    pageTitle: "Favorite songs",
    songs: favoriteSongs
  })
}

export const search = async (req: Request, res: Response) => {
  const type = req.params.type
  const keyword = `${req.query.keyword}`

  let keywordRegex = keyword.trim() //bỏ khoảng trắng 2 đầu
  keywordRegex = keywordRegex.replace(/\s+/g, "-") //bỏ khoảng trắng giữa các chữ và thay thế sang dấu -
  keywordRegex = unidecode(keywordRegex) //bỏ dấu trong tiếng việt
  
  const songs = await Song.find({
    slug: new RegExp(keywordRegex, "i"), //tìm theo slug
  }).select("slug avatar title like singerId")


  for (const song of songs) {
    const infoSinger = await Singer.findOne({
      _id: song.singerId,
      status: "active",
      deleted: false
    })

    song["singerFullName"] = infoSinger ? infoSinger.fullName : ""
  }

  if(type === "result"){
    res.render("client/pages/songs/search", {
      pageTitle: `Search for ${keyword}`,
      keyword: keyword,
      songs: songs
    })
  }
  else if(type === "suggest"){
    res.json({
      code: "success",
      message: "OK",
      songs: songs
    })
  }
}