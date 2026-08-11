import newHold from "../newHolder.js"
import newJable from "../newJsonable.js"

import { nonenum } from "../utils.js"



export default class Hand	extends newHold( newJable() )
{
	item


	static key	="hands"

	get ishands()	{return this }


	///////////////////////////////////////////////////////////////////////////



	constructor( pl ,item )
	{
		super()

		this.item	=item

		nonenum( this ,"pl" ,pl )
	}


	///////////////////////////////////////////////////////////////////////////


	
	setj( msg )	{ this.item	=msg.item }


	///////////////////////////////////////////////////////////////////////////



	has( item )
	{
		return this.item === item
	}

	
	/**@todo Set how much can be added exactly. */

	canadditem( item ,len )
	{
		return ! super.canadditem( item )	?

			0
			:
			this.item	?
			
				this.candrop()	? len	:0
				:
				len

		/*if( ! super.canadditem( item ))	return 0

		if( this.item )
		{
			return this.candrop()	? len	:0
		}
		return len*/
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


	fore( fun )	{ if( this.item ) fun( this.item ) }


	///////////////////////////////////////////////////////////////////////////



	candrop()
	{
		return this.pl.candrop( this.item )
	}


	drop()
	{
		const droploc	=this.pl.drop( this.item )

		this.delitem()

		return droploc
	}


	///////////////////////////////////////////////////////////////////////////


	tonavmsg()	{return "hands" }

	/*static fromJSON( msg )
	{
		return new this( null ,msg?.item )
	}*/
}