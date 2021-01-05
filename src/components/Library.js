import React from "react";

//Components
import LibrarySong from "./LibrarySong";

const Library = ({ songs, currentSong, setCurrentSong, libraryStatus }) => {
  return (
    <div className={`library ${libraryStatus ? "active-library" : ""}`}>
      <h2>Library</h2>
      <div className="library-songs">
        {songs.map((song) => (
          <LibrarySong song={song} setCurrentSong={setCurrentSong} currentSong={currentSong} key={song.id} />
        ))}
      </div>
    </div>
  );
};

export default Library;
