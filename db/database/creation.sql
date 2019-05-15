-- sql script to create database for Hades web project

drop table follow;
drop table playlists;
drop table songs;
drop table genres;
drop table albums;
drop table users;

-- table declarations

create table users(
    pseudo      varchar(25) not null,
    userName    varchar(50),
    userSurname varchar(50),
    userEmail   varchar(50) not null,
    userPwd     varchar(128) not null,
    userBio     varchar(280),
    verified    tinyint(1) default 0,
    constraint  pk_users primary key (pseudo),
    unique key  uk_email (userEmail)
);

create table albums(
    albumId     integer not null auto_increment,
    albumTitle  varchar(50),
    albumAuthor varchar(50),
    posterId    varchar(25) not null,
    constraint  pk_albums primary key (albumId),
    constraint  fk_albums_users (posterId) references users(pseudo) on delete cascade
);

create table genres(
    genreId     integer not null auto_increment,
    genreName   varchar(32),
    constraint  pk_genres (genreId)
);

create table songs(
    songId      integer not null,
    songTitle   varchar(64),
    albumId     integer not null,
    genreId     integer,
    constraint  pk_songs primary key (songId),
    constraint  fk_songs_albums foreign key (albumId) references albums(albumId) on delete cascade,
    constraint  fk_songs_genres foreign key (genreId) references genres(genreId)
);

create table playlists(
    playlistId      integer not null auto_increment,
    playlistName    varchar(50),
    playlistDesc    varchar(280),
    ownerId         varchar(25),
    constraint      pk_playlists primary key (playlistId),
    constraint      fk_playlists_users foreign key (ownerId) references users(pseudo) on delete cascade
);

create table follow(
    followedId  varchar(25),
    followerId  varchar(25),
    constraint  pk_follow primary key (followedId, followerId),
    constraint  fk_followed_users foreign key (followedId) references users(pseudo) on delete cascade,
    constraint  fk_follower_users foreign key (followerId) references users(pseudo) on delete cascade
)