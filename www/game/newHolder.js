import newHold	from "./shared/newHolder.js"

import newInvO from "./newInvObj.js"

import PageInv from "../PageInv.js"



export default( Base =newHold(Object) )=>class Holder extends newInvO( Base )
{
	/*constructor( ...args )
	{
		super( ...args )
	}*/


	newpinv( html )
	{
		var pinv	=this.html.inv	=new PageInv( html ,this )

		/*this.fore(( item )=>
		{
			var griditem	=item.newelinv( pinv )

			pinv.add( griditem )
		})*/
		return pinv
	}

	async loadhinv( dad )
	{
		var hinvp	=this.constructor.hinv_pth

		return	this.html.inv	=await dad.loadel( hinvp ,this )
	}
}