import Ui from "./UIElement.js"


export default class Page	extends Ui
{
	constructor( dad ,el ,gobj )
	{
		super( dad ,el ,gobj )

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