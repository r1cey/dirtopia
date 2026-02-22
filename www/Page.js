import HEl from "./HtmlEl.js"


export default class Page	extends HEl
{
	constructor( html ,el ,gobj )
	{
		super( html ,el ,gobj )

		this.el.classList.add("page")
	}


	show()
	{
		this.el.style.display	="block"

		this.dad.can.el.addEventListener( "click" ,this.hide. bind(this),{ once :true })
	}

	hide()
	{
		this.el.style.display	="none"

		// setTimeout(()=>{ this.el.style.display="none" }, 1000 )
	}
}