from flask import Flask
from flask_cors import CORS
import api.project.api as api

app = Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'
CORS(app)
app.config["DEBUG"] = True


@app.route("/songs", methods=["GET"])
def get_songs():
    return api.get_songs()


@app.route("/songs/<id>", methods=["GET"])
def get_song(id):
    return api.get_song(id)


if __name__ == '__main__':
    app.run()
