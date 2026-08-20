import Item	from "./Item.js"



export default( Base =Item )=>class Block	extends Base
{
	get isblock()	{return this }


	static
	{
		/** Drag block one tile. Also moves player. */
		
		this.acts["drag"]	=
		[
			function test( nav ,pl ,dir )
			{
				const loc	=nav.gloc()

				const dest	=loc.c().neighh( dir )

				const map	=nav.gmap()

				// const desto	=map.obj.g( dest )

				const canmov	=map.canmovblock( dest )

				const plloc	=pl.loc

				if( ! pl.canreach( loc ) ||

					pl.hands.item ||
					
					canmov === 0 ||

					( canmov === -1 && ! plloc.eq(dest) )
				){
					return false
				}
				if( dest.eq(plloc) )
				{
					return map.forring(( loc )=> map.canplmov(loc) ,1 ,plloc )
				}
				return true
			},
			function run( nav ,pl ,dir ,newplloc )
			{
				const loc	=nav.gloc()

				const dest	=loc.c().neighh( dir )

				nav.ggame().maps.movobjp( loc, "item" ,dest )

				if( ! newplloc )	newplloc	=dest.s(loc)

				pl.mov( newplloc )
			}
		]
	}	
}