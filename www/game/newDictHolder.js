import newInv from "./shared/items/newInv.js"
import newGObj from "./newGameObj.js"
import newInvO from "./newInvObj.js"

import PageInv from "../PageInv.js"



export default( Base =newInvO(newGObj(newInv())) )=>class DictHolder extends Base
{
	/*constructor( ...args )
	{
		super( ...args )
	}*/


	newpinv()
	{
		var pinv	=this.html.inv	=new PageInv( this )

		/*this.fore(( item )=>
		{
			var griditem	=item.newelinv( pinv )

			pinv.add( griditem )
		})*/
		return pinv
	}

	/*async loadhinv( dad )
	{
		var hinvp	=this.constructor.hinv_pth

		return	this.html.inv	=await dad.loadel( hinvp ,this )
	}*/


	static fromJSON( val )
	{
		var obj	=super.fromJSON( val )

		if( obj.id )
		{
			obj.fore(( item )=>
			{
				item.dad	=obj
			})
		}
		else
		{
			for(var id in obj )
			{
				var inst	=obj[id]

				inst.fore(( item )=>
				{
					item.dad	=inst
				})
			}
		}
		return obj
	}
}