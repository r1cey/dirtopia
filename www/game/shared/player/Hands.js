import newHold from "../newHolder.js"
import newJable from "../newJsonable.js"

import { nonenum } from "../utils.js"



export default newHold( newJable( class Hand
{
	item	=null

	static key	="hands"


	get ishands()	{return this }


	///////////////////////////////////////////////////////////////////////////



	constructor( pl )
	{
		nonenum( this ,"pl" ,pl )
	}


	///////////////////////////////////////////////////////////////////////////



	get pl()	{return this.dad }

	set pl( pl )	{ this.dad	=pl }


	///////////////////////////////////////////////////////////////////////////



	canadditem( item ,len )
	{
		if( this.item )
		{
			return this.candrop()
		}
		return true
	}


	/**@returns loc if had to drop holding item */

	additem( item )
	{
		if( this.item )
		{
			return this.drop()
		}
		this.item	=item
	}


	delitem()	{ this.item	=null }


	///////////////////////////////////////////////////////////////////////////


	candrop()
	{
		this.pl.candrop( this.item )
	}


	drop()
	{
		const droploc	=this.pl.drop( this.item )

		this.delitem()

		return droploc
	}
}))