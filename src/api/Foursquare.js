class Helper{
  static auth(){
    const keys={
      client_id: "0K1JMD1VE3N1LMBLZ2C0LPFWVUFBQLZXHIDFQRXXQQGOFKV5",
      client_secret: "NGALVIVSBEZUYCHDHC4OO1IK1GSIOWU401QHSACGEGKEXBKX",
      v:"20181103"
    };
    return Object.keys(keys).map(key=>`${key}=${keys[key]}`).join("&");
  }
  static headers(){
    return {
      Accept:"application/json"
    };
  }
  static urlBuilder(urlPrams){
    if(!urlPrams){
      return "";
    }
    return Object.keys(urlPrams).map(key=>`${key}=${urlPrams[key]}`).join("&");
  }
  static easyFetch(endURL, method, urlPrams){
    return fetch(
      `https://api.foursquare.com/v2${endURL}?${Helper.auth()}&${Helper.urlBuilder(urlPrams)}`,
      {
        method,
        headers:Helper.headers()
      },
  ).then(res=>res.json());
  }
}
export default class FourSquare {
  static search(urlPrams){
    return Helper.easyFetch('/venues/search', 'GET', urlPrams);
  }
  static getVenueDetails(VENUE_ID){
    return Helper.easyFetch(`/venues/${VENUE_ID}`, 'GET');
  }
}
