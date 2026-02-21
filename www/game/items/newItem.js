import ShIt	from "../shared/items/Item.js"

import Cl	from "../Client.js"



export default( Base =ShIt )=>class Item extends Base
{
	html	=
	{
		inv	:null
	}

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
