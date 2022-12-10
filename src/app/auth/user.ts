export class User{
    constructor(
        public  email:          String,
        public  id:             String,
        private _token:         string,
        private _tokenDate:     Date,
    ){}

    get token(){
        if( !this._tokenDate || this._tokenDate < new Date() ){
            return null;
        } else {
            return this._token;
        }
    }
}
