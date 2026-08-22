import JRevSh	from "../www/shared/JsonRevivr.js"

// import Pl from "./player/Player.js"
// import Item from "../www/shared/items/Item.js"
// import Hands from "../www/shared/player/Hands.js"
import itemTps from "./items/itemTypes.js"


/** Adds item types to the JSON reviver */

export default class Jrev extends JRevSh
{
	constructor()
	{
		super()

		this.addo( itemTps )
	}
}