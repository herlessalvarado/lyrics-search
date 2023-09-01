import { ReturnModelType, getModelForClass, prop } from "@typegoose/typegoose";

export class Music {
  @prop()
  artist: string;

  @prop()
  song: string;


  @prop()
  link: string;

  @prop()
  text: string;

  static async findByArtist(
    this: ReturnModelType<typeof Music>,
    artist: string
  ) {
    return this.aggregate([
      {
        $match: {
          artist: artist
        }
      },
      {
        $project: {
          _id: 0,
          artist: 1,
          song: 1,
          lyrics: "$text",
        }
      },
      {
        $group: {
          _id: "$artist",
          songs: {
            $push: {
              song: "$song",
              lyrics: "$lyrics"
            }
          }
        }
      },
      {
        $project: {
          _id: 0,
          artist: "$_id",
          songs: 1,
          lyrics: 1
        }
      }
    ])
  }
}

const musicModel = getModelForClass(Music, {
  schemaOptions: { timestamps: true, collection: 'music' },
});
export default musicModel;
