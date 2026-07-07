import V from "./shared/Vec.js"

import GridUi from "./ui/inv/GridUI.js"

import GridCnt from "./ui/inv/GridHolder.js"



export default( Base )=>class GridObj extends Base
{
	static
	{
		this.ui.gridsz	=new V( 1 ,1 )
	}

	///////////////////////////////////////////////////////////////////////////

	
	/** New grid cell div */

	ui_newgridc()
	{
		const div	=this.constructor.
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