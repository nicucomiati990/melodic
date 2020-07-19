from flask import send_file, jsonify
import pyodbc
import io
from api.config.config import get_server_name
from api.models.song import Song

server_name = get_server_name()
database_name = 'MelodicSongs'

conn = pyodbc.connect('Driver={ODBC Driver 17 for SQL Server};'
                      f'Server={server_name};'
                      f'Database={database_name};'
                      'Trusted_Connection=yes;')

cursor = conn.cursor()


def make_song(row):
    song = Song(row[0], row[1], row[2])
    json_data = song.get_json()
    return json_data


def get_songs():
    query = 'select S.Id, S.Name, A.Name as Artist from Songs S inner join Artists A on S.ArtistId = A.Id'

    results = [make_song(row) for row in cursor.execute(query).fetchall()]

    return jsonify(results)


def get_song(song_id):
    query = f'select Name, Song from Songs where Id=?'

    results = cursor.execute(query, song_id).fetchall()

    filename = results[0][0]
    song = pyodbc.Binary(results[0][1])

    return send_file(io.BytesIO(song), attachment_filename=filename, mimetype='audio/mpeg')
