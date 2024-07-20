import BaseEntity from './base.entity';

class PlaylistEntity extends BaseEntity {
    name: string;
    description: string;
    songs: string[];
    categories: string[];

    constructor(data: Partial<PlaylistEntity>) {
        super(data.id || '');
        this.name = data.name || '';
        this.description = data.description || '';
        this.songs = data.songs || [];
        this.categories = data.categories || [];   
    }

}

export default PlaylistEntity;


