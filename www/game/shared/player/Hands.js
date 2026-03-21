import newHold from "../newHolder.js"
// import newJable from "../newJsonable.js"

import { nonenum } from "../utils.js"



export default newHold( class Hand	//extends newJable()
{
	item


	static key	="hands"

	get ishands()	{return this }


	///////////////////////////////////////////////////////////////////////////



	constructor( pl ,item )
	{
		// super()

		this.item	=item

		nonenum( this ,"pl" ,pl )
	}


	///////////////////////////////////////////////////////////////////////////


	
	setj( msg )	{ this.item	=msg.item }


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


	///////////////////////////////////////////////////////////////////////////



	static fromJSON( msg )
	{
		return new this( null ,msg?.item )
	}
})