use MelodicSongs
go

if OBJECT_ID('Songs', 'U') is not null drop table Songs
if OBJECT_ID('Artists', 'U') is not null drop table Artists

create table Artists
(
	Id int primary key,
	Name varchar(1000)
)

create table Songs
(
	Id int primary key identity(1,1),
	Name varchar(1000) unique,
	ArtistId int references Artists(Id),
	Song varbinary(max)
)