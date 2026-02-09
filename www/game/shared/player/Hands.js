import newHold from "../newHolder.js"

import newJable from "../newJsonable.js"

// import newPath from "../newPathable.js"



export default newHold( newJable( class Hand
{
	item	=null

	static key	="hands"



	get ishands()	{return this }


	canadditem()	{return true }

	additem( item )	{ this.item	=item }

	delitem()	{ this.item	=null }
}))