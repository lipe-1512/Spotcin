import BaseModel from './base.model';

class PlaylistModel extends BaseModel {
  name: string;
  description: string;
  songs: string[];
  categories: string[];
  
  constructor({
    id,
    name,
    description,
    songs,
    categories
  }: {
    id: string;
    name: string;
    description: string;
    songs: string[];
    categories: string[];
  }) {
    super(id);
    this.name = name;
    this.description = description;
    this.songs = songs;
    this.categories = categories;
  }
}

export default PlaylistModel;
