import HInv from "../../HtmlInv.js"


export default class HBelt extends HInv
{
	constructor( dad ,el ,gbelt ,css )
	{
		super( dad ,el ,gbelt ,css )

		if( gbelt.inv.multi )
		{
			let multiel	=el.getElementsByTagName("multi")[0]

			// multiel.appendChild( gbelt.inv.multi.newhinv( this ))
		}
	}
}