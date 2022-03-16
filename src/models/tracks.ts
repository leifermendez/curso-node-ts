import { Schema, Types, model, Model } from "mongoose";
import TrackInterface from "../interfaces/track.interface"
import mongooseDelete from "mongoose-delete";

interface TracksModelExt extends Model<TrackInterface> {
    findAllData(): any;
}
const TracksScheme = new Schema<any>(
  {
    name: {
      type: String,
    },
    album: {
      type: String,
    },
    cover: {
      type: String,
    },
    artist: {
      name: {
        type: String,
      },
      nickname: {
        type: String,
      },
      nationality: {
        type: String,
      },
    },
    duration: {
      start: {
        type: Number,
      },
      end: {
        type: Number,
      },
    },
    mediaId: {
      type: String,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

/**
 * Implementar metodo propio con relacion a storage
 */


TracksScheme.static('findAllData', function findAllData() {
    const joinData = this.aggregate([
        //TODO Tracks
        {
          $lookup: {
            from: "storages", //TODO Tracks --> storages
            localField: "mediaId", //TODO Tracks.mediaId
            foreignField: "_id", //TODO Straoges._id
            as: "audio", //TODO Alias!
          },
        },
        {
          $unwind: "$audio",
        },
      ]);
    return joinData;
  });

TracksScheme.statics.findOneData = function (id) {
  const joinData = this.aggregate([
    {
      $match: {
        _id: id,
      },
    },
    {
      $lookup: {
        from: "storages", //TODO Tracks --> storages
        localField: "mediaId", //TODO Tracks.mediaId
        foreignField: "_id", //TODO Straoges._id
        as: "audio", //TODO Alias!
      },
    },
    {
      $unwind: "$audio",
    },
  ]);
  return joinData;
};

TracksScheme.plugin(mongooseDelete, { overrideMethods: "all" });
const TrackModel = model<TrackInterface, TracksModelExt>('tracks', TracksScheme);
export default TrackModel