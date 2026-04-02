import newInvObj from "./newInvObj.js"

import V from "./shared/Vec.js"

import GridUi from "../GridUI.js"

import GridCnt from "../GridCnt.js"



export default( Base =newInvObj() )=>class GridObj extends Base
{
	static size	=new V(1,1)


	///////////////////////////////////////////////////////////////////////////

	

	newgridel( dadui ,Class =GridUi )
	{
		return new Class( this ,dadui )
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