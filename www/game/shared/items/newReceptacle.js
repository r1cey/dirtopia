import newSlot from "./newInvSlot.js"

import newCnt from "./newContainer.js"


export default( Base =newSlot(newCnt()) )=>class Rcpt	extends Base
{
	canadditem( item ,len )
	{
		/*var lenallow	=Rcpt.canadditem( item ,len )

		var curlen	=this.inv[item.gkey()]?.len || 0

		lenallow	-= curlen*/

		return Rcpt.canadditem( item ,len ) - ( this.inv[item.gkey()]?.len || 0)
	}
	

	static canadditem(item ,len )
	{
		return Math.min( this.allowed[item.gkey()] || 0 ,len )
	}
}


class LiveRcpt
{
	canchildadditem( child, item ,len )
	{}
}