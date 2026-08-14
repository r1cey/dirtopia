import LocCSh	from "../www/shared/LocCell.js"


export default class LocC extends LocCSh
{
	static
	{
		this.dupacts()

		this.acts.plant[1]	=function( nav ,pl )
		{
			const time	=nav.ggame().time.min15.i

			LocCSh.acts.plant[1]. call(this ,nav ,pl ,time )
		}
	}
}