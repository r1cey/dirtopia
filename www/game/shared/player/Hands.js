import newHold from "../newHolder.js"

import newJable from "../newJsonable.js"

// import newPath from "../newPathable.js"



export default newHold( newJable( class Hand
{
	item	=null

	static key	="hands"


	get ishands()	{return this }



	canadditem( item ,len ,nav )
	{
		if( this.item )
		{
			const pl		=nav.at(-2)

			const droploc		=pl.map( nav.at(-3) ).getloc4item( pl.loc )

			return droploc
		}
		return true
	}


	additem( item ,nav )
	{
		this.item	=item

		return this
	}


	delitem()	{ this.item	=null }
}))