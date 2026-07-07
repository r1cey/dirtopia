import{ imgdir }	from "../Html.js"

import Page from "./Page.js"


/** In the conflict between game object attaching html object
 * or vice versa: the order is HTML OBJECT ATTACHES GAME OBJ.
 * Why? Because game objs might arrive premade. */

export default class HtmlCnt	extends Page
{
	gcnt


	constructor( html ,el ,css , gcnt )
	{
		super( html ,el ,css )

		this.gcnt	=gcnt

		gcnt.html.inv	=this
	}
}