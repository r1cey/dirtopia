import newInvObj from "./newInvObj.js"

import V from "./shared/Vec.js"


export default( Base =Object )=>class GridObj extends newInvObj( Base )
{
	static size	=new V(1,1)


	calcarea()
	{
		var area	=this.constructor.size.area()

		if( this.iscnt )
		{
			for(var k in this.inv )
			{
				var invo	=this.inv[k]

				if( invo.isstck )	area	+= invo.calcarea()

				else
				{
					for(var id in invo )
					{
						area	+= invo[id].calcarea()
					}
				}
			}
		}
		return area
	}


	newelinv()
	{

	}
}