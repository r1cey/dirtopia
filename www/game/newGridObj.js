import newInvObj from "./newInvObj.js"

import V from "./shared/Vec.js"

import GridEl from "../GridItem.js"

import GridCnt from "../GridCnt.js"



export default( Base =Object )=>class GridObj extends newInvObj( Base )
{
	static size	=new V(1,1)


	///////////////////////////////////////////////////////////////////////////

	

	newgridel()
	{
		return this.html.inv	=this.iscnt ?
		
			new GridCnt(this) : new GridEl(this)
	}


	///////////////////////////////////////////////////////////////////////////



	calcarea()
	{
		var area	=this.constructor.size.area()

		if( this.iscnt )
		{
			let areain	=1

			this.fore(( item )=>
			{
				areain	+= item.calcarea()
			})
			if( areain > area )	area	=areain
		}
		return area
	}
}