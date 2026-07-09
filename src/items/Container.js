import newContainer from "../../www/shared/items/newContainer.js"

import{ IdPool }	from "../../www/shared/utils.js"



export default class Cnt	extends newContainer()
{
	openedby	=new Set()

	static idpool	=new IdPool()


	constructor(...args)
	{
		super(...args)

		this.openedby.toJSON	=()=>undefined
	}
	
	delitem( item ,len ,nav ,ismov )
	{
		if( super.delitem( item ,len ,nav ,ismov ) )	this.deluniq()
	}

	setuniq()	{ this.id	=Cnt.idpool.new() ;return this }

	su	=this.setuniq

	deluniq()	{ Cnt.idpool.del( this.id )}


	
}
