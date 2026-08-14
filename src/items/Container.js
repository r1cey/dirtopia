import newContainer from "../../www/shared/items/newContainer.js"

import{ IdPool }	from "../../www/shared/utils.js"



export default class Cnt	extends newContainer()
{
	openedby	=new Set()

	static idpool	=new IdPool()


	/** Hope constructor is not needed in any base classes.
	 * Is a quick way to make usable containers. */

	constructor( isuniq )
	{
		super()

		this.openedby.toJSON	=()=>undefined

		if( isuniq )	this.setuniq()
	}
	
	
	delitem( item ,len ,nav ,ismov )
	{
		if( super.delitem( item ,len ,nav ,ismov ) )	this.deluniq()
	}

	setuniq()	{ this.id	=Cnt.idpool.new() ;return this }

	su	=this.setuniq

	deluniq()	{ Cnt.idpool.del( this.id )}


	
}
