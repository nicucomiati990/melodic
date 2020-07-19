import pyodbc
from os import listdir, path, system
from api.config.config import get_server_name

server_name = get_server_name()
database_name = 'MelodicSongs'

# recreate db
system(f'sqlcmd -S {server_name} -i create.sql -o errors.txt')

# read the songs in the songs folder
my_path = path.abspath(path.dirname(__file__))
songs_path = path.join(my_path, "..\\songs")

songs = [file for file in listdir(songs_path)]

# insert data based on the songs

print(songs)

conn = pyodbc.connect('Driver={ODBC Driver 17 for SQL Server};'
                      f'Server={server_name};'
                      f'Database={database_name};'
                      'Trusted_Connection=yes;')

cursor = conn.cursor()


def insert_artist(index, artist):
    query = f"insert into Artists(Id, Name) values({i}, \'{artist}\')"
    print(query)
    cursor.execute(query)
    conn.commit()


def insert_song(artist_id, song_name, song_bytes):
    # values(\'{song_name}\', \'{artist_id}\', \'{song_bytes}\')"
    query = 'insert into Songs(Name, ArtistId, Song) values (?,?,?)'
    # print(query)
    try:
        cursor.execute(query, (song_name, artist_id,
                               pyodbc.Binary(song_bytes)))
        conn.commit()
    except pyodbc.Error as e:
        print(e)


for i, song in enumerate(songs):
    [artist, song_name] = song.replace(".mp3", "").split(" - ")
    # print(artist+", "+song_name)
    insert_artist(i, artist)
    song_bytes = open("../songs/" + song, 'rb').read()
    print(len(song_bytes))
    insert_song(i, song_name, song_bytes)
