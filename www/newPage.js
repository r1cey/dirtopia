import Ui from "./UIElement.js"

import UiGo from "./UIGameObj.js"



export default( Base )=>class Page	extends( Base === 1 ? UiGo : Ui )
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
	}

	hide()
	{
		this.el.style.display	="none"

		// setTimeout(()=>{ this.el.style.display="none" }, 1000 )
	}
}