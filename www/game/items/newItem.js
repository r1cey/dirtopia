import ShIt	from "../shared/items/Item.js"
import newGObj from "../newGameObj.js"
import newInvO from "../newInvObj.js"
import newCtxO from "../newContextObj.js"
import newGridO from "../newGridObj.js"

import CtxM from "../../ContextMenu.js"



export default( Base =newGridO(newCtxO(newInvO(newGObj(ShIt)))))=>class Item extends Base
{
	static imgmap

	static img



	draw( can, lov, vbuf )
	{
	}



	newgridel( ...args )
	{
		var gridel	=super.newgridel( ...args )

		gridel.el.onclick	=( ev )=>
			{
				this.gcl().html.newctxm( this ,ev )
			}
		return gridel
	}


	newctxm( ev )
	{
		return this.ui.ctx	=new CtxM( this ,ev )
	}
}
