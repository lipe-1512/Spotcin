import { Router, Request, Response } from 'express';
import { Result, SuccessResult } from '../utils/result';
import PlaylistService from '../services/playlist.service';
import PlaylistEntity from '../entities/playlist.entity';

class PlaylistController {
    private prefix: string = '/playlists';
    public router: Router;
    private playlistService: PlaylistService;
  
    constructor(router: Router, playlistService: PlaylistService) {
      this.router = router;
      this.playlistService = playlistService;
      this.initRoutes();
    }

    private initRoutes() {
        this.router.get(this.prefix, (req: Request, res: Response) =>
            this.getPlaylists(req, res)
        );

        this.router.get(`${this.prefix}/:id`, (req: Request, res: Response) =>
            this.getPlaylistById(req, res)
        );
        
        this.router.post(this.prefix, (req: Request, res: Response) =>
            this.createPlaylist(req, res)
        );

        this.router.post(`${this.prefix}/:id/songs/:song`, (req: Request, res: Response) =>
            this.addSongUsingPlaylistId(req, res)
        );

        this.router.put(`${this.prefix}/:id`, (req: Request, res: Response) =>
            this.updatePlaylistById(req, res)
        );

        this.router.delete(`${this.prefix}/:id`, (req: Request, res: Response) =>
            this.deletePlaylistById(req, res)
        );
        
        this.router.delete(`${this.prefix}/:id/songs/:song`, (req: Request, res: Response) =>
            this.deleteSongUsingPlaylistId(req, res)
        );

    }
    
    public async getPlaylists(req: Request, res: Response){
        const playlists = await this.playlistService.getPlaylists();

        return new SuccessResult({
            msg: Result.transformRequestOnMsg(req),
            data: playlists,
        }).handle(res);
    }

    public async getPlaylistById(req: Request, res: Response){
        const playlist = await this.playlistService.getPlaylistById(req.params.id);

        return new SuccessResult({
            msg: Result.transformRequestOnMsg(req),
            data: playlist,
        }).handle(res);
    }
    
    public async deletePlaylistById(req: Request, res: Response){
        await this.playlistService.deletePlaylistById(req.params.id);

        return new SuccessResult({
            msg: Result.transformRequestOnMsg(req),
        }).handle(res);
    }

    public async updatePlaylistById(req: Request, res: Response){
        const oldPlaylist = await this.playlistService.getPlaylistById(req.params.id);
        req.body.songs = oldPlaylist.songs;
        const playlist = await this.playlistService.updatePlaylistById(new PlaylistEntity(req.body), req.params.id);

        return new SuccessResult({
            msg: Result.transformRequestOnMsg(req),
            data: playlist,
        }).handle(res);
    }

    public async createPlaylist(req: Request, res: Response){
        const playlist = await this.playlistService.createPlaylist(new PlaylistEntity(req.body));

        return new SuccessResult({
            msg: Result.transformRequestOnMsg(req),
            data: playlist,
        }).handle(res);
    }

    public async deleteSongUsingPlaylistId(req: Request, res: Response){
        await this.playlistService.deleteSongUsingPlaylistId(req.params.song, req.params.id);

        return new SuccessResult({
            msg: Result.transformRequestOnMsg(req),
        }).handle(res);
    }

    public async addSongUsingPlaylistId(req: Request, res: Response){
        await this.playlistService.addSongUsingPlaylistId(req.params.song, req.params.id);

        return new SuccessResult({
            msg: Result.transformRequestOnMsg(req),
        }).handle(res);
    }

}
export default PlaylistController;