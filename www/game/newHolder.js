import newHold	from "./shared/newHolder.js"

import HEl from "../HtmlEl.js"



export default( Base =newHold(Object) )=>class Holder	extends Base
{
	html	=
	{
		inv
	}


	constructor( ...args )
	{
		super( ...args )
		/*
		if( ! this.html )	this.html	={}

		this.html.inv	=null*/
	}


	/** Call this if you already have the core element.
	* Otherwise you can call hel.loadel() and assign it directly to html.inv */

	newhinv( dad ,el )
	{
		return	this.html.inv	=new HEl( dad ,el ,this )
	}
}