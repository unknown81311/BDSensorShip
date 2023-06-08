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
      if (!res || BdApi.findModuleByProps('getUserProfile').getUserProfile(args[0].user.id).bio.toLowerCase().indexOf("quadl")) return;
      res.props.children.push(React.createElement("div", {
        children: [
          React.createElement("img", {style: { width: "19px" },
            src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='500' viewBox='0 0 5000 5000'%3E%3Cg fill='rgb(0,0,0)'%3E%3Cpath d='m2184 4669-309-309 465-465 465-465-75-76-231-219-470 460-460 459-777-777-777-777 313-312 312-313 463 463 468 462 299-300-462-469-462-462 769-769 785-770 320 305 305 305-465 465-460 469 300 296 468-462 463-462 777 777 777 777-313 312-312 312-465-464-464-464-22 20-276 287 462 468 460 459-765 765-781 775-325-301zm1056-504 735-735-465-465-465-465 193-192 192-193 465 465 465 465 272-273 273-272-737-737-738-738-465 465-465 465-192-193-193-192 463-462 462-468-270-275-270-270-738 738-737 737 465 465 465 465-193 193-192 192-462-462-468-463-275 270-270 270 738 738 737 737 463-463 463-463 195 190 194 190-465 465-465 466 270 270 275 270 740-735zM2285 4570l-209-209 466-466 465-466-251-255-251-254-469 466-468 467-676-676-677-677 213-212 212-213 459 460 470 463 259-247 250-251-465-466-466-466 677-676 676-677 212 212 213 213-466 466-466 466 254 253 254 254 465-467 465-466 677 677 677 677-212 212-212 212-466-466-466-465-253 254-253 254 465 466 465 465-674 674-679 674-215-210z'%3E%3C/path%3E%3C/g%3E%3C/svg%3E"
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