import configparser
from os import path


def get_server_name():
    config = configparser.ConfigParser()
    my_path = path.abspath(path.dirname(__file__))
    config_path = path.join(my_path, "..\\..\\db.ini")
    config.read(config_path)

    return config["DEFAULT"]["ServerName"]
