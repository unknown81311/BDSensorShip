/**
 * @name no pride
 * @description saves all server icons before june and replaces the icons during june
 * @version 1.0
 * @authorId 359174224809689089
 */

module.exports = class noPride {
  load() {this.currentDate = new Date();}
  start() {
    this.noPrideGuildPatch = BdApi.Patcher.after('noPrideGuild', BdApi.findModuleByProps('getGuildIconURL'), 'getGuildIconURL', (that, args, res) => {
      let r=res
      if(!r)return r;

      if (this.currentDate.getMonth()+1 != 6){
        r=BdApi.setData("noMorePrideGuild",args[0].id,r.replace(/(\d+)$/, "96"));
      }
      if (this.currentDate.getMonth()+1 == 6){
        r=BdApi.getData("noMorePrideGuild",args[0].id,r.replace(/(\d+)$/, "96"));
      }
      return r
    })

    this.noPrideUserBanner = BdApi.Patcher.after('noPrideUserBanner', BdApi.findModuleByProps('getGuildIconURL'), 'getUserBannerURL', (that, args, res) => {
      let r = res;
      if(!r)return r;
      console.log(that, args, res);
      if (this.currentDate.getMonth()+1 != 6){
        r = BdApi.setData("noMorePrideUserBanner",args[0].id,r.replace(/(\d+)$/, "96"));
      }
      if (this.currentDate.getMonth()+1 == 6){
        r = BdApi.getData("noMorePrideUserBanner",args[0].id,r.replace(/(\d+)$/, "96"));
      }
      return r;
    })

    this.noPrideUserAvatar = BdApi.Patcher.after('noPrideUserAvatar', BdApi.findModuleByProps('getGuildIconURL'), 'getUserAvatarURL', (that, args, res) => {
      let r = res;
      if(!r)return r;
      if (this.currentDate.getMonth()+1 != 6){
        r=BdApi.setData("noPrideUserAvatar",args[0].id,r.replace(/(\d+)$/, "96"));
      }
      if (this.currentDate.getMonth()+1 == 6){
        r=BdApi.getData("noPrideUserAvatar",args[0].id,r.replace(/(\d+)$/, "96"));
      }
      return r;
    })
  }
  stop() {
    this.noPrideGuildPatch()
    this.noPrideUserBanner()
    this.noPrideUserAvatar()
  } 
}