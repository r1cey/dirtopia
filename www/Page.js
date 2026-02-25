import Ui from "./UIElement.js"


export default class Page	extends Ui
{
	constructor( el ,gobj )
	{
		super( el ,gobj )

		this.el.classList.add("page")
	}


	show()
	{
		this.el.style.display	="block"

		this.gobj.gcl().maps.html.can.el.addEventListener(
			
			"click" ,this.hide. bind(this),{ once :true }
		)
	}

	hide()
	{
		this.el.style.display	="none"

		// setTimeout(()=>{ this.el.style.display="none" }, 1000 )
	}
}