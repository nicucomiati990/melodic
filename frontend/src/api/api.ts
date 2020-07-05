const apiUrl = 'http://localhost:5000';

const songsUrl = `${apiUrl}/songs`;
export const songUrl = (songId: number) => `${songsUrl}/${songId}`;

const getSong = async (id: number) => {
  const response = await fetch(songUrl(id));

  return response.arrayBuffer();
};

const getSongs = async () => {
  const response = await fetch(songsUrl);

  return response.json();
};

export { getSong, getSongs, apiUrl };
