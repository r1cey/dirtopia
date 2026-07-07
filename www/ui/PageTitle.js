import Page from "./Page.js"


export default class SliderTitle	extends Page
{
	constructor( dad ,el ,gobj ,title ,el_closetrg )
	{
		super( dad ,el ,gobj ,null ,el_closetrg )

		var titleel	=document.createElement("h1")

		titleel.textContent	=title

		this.el.prepend(titleel)
	}
}