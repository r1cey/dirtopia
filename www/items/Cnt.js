// import It from "./Item.js"
// import It	from "../shared/items/Item.js"

// import newHold from "../shared/newHolder.js"
// import newInv from "../shared/items/newInv.js"
import newCnt from "../shared/items/newContainer.js"

// import newDHold from "../newDictHolder.js"

import GridCnt from "../ui/inv/GridCnt.js"



export default class Cnt extends newCnt()
{
	ui_newgridc( daddiv )
	{
		return new GridCnt( this ,daddiv )
	}
	/*newgridel( dadui )
	{
		return super.newgridel( dadui ,GridCnt )
	}*/
}