import ShIt	from "../shared/items/Item.js"

import newGridObj from "../newGridObj.js"

import Cl	from "../Client.js"



export default( Base =ShIt )=>class Item extends newGridObj( Base )
{
	static imgmap

	static img



	getcl()
	{
		var obj	=this.dad

		while( !( obj instanceof Cl ) )	obj	=obj.dad
	}



	draw( can, lov, vbuf )
	{
	}



}
