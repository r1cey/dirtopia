import Item	from "./Item.js"



export default( Base =Item )=>class Block	extends Base
{
	get isblock()	{return this }


	static
	{
		for(var dir =0 ;dir< 6 ;dir++)
		{
			this.acts["mov"+dir]	=
			[
				function( nav ,pl )
				{
					const dest	=nav.gloc().c().neighh( dir )

					return pl.canreach( nav.gloc() ) && nav.gmap().canadditem( dest ,nav.last() )
				}
			]
		}
	}	
}