import{ imgdir }	from "../Html.js"


/** In the conflict between game object attaching html object
 * or vice versa: the order is HTML OBJECT ATTACHES GAME OBJ.
 * Why? Because game objs might arrive premade. */

export default class HtmlCnt
{
	dad

	el

	gcnt


	constructor( dad, gcnt )
	{
		this.dad	=dad

		this.gcnt	=gcnt

		gcnt.html.inv	=this

		var el	=this.el	=document.createElement("ITEM")

		el.className	="cnt "+gcnt.isslot?"slot ":""+gcnt.gkey()

		// el.style.backgroundImage=`url("${})`

		var img	=new Image()

		img.src	=gcnt.gkey()
	}
}