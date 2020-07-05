class Song:
    def __init__(self, id: int, name: str, artist: str):
        self.id = id;
        self.name = name;
        self.artist = artist;

    def get_json(self):
        return self.__dict__
