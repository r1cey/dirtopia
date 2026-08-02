import Item	from "./Item.js"



export default( Base =Item )=>class Block	extends Base
{
	get isblock()	{return this }


	static
	{
		for(let dir =0 ;dir< 6 ;dir++)
		{
			this.acts["mov"+dir]	=
			[
				function( nav ,pl )
				{
					const loc	=nav.gloc()

					const dest	=loc.c().neighh( dir )

					const map	=nav.gmap()

					return pl.canreach( loc ) &&
					
						! map.obj.g(dest)?.item &&

						map.canplmov( dest )
				},
				function( nav ,pl )
				{
					const loc	=nav.gloc()

					const dest	=loc.c().neighh( dir )

					const map	=nav.gmap()

					map.obj.s(dest).item	=nav.last()

					map.obj.del( loc ,"item" )

					const plloc	=pl.loc.c()

					map.obj.del( plloc ,"pl" )

					map.obj.s( plloc.neighh( dir )).pl	=pl
				}
			]
		}
	}	
}