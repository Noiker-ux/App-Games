export class Queryies{
    #keyapi='91b914bf86944b2d9729ffa2c47d253f';
    #Now = new Date();
    routefunc = [
        {hash:'', func: this.basicLoad()},
        {hash:'#last-30-days', func: this.last30Load(this.#Now.getFullYear(),String(this.#Now.getMonth()).padStart(2,'0'),'01',this.#Now.getFullYear(),String(this.#Now.getMonth()+1).padStart(2,'0'),'01')},
        {hash: '#platforms', func: this.platformsRequest()},
        {hash: '#games', func: this.genresRequest()},
        {hash: '#popular', func: this.topRequest()},
        {hash: '#all-time-top-250', func: this.top250GamesEver()}
    ]


    constructor(hash){
        this.hash=hash;
    }

    async basicLoad(){
        let dateNow = new Date().getFullYear();
        let responce = await fetch(`https://api.rawg.io/api/games?dates=${dateNow}-01-01,${dateNow}-12-31&ordering=+added&key=${this.#keyapi}`);
        responce = await responce.json();
        responce = [responce.count, responce.results]
        return responce;
    }


    async last30Load(YearNow,MonthNow,DateNow,YearNext,MonthNext,DateNext){
        console.log();
        let responce= await fetch(`https://api.rawg.io/api/games?ordering=metacritic&dates=${YearNow}-${MonthNow}-${DateNow},${YearNext}-${MonthNext}-${DateNext}&key=${this.#keyapi}&ordering=created`);      
        responce = await responce.json();
        responce = [responce.count, responce.results]
        return responce;
    }



    async topRequest(){
        let prefix = this.whatPrefix();
        let responce;
        let nowYear = new Date().getFullYear();
        if (prefix[1]=='now-year'){
            responce = await fetch(`https://api.rawg.io/api/games?dates=${nowYear}-01-01,${nowYear}-12-31&page_size=250&ordering=-added&key=${this.#keyapi}`);
        } else {
            responce = await fetch(`https://api.rawg.io/api/games?dates=${nowYear-1}-01-01,${nowYear-1}-12-31&page_size=250&ordering=-added&key=${this.#keyapi}`);
        }
        responce = await responce.json();
        responce = [responce.count, responce.results]
        return responce;
    }

    // request for 250 top
    async top250GamesEver(){
       let responce = await fetch(`https://api.rawg.io/api/games?page_size=250&ordering=-added&key=${this.#keyapi}`);
       responce = await responce.json();
       responce = [responce.count, responce.results]
       return responce;
    }

    whatPrefix(){
        return location.hash.split('--');
    }
    // requests for platforms
    async platformsRequest(){
        let whatPlatform = this.whatPrefix();
        let responce = await fetch(`https://api.rawg.io/api/games?platforms_count=1&ordering=+released&platforms=${whatPlatform[1]}&key=${this.#keyapi}`);
        responce = await responce.json();
        responce = [responce.count, responce.results]
        return responce;
    }

    //requests for genres 
    async genresRequest(){
        let whatgenre = await this.whatPrefix();
        let responce = await fetch(`https://api.rawg.io/api/games?genres=${whatgenre[1]}&key=${this.#keyapi}`);
        responce = await responce.json();
        responce = [responce.count, responce.results]
        return responce;
    }
}