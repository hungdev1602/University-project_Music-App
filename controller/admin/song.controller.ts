import { Request, Response } from "express";
import { Song } from "../../models/client/song.model";
import { Topic } from "../../models/client/topic.model";
import { Singer } from "../../models/client/singer.model";
import { systemConfig } from "../../config/system";

export const index = async (req: Request, res: Response) => {
  const songs = await Song.find({
    deleted: false
  })

  res.render("admin/pages/songs/index", {
    pageTitle: "Song",
    songs: songs
  })
}

export const createGet = async (req: Request, res: Response) => {
  const topics = await Topic.find({
    deleted: false
  })

  const singer = await Singer.find({
    deleted: false
  })

  res.render("admin/pages/songs/create", {
    pageTitle: "Song",
    topics: topics,
    singers: singer
  })
}

export const createPost = async (req: Request, res: Response) => {
  req.body.avatar = req.body.avatar[0]
  req.body.audio = req.body.audio[0]

  const song = new Song(req.body)
  await song.save()

  res.redirect(`/${systemConfig.prefixAdmin}/songs`)
}