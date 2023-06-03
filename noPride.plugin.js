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
    this.noPrideGuildPatch = BdApi.Patcher.after('noPrideGuild', BdApi.findModuleByProps('getGuildIconURL'), 'getGuildIconURL', (that, args, res) => {
      return this.returnData("noPrideGuild", that, args, res);
    });

    this.noPrideUserBanner = BdApi.Patcher.after('noPrideUserBanner', BdApi.findModuleByProps('getGuildIconURL'), 'getUserBannerURL', (that, args, res) => {
      return this.returnData("noMorePrideUserBanner", that, args, res);
    });

    this.noPrideUserAvatar = BdApi.Patcher.after('noPrideUserAvatar', BdApi.findModuleByProps('getGuildIconURL'), 'getUserAvatarURL', (that, args, res) => {
      return this.returnData("noPrideUserAvatar", that, args, res);
    });
  }
  stop() {
    this.noPrideGuildPatch();
    this.noPrideUserBanner();
    this.noPrideUserAvatar();
  } 
}