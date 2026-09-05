import Loc	from "./Loc.js"

import newHold	from "./newHolder.js"
// import newAct	from "./newActionable.js"



/*************************************
 * Migrated to Loc class. This is outdated.
 ***************************************/



export default class LocCell	extends newHold( Loc)
{
	static
	{
		this.prototype. acts	=
		{
			spawnitem	:
			[
				function test( nav ,pl ,item)
				{
					return this.canadditem( item ,item.len ?? 1 ,nav)
				},
				function run( nav ,pl ,item)
				{
					return this.additem( item ,nav)
				}
			],
			plant	:
			[
				function test( nav ,pl)
				{
					return pl.canreach( this ) && pl.hands.item?.plantable &&
					
						nav.at(0).loc2map(this).plantable( this )
				},
				function run( nav ,pl)
				{
					const map	=nav.at(0).loc2map( this)
					
					map.setsoilveg( this ,"cucumber" ,0)
				}
			]
		}
	}
	
	
	///////////////////////////////////////////////////////////////////////////



	canadditem( item ,len ,nav)
	{
		return nav.at(-2).loc2map(this).canadditem( this ,item ,len)
	}


	additem( item ,nav ,msg)
	{
		nav.at(-2).loc2map(this).setitem( this ,item)
	}


	delitem( item ,len ,nav)
	{
		nav.at(-2).loc2map(this).delitem( this ,item ,len)
	}


	canchildadd( item ,len ,nav ,_i)
	{
		return nav.at(-2).loc2map(this).canchildadd( this ,item ,len)
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