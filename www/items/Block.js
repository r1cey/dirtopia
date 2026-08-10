import newBlock	from "../shared/items/newBlock.js"
import Item	from "../shared/items/Item.js"


const ShBlock	=newBlock( Item )

export default class Block	extends ShBlock
{
	static
	{
		this.dupacts()

		this.acts.drag[1]	=function( nav ,pl ,dir ,newplloca )
		{
			const newplloc	=newplloca && pl.loc.c().setj( newplloca )

			ShBlock.acts.drag[1].call( this ,nav ,pl ,dir ,newplloc )

			if( pl.isclpl )
			{
				pl.forcemov( pl.loc )
			}
		}
	}
}