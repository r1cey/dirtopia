import newContainer from "../../www/game/shared/items/newContainer.js"

import{ IdPool }	from "../../www/game/shared/utils.js"



export default class Cnt	extends newContainer()
{
	static idpool	=new IdPool()


	delitem( item ,len ,nav )
	{
		if( super.delitem( item ,len ,nav ) )	this.deluniq()
	}

	setuniq()	{ this.id	=Cnt.idpool.new() ;return this }

	deluniq()	{ Cnt.idpool.del( this.id )}
}
