import Loc from "../Loc.js"
import Col from '../Color.js'
import newISlot	from "../items/newInvSlot.js"


/** Has minimum information, all other Player classes
 * have to build on top of this. */

export default class PlBase	extends newISlot()
{
	name

	r

	col
	
	loc	//when this is derived on client, it can become a getter function
	

	static allowed	=
	{
		belt	:1
	}
	
	///////////////////////////////////////////////////////////////////////////


	constructor( msg )
	{
		this.name	=msg?.name

		this.r	=msg?.r	?? 0.62
		
		this.col	=msg?.col	??new Col(0, 100, 50)

		this.loc	=msg?.loc	??new Loc(0,0,0)
	}


	
	get ispl()	{return this }
}