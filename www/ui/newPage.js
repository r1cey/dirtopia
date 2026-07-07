import Div from "./Div.js"

import DivGo from "./DivGameObj.js"



export default( Base )=>class Page	extends( Base === 1 ? DivGo : Div )
{
	constructor( ...args )
	{
		super( ...args )

		this.el.classList.add( "page" ,"scroll" )
	}


	show()
	{
		this.el.style.display	="block"

		this.html().can.el.addEventListener(
			
			"click" ,this.hide. bind(this),{ once :true }
		)
		return this
	}

	/*hide()
	{
		super.hide()

		// setTimeout(()=>{ this.el.style.display="none" }, 1000 )

		return this
	}*/
}