import Item	from "./Item.js"



export default( Base =Item )=>class Block	extends Base
{
	get isblock()	{return this }


	static
	{
		this.acts["drag"]	=
		[
			function test( nav ,pl ,dir )
			{
				const loc	=nav.gloc()

				const dest	=loc.c().neighh( dir )

				const map	=nav.gmap()

				if( ! pl.canreach( loc ) ||
				
					map.obj.g(dest)?.item ||

					! map.canplmov( dest ,pl )
				){
					return false
				}
				const plloc	=pl.loc

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