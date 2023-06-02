/**
 * @name no pride
 * @description saves all server icons before june and replaces the icons during june
 * @version 1.0
 * @authorId 359174224809689089
 */

function DownloadData() {
  require("request").get("https://raw.githubusercontent.com/unknown81311/BDSensorShip/main/noPride.config.json", (e, r, b) => {
    r.statusCode==200&&Object.entries(JSON.parse(b)).map(([i,a])=>{BdApi.Data.save("noPride", i, a)})
  });
}

module.exports = class noPride {
  load() {
    this.currentDate = new Date();
    BdApi.Data.load("noPride", "noPrideGuild") || DownloadData();
  }
  start() {
    this.noPrideGuildPatch = BdApi.Patcher.after('noPrideGuild', BdApi.findModuleByProps('getGuildIconURL'), 'getGuildIconURL', (that, args, res) => {
      let r = res;
      if(!r)return r;

      if (this.currentDate.getMonth()+1 != 6){
        r = BdApi.Data.save("noPride", "noPrideGuild", {[args[0].id]:r});
      }
      if (this.currentDate.getMonth()+1 == 6){
        r = BdApi.Data.load("noPride", "noPrideGuild")[args[0].id];
      }
      return r||res;
    })

    this.noPrideUserBanner = BdApi.Patcher.after('noPrideUserBanner', BdApi.findModuleByProps('getGuildIconURL'), 'getUserBannerURL', (that, args, res) => {
      let r = res;
      if(!r)return r;

      console.log(that, args, res);
      if (this.currentDate.getMonth()+1 != 6){
        r = BdApi.Data.save("noPride", "noMorePrideUserBanner",{[args[0].id]:r});
      }
      if (this.currentDate.getMonth()+1 == 6){
        r = BdApi.Data.load("noPride", "noMorePrideUserBanner")[args[0].id];
      }
      return r||res;
    })

    this.noPrideUserAvatar = BdApi.Patcher.after('noPrideUserAvatar', BdApi.findModuleByProps('getGuildIconURL'), 'getUserAvatarURL', (that, args, res) => {
      let r = res;
      if(!r)return r;

      if (this.currentDate.getMonth()+1 != 6){
        r=BdApi.Data.save("noPride", "noPrideUserAvatar",{[args[0].id]:r});
      }
      if (this.currentDate.getMonth()+1 == 6){
        r=BdApi.Data.load("noPride", "noPrideUserAvatar")[args[0].id];
      }
      return r||res;
    })
  }
  stop() {
    this.noPrideGuildPatch();
    this.noPrideUserBanner();
    this.noPrideUserAvatar();
  } 
}