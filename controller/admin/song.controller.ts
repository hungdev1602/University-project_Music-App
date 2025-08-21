import { Request, Response } from "express";
import { Song } from "../../models/client/song.model";

export const index = async (req: Request, res: Response) => {
  const songs = await Song.find({
    deleted: false
  })

  res.render("admin/pages/songs/index", {
    pageTitle: "Song",
    songs: songs
  })
}