import newInvObj from "./newInvObj.js"

import V from "./shared/Vec.js"

import GridItem from "../GridItem.js"



export default( Base =Object )=>class GridObj extends newInvObj( Base )
{
	static size	=new V(1,1)


	calcarea()
	{
		var area	=this.constructor.size.area()

		if( this.iscnt )
		{
			let areain	=1

			for(var k in this.inv )
			{
				var invo	=this.inv[k]

				if( invo.isstck )	areain	+= invo.calcarea()

				else
				{
					for(var id in invo )
					{
						areain	+= invo[id].calcarea()
					}
				}
			}
			if( areain > area )	area	=areain
		}
		return area
	}


	newelinv( dad )
	{
		return this.html.inv	=new GridItem( dad ,this )
	}
}