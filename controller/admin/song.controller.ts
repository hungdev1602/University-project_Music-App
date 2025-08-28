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

export const editGet = async (req: Request, res: Response) => {
  const id = req.params.id

  const song = await Song.findOne({
    _id: id,
    deleted: false
  })

  const topics = await Topic.find({
    deleted: false
  })

  const singers = await Singer.find({
    deleted: false
  })
  
  res.render("admin/pages/songs/edit", {
    pageTitle: "Chỉnh sửa bài hát",
    song: song,
    topics: topics,
    singers: singers
  })
}

export const editPatch = async (req: Request, res: Response) => {
  console.log(req.body)
  const id = req.params.id;

  if(req.body.avatar) {
    req.body.avatar = req.body.avatar[0];
  }

  if(req.body.audio) {
    req.body.audio = req.body.audio[0];
  }

  await Song.updateOne({
    _id: id,
    deleted: false
  }, req.body);

  // Sử dụng referer thay vì "back"
  const referer = req.get('Referer') || '/admin/songs';
  res.redirect(referer);
}