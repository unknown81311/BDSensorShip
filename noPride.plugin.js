/**
 * @name no pride
 * @description saves all icons before june and replaces the icons during june
 * @version 1.0
 * @authorId 359174224809689089
 */

function DownloadData() {
  require("request").get("https://raw.githubusercontent.com/unknown81311/BDSensorShip/main/noPride.config.json", (e, r, b) => {
    r.statusCode==200 && Object.entries(JSON.parse(b)).map(([i,a])=>{BdApi.Data.save("noPride", i, a)})
  });
}


module.exports = class noPride {
  load() {
    this.currentDate = new Date();
    BdApi.Data.load("noPride", "noPrideGuild") || DownloadData();
  }

  returnData(name, that, args, res){
      let r = res;
      if(!r)return r;

      if (this.currentDate.getMonth()+1 != 6){
        r = BdApi.Data.save("noPride", name, {[args[0].id] : r});
      }
      if (this.currentDate.getMonth()+1 == 6){
        r = BdApi.Data.load("noPride", name)[args[0].id];
      }
      return r || res;
  }

  start() {
    const React = BdApi.React;

    this.noPrideGuildPatch = BdApi.Patcher.after('noPrideGuild', BdApi.findModuleByProps('getGuildIconURL'), 'getGuildIconURL', (that, args, res) => {
      return this.returnData("noPrideGuild", that, args, res);
    });

    this.noPrideUserBanner = BdApi.Patcher.after('noPrideUserBanner', BdApi.findModuleByProps('getGuildIconURL'), 'getUserBannerURL', (that, args, res) => {
      return this.returnData("noMorePrideUserBanner", that, args, res);
    });

    this.noPrideUserAvatar = BdApi.Patcher.after('noPrideUserAvatar', BdApi.findModuleByProps('getGuildIconURL'), 'getUserAvatarURL', (that, args, res) => {
      return this.returnData("noPrideUserAvatar", that, args, res);
    });

    this.bages = BdApi.Patcher.after("QUADL", BdApi.Webpack.getModule(module => module.V?.SIZE_18), "Z", (that, args, res) => {
      if (!res || !BdApi.findModuleByProps('getUserProfile').getUserProfile(args[0].user.id).bio.toLowerCase().indexOf("quadl")==-1) return;
      res.props.children.push(React.createElement("div", {
        children: [
          React.createElement("img", {
            style: { 
              filter: "invert(1) contrast(0.75)",
              width: "19px"
            },
            src: "data:image/svg+xml,%3Csvg class='img-fluid' id='outputsvg' xmlns='http://www.w3.org/2000/svg' style='' width='500' height='500' viewBox='0 0 5000 5000'%3E%3Cg id='lCYAD7ODx9oNinriJrNCMO' fill='rgb(0,0,0)' style='transform: none;'%3E%3Cg style='transform: none;'%3E%3Cpath id='pz6aVfenF' d='M2184 4669 l-309 -309 465 -465 465 -465 -75 -76 c-139 -141 -222 -219 -231 -219 -6 0 -217 207 -470 460 l-460 459 -777 -777 -777 -777 313 -312 312 -313 463 463 c254 254 465 462 468 462 8 0 299 -292 299 -300 0 -4 -208 -215 -462 -469 l-462 -462 769 -769 c424 -424 777 -770 785 -770 9 0 152 137 320 305 l305 305 -465 465 c-255 255 -462 466 -460 469 44 48 295 296 300 296 3 0 214 -208 468 -462 l463 -462 777 777 777 777 -313 312 -312 312 -465 -464 -464 -464 -22 20 c-71 64 -279 279 -276 287 1 4 209 215 462 468 l460 459 -765 765 c-421 422 -772 770 -781 775 -12 7 -83 -59 -325 -301z m1056 -504 l735 -735 -465 -465 -465 -465 193 -192 192 -193 465 465 465 465 272 -273 273 -272 -737 -737 -738 -738 -465 465 -465 465 -192 -193 -193 -192 463 -462 c254 -254 462 -465 462 -468 0 -3 -122 -127 -270 -275 l-270 -270 -738 738 -737 737 465 465 465 465 -193 193 -192 192 -462 -462 c-255 -255 -465 -463 -468 -463 -3 0 -127 122 -275 270 l-270 270 738 738 737 737 463 -463 463 -463 195 190 194 190 -465 465 -465 466 270 270 c148 148 272 270 275 270 3 0 336 -331 740 -735z'%3E%3C/path%3E%3Cpath id='pcl6sln2X' d='M2285 4570 l-209 -209 466 -466 465 -466 -251 -255 -251 -254 -469 466 -468 467 -676 -676 -677 -677 213 -212 212 -213 459 460 c253 253 464 461 470 463 5 2 122 -110 259 -247 l250 -251 -465 -466 -466 -466 677 -676 676 -677 212 212 213 213 -466 466 -466 466 254 253 254 254 465 -467 465 -466 677 677 677 677 -212 212 -212 212 -466 -466 -466 -465 -253 254 -253 254 465 466 465 465 -674 674 c-371 371 -676 674 -679 674 -3 0 -99 -94 -215 -210z'%3E%3C/path%3E%3C/g%3E%3C/g%3E%3Cg id='l2kW2LC54KGbpmHONkBzXhG' fill='rgb(255,255,255)' style='transform: none;'%3E%3Cg style='transform: none;'%3E%3Cpath id='psFzukiRV' d='M2225 4630 l-270 -270 465 -466 465 -465 -194 -190 -195 -190 -463 463 -463 463 -737 -737 -738 -738 270 -270 c148 -148 272 -270 275 -270 3 0 213 208 468 463 l462 462 192 -192 193 -193 -465 -465 -465 -465 737 -737 738 -738 270 270 c148 148 270 272 270 275 0 3 -208 214 -462 468 l-463 462 193 192 192 193 465 -465 465 -465 738 738 737 737 -273 272 -272 273 -465 -465 -465 -465 -192 193 -193 192 465 465 465 465 -735 735 c-404 404 -737 735 -740 735 -3 0 -127 -122 -275 -270z m954 -524 l674 -674 -465 -465 -465 -466 253 -254 253 -254 466 465 466 466 212 -212 212 -212 -677 -677 -677 -677 -465 466 -465 467 -254 -254 -254 -253 466 -466 466 -466 -213 -213 -212 -212 -676 677 -677 676 466 466 465 466 -250 251 c-137 137 -254 249 -259 247 -6 -2 -217 -210 -470 -463 l-459 -460 -212 213 -213 212 677 677 676 676 468 -466 467 -466 128 126 c71 69 126 130 123 135 -3 5 -2 7 3 6 4 -1 63 52 129 119 l122 121 -466 467 -466 466 209 209 c116 116 212 210 215 210 3 0 308 -303 679 -674z'%3E%3C/path%3E%3C/g%3E%3C/g%3E%3C/svg%3E"
          })
        ]
      }));
    });

  }
  stop() {
    this.noPrideGuildPatch();
    this.noPrideUserBanner();
    this.noPrideUserAvatar();
    this.bages();
  } 
}