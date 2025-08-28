"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listenPatch = exports.search = exports.favoriteGet = exports.favoritePatch = exports.likePatch = exports.songDetail = exports.listSongByTopic = void 0;
const topic_model_1 = require("../../models/client/topic.model");
const song_model_1 = require("../../models/client/song.model");
const singer_model_1 = require("../../models/client/singer.model");
const favorite_song_model_1 = require("../../models/client/favorite-song.model");
const moment_1 = __importDefault(require("moment"));
const unidecode_1 = __importDefault(require("unidecode"));
const listSongByTopic = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const slugTopic = req.params.slugTopic;
    const topic = yield topic_model_1.Topic.findOne({
        slug: slugTopic,
        status: "active",
        deleted: false
    });
    const songs = yield song_model_1.Song.find({
        topicId: topic._id,
        status: "active",
        deleted: false
    }).select("id title avatar singerId like slug");
    for (const song of songs) {
        const singer = yield singer_model_1.Singer.findOne({
            _id: song.singerId,
            deleted: false
        });
        song["singerFullName"] = singer ? singer.fullName : "";
    }
    res.render("client/pages/songs/listSongByTopic", {
        pageTitle: "List songs",
        songs: songs
    });
});
exports.listSongByTopic = listSongByTopic;
const songDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const songSlug = req.params.slugSong;
    const song = yield song_model_1.Song.findOne({
        slug: songSlug,
        status: "active",
        deleted: false
    });
    const singer = yield singer_model_1.Singer.findOne({
        _id: song.singerId,
        status: "active",
        deleted: false
    }).select("fullName");
    const topic = yield topic_model_1.Topic.findOne({
        _id: song.topicId,
        status: "active",
        deleted: false
    }).select("title");
    const isFavorite = yield favorite_song_model_1.FavoriteSong.findOne({
        songId: song.id
    });
    if (isFavorite) {
        song["isFavorite"] = true;
    }
    else {
        song["isFavorite"] = false;
    }
    res.render("client/pages/songs/detail", {
        pageTitle: "Song detail",
        song: song,
        singer: singer,
        topic: topic
    });
});
exports.songDetail = songDetail;
const likePatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { songId, status } = req.body;
    const song = yield song_model_1.Song.findOne({
        _id: songId,
        status: "active",
        deleted: false
    });
    if (song) {
        let updateLike = song.like;
        switch (status) {
            case "increase":
                updateLike++;
                break;
            case "decrease":
                updateLike--;
                break;
            default:
                break;
        }
        yield song_model_1.Song.updateOne({
            _id: songId,
            status: "active",
            deleted: false
        }, {
            like: updateLike
        });
        res.json({
            message: "success",
            like: updateLike
        });
    }
    else {
        res.json({
            message: "error"
        });
    }
});
exports.likePatch = likePatch;
const favoritePatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { songId } = req.body;
    const existInFavorite = yield favorite_song_model_1.FavoriteSong.findOne({
        songId: songId
    });
    if (existInFavorite) {
        yield favorite_song_model_1.FavoriteSong.deleteOne({
            songId: songId
        });
    }
    else {
        const record = new favorite_song_model_1.FavoriteSong({
            songId: songId
        });
        yield record.save();
    }
    res.json({
        message: "success"
    });
});
exports.favoritePatch = favoritePatch;
const favoriteGet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const favoriteSongs = yield favorite_song_model_1.FavoriteSong.find();
    for (const song of favoriteSongs) {
        const info = yield song_model_1.Song.findOne({
            _id: song.songId,
            status: "active",
            deleted: false
        });
        const singer = yield singer_model_1.Singer.findOne({
            _id: info.singerId,
            status: "active",
            deleted: false
        });
        song["title"] = info.title;
        song["avatar"] = info.avatar;
        song["like"] = info.like;
        song["singerFullName"] = singer ? singer.fullName : "";
        song["createdAtFormatted"] = (0, moment_1.default)(song.createdAt).format("DD/MM/YYYY");
    }
    res.render("client/pages/songs/favorite", {
        pageTitle: "Favorite songs",
        songs: favoriteSongs
    });
});
exports.favoriteGet = favoriteGet;
const search = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const type = req.params.type;
    const keyword = `${req.query.keyword}`;
    if (!keyword.trim()) {
        if (type === "result") {
            return res.render("client/pages/songs/search", {
                pageTitle: `Search for ${keyword}`,
                keyword: keyword,
                songs: []
            });
        }
        else if (type === "suggest") {
            return res.json({
                code: "success",
                message: "OK",
                songs: []
            });
        }
    }
    let keywordRegex = keyword.trim();
    keywordRegex = keywordRegex.replace(/\s+/g, "-");
    keywordRegex = (0, unidecode_1.default)(keywordRegex);
    const songFinal = [];
    const songs = yield song_model_1.Song.find({
        slug: new RegExp(keywordRegex, "i"),
    }).select("slug avatar title like singerId");
    for (const song of songs) {
        const infoSinger = yield singer_model_1.Singer.findOne({
            _id: song.singerId,
            status: "active",
            deleted: false
        });
        songFinal.push({
            title: song.title,
            avatar: song.avatar,
            slug: song.slug,
            singerFullName: infoSinger ? infoSinger.fullName : "",
            like: song.like
        });
    }
    if (type === "result") {
        res.render("client/pages/songs/search", {
            pageTitle: `Search for ${keyword}`,
            keyword: keyword,
            songs: songFinal
        });
    }
    else if (type === "suggest") {
        res.json({
            code: "success",
            message: "OK",
            songs: songFinal
        });
    }
});
exports.search = search;
const listenPatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const songId = req.params.songId;
    const song = yield song_model_1.Song.findOne({
        _id: songId,
        status: "active",
        deleted: false
    });
    yield song_model_1.Song.updateOne({
        _id: songId,
        status: "active",
        deleted: false
    }, {
        listen: song.listen + 1
    });
    res.json({
        code: "success",
        listen: song.listen + 1
    });
});
exports.listenPatch = listenPatch;
