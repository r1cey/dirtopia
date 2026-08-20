import Loc	from "./Loc.js"

import newHold	from "./newHolder.js"
import newAct	from "./newActionable.js"


/** Separated this logic into a new class but now forced to create new
 * instances to access it from regular Loc objects.
 * Can fix item movement by moving this logic to Nav class but not actions...
 * Temporary fix to just call Maps methods instead.
 * For now is both Actionable and Holder. */

export default class LocCell	extends newHold( newAct( Loc ))
{
	static
	{
		this.acts.plant	=
		[
			function test( nav ,pl )
			{
				return pl.canreach( this ) && pl.hands.item?.plantable &&
				
					nav.at(0).loc2map(this).plantable( this )
			},
			function run( nav ,pl ,time =0 )
			{
				const map	=nav.at(0).loc2map(this)
				
				map.setveg( this ,"cucumber" ,0 ,time )
			}
		]
	}


	canadditem( item ,len ,nav )
	{
		return nav.at(-2).loc2map(this).canadditem( this ,item ,len )
	}


	additem( item ,nav ,msg )
	{
		nav.at(-2).loc2map(this).setitem( this ,item )
	}


	delitem( item ,len ,nav )
	{
		nav.at(-2).loc2map(this).delitem( this ,item ,len )
	}


	canchildadd( item ,len ,nav ,_i )
	{
		return nav.at(-2).loc2map(this).canchildadd( this ,item ,len )
	}


	///////////////////////////////////////////////////////////////////////////



	stck2cnt( stck ,nav , i ,msg )
	{
		return nav.at(0).stck2cnt( this ,stck ,msg )
	}


	cnt2stck( cnt ,nav )
	{
		nav[0].loc2map(this).setitem( this ,cnt.newstck() )
	}


}