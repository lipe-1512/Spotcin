import PlaylistEntity from '../entities/playlist.entity';
import { InternalServerError } from '../utils/errors/http.error';
import BaseRepository from './base.repository';

class PlaylistRepository extends BaseRepository<PlaylistEntity> {
  constructor() {
    super('playlists');
  }

  public async getPlaylists(): Promise<PlaylistEntity[]> {
    try {
      return await this.findAll();
    } catch (e) {
      throw new InternalServerError();
    }
  }

  public async getPlaylistById(id: string): Promise<PlaylistEntity | undefined> {
    try {
      let playlists = await this.findAll();
      let playlist = playlists.find((playlist) => playlist.id === id);

      return playlist;
    } catch (e) {
      throw new InternalServerError();
    }
  }

  public async deletePlaylistById(id: string): Promise<void> {
    try {
      const playlist = await this.getPlaylistById(id);

      if (playlist) {
        await this.delete((playlist) => playlist.id !== id);
      }
    } catch (e) {
      throw new InternalServerError();
    }
  }
    
  public async updatePlaylistById(newPlaylist: PlaylistEntity, id: string): Promise<PlaylistEntity | undefined> {
    try {
      let nPlaylist = await this.update((playlist) => playlist.id === id, newPlaylist);
      if (nPlaylist === null) {
        return undefined;
      }
      return nPlaylist;
    } catch (e) {
      throw new InternalServerError();
    }
  }
  
  public async createPlaylist(newPlaylist: PlaylistEntity): Promise<PlaylistEntity | undefined> {
    try {
      let nPlaylist = await this.add(newPlaylist);

      return nPlaylist;
    } catch (e) {
      throw new InternalServerError();
    }
  }
  
  public async deleteSongUsingPlaylistId(song: string, id: string): Promise<void> {
    try {
      const playlist = await this.getPlaylistById(id);
      if (playlist) {
        const nPlaylist = {
          ...playlist,
          songs: playlist.songs.filter((name) => name !== song)
        };
        let nPlay = await this.updatePlaylistById(nPlaylist, id);
      }
      return undefined;
    } catch (e) {
      throw new InternalServerError();
    }
  }

  public async addSongUsingPlaylistId(song: string, id: string): Promise<void> {
    try {
      const playlist = await this.getPlaylistById(id);
      if (playlist) {
        const nPlaylist = {
          ...playlist,
          songs: [...playlist.songs, song]
        };
        let nPlay = await this.updatePlaylistById(nPlaylist, id);
      }
      return undefined;
    } catch (e) {
      throw new InternalServerError();
    }
  }
  
}
export default PlaylistRepository;
