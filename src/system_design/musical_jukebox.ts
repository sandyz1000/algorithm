/* """
Design a musical jukebox using object-oriented principles

In any object-oriented design question, you first want to start off with asking your interviewer
some questions to clarify design constraints. Is this jukebox playing CD? Records? MP3s? Is it a
simulation on a computer, or is it supposed to represent a physical jukebox? Does it take money,
or is it free? And if it takes money, which currency? And does it deliver change?

Unfortunately, we don't have an interviewer here that we can have this dialogue with.
Instead, we'll make some assumptions. We'll assume that the jukebox is a computer simulation that
closely mirrors physical jukeboxes, and we'll assume that it's free.

Now that we have that out of the way, we'll outline the basic system components.
-> Jukebox
-> CD
-> Song
-> Artist
-> Playlist
-> Display (displays details on the screen)

Now, let’s break this down further and think about the possible actions.
-> Playlist creation (includes add, delete, and shuffle)
-> CD selector
-> Song selector
-> Queuing up a song
-> Get next song from playlist

A user also can be introduced:
-> Adding
-> Deleting
-> Credit information

Each of the main system components translates roughly to an object, and each action translates to
a method. Let's walk through one potential design.

The Jukebox class represents the body of the problem. Many of the interactions between the
components of the system, or between the system and the user, are channeled through here.

""" */

export class Jukebox {
    cd_player: CDPlayer;
    user: User;
    cd_collection: CD[];
    ts: TrackSelector;

    constructor(cd_player: CDPlayer, user: User, cd_collection: CD[], ts: TrackSelector) {
        this.cd_player = cd_player;
        this.user = user;
        this.cd_collection = cd_collection;
        this.ts = ts;
    }

    getCurrentSong(): Song | null {
        return this.ts.getCurrentSong();
    }

    setUser(u: User): void {
        this.user = u;
    }
}

export class CDPlayer {
    c: CD | null;
    p: Playlist | null;

    constructor(c: CD | null = null, p: Playlist | null = null) {
        this.c = c;
        this.p = p;
    }

    playSong(s: Song): void {
        // Implement playSong logic
    }
}

export class Playlist {
    queue: Song[];

    constructor() {
        this.queue = [];
    }

    getNextToPlay(): Song | null {
        return this.queue.length > 0 ? this.queue[0] : null;
    }

    queueUpSong(s: Song): void {
        this.queue.push(s);
    }
}

export class CD {
    cdId: number;
    artist: string;
    songs: Song[];

    constructor(cdId: number, artist: string, songs: Song[]) {
        this.cdId = cdId;
        this.artist = artist;
        this.songs = songs;
    }
}

export class Song {
    songId: number;
    cd: CD | null;
    title: string;
    length: number;

    constructor(songId: number, cd: CD | null, title: string, length: number) {
        this.songId = songId;
        this.cd = cd;
        this.title = title;
        this.length = length;
    }
}

export class User {
    name: string;
    userId: number;

    constructor(name: string, userId: number) {
        this.name = name;
        this.userId = userId;
    }

    static addUser(name: string, userId: number): void {
        // Implement addUser logic
    }
}

export class TrackSelector {
    getCurrentSong(): Song | null {
        // Implement getCurrentSong logic
        return null;
    }
}

if (require.main === module) {
    // Entry point
}
