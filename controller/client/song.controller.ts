import { Request, Response } from "express"
import { Topic } from "../../models/client/topic.model"
import { Song } from "../../models/client/song.model"
import { Singer } from "../../models/client/singer.model"

export const index = async (req: Request, res: Response) => {
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
  
  res.render("client/pages/songs/index", {
    pageTitle: "List songs",
    songs: songs
  })
}
