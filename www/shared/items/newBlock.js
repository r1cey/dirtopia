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

				if( ! newplloc )
				{
					const plloc	=pl.loc

					if( dest.eq(plloc) )
					{
						newplloc	=map.forring(( loc )=> map.canplmov(loc) ,1 ,pl.loc )
					}
					else	newplloc	=loc
				}
				pl.mov( newplloc )

				// const game	=nav.ggame()

				const map	=nav.gmap()

				map.movitem( loc, dest ,this )
			}
		]
	}	
}