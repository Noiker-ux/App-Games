export async function genreMenu(){
    let genre_responce = await fetch('https://api.rawg.io/api/genres?key=91b914bf86944b2d9729ffa2c47d253f');
    genre_responce = await genre_responce.json();
    genre_responce = genre_responce.results;
    return genre_responce;
}