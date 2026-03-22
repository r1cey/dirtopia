import ShIt	from "../shared/items/Item.js"
import newGObj from "../newGameObj.js"
// import newInvO from "../newInvObj.js"
// import newCtxO from "../newContextObj.js"
import newGridO from "../newGridObj.js"

import GridIt from "../../GridItem.js"

import CtxM from "../../ContextMenu.js"



export default( Base =newGridO(newGObj(ShIt)))=>class Item extends Base
{
	static imgmap

	static img



	draw( can, lov, vbuf )
	{
	}



	newgridel( dadui ,Class =GridIt )
	{
		var gridel	=super.newgridel( dadui ,Class )

		return gridel
	}


	newctxm( ev )
	{
		return this.ui.ctx	=new CtxM( this ,ev )
	}


	///////////////////////////////////////////////////////////////////////////


	/*dragto( trgt , )
	{
		if( trgt.isholder )
		{
			trgt.canadditem( this , )
		}
	}*/
}
