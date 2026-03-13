import Maps from "./maps/Maps.js"
import Players from "./player/Players.js"



export default class Game
{
	maps	=this.newmaps()

	pls	=this.newpls()



	newpl( plmsg )
	{
		console.log( `Creating new player: ${plmsg.name}` )

		const g=this

		const map	=g.maps.ground

		const spawns	=map.obj.o.spawns

		const loc	=map.getloc4pl( spawns[0] )

		const pl	=this.pls.new( plmsg ,loc )

		this.maps.setpl( pl )
		
		return pl
	}



	newmaps()	{return new Maps( this )}
	
	newpls()	{return new Players( this )}
}